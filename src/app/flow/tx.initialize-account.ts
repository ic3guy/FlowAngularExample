// prettier-ignore
import * as fcl from '@onflow/fcl';

export async function initializeAccount(address: string) {

    const transactionId = await fcl.mutate({
        cadence: `
        import FungibleToken from 0xFungibleToken
        import NonFungibleToken from 0xNonFungibleToken
        import FUSD from 0xFUSD
        import KittyItems from 0xKittyItems
        import NFTStorefront from 0xNFTStorefront
        pub fun hasFUSD(_ address: Address): Bool {
          let receiver = getAccount(address)
            .getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)
            .check()
          let balance = getAccount(address)
            .getCapability<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance)
            .check()
          return receiver && balance
        }
        pub fun hasItems(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&KittyItems.Collection{NonFungibleToken.CollectionPublic, KittyItems.KittyItemsCollectionPublic}>(KittyItems.CollectionPublicPath)
            .check()
        }
        pub fun hasStorefront(_ address: Address): Bool {
          return getAccount(address)
            .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath)
            .check()
        }
        transaction {
          prepare(acct: AuthAccount) {
            if !hasFUSD(acct.address) {
              if acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil {
                acct.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)
              }
              acct.unlink(/public/fusdReceiver)
              acct.unlink(/public/fusdBalance)
              acct.link<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver, target: /storage/fusdVault)
              acct.link<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance, target: /storage/fusdVault)
            }
            if !hasItems(acct.address) {
              if acct.borrow<&KittyItems.Collection>(from: KittyItems.CollectionStoragePath) == nil {
                acct.save(<-KittyItems.createEmptyCollection(), to: KittyItems.CollectionStoragePath)
              }
              acct.unlink(KittyItems.CollectionPublicPath)
              acct.link<&KittyItems.Collection{NonFungibleToken.CollectionPublic, KittyItems.KittyItemsCollectionPublic}>(KittyItems.CollectionPublicPath, target: KittyItems.CollectionStoragePath)
            }
            if !hasStorefront(acct.address) {
              if acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) == nil {
                acct.save(<-NFTStorefront.createStorefront(), to: NFTStorefront.StorefrontStoragePath)
              }
              acct.unlink(NFTStorefront.StorefrontPublicPath)
              acct.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)
            }
          }
        }
      `,
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 70
    })

    const transaction = await fcl.tx(transactionId).onceSealed()
    console.log(transaction);
    return transaction;
}