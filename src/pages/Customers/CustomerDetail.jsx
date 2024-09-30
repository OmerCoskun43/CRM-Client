import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useCrmCalls from "../../service/useCrmCalls";
import MailModal from "../../components/MailModal";
import { useState } from "react";

const CustomerDetail = () => {
  const { id } = useParams();
  const { customers } = useSelector((state) => state.crm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteData, sendMail } = useCrmCalls();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const customer = customers.find((cust) => cust._id === id);

  if (!customer) {
    return <div className="p-6 text-center">Customer not found.</div>;
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this customer?")) {
      deleteData("customers", customer._id);
    }
  };

  const handleSendMail = (mailData) => {
    sendMail({
      to: customer.email,
      subject: mailData.subject,
      html: `Dear ${customer.name},\n\n${mailData.body}`,
    });
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubject(""); // Subject'ı sıfırla
    setBody(""); // Body'i sıfırla
  };

  return (
    <div className="p-6 min-h-screen mt-20 mx-auto max-w-4xl relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Customer Details
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 relative border border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {customer.name}
        </h3>
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong>ID:</strong> {customer._id}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {customer.email}
          </p>
          <p className="text-gray-700">
            <strong>Status:</strong>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                customer.status === "active"
                  ? "bg-green-300 text-green-800"
                  : "bg-red-300 text-red-800"
              }`}
            >
              {customer.status}
            </span>
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> {customer.address}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {customer.phone}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Department Information
          </h4>
          <p className="text-gray-600 mb-2">
            <strong>Department Name:</strong> {customer.departmentId.name}
          </p>
          <p className="text-gray-600">
            <strong>Description:</strong> {customer.departmentId.description}
          </p>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mr-2"
          >
            Delete Customer
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-0 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Send Mail
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full ml-2"
          >
            Go Back
          </button>
        </div>
      </div>

      <MailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSend={handleSendMail}
        subject={subject}
        setSubject={setSubject}
        body={body}
        setBody={setBody}
      />
    </div>
  );
};

export default CustomerDetail;
