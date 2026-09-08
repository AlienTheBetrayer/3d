CREATE TYPE "public"."verification_code_type" AS ENUM('login', 'signup', 'forgot_password', 'owner_connect');--> statement-breakpoint
CREATE TABLE "auth_sessions" (
	"id" text NOT NULL,
	"user_id" text NOT NULL,
	"refresh_token_hash" text NOT NULL,
	"last_seen_at" timestamp (6) with time zone DEFAULT now(),
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"browser" jsonb,
	"os" jsonb,
	"device" jsonb,
	"cpu" jsonb,
	"ip" text,
	"expiry_at" timestamp (6) with time zone NOT NULL,
	CONSTRAINT "auth_session_pkey" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "connections" (
	"id" text NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"group_id" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "connected_sessions_pkey" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "connections_group" (
	"id" text NOT NULL,
	"title" text NOT NULL,
	"emoji" text NOT NULL,
	"edited_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"owner_user_id" text NOT NULL,
	"last_connected_at" timestamp (6) with time zone,
	CONSTRAINT "connected_sessions_group_pkey" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password" text,
	"deleted_at" timestamp (6) with time zone,
	"edited_at" timestamp (6) with time zone,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"color" text NOT NULL,
	"image_url" text NOT NULL,
	"emoji" text,
	"status" text,
	CONSTRAINT "users_email_key" UNIQUE("email"),
	CONSTRAINT "users_username_key" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "verification_codes" (
	"id" text NOT NULL,
	"email" text NOT NULL,
	"code" text NOT NULL,
	"expiry_at" timestamp (6) with time zone NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"type" "verification_code_type" NOT NULL,
	CONSTRAINT "confirmation_codes_pkey" PRIMARY KEY("id")
);
--> statement-breakpoint
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connected_sessions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."connections_group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connected_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connections_group" ADD CONSTRAINT "connected_sessions_group_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;