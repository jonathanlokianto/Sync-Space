import { ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <div className="flex flex-col justify-center space-y-5 text-left w-full max-w-lg min-w-0 lg:pr-4">
      <div className="space-y-2">
        {/* Tambahkan text-2xl dan sm:text-3xl agar proporsional di HP */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight wrap-break-words">
          Write and share your notes with anyone.
          <span className="bg-black inline-block w-0.5 h-8 sm:h-10 lg:h-12 animate-[pulse_0.7s_infinite] ml-1 align-top duration-75"></span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Sync Space allows you to open rooms without hassle. No complex setup
          required.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          How to use in 30 seconds
        </h3>

        <div className="grid gap-3">
          <div
            className="group bg-white flex items-start gap-3 p-3 rounded-xl border border-gray-200/80 shadow-xs
                    hover:border-blue-400 transition-colors duration-200"
          >
            <div
              className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-semibold text-xs
                    group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200"
            >
              1
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800">
                Create or Join a Room
              </p>
              <p className="text-xs text-gray-500">
                Click &quot;Create New Room&quot; for an instant path, or type
                an existing ID Path.
              </p>
            </div>
          </div>

          <div
            className="group bg-white flex items-start gap-3 p-3 rounded-xl border border-gray-200/80 shadow-xs
                    hover:border-blue-400 transition-colors duration-200"
          >
            <div
              className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-semibold text-xs
                    group-hover:bg-blue-500 group-hover:text-white transition-colors duration-200"
            >
              2
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800">
                Collaborate in Real-time
              </p>
              <p className="text-xs text-gray-500">
                Share markdown notes seamlessly between devices.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-4 rounded-xl bg-linear-to-br from-gray-900 to-gray-800 text-white shadow-md
                border-2 border-gray-800 hover:border-blue-500"
      >
        <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Quick Evaluation Access</span>
        </div>
        <p className="text-xs text-gray-300 mb-3 leading-relaxed">
          Want to check authenticated features? Use these pre-configured mock
          credentials:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs bg-gray-950/60 p-2.5 rounded-lg border border-gray-800">
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-medium">
              Username
            </span>
            <code className="text-blue-300 font-mono font-semibold">admin</code>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-medium">
              Password
            </span>
            <code className="text-blue-300 font-mono font-semibold">
              admin123
            </code>
          </div>
        </div>
        <div className="mt-2.5 text-[11px] text-gray-400 flex items-center gap-1.5 flex-wrap">
          <span>Quick Room Test:</span>
          <code className="text-emerald-400 font-mono">mock-room</code>
        </div>
      </div>
    </div>
  );
}