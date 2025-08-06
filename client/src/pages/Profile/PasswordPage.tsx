import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useChangePassword from "@/hooks/useChangePassword"

const PasswordPage = () => {
  const { handleValid, isPending, saveDate, handleChange, changePassword } = useChangePassword();
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Change Password
        </h1>

        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="currentPassword"
                className="text-sm font-medium text-foreground"
              >
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className="h-12"
                name="currentPassword"
                onChange={handleChange}
                value={changePassword.currentPassword}
                disabled={isPending}
                placeholder="******"
                onKeyDown={(e)=> e.key === 'Enter' && saveDate()}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="newPassword"
                className="text-sm font-medium text-foreground"
              >
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                className="h-12"
                name="newPassword"
                onChange={handleChange}
                value={changePassword.newPassword}
                disabled={isPending}
                placeholder="******"
                onKeyDown={(e)=> e.key === 'Enter' && saveDate()}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmNewPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirmNewPassword"
                type="password"
                className="h-12"
                name="confirmNewPassword"
                onChange={handleChange}
                value={changePassword.confirmNewPassword}
                disabled={isPending}
                placeholder="******"
                onKeyDown={(e)=> e.key === 'Enter' && saveDate()}
              />
            </div>

            <div className="pt-4">
              <Button
                className="px-8 cursor-pointer"
                onClick={saveDate}
                size="lg"
                disabled={isPending || !handleValid()}
              >
                {!isPending ? "Update Password" : "Updating..."}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PasswordPage