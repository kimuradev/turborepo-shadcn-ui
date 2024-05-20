import Dashboard from "./dashboard/dashboard";
import PWA from "./dashboard/pwa";

export default function Home() {
  return (
    <div className="flex-1 p-0 md:space-y-4 md:p-8 md:pt-6">
      <Dashboard />
      <PWA />
    </div>
  )
}
