import { Component, OnInit } from '@angular/core';
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-flow-initialization',
  templateUrl: './flow-initialization.component.html',
  styleUrls: ['./flow-initialization.component.scss']
})
export class FlowInitializationComponent implements OnInit {

  constructor(public flow: FlowService) { }

  ngOnInit(): void { }

}
