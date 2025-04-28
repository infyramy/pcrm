import { ofetch, type FetchResponse } from "ofetch";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue-sonner";

interface ApiConfig {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const getApiUrl = () => {
  return window.API_URL;
  // return import.meta.env.VITE_API_URL;
};

const getDefaultHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function api<T>(config: ApiConfig): Promise<ApiResponse<T>> {
  try {
    console.log('Making API request to:', `${getApiUrl()}${config.endpoint}`);
    const response = (await ofetch<T>(`${getApiUrl()}${config.endpoint}`, {
      method: config.method || "GET",
      body: config.body,
      headers: {
        ...getDefaultHeaders(),
        ...config.headers,
      },
      params: config.params,
      credentials: "include",
    })) as T & { headers?: Headers };

    console.log('API response:', response);

    // Check for new access token in response headers
    const newAccessToken = response.headers?.get("X-New-Access-Token");
    if (newAccessToken) {
      localStorage.setItem("access_token", newAccessToken);
    }

    return {
      data: response,
      status: 200,
    };
  } catch (error: any) {
    // Handle different types of errors
    if (error.response) {
      const status = error.response.status;
      const message = error.response._data?.message || "An error occurred";

      // Handle unauthorized/invalid token
      if (status === 401) {
        const authStore = useAuthStore();

        // Check if we got a new access token in the response
        const newAccessToken =
          error.response.headers?.get("X-New-Access-Token");
        if (newAccessToken) {
          localStorage.setItem("access_token", newAccessToken);
          // Retry the original request with the new token
          return api<T>(config);
        }

        // If no new token, logout the user
        toast.error("Your session has expired. Please log in again.");
        await authStore.logout();
      }

      return {
        data: error.response._data as T,
        status,
        message,
      };
    } else if (error.request) {
      return {
        data: {} as T,
        status: 500,
        message: "No response received from server",
      };
    } else {
      return {
        data: {} as T,
        status: 500,
        message: error.message || "An error occurred",
      };
    }
  }
}

// Example usage:
// const response = await api<User[]>({
//   endpoint: '/users',
//   method: 'GET'
// })
