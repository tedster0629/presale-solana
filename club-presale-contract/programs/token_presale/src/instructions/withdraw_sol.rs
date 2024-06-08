use {
    anchor_lang::{prelude::*, system_program},
    anchor_spl::{
        token,
        associated_token,
    },
};

use crate::state::PresaleInfo;
use crate::constants::PRESALE_SEED;

pub fn withdraw_sol(
    ctx: Context<WithdrawSol>, 
    amount: u64,
    identifier: u8
) -> Result<()> {

    let presale_info = &mut ctx.accounts.presale_info;
    let bump = &[ctx.accounts.presale_info.bump];

    **ctx.accounts.presale_info.to_account_info().try_borrow_mut_lamports()? -= amount;
    **ctx.accounts.buyer.try_borrow_mut_lamports()? += amount;

    // system_program::transfer(
    //     CpiContext::new_with_signer(
    //         ctx.accounts.system_program.to_account_info(), 
    //         system_program::Transfer {
    //             from: ctx.accounts.presale_info.to_account_info(),
    //             to: ctx.accounts.buyer.to_account_info(),
    //         },
    //         &[&[PRESALE_SEED, ctx.accounts.presale_authority.key().as_ref(), [identifier].as_ref(), bump][..]],
    //     )
    //     ,amount
    // )?;


    // if presale_info.quote_token_mint_account.key().as_ref() == b"So11111111111111111111111111111111111111112" {
        
    // } else {
    //     msg!("Transferring quote tokens to presale {}...", identifier);
    //     msg!("Mint: {}", &ctx.accounts.quote_token_mint_account.to_account_info().key());   
    //     msg!("From Token Address: {}", &ctx.accounts.buyer_quote_token_associated_token_account.key());     
    //     msg!("To Token Address: {}", &ctx.accounts.presale_quote_token_associated_token_account.key());     
    //     token::transfer(
    //         CpiContext::new(
    //             ctx.accounts.token_program.to_account_info(),
    //             token::Transfer {
    //                 from: ctx.accounts.buyer_quote_token_associated_token_account.to_account_info(),
    //                 to: ctx.accounts.presale_quote_token_associated_token_account.to_account_info(),
    //                 authority: ctx.accounts.buyer_authority.to_account_info(),
    //             },
    //         ),
    //         amount,
    //     )?;
    // }
    

    // msg!("Quote tokens transferred successfully.");

    // let bump = &[ctx.accounts.presale_info.bump];

    // msg!("Transferring presale tokens to buyer {}...", &ctx.accounts.buyer.key());
    // msg!("Mint: {}", &ctx.accounts.presale_token_mint_account.to_account_info().key());   
    // msg!("From Token Address: {}", &ctx.accounts.presale_presale_token_associated_token_account.key());     
    // msg!("To Token Address: {}", &ctx.accounts.buyer_presale_token_associated_token_account.key());     
    // token::transfer(
    //     CpiContext::new_with_signer(
    //         ctx.accounts.token_program.to_account_info(),
    //         token::Transfer {
    //             from: ctx.accounts.presale_presale_token_associated_token_account.to_account_info(),
    //             to: ctx.accounts.buyer_presale_token_associated_token_account.to_account_info(),
    //             authority: ctx.accounts.presale_info.to_account_info(),
    //         },
    //         &[&[b"PRESALE_SEED", /*presale_authority.key().as_ref(),*/ &[identifier], bump][..]],
    //     ),
    //     amount,
    // )?;

    msg!("Withdraw sol successfully.");

    Ok(())
}


#[derive(Accounts)]
#[instruction(
    amount: u64,
    identifier: u8
)]
pub struct WithdrawSol<'info> {

    #[account(
        mut,
        seeds = [PRESALE_SEED, presale_authority.key().as_ref(), [identifier].as_ref()],
        bump = presale_info.bump
    )]
    pub presale_info: Box<Account<'info, PresaleInfo>>,
    pub presale_authority: SystemAccount<'info>,
    #[account(constraint = buyer.key() == buyer_authority.key())]
    pub buyer_authority: SystemAccount<'info>,
    #[account(
        mut,
        constraint = buyer.key() == presale_info.authority1
    )]
    pub buyer: Signer<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, token::Token>,
    pub associated_token_program: Program<'info, associated_token::AssociatedToken>,
}