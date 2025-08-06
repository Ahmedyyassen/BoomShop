import { LuLoaderCircle } from 'react-icons/lu'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <LuLoaderCircle size={40} className='animate-spin text-main-main'  />
    </div>
  )
}

export default Spinner