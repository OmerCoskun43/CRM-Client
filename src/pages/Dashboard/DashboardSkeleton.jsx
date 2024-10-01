const DashboardSkeleton = () => {
  return (
    <div className="flex h-full shadow-md">
      <div className="w-1/4 p-2 bg-gray-200 animate-pulse">
        {/* Sidebar Skeleton */}
        <div className="h-10 bg-gray-300 mb-4 rounded"></div>
        <div className="h-10 bg-gray-300 mb-4 rounded"></div>
        <div className="h-10 bg-gray-300 mb-4 rounded"></div>
        <div className="h-10 bg-gray-300 mb-4 rounded"></div>
        <div className="h-10 bg-gray-300 mb-4 rounded"></div>
      </div>
      <div className={`flex-1 p-2 bg-gray-100 animate-pulse`}>
        {/* Main Content Skeleton */}
        <div className="h-12 bg-gray-300 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-32 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
