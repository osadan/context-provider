import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { configuration } from 'configuration/config';
import {ContextModule} from './context/context.module';

@NgModule({
  imports: [
    CommonModule,
    ContextModule.forRoot(configuration)
  ],
  exports: [ContextModule],
  declarations: []
})

export class PackagesModule { }
