import { redirect } from "next/navigation";

export default function a() {
  redirect("/(default)"); // o a la ruta real como "/dashboard"
}
