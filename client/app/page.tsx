import { redirect } from "next/navigation";

export default function Home() {
  redirect("/(default)"); // o a la ruta real como "/dashboard"
}
