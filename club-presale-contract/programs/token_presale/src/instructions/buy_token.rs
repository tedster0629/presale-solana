use {
    anchor_lang::{prelude::*, system_program},
    anchor_spl::{
        token,
        associated_token,
    },
};

use solana_program::clock::Clock;

use crate::state::PresaleInfo;
use crate::state::UserInfo;
use crate::constants::{PRESALE_SEED, USER_SEED};
use crate::errors::PresaleError;

pub fn buy_token(
    ctx: Context<BuyToken>, 
    token_amount: u64,
    quote_amount: u64,
    identifier: u8,
) -> Result<()> {

    let presale_info = &mut ctx.accounts.presale_info;
    let user_info = &mut ctx.accounts.user_info;
    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();;

    // get time and compare with start and end time
    if presale_info.start_time > cur_timestamp {
        msg!("Presale not started yet.");
        return Err(PresaleError::PresaleNotStarted.into());
    }

    if presale_info.end_time < cur_timestamp {
        msg!("Presale already ended.");
        return Err(PresaleError::PresaleEnded.into())
    }

    // if token_amount != (quote_amount / presale_info.price_per_token)  {
    //     msg!("Token and Sol amounts are mismatch.");
    //     return Err(PresaleError::TokenAmountMismatch.into())
    // }

    if token_amount > presale_info.deposit_token_amount - presale_info.sold_token_amount {
        msg!("Insufficient tokens in presale");
        return Err(PresaleError::InsufficientFund.into())
    }

    if presale_info.max_token_amount_per_address < (user_info.buy_token_amount + token_amount) {
        msg!("Insufficient tokens in presale");
        return Err(PresaleError::InsufficientFund.into())
    }
    
    // send quote token(SOL) to contract and update the user info
    user_info.buy_time = cur_timestamp;
    user_info.buy_quote_amount = user_info.buy_quote_amount + quote_amount;
    user_info.buy_token_amount = user_info.buy_token_amount + token_amount;

    presale_info.sold_token_amount = presale_info.sold_token_amount + token_amount;

    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(), 
            system_program::Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: ctx.accounts.presale_info.to_account_info(),
            })
        , quote_amount
    )?;

    msg!("Presale tokens transferred successfully.");

    Ok(())
}


#[derive(Accounts)]
#[instruction(    
    token_amount: u64,
    quote_amount: u64,
    identifier: u8,
)]
pub struct BuyToken<'info> {
    #[account(
        mut,
        seeds = [PRESALE_SEED, presale_authority.key().as_ref(), [identifier].as_ref()],
        bump = presale_info.bump
    )]
    pub presale_info: Box<Account<'info, PresaleInfo>>,
    pub presale_authority: SystemAccount<'info>,
    #[account(
        init_if_needed,
        payer = buyer,
        space = 8 + std::mem::size_of::<UserInfo>(),
        seeds = [USER_SEED, presale_authority.key().as_ref(), buyer.key().as_ref(), [identifier].as_ref()],
        bump
    )]
    pub user_info: Box<Account<'info, UserInfo>>,

    #[account(mut)]
    pub buyer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
}