const ROUTES = {
	LOGIN: "/login",
	REGISTER: "/register",
	DASHBOARD: "/dashboard",
	INVOICES: {
		LIST: "/invoices",
		NEW: {
			ROOT: "/invoices/new",
			C: "/invoices/new/C",
			E: "/invoices/new/E",
		},
	},
} as const;

export default ROUTES;
