CREATE TABLE `cms_documents` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cms_media` (
	`id` text PRIMARY KEY NOT NULL,
	`object_key` text NOT NULL,
	`filename` text NOT NULL,
	`mime_type` text NOT NULL,
	`size` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cms_media_object_key_unique` ON `cms_media` (`object_key`);--> statement-breakpoint
CREATE TABLE `cms_products` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`value` text NOT NULL,
	`sort_order` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cms_products_slug_unique` ON `cms_products` (`slug`);