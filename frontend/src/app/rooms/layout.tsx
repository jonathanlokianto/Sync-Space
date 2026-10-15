export default function RoomsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-full min-h-screen flex flex-col font-sans bg-gray-50">
      <main className="flex flex-1 flex-col w-full h-full">
        {children}
      </main>
    </div>
  );
}