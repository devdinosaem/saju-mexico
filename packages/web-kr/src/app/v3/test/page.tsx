import { redirect } from "next/navigation"
import TestPanel from "./_components/TestPanel"

export default function TestPage() {
  if (process.env.NODE_ENV === "production") {
    redirect("/v3/shop")
  }

  return <TestPanel />
}
