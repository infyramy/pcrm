<template>
  <div class="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
      <div class="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
    </div>

    <div class="relative space-y-8 max-w-2xl">
      <!-- Animated 404 number with modern design -->
      <div class="relative">
        <div class="absolute inset-0 -z-10">
          <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl"></div>
        </div>
        <h1 class="text-9xl font-bold text-primary">404</h1>
        <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <!-- Main content with modern typography -->
      <div class="space-y-4">
        <h2 class="text-4xl font-semibold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
          Page Not Found
        </h2>
        <p class="text-muted-foreground text-lg max-w-md mx-auto">
          The page you're looking for might have been moved, deleted, or never existed.
        </p>
      </div>

      <!-- Action buttons with modern design -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <router-link
          to="/studio/home"
          class="group inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span class="mr-2 transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Go back to home
        </router-link>
        <button
          @click="$router.go(-1)"
          class="group inline-flex h-12 items-center justify-center rounded-xl border border-input bg-background px-8 py-3 text-base font-medium transition-all duration-300 hover:bg-accent hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Previous page
          <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>

      <!-- Decorative elements -->
      <div class="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This page uses Vue Composition API with script setup
// No additional state or logic needed for this simple 404 page
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style> 