// file: app/(dashboard)/admin/dashboard/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col space-y-4 py-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
          <CardDescription>
            You have access to all administrative functions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your admin-specific content goes here.</p>
        </CardContent>
      </Card>
    </div>
  )
}