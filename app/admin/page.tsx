import { chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { getCmsProducts, getSiteContent } from "@/lib/cms";
import { requireCmsUser } from "@/lib/cms-auth";
import { CmsDashboard } from "./CmsDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireCmsUser();
  const [content, products] = await Promise.all([getSiteContent(), getCmsProducts()]);
  return <CmsDashboard initialContent={content} initialProducts={products} userName={user.displayName} signOutPath={chatGPTSignOutPath("/")} />;
}
