import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Utils */
import ROUTES from "@frontend/lib/utils/routes";

const PRIVATE_ROUTES = [ROUTES.DASHBOARD];

export function middleware(request: NextRequest) {
	if (
		PRIVATE_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))
	) {
		if (!request.cookies.has("mst")) {
			return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
		}
	}

	return NextResponse.next();
}
