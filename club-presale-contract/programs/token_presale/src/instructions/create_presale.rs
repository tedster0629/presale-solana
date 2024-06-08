use anchor_lang::prelude::*;

use crate::state::PresaleInfo;
use crate::constants::PRESALE_SEED;

// Edit the details for a presale
pub fn create_presale(
    ctx: Context<CreatePresale>,
    token_mint_address: Pubkey,
    quote_token_mint_address: Pubkey,
    softcap_amount:u64,
    hardcap_amount:u64,
    max_token_amount_per_address: u64,
    price_per_token: u64,
    start_time: u64,
    end_time: u64,
    identifier: u8
) -> Result<()> {
    
    let presale_info = &mut ctx.accounts.presale_info;
    let authority = &ctx.accounts.authority;

    // Set the presale details to the parameters given
    presale_info.is_live = false;
    presale_info.token_mint_address = token_mint_address;
    presale_info.quote_token_mint_address = quote_token_mint_address;
    presale_info.deposit_token_amount = 0;
    presale_info.sold_token_amount = 0;
    presale_info.start_time = start_time;
    presale_info.end_time = end_time;
    presale_info.softcap_amount = softcap_amount;
    presale_info.hardcap_amount = hardcap_amount;
    presale_info.max_token_amount_per_address = max_token_amount_per_address;
    presale_info.price_per_token = price_per_token;
    presale_info.identifier = identifier;
    presale_info.authority = authority.key();
    presale_info.authority1 = authority.key();
    presale_info.bump = *ctx.bumps.get("presale_info").unwrap();

    msg!(
        "Presale has created for token: {}",
        presale_info.token_mint_address
    );

    Ok(())
}

#[derive(Accounts)]
#[instruction(
    token_mint_address: Pubkey,
    quote_token_mint_address: Pubkey,
    softcap_amount:u64,
    hardcap_amount:u64,
    max_token_amount_per_address: u64,
    price_per_token: u64,
    start_time: u64,
    end_time: u64,
    identifier: u8
)]
pub struct CreatePresale<'info> {
    // Initialize the presale_info account
    #[account(
        init,
        payer = authority,
        space = 8 + std::mem::size_of::<PresaleInfo>(),
        seeds = [PRESALE_SEED.as_ref(), authority.key().as_ref(), [identifier].as_ref()],
        bump
    )]
    pub presale_info: Box<Account<'info, PresaleInfo>>,
    
    // Set the authority to the transaction signer
    #[account(mut)]
    pub authority: Signer<'info>,
    
    // Must be included when initializing an account
    pub system_program: Program<'info, System>,
}