
import * as fcl from '@onflow/fcl';
import { InitializationState } from '../models';

export async function getInitializationState(address: string): Promise<InitializationState> {
    if (address == null) {
      throw new Error("isInitialized(address) -- address required")
    }

    return fcl
      .query({
        cadence: `
      import FungibleToken from 0xFungibleToken
      import NonFungibleToken from 0xNonFungibleToken
      import FUSD from 0xFUSD
      import KittyItems from 0xKittyItems
      import NFTStorefront from 0xNFTStorefront
      pub fun hasFUSD(_ address: Address): Bool {
        let receiver: Bool = getAccount(address)
          .getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)
          .check()
        let balance: Bool = getAccount(address)
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
      pub fun main(address: Address): {String: Bool} {
        let ret: {String: Bool} = {}
        ret["FUSD"] = hasFUSD(address)
        ret["KittyItems"] = hasItems(address)
        ret["KittyItemsMarket"] = hasStorefront(address)
        return ret
      }
      `,
        args: (arg: any, t: any) => [arg(address, t.Address)],
    })
  }