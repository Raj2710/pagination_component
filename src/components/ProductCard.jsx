import React from 'react'

function ProductCard({product}) {
  return <div className="max-w-64 rounded overflow-hidden shadow-lg m-4">
  <img className="w-full h-1/2" src={product.thumbnail} alt="Sunset in the mountains"/>
  <div className="px-4 py-4">
    <div className="font-bold text-xl mb-2">{product.title}</div>
    <p className="text-gray-700 text-xs text-opacity-50 line-clamp-2">
      {product.description}
    </p>
  </div>
</div>
}

export default ProductCard