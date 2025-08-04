import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthContext } from '@/context/authContext'
import useProfile from '@/hooks/useProfile'
import { useContext } from 'react'

const AccountPage = () => {
  const { authUser } = useContext(AuthContext);
  const { handleEdit, isUpdating, saveDate, updateProfile } = useProfile();

  const isChanged = ():boolean=>{
   return authUser?.firstName === updateProfile.firstName && authUser?.lastName === updateProfile.lastName 
  }
  return (
    <div className="flex-1 p-8">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Account Settings
        </h1>
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

              <div className="space-y-2">
                <Label
                  htmlFor="twitter"
                  className="text-sm font-medium text-foreground"
                >
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  type="url"
                  defaultValue="https://twitter.com/profilepress"
                  className="h-12"
                />
              </div>

              <div className="pt-4">
                <Button onClick={saveDate} 
                disabled={isUpdating || isChanged()} className="px-8">
                  {!isUpdating ? "Save changes" : "Saving..."}
                </Button>
              </div>
            </CardContent>
          </Card>
      </div>
      {/* <div className="flex items-center justify-center gap-4 mb-8">
        <Avatar className="size-32 border border-gray-300">
          <AvatarImage src={authUser?.profilePicture} />
          <AvatarFallback className="text-lg font-semibold">JD</AvatarFallback>
        </Avatar>
      </div> */}
    </div>
  );
}

export default AccountPage