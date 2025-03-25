import React from 'react'
import { useNavigate } from 'react-router-dom'
import { productsData } from '../constants'

const ProductCard = () => {
    const navigate = useNavigate();


  return (
    <div className="grid grid-cols-2 gap-2 mt-10 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
            {productsData.map(({ id, image, title, price }) => (
              <div 
              key={id}
              className="bg-white rounded-lg shadow-lg border border-gray-300 cursor-pointer group" 
              onClick={() => navigate(`/products/${id}`)}>
                <div className="overflow-hidden rounded-t-lg">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-60 object-cover rounded-t-lg transition-all duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 relative h-24 md:h-28">
                  <h3 className="text-lg font-semibold text-gray-700 flex justify-start">
                    {title}
                  </h3>
                  <p className="absolute text-base font-semibold text-red-400 mt-2 group-hover:-translate-y-5 group-hover:opacity-0 transition-all duration-300">
                    {price}
                  </p>
                  <div className="absolute flex items-center text-sm text-gray-400 mt-4 w-full opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
                    <p className="mr-2 font-semibold">Show Product</p>
                    <hr className="border-[1px] border-gray-400 w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
  )
}

export default ProductCard
