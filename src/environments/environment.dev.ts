// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  flowAccessNodeAddress: 'https://access-testnet.onflow.org',
  walletDiscoveryAddress: 'https://fcl-discovery.onflow.org/testnet/authn',
  contractProfile: '0xba1132bc08f82fe2',
  FUNGIBLE_TOKEN_ADDRESS: '0x9a0766d93b6608b7',
  NON_FUNGIBLE_TOKEN_ADDRESS: '0x631e88ae7f1d7c20',
  FUSD_TOKEN_ADDRESS: '0xe223d8a629e49c68',
  KITTY_ITEMS_ADDRESS: '0xd07a7fa848ee5a9b'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
