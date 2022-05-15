export class units {
	constructor(data, to, from, type) {
		switch (type) {
			case '长度': {
				this.length(data, to, from)
			}
		}
	}

	length(data, to, from) {}
}
