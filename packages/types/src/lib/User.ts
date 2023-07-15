import { users } from "@monitech/db";
import { InferModel } from "drizzle-orm";

export type User = InferModel<typeof users>;
