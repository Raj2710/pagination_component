import React,{useContext} from 'react'
import Header from './components/Header'
import ProductListing from './components/ProductListing'
import {Context} from './utils/Context'
import Pagination from './components/Pagination'

function App() {
  let context = useContext(Context)
  return <>
    <Header/>
    {
      context.isLoading?<div className='relative top-80 left-1/2'><div className='loader'></div></div>:<><ProductListing/><Pagination/></>
    }
  </>
}

export default App