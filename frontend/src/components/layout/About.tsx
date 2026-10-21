import { ROUTES } from "@/constants/routes";
import {
  Sparkles,
  BookOpen,
  Code2,
  Mail,
  ExternalLink,
  CheckCircle2,
  Layers,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col min-h-[85vh] py-8 px-4 space-y-8">
      <Link
        href={ROUTES.HOME}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all mb-6 group w-fit"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Home</span>
      </Link>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            About the Application
          </h1>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
          This application is a modern, real-time room-sharing and note-taking
          platform built to provide a clean, structured, and efficient digital
          workspace. Designed with performance and user experience in mind, it
          simplifies how you manage rooms, share links, and organize content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-gray-900 font-semibold text-base">
              <Layers className="w-5 h-5 text-blue-600" />
              <h2>Features & Capabilities</h2>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Room Management:</strong> Create, view, and organize
                  custom rooms with unique IDs and slugs instantly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Instant Link Sharing:</strong> Copy direct room links
                  to your clipboard with a single click and success
                  notifications.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Content Previews:</strong> View clean text snippets
                  and dive straight into detailed workspace content.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 text-gray-900 font-semibold text-base">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2>How to Use</h2>
            </div>
            <ol className="space-y-3 text-sm text-gray-600 list-decimal list-inside">
              <li className="leading-relaxed">
                <strong>As a Guest:</strong> Instantly create a random room from
                the home page, or enter an existing Room ID / Slug to join right
                away.
              </li>
              <li className="leading-relaxed">
                <strong>As an Account Holder:</strong> Register and log in to
                your dashboard to create rooms with custom names and
                personalized Room IDs.
              </li>
              <li className="leading-relaxed">
                <strong>Organize & Share:</strong> Fill in your notes, copy your
                room link or ID code, and share it with anyone to collaborate.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Code2 className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Developer Profile</h2>
        </div>

        <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">
          Full-Stack Developer & Informatics Engineering graduate experienced in
          building scalable and structured end-to-end web applications. Highly
          proficient in Next.js (TypeScript) and Go (Golang), as well as
          mastering the Laravel, Inertia.js, and React ecosystem. Possesses a
          strong Machine Learning foundation as a Bangkit Academy graduate
          (Distinction). Committed to implementing clean, maintainable, and
          high-performance code.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <a
            href="https://github.com/jonathanlokianto/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 text-sm font-medium transition-colors bg-gray-50/50"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 ml-auto" />
          </a>

          <a
            href="https://www.linkedin.com/in/jonathan-lokianto-6285a9330/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 text-sm font-medium transition-colors bg-gray-50/50"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
            </svg>
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 ml-auto" />
          </a>

          <a
            href="mailto:jonathanlokiant@gmail.com"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 text-sm font-medium transition-colors bg-gray-50/50"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 ml-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}
