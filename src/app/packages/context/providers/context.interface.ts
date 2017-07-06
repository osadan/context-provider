//	"docker-run": ' docker run -p 9200:9200 -e "http.host=0.0.0.0" -e "transport.host=127.0.0.1" -e "http.cors.enabled=true" -e "http.cors.allow-origin=\'/.*/\'" -e "http.cors.allow-credentials=true" -e "http.cors.allow-headers=X-Requested-With, Content-Type, Content-Length, Authorization" docker.elastic.co/elasticsearch/elasticsearch:5.4.3'

import { Client, SearchResponse } from 'elasticsearch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export interface IContextSource {
	readonly providerType: string;
	find(ContextCriteria): Observable<any>;
	findMulti(ContextCriteria)
	remove(id);
	create(Context);
	update(id,Context);
	parse(any);
}

export interface IContextSourceElastic {
	type: string;
	uri: string;
	bucket: string;
}


export class ContextCriteria {
	start: number;
	limit: number;
	constructor(options: {start, limit}) {
		this.start = options.start;
		this.limit = options.limit;
	}
}


export interface Context {
	id: string;
}

export class ContextEleasticSource implements IContextSource {
	public providerType = 'Elastic';
	public uri;
	public bucket;
	public client: Client;


	constructor(config: IContextSourceElastic) {
		this.uri = config.uri;
		this.bucket = config.bucket;
		this.client = new Client({
			host: this.uri,
			log: 'trace',
			httpAuth: "elastic:changeme"
		});
	}

	ping() {
		this.client.ping({
			requestTimeout: 1000,
		}, error => {
			if (error) {
				console.trace('elasticsearch cluster id donw!')
			} else {
				console.log('All is well')
			}
		})
	}

	find(criteria: ContextCriteria) {
		return Observable.fromPromise(this.client.search({
			index: 'context',
			type: 'context',
			size: criteria.limit,
			from: criteria.start
		})).map(result => this.parseResult(result));
	}

	findMulti(criteria: ContextCriteria) {

	}

	remove(id) {
		return Observable.fromPromise(this.client.delete({
			index: 'context',
			type: 'context',
			id: id
		}))
	}

	create(payload) {
		return Observable.fromPromise(this.client.create({
			index: 'context',
			type: 'context',
			id: btoa(new Date().getTime().toString()),
			body: this.parse(payload)
		}));
	}

	update(id, payload) {
		const doc = this.parse(payload);
		console.log(doc);
		return Observable.fromPromise(this.client.update({
			index: 'context',
			type: 'context',
			id: id,
			body: {
				doc
			}
		}))
	}

	parse(data) {
		return data;
	}

	parseResult(data) {
		return data;
	}


}
