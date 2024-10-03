import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useCrmCalls from "../../service/useCrmCalls";
import MailModal from "../../components/MailModal";
import CustomerModal from "../../components/CustomerModal";
import { useState } from "react";
import DetailSkeleton from "./DetailSkeleton";

const CustomerDetail = () => {
  const { id } = useParams();
  const { customers, loading, error } = useSelector((state) => state.crm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "active",
    address: "",
    phone: "",
    departmentId: "",
  });
  const navigate = useNavigate();
  const { deleteData, sendMail, updateData } = useCrmCalls();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const customer = customers.find((cust) => cust._id === id);

  if (loading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

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
      html: `Dear ${customer.name},\n\n${mailData.html}`,
    });
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubject("");
    setBody("");
  };

  const handleUpdate = (updatedData) => {
    updateData("customers", customer._id, updatedData);
    setIsUpdateModalOpen(false);
  };

  const openUpdateModal = () => {
    setFormData({
      name: customer.name,
      email: customer.email,
      status: customer.status,
      address: customer.address,
      phone: customer.phone,
      departmentId: customer.departmentId._id,
      _id: customer._id,
    });
    setIsUpdateModalOpen(true);
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
          {["ID", "Email", "Status", "Address", "Phone"].map((label, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="text-gray-700">
                <strong>{label}:</strong>
              </p>
              <div className="text-gray-700">
                {label === "Status" ? (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      customer.status === "active"
                        ? "bg-green-300 text-green-800"
                        : "bg-red-300 text-red-800"
                    }`}
                  >
                    {customer.status}
                  </span>
                ) : (
                  customer[label === "ID" ? "_id" : label.toLowerCase()]
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Department Information
          </h4>
          {["Department Name", "Description"].map((label, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <p className="text-gray-600">
                <strong>{label}:</strong>
              </p>
              <div className="text-gray-600">
                {
                  customer.departmentId[
                    label === "Department Name"
                      ? "name"
                      : label.toLowerCase().replace(/ /g, "")
                  ]
                }
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-full mb-2 sm:mb-0 sm:mr-2"
          >
            Delete Customer
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white md:absolute md:top-0 md:right-0 py-2 px-4 rounded hover:bg-blue-700 transition  mb-2 sm:mb-0 sm:mr-2"
          >
            Send Mail
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full mb-2 sm:mb-0 sm:mr-2"
          >
            Go Back
          </button>
          <button
            onClick={openUpdateModal}
            className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition w-full"
          >
            Update Customer
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

      <CustomerModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        departments={[]} // İlgili departmanları burada geçin
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default CustomerDetail;
