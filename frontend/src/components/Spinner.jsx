const Spinner = ({ size = "md", corner = false }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-[3px]",
  };

  if (corner) {
    return (
      <div
        className={`${sizes[size]} border-gray-200 border-t-indigo-600 rounded-full animate-spin fixed top-4 right-4 z-50`}
      />
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`${sizes[size]} border-gray-200 border-t-indigo-600 rounded-full animate-spin`}
      />
    </div>
  );
};

export default Spinner;
