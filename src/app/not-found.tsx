import Link from "next/link";
import { HeartPulse } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-clinic-50 text-clinic-600 flex items-center justify-center mb-6">
        <HeartPulse className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-700 mb-4">Page Not Found</h2>
      <p className="text-sm text-slate-500 max-w-md mb-8">
        The clinic page you are looking for might have been moved or does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-clinic-600 hover:bg-clinic-700 text-white text-sm font-semibold shadow-md transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
