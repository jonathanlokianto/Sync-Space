import { HomePage } from "@/features/landing/components/HomePage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ROUTES } from "@/constants/routes";
import { HeroSection } from "@/features/landing/components/Herosection";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const devMode =
    process.env.NODE_ENV === "development" &&
    process.env.BYPASS_AUTH === "true";

  if (token && !devMode) {
    redirect(ROUTES.DASHBOARD);
  }
  return (
    <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between overflow-x-hidden">
      <div className="w-full lg:w-auto flex justify-center">
        <HomePage />
      </div>
      <HeroSection />
    </div>
  );
}
