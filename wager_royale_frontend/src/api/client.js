//
// PUBLIC_INTERFACE
/**
 * createApiClient returns a minimal wrapper around fetch with a base URL and JSON handling.
 * It reads REACT_APP_API_BASE_URL from env and prefixes all requests.
 */
export function createApiClient() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
  if (!baseUrl) {
    // Non-fatal warning to help during local dev
    // eslint-disable-next-line no-console
    console.warn("REACT_APP_API_BASE_URL is not set. API calls will target relative paths.");
  }

  // PUBLIC_INTERFACE
  /**
   * request performs a REST call with JSON handling and basic error propagation.
   * @param {string} path - The API path, with leading slash (e.g., '/billing/status')
   * @param {RequestInit} options - Fetch options
   * @returns {Promise<any>} Parsed JSON response
   */
  async function request(path, options = {}) {
    const url = `${baseUrl}${path}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    const res = await fetch(url, { ...options, headers });
    const text = await res.text();
    const data = text ? safeJsonParse(text) : null;

    if (!res.ok) {
      const err = new Error((data && data.message) || `Request failed: ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  function safeJsonParse(text) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  return { request };
}

export default createApiClient;
