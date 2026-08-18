import { getChatGPTUser, requireChatGPTUser } from "@/app/chatgpt-auth";

export async function requireCmsUser(returnTo = "/admin") {
  if (process.env.NODE_ENV !== "production") return { userId: "local", displayName: "Site owner", email: "local@rkexpo.test", fullName: "Site owner" };
  return requireChatGPTUser(returnTo);
}
export async function isCmsUser() { return process.env.NODE_ENV !== "production" || Boolean(await getChatGPTUser()); }
