import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

/* Config */
import { SESSION_TOKEN_NAME } from "apps/frontend/config";

const PRIVATE_ROUTES = [
	ROUTES.DASHBOARD,
	ROUTES.INVOICES.LIST,
	ROUTES.INVOICES.NEW.ROOT,
	ROUTES.INVOICES.NEW.C,
	ROUTES.INVOICES.NEW.E,
];

export function middleware(request: NextRequest) {
	if (
		PRIVATE_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))
	) {
		if (!request.cookies.has(SESSION_TOKEN_NAME)) {
			return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
		}
	}

	return NextResponse.next();
}
