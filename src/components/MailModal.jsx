/* eslint-disable react/prop-types */

const MailModal = ({
  isOpen,
  onClose,
  onSend,
  subject,
  setSubject,
  body,
  setBody,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ subject, html: body });
    setSubject(""); // Clear subject after sending
    setBody(""); // Clear body after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-blue-800 to-gray-400 bg-opacity-100 rounded-lg shadow-lg p-8 w-11/12 md:w-3/5 mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold mb-6 text-white text-center">
          Send Email
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border border-white p-3 w-full rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <textarea
            placeholder="Email Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleKeyDown} // Add this line
            className="border border-white p-3 w-full h-36 md:h-40 resize-none rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 "
            required
          />
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-lg font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition-transform transform hover:scale-105 shadow-lg font-bold"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailModal;
