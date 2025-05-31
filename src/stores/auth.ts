import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ofetch } from "ofetch";
import { exampleUsers, getMockCredentials } from "@/constants/example-users";

const getApiUrl = () => {
  return window.API_URL;
  // return import.meta.env.VITE_API_URL;
};

interface User {
  id: string;
  email: string;
  fullname: string;
  user_type: "superadmin" | "studio" | "photographer" | "affiliate";
  avatar: String;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SSOCredentials {
  provider: "google" | "facebook";
  token: string;
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!accessToken.value);

  // Load user from localStorage on store initialization
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }

  async function login(credentials: LoginCredentials) {
    isLoading.value = true;
    error.value = null;

    try {
      // Mock authentication using example users
      const matchedUser = exampleUsers.find(u => u.email === credentials.email);
      const mockCreds = matchedUser ? getMockCredentials(matchedUser) : null;

      if (!matchedUser || credentials.password !== mockCreds?.password) {
        throw new Error("Invalid email or password");
      }

      const data = {
        accessToken: `mock_token_${matchedUser.id}`,
        user: matchedUser
      };

      accessToken.value = data.accessToken;
      user.value = data.user;

      // Store access token and user in localStorage
      if (accessToken.value) {
        localStorage.setItem("access_token", accessToken.value);
        localStorage.setItem("user", JSON.stringify(user.value));
      }

      // Navigate to home page after successful login
      router.push("/home");
    } catch (e: any) {
      console.log("Login error: ", e);
      error.value = e.message || "Login failed";
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  async function loginWithSSO(credentials: SSOCredentials) {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await ofetch(
        `${getApiUrl()}/admin/auth/sso/${credentials.provider}`,
        {
          method: "POST",
          body: {
            token: credentials.token,
          },
          credentials: "include",
        }
      );

      accessToken.value = data.accessToken;
      user.value = data.user;

      if (accessToken.value) {
        localStorage.setItem("access_token", accessToken.value);
        localStorage.setItem("user", JSON.stringify(user.value));
      }

      router.push("/home");
    } catch (e: any) {
      console.log("SSO Login error: ", e);
      error.value = e.data?.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  async function refreshAccessToken() {
    try {
      const data = await ofetch(`${getApiUrl()}/admin/auth/refresh-token`, {
        method: "POST",
        credentials: "include", // Important for cookies
      });

      accessToken.value = data.accessToken;
      localStorage.setItem("access_token", data.accessToken);
      return data.accessToken;
    } catch (error) {
      logout();
      throw error;
    }
  }

  async function logout() {
    try {
      // Call logout endpoint to invalidate refresh token
      await ofetch(`${getApiUrl()}/admin/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of server response
      user.value = null;
      accessToken.value = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }

  // Initialize store from localStorage
  function init() {
    const storedAccessToken = localStorage.getItem("access_token");
    if (storedAccessToken) {
      accessToken.value = storedAccessToken;
    }
  }

  return {
    user,
    accessToken,
    isLoading,
    error,
    isAuthenticated,
    login,
    loginWithSSO,
    logout,
    init,
    refreshAccessToken,
  };
});
