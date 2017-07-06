import { Inject, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { FormsModule } from '@angular/forms';
import { ContextProviderService } from './providers/ContextProviderService';
import { ContextEleasticSource, IContextSourceElastic } from './providers/context.interface';
import { log } from 'util';


export interface IConfiguration {
	elasticContextSource?: IContextSourceElastic;
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
			ngModule: ContextModule,
			providers: [
				{provide: ContextConfig, useValue: config},
				ContextProviderService
			]
		}
	}

	constructor(private contextProvidersService: ContextProviderService,  @Inject(ContextConfig) private contextConfig: IConfiguration) {
		console.log(this);

		contextProvidersService.register('Elastic', new ContextEleasticSource({
			uri: this.contextConfig.elasticContextSource.uri,
			bucket: this.contextConfig.elasticContextSource.bucket
		} as IContextSourceElastic));
	}


}
