const ROUTES = {
	LOGIN: "/login",
	REGISTER: "/register",
	DASHBOARD: "/dashboard",
	INVOICES: {
		LIST: "/invoices",
		NEW: "/invoices/new",
	},
} as const;

export default ROUTES;
