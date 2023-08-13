type ApiResponse<Data> =
	| { result: "success"; status?: number; data: Data }
	| { result: "error"; status?: number; message: string };

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
		return await handleSuccessfuResponse<Data>(response);
	} catch (error) {
		if (error instanceof Error) {
			console.error({ error });
			return {
				result: "error",
				message: error.message || "An unexpected error occurred",
			};
		}
		console.error({ error });
		return {
			result: "error",
			message: "An unexpected error occurred",
		};
	}
}
