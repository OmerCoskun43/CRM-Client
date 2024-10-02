import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EventModal from "../../components/EventModal";
import EventSkeleton from "./EventSkeleton"; // Yeni bileşeni import et
import useCrmCalls from "../../service/useCrmCalls";

const EventList = () => {
  const { events, loading, error } = useSelector((state) => state.crm);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: "",
    userId: "",
    customerId: "",
    details: "",
  });
  const { createData } = useCrmCalls();

  const handleSubmit = async (data) => {
    console.log(data);
    await createData("events", data);
    setModalOpen(false);
    setFormData({
      eventType: "",
      eventDate: "",
      details: "",
    });
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Events List Loading ....
        </h2>
        <div className="flex justify-between items-center">
          <button className="mb-4 bg-gray-300 animate-pulse  text-gray-300 py-2 px-4 rounded">
            Create Event
          </button>
        </div>
        <EventSkeleton /> {/* Skeleton bileşenini burada kullan */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Events List</h2>
        <div className="text-red-500">An error occurred: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Events List</h2>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setModalOpen(true)}
          className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create Event
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg relative">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-green-400">
            <tr className="text-gray-700">
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Event Type
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Date
              </th>
              <th className="py-3 px-2 md:px-4 border-b text-left text-[12px] md:text-base">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {events?.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-3 text-center text-gray-500">
                  No events available.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr
                  key={event._id}
                  className="hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base text-black font-bold">
                    {event.eventType}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {new Date(event.eventDate).toLocaleString()}
                  </td>
                  <td className="py-3 px-2 md:px-4 border-b text-[10px] md:text-base">
                    {event.details}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default EventList;
