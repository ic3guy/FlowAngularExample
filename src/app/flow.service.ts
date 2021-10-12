import { Injectable } from '@angular/core';
import * as fcl from '@onflow/fcl';
import { ReplaySubject, Subject } from 'rxjs';
import { User } from './models';


@Injectable({
  providedIn: 'root'
})
export class FlowService {
  
  public user: Subject<User> = new ReplaySubject<User>(1);
 
  constructor() { 

    // Note: fcl.currentUser() does not return an Observable!
    // fcl.currentUser() returns a custom actor model built by the flow team
    // We forward it to a replay subject for consumption in our app
    fcl.currentUser().subscribe((x: User) => {
      this.user.next(x);
    });
  }

}

