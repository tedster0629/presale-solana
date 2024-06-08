use {
    anchor_lang::prelude::*,
    anchor_spl::{
        token,
        associated_token,
    },
};

use crate::errors::PresaleError;
use crate::state::{PresaleInfo, UserInfo};
use crate::constants::{PRESALE_SEED, USER_SEED};

pub fn claim_token(
    ctx: Context<ClaimToken>, 
    identifier: u8
) -> Result<()> {

    let presale_info = &mut ctx.accounts.presale_info;
    let bump = &[presale_info.bump];

    let cur_timestamp = u64::try_from(Clock::get()?.unix_timestamp).unwrap();;

    // get time and compare with start and end time
    if presale_info.end_time > cur_timestamp {
        msg!("Presale not ended yet.");
        return Err(PresaleError::PresaleNotEnded.into());
    }

    let user_info = &mut ctx.accounts.user_info;
    let claimAmount = user_info.buy_token_amount - user_info.claim_amount;
    user_info.claim_amount = user_info.claim_amount + claimAmount;

    msg!("Transferring presale tokens to buyer {}...", &ctx.accounts.buyer.key());
    msg!("Mint: {}", &ctx.accounts.presale_token_mint_account.to_account_info().key());   
    msg!("From Token Address: {}", &ctx.accounts.presale_presale_token_associated_token_account.key());     
    msg!("To Token Address: {}", &ctx.accounts.buyer_presale_token_associated_token_account.key());     
    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.presale_presale_token_associated_token_account.to_account_info(),
                to: ctx.accounts.buyer_presale_token_associated_token_account.to_account_info(),
                authority: ctx.accounts.presale_info.to_account_info(),
            },
            &[&[PRESALE_SEED, ctx.accounts.presale_authority.key().as_ref(), [identifier].as_ref(), bump][..]],
        ),
        claimAmount,
    )?;

    msg!("Presale tokens transferred successfully.");

    Ok(())
}

#[derive(Accounts)]
#[instruction(
    identifier: u8
)]
pub struct ClaimToken<'info> {
    // Presale token accounts
    #[account(mut)]
    pub presale_token_mint_account: Box<Account<'info, token::Mint>>,
    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = presale_token_mint_account,
        associated_token::authority = buyer_authority,
    )]
    pub buyer_presale_token_associated_token_account: Box<Account<'info, token::TokenAccount>>,
    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = presale_token_mint_account,
        associated_token::authority = presale_info,
    )]
    pub presale_presale_token_associated_token_account: Box<Account<'info, token::TokenAccount>>,

    #[account(
        init_if_needed,
        payer = buyer,
        space = 8 + std::mem::size_of::<UserInfo>(),
        seeds = [USER_SEED, presale_authority.key().as_ref(), buyer.key().as_ref(), [identifier].as_ref()],
        bump
    )]
    pub user_info: Box<Account<'info, UserInfo>>,
    
    #[account(
        mut,
        seeds = [PRESALE_SEED, presale_authority.key().as_ref(), [identifier].as_ref()],
        bump = presale_info.bump
    )]
    pub presale_info: Box<Account<'info, PresaleInfo>>,
    pub presale_authority: SystemAccount<'info>,
    #[account(constraint = buyer.key() == buyer_authority.key())]
    pub buyer_authority: SystemAccount<'info>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
}