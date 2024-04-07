export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-bg-dark">
      {children}
    </div>
  );
}
