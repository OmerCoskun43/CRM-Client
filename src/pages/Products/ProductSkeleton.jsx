const ProductSkeleton = () => {
  const skeletonArray = Array.from({ length: 15 }); // 5 adet skeleton oluştur

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead className="bg-green-400">
          <tr className="text-gray-700">
            <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
              Name
            </th>
            <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
              Price
            </th>
            <th className="py-3 px-2 md:px-4 border-b text-left text-sm md:text-base">
              Stock
            </th>
          </tr>
        </thead>
        <tbody>
          {skeletonArray.map((_, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base text-gray-300">
                <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded"></div>
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base text-gray-300">
                <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
              </td>
              <td className="py-3 px-2 md:px-4 border-b text-sm md:text-base text-gray-300">
                <div className="animate-pulse bg-gray-200 h-4 w-1/4 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSkeleton;
