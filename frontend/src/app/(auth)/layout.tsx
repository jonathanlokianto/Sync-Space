import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <section className="max-w-md w-full p-8 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="space-y-6">
        <div className="flex justify-start">
          <Link
            className="text-gray-600 hover:text-gray-400"
            href={ROUTES.HOME}
          >
            &lt; Return
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}
