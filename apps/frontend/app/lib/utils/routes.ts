const ROUTES = {
	LOGIN: "/login",
	REGISTER: "/register",
	DASHBOARD: "/dashboard",
	INVOICES: {
		LIST: "/invoice",
		NEW: "/invoice/new",
	},
} as const;

export default ROUTES;
