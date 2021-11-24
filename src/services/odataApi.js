export const BASE_URL = 'https://services.odata.org/Experimental/OData/OData.svc/Products'

class Api {
	constructor(baseUrl) {
		this.baseUrl = baseUrl
		this.controller = new AbortController()
		this.isFetching = false
	}

	abortRequest() {
		this.controller.abort()
		this.controller = new AbortController()
	}

	fetchIsDone() {
		this.isFetching = false
	}

	isFetchDone() {
		return !this.isFetching
	}

	requestBuilder(baseUrl, options = {}) {
		const url = new URL(baseUrl)
		const optionsEntries = Object.entries(options)

		for (const [param, value] of optionsEntries) {
			url.searchParams.set(param, value)
		}

		return url
	}

	async fetchAllProducts() {
		return fetch(this.baseUrl)
	}

	async fetchProductsByString(str) {
		const builtUrl = this.requestBuilder(this.baseUrl, {$filter: `contains(Name, '${str}')`})
		this.fetchIsDone()
		return fetch(builtUrl, { signal: this.controller.signal })
	}
}

export default new Api(BASE_URL)