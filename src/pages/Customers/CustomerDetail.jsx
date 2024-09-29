import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useCrmCalls from "../../service/useCrmCalls";

const CustomerDetail = () => {
  const { id } = useParams();
  const { customers } = useSelector((state) => state.crm);

  const navigate = useNavigate();
  const { deleteData } = useCrmCalls();

  const customer = customers.find((cust) => cust._id === id);

  if (!customer) {
    return <div className="p-6">Müşteri bulunamadı.</div>;
  }

  const handleDelete = () => {
    confirm("Are you sure you want to delete this customer?") &&
      deleteData("customers", customer._id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Müşteri Detayları
      </h2>
      <div className="bg-white shadow-lg rounded-lg p-6 relative">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {customer.name}
        </h3>
        <p className="text-gray-600 mb-2">
          <strong>ID:</strong> {customer._id}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {customer.email}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Durum:</strong>{" "}
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              customer.status === "active"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {customer.status}
          </span>
        </p>
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Departman Bilgileri
          </h4>
          <p className="text-gray-600 mb-2">
            <strong>Departman Adı:</strong> {customer.departmentId.name}
          </p>
          <p className="text-gray-600">
            <strong>Açıklama:</strong> {customer.departmentId.description}
          </p>
        </div>
        <button
          onClick={() => handleDelete(customer._id)}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition cursor-pointer w-[10rem] absolute top-[-25px] right-0"
        >
          Delete Customer
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition cursor-pointer w-[10rem] absolute bottom-0 right-0"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CustomerDetail;
