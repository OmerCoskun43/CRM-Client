import { useSelector } from "react-redux";

const Overview = () => {
  const { users, customers, products, sales, reviews } = useSelector(
    (state) => state.crm
  );

  console.log("users", users);

  const latestUser = users
    .filter((user) => !user.isAdmin && !user.isLead)
    .reduce((prev, current) => {
      return new Date(prev?.lastLogin) > new Date(current?.lastLogin)
        ? prev
        : current;
    }, null);

  const latestCustomer = customers.reduce((prev, current) => {
    return new Date(prev?.createdAt) > new Date(current?.createdAt)
      ? prev
      : current;
  }, null);

  const productSales = sales.reduce((acc, { productId, quantity }) => {
    acc.set(productId._id, (acc.get(productId._id) || 0) + quantity);
    return acc;
  }, new Map());

  const sortedSales = [...productSales.entries()].sort(
    ([, qtyA], [, qtyB]) => qtyB - qtyA
  );

  const [mostSoldProductId, mostSoldQuantity] = sortedSales[0] || ["", 0];
  const mostSoldProduct = sales.find(
    (sale) => sale.productId._id === mostSoldProductId
  )?.productId;

  const [secondMostSoldProductId, secondMostSoldQuantity] = sortedSales[1] || [
    "",
    0,
  ];
  const secondMostSoldProduct = sales.find(
    (sale) => sale.productId._id === secondMostSoldProductId
  )?.productId;

  return (
    <section className="overview p-6 rounded-lg  bg-white ">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Overview</h2>
      <div className="metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-200 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-300 transition duration-200">
          <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
          <p className="text-xl font-bold text-gray-900">
            {users?.length || 0}
          </p>
        </div>
        <div className="bg-green-200 p-4 rounded-lg shadow-md cursor-pointer hover:bg-green-300 transition duration-200">
          <h3 className="text-lg font-medium text-gray-700">Total Customers</h3>
          <p className="text-xl font-bold text-gray-900">
            {customers?.length || 0}
          </p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg shadow-md cursor-pointer hover:bg-yellow-300 transition duration-200">
          <h3 className="text-lg font-medium text-gray-700">Total Products</h3>
          <p className="text-xl font-bold text-gray-900">
            {products?.length || 0}
          </p>
        </div>
        <div className="bg-red-200 p-4 rounded-lg shadow-md cursor-pointer hover:bg-red-300 transition duration-200">
          <h3 className="text-lg font-medium text-gray-700">Total Sales</h3>
          <p className="text-xl font-bold text-gray-900">
            {sales?.length || 0}
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
        Recent Activities
      </h3>
      <div className="space-y-4 mb-6">
        <div className="p-4 border rounded-lg bg-gray-100 shadow">
          {latestUser ? (
            <div className="text-gray-700">
              <span className="font-semibold">
                {latestUser.name[0].toUpperCase() + latestUser.name.slice(1)}
              </span>{" "}
              logged in{" "}
              <span className="font-light">
                {new Date(latestUser.lastLogin).toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="text-gray-500">No recent user activity</div>
          )}
        </div>

        <div className="p-4 border rounded-lg bg-gray-100 shadow">
          {latestCustomer ? (
            <div className="text-gray-700">
              <span className="font-semibold">
                {latestCustomer.name[0].toUpperCase() +
                  latestCustomer.name.slice(1)}
              </span>{" "}
              registered{" "}
              <span className="font-light">
                {new Date(latestCustomer.createdAt).toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="text-gray-500">No recent customer activity</div>
          )}
        </div>

        <div className="p-4 border rounded-lg bg-gray-100 shadow">
          {sales.length > 0 ? (
            <div className="text-gray-700">
              Sale completed for{" "}
              <span className="font-semibold">
                {sales[0]?.productId?.name || "Unknown Product"}
              </span>{" "}
              at
              <span> {new Date(sales[0].createdAt).toLocaleString()} </span>
            </div>
          ) : (
            <div className="text-gray-500">No recent sales</div>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
        Popular Products
      </h3>
      <div className="space-y-4 mb-6">
        <div className="p-4 border rounded-lg bg-blue-100 shadow">
          <div className="text-gray-700">
            Product{" "}
            <span className="font-semibold">
              {mostSoldProduct?.name || "Unknown Product"}
            </span>{" "}
            - <span className="font-semibold">{mostSoldQuantity}</span> sold
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-blue-100 shadow">
          <div className="text-gray-700">
            Product{" "}
            <span className="font-semibold">
              {secondMostSoldProduct?.name || "Unknown Product"}
            </span>{" "}
            - <span className="font-semibold">{secondMostSoldQuantity}</span>{" "}
            sold
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
        Recent Reviews
      </h3>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-gray-100 shadow">
          {reviews.length > 0 ? (
            <div className="text-gray-700 ">
              <span className="font-semibold">
                {reviews[0]?.userId?.name[0].toUpperCase() +
                  reviews[0]?.userId?.name.slice(1) || "Unknown User"}
              </span>{" "}
              rated {reviews[0]?.productId?.name || "Unknown Product"}:{" "}
              <span className="font-semibold">{reviews[0]?.rating || 0}</span>{" "}
              stars
            </div>
          ) : (
            <div className="text-gray-500">No recent reviews</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Overview;
