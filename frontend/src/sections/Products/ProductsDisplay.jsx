import React from 'react'

const ProductsDisplay = () => {
  return (
    <div className='max-w-full mx-10 py-10 px-4 sm:px-6 lg:px-8 border border-red-500'>
      <div className='grid gap-16'>
        
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      <img src="seasonal-flowers.jpg" alt="Seasonal Flowers" className="rounded-lg shadow-lg"/>
      <div>
        <h2 className="text-xl font-bold">Seasonal Flowers</h2>
        <p className="text-gray-600">
          Seasonal flowers bloom during specific times of the year, adapting to temperature and climate changes...
        </p>
      </div>
    </div>

    {/* Second Row - Image Right, Text Left */}
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:flex-row-reverse">
      <img src="indoor-flowers.jpg" alt="Indoor Flowers" className="rounded-lg shadow-lg"/>
      <div>
        <h2 className="text-xl font-bold">Indoor Flowers</h2>
        <p className="text-gray-600">
          Indoor flowers are specially cultivated to thrive in controlled environments such as homes and offices...
        </p>
      </div>
    </div>

    {/* Third Row - Image Left, Text Right */}
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      <img src="tools.jpg" alt="Gardening Tools" className="rounded-lg shadow-lg"/>
      <div>
        <h2 className="text-xl font-bold">Tools</h2>
        <p className="text-gray-600">
          Gardening tools are essential for planting, maintaining, and harvesting flowers and plants...
        </p>
      </div>
    </div>

    {/* Fourth Row - Image Right, Text Left */}
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:flex-row-reverse">
      <img src="plant-nutrition.jpg" alt="Plant Nutrition" className="rounded-lg shadow-lg"/>
      <div>
        <h2 className="text-xl font-bold">Plant Nutrition</h2>
        <p className="text-gray-600">
          Plant nutrition products provide essential nutrients to ensure healthy growth, vibrant blooms, and strong roots...
        </p>
      </div>
    </div>

    {/* Fifth Row - Image Left, Text Right */}
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      <img src="art-pottery.jpg" alt="Art & Pottery" className="rounded-lg shadow-lg"/>
      <div>
        <h2 className="text-xl font-bold">Art & Pottery</h2>
        <p className="text-gray-600">
          Artistic pottery and decorative planters enhance the visual appeal of plants while providing functional benefits...
        </p>
      </div>
    </div>
    
      </div>
    </div>
  )
}

export default ProductsDisplay
