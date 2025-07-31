const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchFromApi(
  endpoint,
  method = "POST",
  data = null,
  token = null
) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data); // ✅ This was missing
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, options);

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


export async function getBannerList(userId = "0", device = "mobile") {
  try {
    const data = {
      user_id: userId,
      device,
    };

    const response = await fetchFromApi(
      "/api/get_banner_list",
      "POST",
      data
    );
    console.log("Banner List:", response);
    return response;
  } catch (error) {
    console.error("Error fetching banners:", error.message);
    return null;
  }
}