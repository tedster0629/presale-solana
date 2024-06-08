use anchor_lang::prelude::*;

use crate::state::PresaleInfo;
use crate::constants::PRESALE_SEED;

// Edit the details for a presale
pub fn start_presale(
    ctx: Context<StartPresale>,
    start_time: u64,
    identifier: u8,
) -> Result<()> {
    
    let presale = &mut ctx.accounts.presale_info;

    // Set the presale details to the parameters given
    // presale.is_live = true;

    // msg!(
    //     "Presale has started for token: {}",
    //     presale.token_mint_address
    // );

    Ok(())
}

#[derive(Accounts)]
#[instruction(
    start_time: u64,
    identifier: u8,
)]
pub struct StartPresale<'info> {
    
    #[account(
        mut,
        seeds = [PRESALE_SEED, authority.key().as_ref(), [identifier].as_ref()],
        bump = presale_info.bump
    )]
    pub presale_info: Box<Account<'info, PresaleInfo>>,
    
    #[account(mut)]
    pub authority: Signer<'info>,

}