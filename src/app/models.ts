export interface User {
    addr: string
    initializationState: InitializationState
  }

export interface InitializationState {
    FUSD: boolean,
    KittyItems: boolean,
    KittyItemsMarket: boolean
    address: string
  }
  