import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthContext } from '@/context/authContext'
import useProfile from '@/hooks/useProfile'
import base64 from '@/utils/base64'
import { useContext, useEffect, useState } from 'react'

const AccountPage = () => {
  const { authUser } = useContext(AuthContext);
  const { handleEdit, isUpdating, saveDate, updateProfile, setSelectedImage, selectedImage } = useProfile();

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement> ) => {
    e.preventDefault();
    const file = e.target.files?. [0];
    if (file) {
      setSelectedImage(file);      
    }
  }

  const [img, setImg] = useState("");
    useEffect(()=>{
        if (!selectedImage || !(selectedImage instanceof Blob)) return;

        base64(selectedImage)
          .then((imageString) => {
            if (imageString) {
              setImg(imageString);
            }
          })
          .catch((err) => {
            console.error('Error converting image to base64:', err);
          });
    },[selectedImage])
  
    const isChanged = ():boolean=>{
   return authUser?.firstName === updateProfile.firstName &&
    authUser?.lastName === updateProfile.lastName && !img
  }

  return (
    <div className="flex-1 p-8">
      <div className="flex-1 max-w-4xl">
        <div>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative size-64 border-4 border-gray-600 rounded-full">
              <Avatar className="w-full h-full">
                <AvatarImage src={img || authUser?.profilePicture} className='object-cover object-center' />
                <AvatarFallback className="text-lg font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <input
                type="file"
                onChange={uploadImage}
                className="absolute w-full h-full top-0 left-0 opacity-0 transition-colors cursor-pointer hover:bg-gray-300 hover:opacity-10 rounded-full  "
              />
            </div>
          </div>
          <div>
            <p className="text-md font-medium text-gray-500">
              Joined at{" "}
              <span className="text-base">
                {new Date(authUser?.createdAt as Date).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-foreground"
              >
                First name
              </Label>
              <Input
                id="firstName"
                type="text"
                name="firstName"
                defaultValue={updateProfile.firstName}
                onChange={handleEdit}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-foreground"
              >
                Last name
              </Label>
              <Input
                id="lastName"
                type="text"
                name="lastName"
                defaultValue={updateProfile.lastName}
                onChange={handleEdit}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="website"
                className="text-sm font-medium text-foreground"
              >
                Username
              </Label>
              <Input
                id="website"
                type="url"
                defaultValue={authUser?.username}
                disabled={true}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={authUser?.email}
                className="h-12"
                disabled={true}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="facebook"
                className="text-sm font-medium text-foreground"
              >
                Facebook
              </Label>
              <Input
                id="facebook"
                type="url"
                defaultValue="https://www.facebook.com/profilepress"
                className="h-12"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={saveDate}
                disabled={isUpdating || isChanged()}
                className="px-8"
              >
                {!isUpdating ? "Save changes" : "Saving..."}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AccountPage