import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SaleModal from "../../components/SaleModal";
import useCrmCalls from "../../service/useCrmCalls";
import MailModal from "../../components/MailModal";
import DetailSkeleton from "./DetailSkeleton"; // Detay Skeleton bileşeni

const SaleDetail = () => {
  const { id } = useParams();
  const { sales } = useSelector((state) => state.crm);
  const navigate = useNavigate();
  const location = useLocation();
  const { deleteData, sendMail, updateData } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [mailModalOpen, setMailModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true); // Loading durumu
  const [error, setError] = useState(null); // Hata durumu

  // URL'den gelen veriyi almak
  const saleDetail = sales?.find((sale) => sale._id === id);

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
    // Loading durumunu güncelle
    if (saleDetail) {
      setLoading(false);
    } else {
      setError("Sale not found.");
      setLoading(false);
    }
  }, [location.state, saleDetail]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this sale?")) {
      await deleteData("sales", saleDetail._id);
      navigate("/sales");
    }
  };

  const handleEdit = async (updatedData) => {
    await updateData("sales", saleDetail._id, updatedData);
    setModalOpen(false);
  };

  const handleSendEmail = async () => {
    const emailData = {
      to: saleDetail.customerId.email,
      subject: subject,
      html: body,
    };
    await sendMail(emailData);
    setMailModalOpen(false);
  };

  if (loading) {
    return <DetailSkeleton />; // Yükleniyorsa Skeleton göster
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>; // Hata durumu
  }

  return (
    <div className="p-6 min-h-screen mt-20 mx-[-22px] md:mx-auto xs:w-[20rem] sm:w-[30rem] md:w-[630px] lg:w-[851px] relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Sale Details
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 relative border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Product: {saleDetail.productId.name}
        </h3>
        <p className="text-gray-700">
          <strong>Customer Name:</strong> {saleDetail.customerId.name}
        </p>
        <p className="text-gray-700">
          <strong>Customer ID:</strong> {saleDetail.customerId._id}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {saleDetail.customerId.email}
          <span
            onClick={() => setMailModalOpen(true)}
            className="bg-slate-500 hover:bg-slate-600 text-white px-2 py-1 absolute right-0 cursor-pointer rounded ml-2"
          >
            Send Email
          </span>
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {saleDetail.customerId.phone}
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong> {saleDetail.customerId.address}
        </p>
        <p className="text-gray-700">
          <strong>Quantity:</strong> {saleDetail.quantity}
        </p>
        <p className="text-gray-700">
          <strong>Unit Price:</strong> {saleDetail.price}₺
        </p>
        <p className="text-gray-700">
          <strong>Total Price:</strong> {saleDetail.totalPrice}₺
        </p>
        <p className="text-gray-700">
          <strong>Payment Method:</strong> {saleDetail.paymentMethod}
        </p>
        <p className="text-gray-700">
          <strong>Status:</strong> {saleDetail.status}
        </p>
        <p className="text-gray-700">
          <strong>Total Profit:</strong> {saleDetail.totalProfit}₺
        </p>
        <p className="text-gray-700">
          <strong>Sale Date:</strong>{" "}
          {new Date(saleDetail.saleDate).toLocaleString()}
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mr-2"
          >
            Delete Sale
          </button>
          <button
            onClick={() => {
              setFormData(saleDetail);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white absolute top-0 right-0 py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Edit Sale
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full ml-2"
          >
            Go Back
          </button>
        </div>
      </div>

      {isModalOpen && (
        <SaleModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleEdit}
          initialData={formData}
        />
      )}

      {mailModalOpen && (
        <MailModal
          isOpen={mailModalOpen}
          onClose={() => setMailModalOpen(false)}
          onSend={handleSendEmail}
          subject={subject}
          setSubject={setSubject}
          body={body}
          setBody={setBody}
        />
      )}
    </div>
  );
};

export default SaleDetail;
