<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "vue-sonner";
import { useColorMode } from "@vueuse/core";

interface FBAuthResponse {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
}

declare const FB: {
  init: (config: {
    appId: string;
    cookie: boolean;
    xfbml: boolean;
    version: string;
  }) => void;
  login: (
    callback: (response: { authResponse?: FBAuthResponse }) => void,
    options?: { scope: string }
  ) => void;
};

const router = useRouter();
const authStore = useAuthStore();
const mode = useColorMode();

const businessName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSubmitting = ref(false);
const showPassword = ref(false);
const isGoogleLoaded = ref(false);
const isFacebookLoaded = ref(false);

async function handleSubmit() {
  if (
    !businessName.value ||
    !email.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    toast.error("Please fill in all fields");
    return;
  }

  if (password.value !== confirmPassword.value) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    isSubmitting.value = true;

    // await authStore.register({
    //   business_name: businessName.value,
    //   email: email.value,
    //   password: password.value,
    // });

    toast.success(
      "Registration successful! Please check your email to verify your account."
    );
    router.push("/login");
  } catch (error: any) {
    console.error("Registration error:", error);
    toast.error(
      error.data?.message || "Registration failed. Please try again."
    );
  } finally {
    isSubmitting.value = false;
  }
}

function toggleMode() {
  mode.value = mode.value === "dark" ? "light" : "dark";
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// Initialize Google SDK
function loadGoogleSDK() {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          })
          .then(() => {
            isGoogleLoaded.value = true;
            resolve();
          });
      });
    };

    document.head.appendChild(script);
  });
}

async function handleGoogleLogin() {
  if (!isGoogleLoaded.value) {
    toast.error(
      "Google authentication is still initializing. Please try again in a moment."
    );
    return;
  }

  try {
    isSubmitting.value = true;
    const auth2 = window.gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();
    const token = googleUser.getAuthResponse().id_token;

    await authStore.loginWithSSO({
      provider: "google",
      token,
    });
  } catch (error: any) {
    console.error("Google login error:", error);
    toast.error(error.message || "Failed to login with Google");
  } finally {
    isSubmitting.value = false;
  }
}

function loadFacebookSDK() {
  return new Promise<void>((resolve) => {
    if (window.location.protocol !== "https:") {
      toast.error(
        "Facebook login requires HTTPS. Please use a secure connection."
      );
      resolve();
      return;
    }

    window.fbAsyncInit = function () {
      FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
      isFacebookLoaded.value = true;
      resolve();
    };

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  });
}

async function handleFacebookLogin() {
  if (!isFacebookLoaded.value) {
    toast.error(
      "Facebook authentication is still initializing. Please try again in a moment."
    );
    return;
  }

  if (window.location.protocol !== "https:") {
    toast.error(
      "Facebook login requires HTTPS. Please use a secure connection."
    );
    return;
  }

  try {
    isSubmitting.value = true;
    const response = await new Promise<FBAuthResponse>((resolve, reject) => {
      FB.login(
        (response: { authResponse?: FBAuthResponse }) => {
          if (response.authResponse) {
            resolve(response.authResponse);
          } else {
            reject(new Error("Facebook login cancelled"));
          }
        },
        { scope: "email" }
      );
    });

    await authStore.loginWithSSO({
      provider: "facebook",
      token: response.accessToken,
    });
  } catch (error: any) {
    console.error("Facebook login error:", error);
    toast.error(error.message || "Failed to login with Facebook");
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(async () => {
  try {
    await Promise.all([loadGoogleSDK(), loadFacebookSDK()]);
  } catch (error) {
    console.error("Failed to load authentication SDKs:", error);
  }
});
</script>

<template>
  <div class="min-h-svh">
    <div
      class="container relative min-h-svh flex flex-col items-center justify-center px-4 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
      <!-- Theme Toggle Button -->
      <button
        @click="toggleMode"
        class="fixed right-4 top-4 z-50 rounded-lg p-2 hover:bg-muted"
        aria-label="Toggle theme"
      >
        <svg
          v-if="mode === 'dark'"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-5 w-5"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-5 w-5"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <!-- Left column - Registration form -->
      <div
        class="relative hidden h-full flex-col bg-background p-10 text-white lg:flex dark:border-r"
      >
        <div class="absolute inset-0 bg-primary" />
        <div class="relative z-20 flex items-center text-lg font-medium">
          <img
            src="@/assets/logo/logo400.jpg"
            alt="Bemobile Logo"
            class="mr-2 h-6 w-6"
          />
          <span>Placeholder</span>
        </div>
        <div class="relative z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-lg">
              &ldquo;Join our community and start your journey with us today.
              We're excited to have you on board!&rdquo;
            </p>
            <footer class="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      <!-- Right column - Registration form -->
      <div class="w-full lg:p-8">
        <div
          class="mx-auto flex w-full flex-col justify-center space-y-6 px-4 sm:w-[350px]"
        >
          <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p class="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>

          <Card class="w-full">
            <CardContent class="grid gap-4 pt-6">
              <form @submit.prevent="handleSubmit" class="grid gap-4">
                <div class="grid gap-2">
                  <Label html-for="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    type="text"
                    v-model="businessName"
                    placeholder="Your Business Name"
                    required
                  />
                </div>
                <div class="grid gap-2">
                  <Label html-for="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    v-model="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div class="grid gap-2">
                  <Label html-for="password">Password</Label>
                  <div class="relative">
                    <Input
                      id="password"
                      :type="showPassword ? 'text' : 'password'"
                      v-model="password"
                      required
                    />
                    <button
                      type="button"
                      @click="togglePasswordVisibility"
                      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-muted"
                      aria-label="Toggle password visibility"
                    >
                      <svg
                        v-if="showPassword"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                      >
                        <path
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path
                          d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                        />
                        <path
                          d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                        />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="grid gap-2">
                  <Label html-for="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="confirmPassword"
                    required
                  />
                </div>
                <Button type="submit" class="w-full" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="flex items-center gap-2">
                    <span
                      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    />
                    Creating account...
                  </span>
                  <span v-else>Create account</span>
                </Button>
              </form>

              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <span class="w-full border-t" />
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                  <span class="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  @click="handleGoogleLogin"
                  :disabled="isSubmitting"
                >
                  <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  @click="handleFacebookLogin"
                  :disabled="isSubmitting"
                >
                  <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      fill="#1877F2"
                    />
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardContent>
          </Card>

          <p class="text-center text-sm text-muted-foreground">
            Already have an account?
            <router-link
              to="/login"
              class="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </router-link>
          </p>

          <p class="text-center text-sm text-muted-foreground">
            By creating an account, you agree to our
            <router-link
              to="/terms-of-service"
              class="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </router-link>
            and
            <router-link
              to="/privacy-policy"
              class="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </router-link>
            .
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
