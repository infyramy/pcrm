import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/services/api";
import { toast } from "vue-sonner";
import type {
  ClientAuthCredentials,
  ClientOTPCredentials,
  ClientAuthResponse,
  ClientUser,
} from "@/types/client";

// Development mode detection
const isDevelopment = true;

// Mock data for development
const MOCK_ACCESS_CODES = ["test123", "demo456", "dev789", "client001"];
const MOCK_VALID_OTPS = ["123456", "000000", "111111"];
const MOCK_USER_DATA = {
  id: "mock-client-1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
};

export const useClientAuthStore = defineStore("clientAuth", () => {
  const router = useRouter();
  const user = ref<ClientUser | null>(null);
  const sessionToken = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const pendingCode = ref<string | null>(null);

  const isAuthenticated = computed(() => !!sessionToken.value && !!user.value);

  // Load client session from localStorage on store initialization
  const storedToken = localStorage.getItem("client_session_token");
  const storedUser = localStorage.getItem("client_user");
  if (storedToken && storedUser) {
    sessionToken.value = storedToken;
    user.value = JSON.parse(storedUser);
  }

  // Mock delay to simulate API calls
  const mockDelay = (ms: number = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async function verifyCode(credentials: ClientAuthCredentials) {
    isLoading.value = true;
    error.value = null;

    try {
      // Development mode: Mock authentication
      if (isDevelopment) {
        console.log("🧪 Development Mode: Mock authentication enabled");
        console.log("🔑 Valid access codes:", MOCK_ACCESS_CODES);

        // Simulate API delay
        await mockDelay(800);

        // Accept any access code in development or use predefined ones
        const isValidCode =
          MOCK_ACCESS_CODES.includes(credentials.code.trim()) ||
          credentials.code.trim().length >= 3;

        if (isValidCode) {
          pendingCode.value = credentials.code;
          toast.success("OTP sent to your WhatsApp number (Development Mode)");
          return { success: true, requiresOTP: true };
        } else {
          throw new Error(
            "Invalid access code. In dev mode, use 'test123', 'demo456', 'dev789', 'client001' or any code with 3+ characters"
          );
        }
      }

      // Production mode: Use real API
      const response = await api<ClientAuthResponse>({
        endpoint: "/client/auth/verify-code",
        method: "POST",
        body: credentials,
      });

      if (response.data.success && response.data.requiresOTP) {
        pendingCode.value = credentials.code;
        toast.success("OTP sent to your WhatsApp number");
        return { success: true, requiresOTP: true };
      } else if (response.data.success) {
        // Direct login without OTP (if implemented)
        sessionToken.value = response.data.sessionToken!;
        localStorage.setItem("client_session_token", sessionToken.value);
        return { success: true, requiresOTP: false };
      } else {
        throw new Error(response.data.message || "Invalid code");
      }
    } catch (e: any) {
      console.error("Code verification error:", e);
      const errorMessage = e.message || "Failed to verify code";
      error.value = errorMessage;
      toast.error(errorMessage);
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  async function verifyOTP(otp: string) {
    if (!pendingCode.value) {
      throw new Error("No pending code found");
    }

    isLoading.value = true;
    error.value = null;

    try {
      // Development mode: Mock OTP verification
      if (isDevelopment) {
        console.log("🧪 Development Mode: Mock OTP verification");
        console.log("🔐 Valid OTPs:", MOCK_VALID_OTPS);

        // Simulate API delay
        await mockDelay(600);

        // Accept any OTP in development or use predefined ones
        const isValidOTP = MOCK_VALID_OTPS.includes(otp) || otp.length === 6;

        if (isValidOTP) {
          // Set mock session token
          sessionToken.value = `mock-session-${Date.now()}`;
          localStorage.setItem("client_session_token", sessionToken.value);

          // Fetch user data after successful authentication
          await fetchUserData();

          toast.success("Successfully logged in! (Development Mode)");
          router.push("/client/home");
          return;
        } else {
          throw new Error(
            "Invalid OTP. In dev mode, use '123456', '000000', '111111' or any 6-digit code"
          );
        }
      }

      // Production mode: Use real API
      const credentials: ClientOTPCredentials = {
        code: pendingCode.value,
        otp,
      };

      const response = await api<ClientAuthResponse>({
        endpoint: "/client/auth/verify-otp",
        method: "POST",
        body: credentials,
      });

      if (response.data.success && response.data.sessionToken) {
        sessionToken.value = response.data.sessionToken;
        localStorage.setItem("client_session_token", sessionToken.value);

        // Fetch user data after successful authentication
        await fetchUserData();

        toast.success("Successfully logged in!");
        router.push("/client/home");
      } else {
        throw new Error(response.data.message || "Invalid OTP");
      }
    } catch (e: any) {
      console.error("OTP verification error:", e);
      const errorMessage = e.message || "Failed to verify OTP";
      error.value = errorMessage;
      toast.error(errorMessage);
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchUserData() {
    try {
      // Development mode: Use mock user data
      if (isDevelopment) {
        console.log("🧪 Development Mode: Using mock user data");
        user.value = MOCK_USER_DATA;
        localStorage.setItem("client_user", JSON.stringify(user.value));
        return;
      }

      // Production mode: Fetch real user data
      const response = await api<{ user: ClientUser }>({
        endpoint: "/client/dashboard",
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken.value}`,
        },
      });

      if (response.data.user) {
        user.value = response.data.user;
        localStorage.setItem("client_user", JSON.stringify(user.value));
      }
    } catch (e: any) {
      console.error("Failed to fetch user data:", e);
      // Fallback to mock data even in production if API fails
      user.value = MOCK_USER_DATA;
      localStorage.setItem("client_user", JSON.stringify(user.value));
    }
  }

  async function logout() {
    try {
      // Development mode: Skip API call
      if (isDevelopment) {
        console.log("🧪 Development Mode: Mock logout");
      } else if (sessionToken.value) {
        await api({
          endpoint: "/client/auth/logout",
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionToken.value}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of server response
      user.value = null;
      sessionToken.value = null;
      pendingCode.value = null;
      localStorage.removeItem("client_session_token");
      localStorage.removeItem("client_user");
      router.push("/client/login");
    }
  }

  // Resend OTP
  async function resendOTP() {
    if (!pendingCode.value) {
      throw new Error("No pending code found");
    }

    isLoading.value = true;
    error.value = null;

    try {
      // Development mode: Mock resend OTP
      if (isDevelopment) {
        console.log("🧪 Development Mode: Mock resend OTP");
        await mockDelay(500);
        toast.success("OTP resent to your WhatsApp number (Development Mode)");
        return;
      }

      // Production mode: Use real API
      await api({
        endpoint: "/client/auth/resend-otp",
        method: "POST",
        body: { code: pendingCode.value },
      });

      toast.success("OTP resent to your WhatsApp number");
    } catch (e: any) {
      console.error("Resend OTP error:", e);
      const errorMessage = e.message || "Failed to resend OTP";
      error.value = errorMessage;
      toast.error(errorMessage);
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    user,
    sessionToken,
    isLoading,
    error,
    isAuthenticated,
    pendingCode,
    verifyCode,
    verifyOTP,
    logout,
    resendOTP,
    fetchUserData,
  };
});
