// file: app/(dashboard)/user/dashboard/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col space-y-4 py-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome!</CardTitle>
          <CardDescription>
            This is your personal dashboard. You can manage your copyright submissions from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your content goes here.</p>
        </CardContent>
      </Card>
    </div>
  )
}