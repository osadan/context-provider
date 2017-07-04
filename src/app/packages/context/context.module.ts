import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import {FormsModule} from '@angular/forms';

export interface IConfiguration  {
  contextSource: Object;
}

export const ContextConfig: InjectionToken<IConfiguration> = new InjectionToken('config');

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ContainerComponent],
  declarations: [ContainerComponent]
})
export class ContextModule {
  static forRoot(config: IConfiguration): ModuleWithProviders {
    return {
        ngModule : ContextModule,
        providers: [
          { provide: ContextConfig, useValue: config}
      ]
    }
  }

}
