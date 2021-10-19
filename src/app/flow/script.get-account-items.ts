
import * as fcl from '@onflow/fcl';

export async function getAccountItems(address: string): Promise<number[]> {
    if (address == null) {
      throw new Error("isInitialized(address) -- address required")
    }

    return fcl
      .query({
        cadence: `
        
        import NonFungibleToken from 0xNonFungibleToken
        import KittyItems from 0xKittyItems
        pub fun main(address: Address): [UInt64] {
          if let collection =  getAccount(address).getCapability<&KittyItems.Collection{NonFungibleToken.CollectionPublic, KittyItems.KittyItemsCollectionPublic}>(KittyItems.CollectionPublicPath).borrow() {
            return collection.getIDs()
          }
          return []
        }
      `,
        args: (arg: any, t: any) => [arg(address, t.Address)],
    })
  }