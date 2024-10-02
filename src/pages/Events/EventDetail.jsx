import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EventModal from "../../components/EventModal";
import DetailSkeleton from "./DetailSkeleton";
import useCrmCalls from "../../service/useCrmCalls";
import { useSelector } from "react-redux";

const EventDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { deleteData, updateData, loading, error } = useCrmCalls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { events } = useSelector((state) => state.crm);

  const { id } = params;

  // Etkinliği bul
  const event = events?.find((event) => event._id === id);

  // Etkinlik bulunamadığında hata mesajı göster
  if (!event && !loading) {
    return <div className="p-6 text-center">Event not found.</div>;
  }

  // Loading durumu için skeleton göster
  if (loading) {
    return <DetailSkeleton />;
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteData("events", event._id);
      navigate("/events");
    }
  };

  const handleEdit = async (updatedData) => {
    await updateData("events", event._id, updatedData);
    setModalOpen(false);
  };

  // Tarihleri aynı formatta göstermek için bir yardımcı fonksiyon
  const formatDate = (date) => {
    return new Date(date).toLocaleString("sv-SE", { timeZoneName: "short" });
  };

  return (
    <div className="p-6 min-h-screen mt-20 mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Event Details
      </h2>

      {/* Hata durumu */}
      {error && <div className="text-red-500 text-center">{error.message}</div>}

      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* Etkinlik bilgileri */}
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Event ID:</strong>
          <span>{event._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User ID:</strong>
          <span>{event?.userId?._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User:</strong>
          <span>{event.userId?.name}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>User Email:</strong>
          <span>{event.userId?.email}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Customer ID:</strong>
          <span>{event.customerId?._id}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Customer Name:</strong>
          <span>{event.customerId?.name}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Date:</strong>
          <span>{formatDate(event.eventDate)}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Details:</strong>
          <span>{event.details}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Created At:</strong>
          <span>{formatDate(event.createdAt)}</span>
        </p>
        <p className="text-gray-700 flex justify-between items-center mt-4">
          <strong>Updated At:</strong>
          <span>{formatDate(event.updatedAt)}</span>
        </p>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded w-full hover:bg-red-700 transition mr-2"
          >
            Delete Event
          </button>
          <button
            onClick={() => {
              setFormData(event);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition"
          >
            Edit Event
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ml-2 absolute top-0 right-0"
          >
            Go Back
          </button>
        </div>
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleEdit}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default EventDetail;
