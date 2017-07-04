export interface IContextSource {
	type: string;
	find(ContextCriteria);
	remove(id);
	create(Context);
	update(Context);
	parse(any);
}

export interface IContextSourceElastic {
	uri: string;
	bucket: string;
}

export interface ContextCriteria {
	start: number;
	limit: number;
}

export interface Context {
	id: string;
}

export class ContextEleasticSource implements IContextSource {
	public type = 'Elastic';
	public uri;
	public bucket;

	constructor(config: IContextSourceElastic) {
		this.uri = config.uri;
		this.bucket = config.bucket;
	}

	find(criteria: ContextCriteria) {

	}

	remove(id) {

	}

	create(payload) {

	}

	update(payload) {

	}

	parse() {

	}

	parseResult() {

	}


}
