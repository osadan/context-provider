import { Component, OnInit } from '@angular/core';
import { ContextProviderService } from '../providers/ContextProviderService';
import { ContextCriteria } from '../providers/context.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { logger } from 'codelyzer/util/logger';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Component({
	selector: 'app-context-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
	public providerType = 'Elastic';
	public contextBody: string;
	public findStream: Subject<any>;
	public editItem: any;
	public result: any = {hits : [{hit: {}}]} ;

	constructor(public contextProviderService: ContextProviderService) {
		this.findStream = new Subject();
		this.findStream.flatMap(result => result).subscribe(res => {
			console.log(res);
			this.result = res;
		});

	}

	ngOnInit() {

	}

	create() {
		const context = JSON.parse(this.contextBody);
		this.contextProviderService.provide(this.providerType).create(context);
		this.clear();
	}

	find(event) {
		this.findStream.next(this.find$());
		this.clear();
	}

	find$() {
		console.log('find');
		const criteria = new ContextCriteria({start: 0, limit: 10});
		return this.contextProviderService.provide(this.providerType).find(criteria);
	}

	edit(id) {
		console.log('edit', id);
		this.editItem = this.result.hits.hits.find((hit: any) => hit._id === id);
		this.contextBody = JSON.stringify({title: this.editItem._source.title});

	}

	delete(id) {
		console.log('delete', id);
		this.contextProviderService.provide(this.providerType).remove(id);
	}

	update() {
		this.contextProviderService.provide(this.providerType).update(this.editItem._id, JSON.parse(this.contextBody));
	}


	clear() {
		this.editItem = {};
		this.contextBody = '';
	}


}
