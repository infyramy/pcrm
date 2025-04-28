<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "vue-sonner";
import { useColorMode } from "@vueuse/core";

const router = useRouter();
const authStore = useAuthStore();
const mode = useColorMode();

const email = ref("");
const isSubmitting = ref(false);

async function handleSubmit() {
  if (!email.value) {
    toast.error("Please enter your email address");
    return;
  }

  try {
    isSubmitting.value = true;
    // TODO: Implement forgot password logic
    toast.success("Password reset instructions have been sent to your email");
    router.push("/login");
  } catch (error: any) {
    console.log("error: ", error);
    toast.error(error.data?.message || "Something went wrong. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
}

function toggleMode() {
  mode.value = mode.value === "dark" ? "light" : "dark";
}
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

      <!-- Left column - Forgot password form -->
      <div
        class="relative hidden h-full flex-col bg-background p-10 text-white lg:flex dark:border-r"
      >
        <div class="absolute inset-0 bg-zinc-900" />
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
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer class="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      <!-- Right column - Forgot password form -->
      <div class="w-full lg:p-8">
        <div
          class="mx-auto flex w-full flex-col justify-center space-y-6 px-4 sm:w-[350px]"
        >
          <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">
              Forgot Password
            </h1>
            <p class="text-sm text-muted-foreground">
              Enter your email address and we'll send you instructions to reset your password
            </p>
          </div>

          <Card class="w-full">
            <CardContent class="grid gap-4 pt-6">
              <form @submit.prevent="handleSubmit" class="grid gap-4">
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
                <Button type="submit" class="w-full" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="flex items-center gap-2">
                    <span
                      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    />
                    Sending...
                  </span>
                  <span v-else>Send Reset Instructions</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          <p class="text-center text-sm text-muted-foreground">
            Remember your password?
            <router-link to="/login" class="underline underline-offset-4 hover:text-primary">
              Sign in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template> 