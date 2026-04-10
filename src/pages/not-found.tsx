import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-2xl mx-4">
        <div className="text-center">
          {/* Large 404 Display */}
          <div className="mb-8">
            <div className="inline-block">
              <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-4">
                404
              </div>
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-orange-500/10 border border-orange-500/20">
              <AlertCircle className="w-16 h-16 text-orange-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-lg text-white/60 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-base text-white/50 mb-8">
            It might have been moved or deleted. Let's get you back on track.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-colors shadow-lg"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center gap-4 text-white/20">
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}