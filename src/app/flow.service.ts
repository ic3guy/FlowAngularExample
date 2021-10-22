import { Injectable } from '@angular/core';
import * as fcl from '@onflow/fcl';
import * as t from "@onflow/types";
import { defer, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { getAccountItems } from './flow/script.get-account-items';
import { getInitializationState } from './flow/script.is-account-initialized';
import { InitializeAccount } from './flow/tx.initialize-account';
import { InitializationState, User } from './models';


@Injectable({
  providedIn: 'root'
})
export class FlowService {

  public user = new ReplaySubject<User>(1);
  public initializationState = new ReplaySubject<InitializationState>(1);
  public kittItems: Observable<number[]>;

  constructor() {

    // Note: fcl.currentUser() does not return an Observable!
    // fcl.currentUser() returns a custom actor model built by the flow team
    // We forward it to a replay subject for consumption in our app
    fcl.currentUser().subscribe((x: User) => {
      this.user.next(x);
    });

    this.user.pipe(
      filter(user => !!user.addr),
      switchMap(user => this.getInitializationState(user.addr)),
    ).subscribe(this.initializationState)

    this.kittItems = this.user.pipe(
      filter(user => !!user.addr),
      switchMap(user => this.getAccountItems(user.addr))
    )
  }

  public refreshInitializationState(address: string): void {
    this.getInitializationState(address).subscribe(this.initializationState);
  }

  public getInitializationState(address: string): Observable<InitializationState> {
    return defer(() => getInitializationState(address));
  }

  public getAccountItems(address: string): Observable<number[]> {
    return defer(() => getAccountItems(address))
  }

  public initializeAccount(address: string): Observable<any> {
    return defer(() => InitializeAccount(address)).pipe(tap(_ => this.refreshInitializationState(address)))
  }
}

