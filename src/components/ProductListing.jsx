import React,{useContext} from 'react'
import { Context } from '../utils/Context'
import ProductCard from './ProductCard'
function ProductListing() {
    let context = useContext(Context)

  return <div className='flex flex-row flex-wrap justify-center'>
    
    {
        //Product Listing
        context.products.map((product)=>{
            return <ProductCard product={product} key={product.id}/>
        })
    }
  </div>
}

export default ProductListing