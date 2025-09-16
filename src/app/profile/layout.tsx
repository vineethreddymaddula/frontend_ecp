import ProfileSidebar from "@/components/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No ProtectedRoute wrapper is needed.
  // The middleware.ts file protects this route on the server.
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 flex-shrink-0">
          <ProfileSidebar />
        </aside>
        <main className="flex-grow bg-white p-8 rounded-lg shadow-subtle">
          {children}
        </main>
      </div>
    </div>
  );
}