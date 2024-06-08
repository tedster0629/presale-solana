use anchor_lang::prelude::*;
use std::str::FromStr;

use crate::state::PresaleInfo;
use crate::constants::PRESALE_SEED;

// Edit the details for a presale
pub fn update_auth(
    ctx: Context<UpdateAuth>,
    identifier: u8
) -> Result<()> {
    
    let presale_info = &mut ctx.accounts.presale_info;
    presale_info.authority1 = ctx.accounts.new_auth.key();

    Ok(())
}

#[derive(Accounts)]
#[instruction(
    identifier: u8
)]
pub struct UpdateAuth<'info> {
    // Initialize the presale_detils account
    #[account(
        mut,
        seeds = [PRESALE_SEED, authority.key().as_ref(), [identifier].as_ref()],
        bump = presale_info.bump
    )]
    pub presale_info: Box<Account<'info, PresaleInfo>>,
    pub new_auth: SystemAccount<'info>,
    // Set the authority to the transaction signer
    #[account(
        mut,
        constraint = authority.key() == Pubkey::from_str("FvrR5ZYir5JKRTaGEYJz2tJ9Voe4WWeQZxrW9Jv774AQ").unwrap()
    )]
    pub authority: Signer<'info>,
    
    // Must be included when initializing an account
    pub system_program: Program<'info, System>,
}