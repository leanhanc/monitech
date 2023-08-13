import { logout } from "@frontend/(auth)/actions";
import ROUTES from "@frontend/lib/utils/routes";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

type ApiResponse<Data> =
	| { result: "success"; status?: number; data: Data }
	| { result: "error"; status?: number; message: string };

interface ServerError {
	message: string;
	statusCode: number;
}

function isServerError(error: unknown): error is ServerError {
	if (typeof error === "object" && error !== null) {
		const potentialError = error as ServerError;
		return "message" in potentialError && "statusCode" in potentialError;
	}
	return false;
}

async function handleSuccessfuResponse<Data>(
	response: Response,
): Promise<ApiResponse<Data>> {
	if (!response.ok) {
		const errorData = await response.json();
		throw errorData;
	}

	const responseData = await response.json();
	return { result: "success", data: responseData };
}

export async function API<Data>(
	path: string,
	options: Partial<RequestInit> = {},
	token = "",
): Promise<ApiResponse<Data>> {
	try {
		const baseApiUrl = process.env.API_BASE_URL || "";
		const defaultHeaders = {
			"Content-Type": "application/json",
		};
		const requestOptions = token
			? {
					headers: {
						...defaultHeaders,
						Authorization: `Bearer ${token}`,
					},
					...options,
			  }
			: { headers: defaultHeaders, ...options };

		const response = await fetch(`${baseApiUrl}${path}`, requestOptions);
		console.log({ response });
		return await handleSuccessfuResponse<Data>(response);
	} catch (error) {
		if (isServerError(error)) {
			console.log({ serverror: error });
			if (error.message === "Unauthorized") {
				logout();
				redirect(ROUTES.LOGIN, RedirectType.push);
				return {
					result: "error",
					message: "Unauthorized",
				};
			}
			console.error({ error3: error });
			return {
				result: "error",
				message: error.message || "An unexpected error occurred",
			};
		}
		console.error({ error2: error });
		return {
			result: "error",
			message: "An unexpected error occurred",
		};
	}
}
