import { Injectable } from '@angular/core';
import * as fcl from '@onflow/fcl';
import { defer, Observable, ReplaySubject, Subject } from 'rxjs';
import { InitializationState, User } from './models';
import * as t from "@onflow/types";
import { filter, map, retryWhen, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FlowService {

  public user: Subject<User> = new ReplaySubject<User>(1);
  public initializationState: Observable<InitializationState> = new ReplaySubject<any>(1);
  public kittItems: Observable<any>;

  constructor() {

    // Note: fcl.currentUser() does not return an Observable!
    // fcl.currentUser() returns a custom actor model built by the flow team
    // We forward it to a replay subject for consumption in our app
    fcl.currentUser().subscribe((x: User) => {
      this.user.next(x);
    });

    this.initializationState = this.user.pipe(
      filter(user => !!user.addr),
      switchMap(user => this.getInitializationState(user.addr)),
    )

    this.kittItems = this.user.pipe(
      filter(user => !!user.addr),
      switchMap(user => this.getAccountItems(user.addr))
    )
  }

  private async _getInitializationState(address: string): Promise<InitializationState> {
    if (address == null) {
      throw new Error("isInitialized(address) -- address required")
    }

    return fcl
      .send([
        fcl.script`
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
        fcl.args([fcl.arg(address, t.Address)]),
      ])
      .then(fcl.decode)
  }

  public getInitializationState(address: string): Observable<InitializationState> {
    return defer(() => this._getInitializationState(address));
  }

  private async _getAccountItems(address: string): Promise<any> {
    if (address == null) return Promise.resolve([])

    return fcl
      .send([
        fcl.script`
  import NonFungibleToken from 0xNonFungibleToken
  import KittyItems from 0xKittyItems
  pub fun main(address: Address): [UInt64] {
    if let collection =  getAccount(address).getCapability<&KittyItems.Collection{NonFungibleToken.CollectionPublic, KittyItems.KittyItemsCollectionPublic}>(KittyItems.CollectionPublicPath).borrow() {
      return collection.getIDs()
    }
    return []
  }
`,   fcl.args([fcl.arg(address, t.Address)]),
])
.then(fcl.decode)
  }

  public getAccountItems(address: string): Observable<any> {
    return defer(() => this._getAccountItems(address))
  }
}

