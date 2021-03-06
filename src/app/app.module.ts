import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FlowAuthComponent } from './flow-auth/flow-auth.component';
import { FlowInitializationComponent } from './flow-initialization/flow-initialization.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { KittyItemListComponent } from './kitty-item-list/kitty-item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowAuthComponent,
    FlowInitializationComponent,
    KittyItemListComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
