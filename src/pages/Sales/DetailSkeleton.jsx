const DetailSkeleton = () => {
  return (
    <div className="p-6 min-h-screen mt-20 mx-[-22px] md:mx-auto xs:w-[20rem] sm:w-[30rem] md:w-[630px] lg:w-[851px] relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Sale Details Loading ...
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 relative border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 animate-pulse">
          <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
        </h3>
        <p className="text-gray-700">
          <strong>Customer Name:</strong>{" "}
          <div className="bg-gray-300 h-4 w-3/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Customer ID:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/2 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong>{" "}
          <div className="bg-gray-300 h-4 w-3/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/2 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong>{" "}
          <div className="bg-gray-300 h-4 w-3/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Quantity:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Unit Price:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Total Price:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Payment Method:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Status:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Total Profit:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/4 rounded inline-block animate-pulse"></div>
        </p>
        <p className="text-gray-700">
          <strong>Sale Date:</strong>{" "}
          <div className="bg-gray-300 h-4 w-1/4 rounded inline-block animate-pulse"></div>
        </p>

        <div className="flex justify-between mt-6">
          <button className="bg-gray-300 text-white py-2 px-4 rounded hover:bg-gray-400 transition w-full mr-2 animate-pulse">
            <div className="bg-gray-300 h-8 w-full rounded"></div>
          </button>
          <button className="bg-gray-300 text-white py-2 px-4 rounded hover:bg-gray-400 transition w-full ml-2 animate-pulse">
            <div className="bg-gray-300 h-8 w-full rounded"></div>
          </button>
          <button className="bg-gray-300 absolute top-0 right-0 text-white py-2 px-4 rounded hover:bg-gray-400 transition w-[6rem] ml-2 animate-pulse">
            <div className="bg-gray-300 h-8 w-full rounded"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
