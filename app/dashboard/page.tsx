import OwnerDashboard from "@/components/live-sharing/OwnerDashboard";

export const metadata = {
  title: "Dashboard — Our Little Photobooth",
  description: "Owner dashboard for live camera viewing",
  robots: "noindex, nofollow", // Keep private
};

export default function DashboardPage() {
  return <OwnerDashboard />;
}
