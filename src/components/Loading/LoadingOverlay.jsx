
const LoadingOverlay = ({ loading }) => {
    if (!loading) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="flex flex-col items-center text-white">
          <div className="border-4  border-opacity-30 border-t-0 border-r-0 border-b-0 border-l-4 border-baseGreen rounded-full w-12 h-12 animate-spin"></div>
          <span>Please wait...</span>
        </div>
      </div>
    );
  };
  
  export default LoadingOverlay;