const DetailSkeleton = () => {
  return (
    <div className="p-6 min-h-screen mt-20 mx-auto relative">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center animate-pulse">
        Loading User Details...
      </h2>
      <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200 relative">
        {/* Profil resmi yükleme skeleton'ı */}
        <p className="text-gray-700 flex justify-between items-center mt-5 pe-2 rounded-lg bg-gradient-to-t from-gray-200 via-white to-gray-200 animate-pulse">
          <strong>Profile Picture:</strong>
          <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
        </p>

        {/* Kullanıcı bilgileri için skeleton'lar */}
        {[
          "ID",
          "Name",
          "Email",
          "Department",
          "Is Admin",
          "Is Lead",
          "Is Active",
          "Last Login",
          "Created At",
          "Updated At",
        ].map((label) => (
          <p
            className="text-gray-700 flex justify-between items-center mt-4"
            key={label}
          >
            <strong>{label}:</strong>
            <div className="bg-gray-300 h-4 w-1/2 rounded mt-1 animate-pulse"></div>
          </p>
        ))}

        <div className="flex justify-between mt-6">
          {/* Butonlar için skeleton'lar */}
          <div className="bg-red-600 text-white py-2 px-4 rounded w-full hover:bg-red-700 transition mr-2 animate-pulse"></div>
          <div className="bg-blue-600 text-white py-2 px-4 rounded w-full block hover:bg-blue-700 transition animate-pulse"></div>
          <div className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition ml-2 animate-pulse absolute top-0 right-0 w-[6rem] h-[2.5rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
