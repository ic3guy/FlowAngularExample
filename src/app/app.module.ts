import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FlowAuthComponent } from './flow-auth/flow-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowAuthComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
