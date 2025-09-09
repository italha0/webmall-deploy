const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Flexible API fetch helper.
 * Backward compatible signatures:
 * fetchFromApi('/endpoint')
 * fetchFromApi('/endpoint', 'POST', data, token)
 * New flexible usage:
 * fetchFromApi('/endpoint', { method: 'GET', data, token, signal, headers })
 * fetchFromApi('/endpoint', { signal }) // defaults to POST unless method provided
 */
export async function fetchFromApi(
  endpoint,
  methodOrOptions = "POST",
  data = null,
  token = null
) {
  let method = "POST";
  let extra = {};

  if (typeof methodOrOptions === "string") {
    method = methodOrOptions;
  } else if (methodOrOptions && typeof methodOrOptions === "object") {
    extra = methodOrOptions;
    if (typeof extra.method === "string") method = extra.method;
    if (extra.data !== undefined && data == null) data = extra.data; // allow data inside options
    if (extra.token && !token) token = extra.token;
  }

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(extra.headers || {}),
    },
    mode: "cors",
    credentials: "include",
    signal: extra.signal,
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    // Build URL safely
    let url;
    if (typeof endpoint === "string" && /^https?:\/\//i.test(endpoint)) {
      url = endpoint; // absolute provided
    } else {
      const base = API_BASE || ""; // allow same-origin relative calls if not set
      const trimmedBase = base.replace(/\/$/, "");
      const trimmedEndpoint = (endpoint || "").replace(/^\//, "/");
      url = `${trimmedBase}${trimmedEndpoint}` || trimmedEndpoint || endpoint;
    }

    const res = await fetch(url, options);
    if (!res.ok) {
      let errorMsg = "API request failed";
      try {
        const errorData = await res.json();
        errorMsg = errorData.message || errorMsg;
      } catch (e) {
        errorMsg = `HTTP error! status: ${res.status}`;
      }
      throw new Error(errorMsg);
    }
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Add this to your API utility file (where fetchFromApi is defined)
export async function getCategoryList() {
  return fetchFromApi("/api/get_category_list", "POST");
}
export async function getOfferList() {
  return fetchFromApi("/api/get_offers_list", "POST");
}

// ✨ NEW: Function to get all products
export async function getProductList() {
  // Adjusted to match existing usage elsewhere: '/api/get_products_list'
  return fetchFromApi("/api/get_products_list", "POST");
}
