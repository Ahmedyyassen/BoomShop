import { NavLink } from "react-router-dom";
import { User, Key, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useLogout from "@/hooks/useLogout";
import { FiLoader } from "react-icons/fi";
import useAuth from "@/hooks/useAuth";


const SettingsSidebar = () => {
  const { authUser } = useAuth();
  const { logoutMutation, isPending } = useLogout();

  return (
    <div className=" min-h-screen flex flex-col justify-between bg-sidebarCustom-bg border-r border-border p-6 bg-white w-86">
      {/* Navigation */}
      <nav className="space-y-2 mt-8">
        <NavLink
          to={"/profile/account"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-main-main text-main-bg"
                : "text-main-main hover:bg-main-main hover:text-main-bg"
            }`
          }
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Account Details</span>
        </NavLink>
        <NavLink
          to={"/profile/password"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-main-main text-main-bg"
                : "text-main-main hover:bg-main-main hover:text-main-bg"
            }`
          }
        >
          <Key className="w-5 h-5" />
          <span className="font-medium">Change Password</span>
        </NavLink>

        <button
          onClick={() => logoutMutation()}
          disabled={isPending}
          className={
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full cursor-pointer text-main-main hover:bg-red-500 hover:text-main-bg"
          }
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">
            {isPending ? (
              <div className="flex-1 items-center justify-center">
                <FiLoader className="animate-spin text-3xl" />
              </div>
            ) : (
              "Logout"
            )}
          </span>
        </button>
      </nav>
      {/* Profile Section */}
      <div className="flex items-center justify-start gap-4 mb-4 border border-gray-300 bg-gray-100 px-4 py-1 rounded-full">
        <Avatar className="size-16 border-2 border-gray-400">
          <AvatarImage
            src={authUser?.profilePicture}
            className="object-cover"
          />
          <AvatarFallback className="text-lg font-semibold">JD</AvatarFallback>
        </Avatar>
        <div className=" text-gray-600 font-semibold leading-4 text-sm">
          <p>
            {authUser?.firstName} {authUser?.lastName}
          </p>
          <p className="text-gray-500">{authUser?.username}</p>
        </div>
      </div>
    </div>
  );
}

export default SettingsSidebar