import { HomePage } from "@/features/landing/components/HomePage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ROUTES } from "@/constants/routes";


export default async function LandingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if(token) {
    redirect(ROUTES.DASHBOARD)
  }
  return <HomePage />;
}
