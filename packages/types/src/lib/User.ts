import { users } from "@monodev/db";
import { InferModel } from "drizzle-orm";

export type User = InferModel<typeof users>;
