import { AdminLayout } from "@/components/globals/AdminLayout";
import { ReactNode } from "react";


export default function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}