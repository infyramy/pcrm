import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ofetch } from "ofetch";

const getApiUrl = () => {
  return window.API_URL;
  // return import.meta.env.VITE_API_URL;
};

interface User {
  id: string;
  email: string;
  username: string;
  fullname: string;
  user_type: "admin" | "agent";
  avatar: String;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SSOCredentials {
  provider: 'google' | 'facebook';
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

    // console.log("getApiUrl le: ", getApiUrl());

    try {
      // const data = await ofetch(`${getApiUrl()}/admin/auth/login`, {
      //   method: "POST",
      //   body: {
      //     identifier: credentials.email,
      //     password: credentials.password,
      //   },
      //   credentials: "include", // Important: This enables sending/receiving cookies
      // });

      let data = {
        accessToken: "1234567890",
        user: {
          id: "1234567890",
          email: "test@test.com",
          username: "test",
          fullname: "Test User",
          user_type: "admin" as const,
          avatar: "https://i.pravatar.cc/300",
        },
      };

      accessToken.value = data.accessToken;
      user.value = data.user;

      // Only store access token and user in localStorage
      if (accessToken.value) {
        localStorage.setItem("access_token", accessToken.value);
        localStorage.setItem("user", JSON.stringify(user.value));
      }
    } catch (e: any) {
      console.log("Login error: ", e);
      error.value = e.data?.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  async function loginWithSSO(credentials: SSOCredentials) {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await ofetch(`${getApiUrl()}/admin/auth/sso/${credentials.provider}`, {
        method: "POST",
        body: {
          token: credentials.token,
        },
        credentials: "include",
      });

      accessToken.value = data.accessToken;
      user.value = data.user;

      if (accessToken.value) {
        localStorage.setItem("access_token", accessToken.value);
        localStorage.setItem("user", JSON.stringify(user.value));
      }

      if (user.value?.user_type === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/agent/dashboard");
      }
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
