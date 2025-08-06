import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <FaSpinner size={100} className='animate-spin text-main-main'  />
    </div>
  )
}

export default Spinner