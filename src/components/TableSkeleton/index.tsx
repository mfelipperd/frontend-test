export const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between p-4 bg-gray-200 rounded-t-lg">
        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col divide-y divide-gray-200">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center p-4 bg-white">
            <div className="w-full h-6 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
