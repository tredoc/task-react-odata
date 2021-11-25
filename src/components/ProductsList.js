import React from 'react'
import { Product } from './Product'

export const ProductsList = ({ products, isLoading }) => {
	if (isLoading) {
		return (
			<>
				<h2>Loading...</h2>
			</>
		)
	}

	if (!products.length) {
		return (
			<>
				<h2>No data to display</h2>
			</>
		)
	}

	const renderedProducts = products.map((product) => {
		return <Product product={product} key={product.ID} />
	})

	return <ul className='products-list'>{renderedProducts}</ul>
}
