import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PackagesModule} from './packages/packages.module';
// import {ContextModule} from './packages/context/context.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PackagesModule,
  //  ContextModule.forRoot({} as any)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
