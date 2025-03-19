import React from "react";

const ProductsDisplay = () => {
  return (
    <div className="max-w-full mx-10 py-10 px-4 sm:px-6 lg:px-8 border border-red-500">
      <div className="grid gap-16">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <img
            src="seasonal-flowers.jpg"
            alt="Seasonal Flowers"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold">Seasonal Flowers</h2>
            <p className="text-gray-600">
              Seasonal flowers bloom during specific times of the year, adapting
              to temperature and climate changes. These flowers are popular for
              their vibrant colors and fresh fragrances, making them ideal for
              gifting and decoration. Examples include tulips and daffodils in
              spring, sunflowers in summer, chrysanthemums in autumn, and
              poinsettias in winter. Seasonal flowers are often more affordable
              and eco-friendly as they require less artificial cultivation.{" "}
            </p>
          </div>
        </div>

        {/* Second Row - Image Right, Text Left */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:flex-row-reverse">
          <img
            src="indoor-flowers.jpg"
            alt="Indoor Flowers"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold">Indoor Flowers</h2>
            <p className="text-gray-600">
              Indoor flowers are specially cultivated to thrive in controlled
              environments such as homes and offices. They require minimal
              sunlight and can purify indoor air, adding a touch of natural
              beauty to any space. Common varieties include orchids, peace
              lilies, and African violets. These plants are ideal for enhancing
              aesthetics, reducing stress, and improving air quality while
              requiring minimal maintenance compared to outdoor plants.{" "}
            </p>
          </div>
        </div>

        {/* Third Row - Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <img
            src="tools.jpg"
            alt="Gardening Tools"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold">Tools</h2>
            <p className="text-gray-600">
              Gardening tools are essential for planting, maintaining, and
              harvesting flowers and plants. They range from basic hand tools
              like trowels, pruning shears, and watering cans to advanced
              equipment like electric trimmers and soil testers. High-quality
              tools improve efficiency and precision in gardening, ensuring
              proper plant growth and reducing manual effort. They are crucial
              for both home gardeners and professional landscapers.
            </p>
          </div>
        </div>

        {/* Fourth Row - Image Right, Text Left */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:flex-row-reverse">
          <img
            src="plant-nutrition.jpg"
            alt="Plant Nutrition"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold">Plant Nutrition</h2>
            <p className="text-gray-600">
              Plant nutrition products provide essential nutrients to ensure
              healthy growth, vibrant blooms, and strong roots. These include
              organic compost, chemical fertilizers, soil conditioners, and
              plant food supplements rich in nitrogen, phosphorus, and
              potassium. Balanced plant nutrition enhances resistance to pests
              and diseases, promoting long-lasting and sustainable plant health,
              whether for home gardens or commercial nurseries.
            </p>
          </div>
        </div>

        {/* Fifth Row - Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <img
            src="art-pottery.jpg"
            alt="Art & Pottery"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-xl font-bold">Art & Pottery</h2>
            <p className="text-gray-600">
              Artistic pottery and decorative planters enhance the visual appeal
              of plants while providing functional benefits like proper aeration
              and moisture retention. Available in materials like ceramic,
              terracotta, and resin, these handcrafted items complement both
              indoor and outdoor spaces. Unique designs and eco-friendly
              materials make pottery an essential part of home decor, blending
              natural beauty with artistic craftsmanship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDisplay;
