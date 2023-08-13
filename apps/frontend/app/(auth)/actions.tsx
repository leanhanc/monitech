import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* CONFIG */
import { ID_TOKEN_NAME, SESSION_TOKEN_MAME } from "apps/frontend/config";

/* UTILS */
import ROUTES from "@frontend/lib/utils/routes";

export function logout() {
	cookies().delete(SESSION_TOKEN_MAME);
	cookies().delete(ID_TOKEN_NAME);
}
