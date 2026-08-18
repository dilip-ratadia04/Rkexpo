import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cmsDocuments = sqliteTable("cms_documents", {
  key: text("key").primaryKey(), value: text("value").notNull(), updatedAt: integer("updated_at").notNull(),
});
export const cmsProducts = sqliteTable("cms_products", {
  id: text("id").primaryKey(), slug: text("slug").notNull().unique(), value: text("value").notNull(), sortOrder: integer("sort_order").notNull(), updatedAt: integer("updated_at").notNull(),
});
export const cmsMedia = sqliteTable("cms_media", {
  id: text("id").primaryKey(), objectKey: text("object_key").notNull().unique(), filename: text("filename").notNull(), mimeType: text("mime_type").notNull(), size: integer("size").notNull(), createdAt: integer("created_at").notNull(),
});
