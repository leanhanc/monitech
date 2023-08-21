import { cookies } from "next/headers";

/* Config */
import { ID_TOKEN_NAME, SESSION_TOKEN_NAME } from "apps/frontend/config";

export async function logout() {
	"use server";
	cookies().delete(SESSION_TOKEN_NAME);
	cookies().delete(ID_TOKEN_NAME);
}
