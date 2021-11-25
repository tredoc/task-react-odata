import React from 'react'

export const Filter = ({
	inputText,
	setInputText,
	filterByString,
	errorText,
}) => {
	const inputHandler = (evt) => {
		const value = evt.target.value
		setInputText(value)
	}

	return (
		<section className='filter'>
			<input type='text' value={inputText} onChange={inputHandler} />
			<button className='search-button' onClick={filterByString}>
				Search
			</button>
			{errorText && <p className='error-text'>{errorText}</p>}
		</section>
	)
}
