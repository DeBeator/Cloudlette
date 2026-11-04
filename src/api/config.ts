export type ApiMode = "mock" | "live" | "unconfigured";

const configuredMode = process.env.NEXT_PUBLIC_API_MODE;

/**
 * Local development remains usable without an API. Production must opt in to
 * either a real API or an explicitly labelled mock/demo deployment; otherwise
 * requests fail safely instead of silently serving placeholder inventory.
 */
export const API_MODE: ApiMode =
  configuredMode === "mock"
    ? "mock"
    : configuredMode === "live"
      ? "live"
      : process.env.NODE_ENV === "development"
        ? "mock"
        : "unconfigured";

export const USE_MOCK = API_MODE === "mock";

export const API_CONFIGURATION_ERROR =
  API_MODE === "unconfigured"
    ? "The catalog service has not been configured for this deployment."
    : null;
