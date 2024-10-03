import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Statistics = () => {
  const { sales, products, users, customers } = useSelector(
    (state) => state.crm
  );

  // Toplam satış sayısını hesapla
  const totalSales = sales.length;

  // Aylık satışları hesapla
  const monthlySales = Array(12).fill(0);
  sales.forEach((sale) => {
    const saleDate = new Date(sale.createdAt);
    const month = saleDate.getMonth();
    monthlySales[month]++;
  });

  // En çok satan ürünü bul ve toplam satış rakamını hesapla
  const productSales = sales.reduce((acc, sale) => {
    const { productId, quantity } = sale; // productId ve quantity'yi al

    if (productId && productId._id) {
      // Eğer productId varsa, satış miktarını artır
      acc.set(productId._id, (acc.get(productId._id) || 0) + quantity);
    }
    return acc;
  }, new Map());

  // Ürünleri satış miktarına göre sıralayın
  const sortedSales = [...productSales.entries()].sort(
    ([, qtyA], [, qtyB]) => qtyB - qtyA
  );

  // En çok satan ürünün ID'sini ve miktarını alın
  const [topSellingProductId, topSellingQuantity] = sortedSales[0] || [null, 0];

  // En çok satan ürün bilgilerini alın
  const topSellingProduct = topSellingProductId
    ? products.find((product) => product._id === topSellingProductId)
    : null;

  // Kullanıcı oturum açma sayısını hesapla
  const userLogins = users.reduce(
    (acc, user) => acc + (user.isLoggedIn ? 1 : 0),
    0
  );

  // Aktif müşteri yüzdesini hesapla
  const activeCustomersPercentage = (
    (customers.filter((customer) => customer.status === "active").length /
      customers.length) *
    100
  ).toFixed(2);

  // Grafik için veri
  const data = monthlySales.map((salesCount, index) => ({
    month: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ][index],
    sales: salesCount,
  }));

  return (
    <section className="statistics p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Statistics</h2>

      <h3 className="text-xl font-semibold mb-2 text-red-600">
        Sales Statistics
      </h3>
      <div className="bg-green-100 p-2 rounded-lg shadow mb-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 12 }} />
            <YAxis domain={[0, "dataMax + 1"]} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="blue"
              fill="rgba(75, 192, 192, 0.6)"
            />
          </LineChart>
        </ResponsiveContainer>
        <p>
          Total Sales: <strong>{totalSales}</strong>
        </p>
      </div>
      <h3 className="text-xl font-semibold mb-2">Product Performance</h3>
      <div className="p-4 border rounded-lg bg-gray-100 shadow">
        Top Selling Product: <strong>{topSellingProduct?.name || "N/A"}</strong>{" "}
        - {topSellingQuantity} sold
      </div>

      <h3 className="text-xl font-semibold mb-2">User Interactions</h3>
      <div className="p-4 border rounded-lg bg-gray-100 shadow">
        User Logins: <strong>{userLogins}</strong> now!
      </div>

      <h3 className="text-xl font-semibold mb-2">Customer Relations</h3>
      <div className="p-4 border rounded-lg bg-gray-100 shadow">
        Active Customers: <strong>{activeCustomersPercentage}%</strong>
      </div>
    </section>
  );
};

export default Statistics;
