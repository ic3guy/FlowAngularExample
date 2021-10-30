import { Component, OnInit } from '@angular/core';
import * as fcl from "@onflow/fcl";
import { config } from '@onflow/fcl';
import * as t from "@onflow/types";
import { defer, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlowService } from './flow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor() {}

  async ngOnInit(): Promise<void> {
    config()
    .put("accessNode.api", environment.flowAccessNodeAddress)
    .put("challenge.handshake", environment.walletDiscoveryAddress)
    .put("0xProfile", environment.contractProfile)
    .put("0xFungibleToken", environment.FUNGIBLE_TOKEN_ADDRESS)
    .put("0xNonFungibleToken", environment.NON_FUNGIBLE_TOKEN_ADDRESS)
    .put("0xFUSD", environment.FUSD_TOKEN_ADDRESS)
    .put("0xNFTStorefront", environment.KITTY_ITEMS_ADDRESS)
    .put("0xKittyItems", environment.KITTY_ITEMS_ADDRESS)
  }
}

