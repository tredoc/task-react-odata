import './App.css';
import React, { useEffect, useState } from 'react';
import { Filter } from './components/Filter'
import { ProductsList } from './components/ProductsList' 
import api from './services/odataApi'

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [inputText, setInputText] = useState('')
  const [errorText, setErrorText] = useState('')

  let controller = new AbortController()
  let currentRequest = false

  useEffect(() => {
    setIsloading(true)
    api.fetchAllProducts()
    .then(response => response.json())
    .then(resJson => {
      setIsloading(false)
      setProducts(resJson.value)
    })
  }, [])

  const handleResponse = (promise) => {
    promise
      .then(response => response.json())
      .then(resJson => {
        currentRequest = false
        setIsloading(false)
        setProducts(resJson.value)
        setErrorText('')
      })
      .catch(e => {
        if (e.name === 'AbortError') {
          setErrorText('User has aborted previous requests')
        }

        setErrorText(e.message)
      })
  }

  const filterByString = () => {
    const normalizedInput = inputText.trim()
    
    if (currentRequest) {
      controller.abort()
      currentRequest = false
    } else {
      currentRequest = true
    }

    setIsloading(true)
    const promise = api.fetchProductsByString(normalizedInput, { 
      signal: controller.signal 
    })
    handleResponse(promise)
  }

  return (
    <div className="App">
      <h1>Product list</h1>
      <Filter 
        inputText={inputText} 
        setInputText={setInputText} 
        filterByString={filterByString} 
        errorText={errorText} />
      <ProductsList isLoading={isLoading} products={products} />
    </div>
  );
}

export default App;
