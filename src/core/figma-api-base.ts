const DEFAULT_FIGMA_API_BASE_URL = "https://api.figma.com/v1";

export function getFigmaApiBaseUrl(baseUrl?: string): string {
	return (baseUrl || DEFAULT_FIGMA_API_BASE_URL).replace(/\/+$/, "");
}
