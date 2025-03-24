import React from 'react'
import ProductsDisplay from '../sections/Products/ProductsDisplay'

const Products = () => {
  return (
    <div className='pt-[10rem] text-center min-h-screen'>
      <p className='min-w-6xl text-4xl font-bold text-gray-600'>"Where flowers bloom, so does happiness – let nature’s beauty find a home with you."</p>
      <ProductsDisplay />
    </div>
  )
}

export default Products
