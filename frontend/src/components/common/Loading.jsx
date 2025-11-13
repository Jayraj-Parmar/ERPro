import { useSelector } from "react-redux";

function Loading() {
  const { isLoading } = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="bg-transparent/5 fixed top-0 left-0 flex w-full h-full items-center justify-center">
      <span className="animate-spin border-4 border-t-transparent border-blue-600 rounded-full w-10 h-10"></span>
    </div>
  );
}

export default Loading;
