// Server Component — fetches all data from Supabase, passes to client dashboard
import { getMembers } from "./actions/members";
import { getEvents } from "./actions/events";
import { getGallery } from "./actions/gallery";
import { getEnquiries } from "./actions/enquiries";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic"; // always re-fetch on every request

export default async function AdminPage() {
  // Parallel fetch all data from Supabase
  const [members, events, gallery, enquiries] = await Promise.all([
    getMembers(),
    getEvents(),
    getGallery(),
    getEnquiries(),
  ]);

  return (
    <AdminDashboard
      initialMembers={members}
      initialEvents={events}
      initialGallery={gallery}
      initialEnquiries={enquiries}
    />
  );
}
