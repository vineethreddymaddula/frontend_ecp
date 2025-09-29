import ProfileSidebar from "@/components/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No ProtectedRoute wrapper is needed.
  // The middleware.ts file protects this route on the server.
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-900">
      <div className="mobile-container py-6 sm:py-8">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <ProfileSidebar />
          </aside>
          <main className="flex-grow bg-white dark:bg-primary-800 mobile-padding sm:p-6 lg:p-8 rounded-2xl shadow-subtle">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}