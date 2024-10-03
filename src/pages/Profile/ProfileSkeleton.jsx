const ProfileSkeleton = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20 mx-[-24px] md:mx-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Profile Loading ...
      </h2>
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="w-24 h-6 bg-gray-200 mt-4 rounded-md animate-pulse"></div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button className="bg-blue-500 animate-pulse text-white py-2 px-4 rounded">
          Edit Profile
        </button>
        <button className="bg-red-500 animate-pulse text-white py-2 px-4 rounded">
          Delete Account
        </button>
      </div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
      <div className="w-full h-8 bg-gray-200 mt-2 rounded-md animate-pulse"></div>
    </div>
  );
};

export default ProfileSkeleton;
