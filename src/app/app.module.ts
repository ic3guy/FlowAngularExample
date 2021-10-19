import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FlowAuthComponent } from './flow-auth/flow-auth.component';
import { FlowInitializationComponent } from './flow-initialization/flow-initialization.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowAuthComponent,
    FlowInitializationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
