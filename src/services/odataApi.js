export const BASE_URL = 'https://services.odata.org/Experimental/OData/OData.svc/Products'

class Api {
	constructor(baseUrl) {
		this.baseUrl = baseUrl
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

	async fetchProductsByString(str, { signal }) {
		const builtUrl = this.requestBuilder(this.baseUrl, {$filter: `contains(Name, '${str}')`})
		return fetch(builtUrl, { signal })
	}
}

export default new Api(BASE_URL)