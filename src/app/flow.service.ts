import { Injectable } from '@angular/core';
import * as fcl from '@onflow/fcl';
import * as t from "@onflow/types";
import { defer, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { getAccountItems } from './flow/script.get-account-items';
import { getInitializationState } from './flow/script.is-account-initialized';
import { InitializationState, User } from './models';


@Injectable({
  providedIn: 'root'
})
export class FlowService {

  public user: Subject<User> = new ReplaySubject<User>(1);
  public initializationState: Observable<InitializationState>;
  public kittItems: Observable<number[]>;

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

  public getInitializationState(address: string): Observable<InitializationState> {
    return defer(() => getInitializationState(address));
  }

  public getAccountItems(address: string): Observable<number[]> {
    return defer(() => getAccountItems(address))
  }
}

