// src/api/apiCall.js
import API from "./api";

export const apiCall = async ({ url, method, data = null, params = null, config = {} }) => {
  try {
    console.log(`📡 API CALL → [${method.toUpperCase()}] ${url}`);
    if (data) console.log("📤 Request Payload:", data);

    const isFormData = data instanceof FormData;

    const finalConfig = {
      ...config,
      withCredentials: true,
      headers: {
        ...(config?.headers || {}),
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    };

    let response;

    if (method === "get") {
      response = await API.get(url, { ...finalConfig, params });
    } else {
      response = await API[method](url, data, finalConfig);
    }

    console.log(`✅ API Response [${method.toUpperCase()} ${url}]:`, response.data);
    return response.data;

  } catch (error) {
    const status = error?.response?.status || "Unknown";
    const errorData = error?.response?.data ?? {};
    const message =
      errorData?.message ||
      errorData?.errors?.[Object.keys(errorData.errors || {})[0]]?.message ||
      error?.message ||
      "Something went wrong!";

    // Özel durum: /account/me için sessiz geç
    if (status === 401 && url === "/account/me") {
      console.warn("🔐 [account/me] 401 – user not logged in.");
      return null;
    }

    if (error?.response) {
      const { status, data, config } = error.response;
      console.error("❌ API Error Details:", {
        url: config?.url || "Unknown URL",
        status,
        data,
      });
    }

    throw { status, message, data: errorData };
  }
};
