import './App.css'
import React, { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { ProductsList } from './components/ProductsList'
import api from './services/odataApi'

function App() {
	const [products, setProducts] = useState([])
	const [isLoading, setIsloading] = useState(false)
	const [inputText, setInputText] = useState('')
	const [errorText, setErrorText] = useState('')

	useEffect(() => {
		setIsloading(true)
		api
			.fetchAllProducts()
			.then((response) => response.json())
			.then((resJson) => {
				setIsloading(false)
				setProducts(resJson.value)
			})
			.catch((e) => {
				setErrorText(e.message)
			})
	}, [])

	const handleResponse = (promise) => {
		promise
			.then((response) => response.json())
			.then((resJson) => {
				setIsloading(false)
				setProducts(resJson.value)
				setErrorText('')
			})
			.catch((e) => {
				setErrorText(e.message)
			})
	}

	const filterByString = () => {
		api.abortPrevRequest()

		setIsloading(true)
		const normalizedInput = inputText.trim()
		const promise = api.fetchProductsByString(normalizedInput)
		handleResponse(promise)
	}

	return (
		<div className='App'>
			<h1>Product list</h1>
			<Filter
				inputText={inputText}
				setInputText={setInputText}
				filterByString={filterByString}
				errorText={errorText}
			/>
			<ProductsList isLoading={isLoading} products={products} />
		</div>
	)
}

export default App
