import { Outlet } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar"


const ProfileLayout = () => {
  return (
    <div className="max-w-[1280px] mx-auto text-center min-h-screenv flex w-full bg-background">
      <SettingsSidebar />
       <Outlet /> 
    </div>
  )
}

export default ProfileLayout