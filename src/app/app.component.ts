import { Component, OnInit } from '@angular/core';
import * as fcl from "@onflow/fcl";
import { config } from '@onflow/fcl';
import * as t from "@onflow/types";
import { defer, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isInit: Observable<boolean> = new Observable();

  constructor() {}

  async ngOnInit(): Promise<void> {
    config()
    .put("accessNode.api", environment.flowAccessNodeAddress)
    .put("challenge.handshake", environment.walletDiscoveryAddress)
    .put("0xProfile", environment.contractProfile)

    this.isInitialized('0xba1132bc08f82fe2').then((result: any) => console.log(`The account 0xba1132bc08f82fe2 is initialized: ${result}`));

    //this.isInit = this.isInitializedWrap('0xba1132bc08f82fe2');
    // this.isInit = this.user.pipe(
    //   filter(user => !!user.addr),
    //   switchMap(user => this.isInitializedWrap(user.addr)),
    //   tap(result => console.log(`the result ${result}`))
    // )
  }
    
  async isInitialized(address: string): Promise<boolean> {
    if (address == null)
    throw new Error("isInitialized(address) -- address required")

  return fcl
    .send([
      fcl.script`
        import Profile from 0xProfile

        pub fun main(address: Address): Bool {
          return Profile.check(address)
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode)
  }
  
  public isInitializedWrap(address: string): Observable<boolean> {
    return defer(() => this.isInitialized(address));
  }

 
}

