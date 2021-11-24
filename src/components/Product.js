import React from 'react'

export const Product = ({ product }) => {
	const { Name } = product

	return (
		<>
			<li className='products-item'>{Name}</li>
		</>
	)
}