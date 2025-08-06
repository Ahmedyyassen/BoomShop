import useApiClient, { apiUser } from "@/constants/env";
import { UPDATEUSER } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast";
import useAuth from "./useAuth";

const useProfile = () => {
    const { authUser } = useAuth();
    const api = useApiClient();
    const queryClient = useQueryClient();

    const [selectedImage, setSelectedImage] = useState<File| null>(null);

    const [updateProfile, setUpdateProfile] = useState<UPDATEUSER>({
      firstName: authUser?.firstName || "",
      lastName: authUser?.lastName || "",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async(data:UPDATEUSER)=>{
        const formData = new FormData();
        if (data.firstName) formData.append("firstName", data.firstName);
        if (data.lastName) formData.append("lastName", data.lastName);
        if (selectedImage) formData.append("image", selectedImage);

        return await apiUser.updateProfile(api, formData);
        },
        onSuccess:()=>{
            toast.success("Profile updated successfully", {position: "top-center"})
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
        },
        onError:(error)=>{
            toast.error(error.message, {position: "top-center"})
        }
        })

        const handleEdit = (e: ChangeEvent<HTMLInputElement>)=>{
            const { name, value } = e.target;
            setUpdateProfile((prev)=>({...prev, [name]: value}))
        }

        const saveDate = ()=>{
          mutate(updateProfile);
        }

  return {
    isUpdating: isPending,
    handleEdit,
    saveDate,
    updateProfile,
    setSelectedImage,
    selectedImage
  };
}

export default useProfile