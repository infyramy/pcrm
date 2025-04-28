<template>
  <div class="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
    <div class="space-y-6">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <h2 class="text-3xl font-semibold tracking-tight">Page not found</h2>
      <p class="text-muted-foreground">Sorry, we couldn't find the page you're looking for.</p>
      <div class="mt-8">
        <router-link 
          to="/admin/dashboard" 
          class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          Go back to dashboard
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This page uses Vue Composition API with script setup
// No additional state or logic needed for this simple 404 page
</script> 