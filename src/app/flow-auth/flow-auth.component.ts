import { Component, OnInit } from '@angular/core';
import * as fcl from '@onflow/fcl';
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-flow-auth',
  templateUrl: './flow-auth.component.html',
  styleUrls: ['./flow-auth.component.scss']
})
export class FlowAuthComponent implements OnInit {

  constructor(public flowService: FlowService) { }

  ngOnInit(): void {
  }

  public logOut() {
    fcl.unauthenticate();
  }

  public logIn() {
    fcl.logIn();
  }
}
