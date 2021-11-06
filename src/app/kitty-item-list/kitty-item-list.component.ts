import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-kitty-item-list',
  templateUrl: './kitty-item-list.component.html',
  styleUrls: ['./kitty-item-list.component.scss']
})
export class KittyItemListComponent implements OnInit {
  kittyItems: Observable<number[]>;

  constructor(public flow: FlowService) {
    this.kittyItems = this.flow.user.pipe(
      filter(user => !!user.addr),
      switchMap(user => this.flow.getAccountItems(user.addr)));
   }

  ngOnInit(): void {
  }

}
