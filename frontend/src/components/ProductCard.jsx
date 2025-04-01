import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4 mt-10 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
      {products.length > 0 ? (
        products.map(({ id, image, title, price }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-lg border border-gray-300 cursor-pointer group"
            onClick={() => navigate(`/products/${id}`)}
          >
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
              <p className="absolute text-base font-semibold text-red-400 mt-2">
                {price}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-2 xl:col-span-4 text-center text-gray-500">
          No products available in this category.
        </p>
      )}
    </div>
  );
};

export default ProductCard;
