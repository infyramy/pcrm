<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Development Mode Helper -->
      <div v-if="isDevelopment" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-sm font-medium text-blue-900">Development Mode</span>
        </div>
        <div class="text-xs text-blue-700 space-y-1">
          <p><strong>Access Codes:</strong> test123, demo456, dev789, client001</p>
          <p><strong>OTP Codes:</strong> 123456, 000000, 111111</p>
          <p class="text-blue-600">Or use any code with 3+ characters and any 6-digit OTP</p>
        </div>
      </div>

      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
          <svg class="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-semibold tracking-tight text-foreground mb-2">
          Client Portal
        </h1>
        <p class="text-sm text-muted-foreground">Enter your access code to continue</p>
      </div>

      <!-- Login Form -->
      <Card v-if="!showOTPStep">
        <CardContent class="grid gap-4 pt-6">
          <form @submit.prevent="handleCodeSubmit" class="grid gap-4">
            <div class="grid gap-2">
              <Label for="code">Access Code</Label>
              <Input
                id="code"
                v-model="accessCode"
                type="text"
                placeholder="Enter your access code"
                :disabled="isLoading"
                required
              />
              <!-- Development Quick Actions -->
              <div v-if="isDevelopment" class="flex gap-1 flex-wrap">
                <button
                  v-for="code in mockAccessCodes"
                  :key="code"
                  type="button"
                  @click="accessCode = code"
                  class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border text-gray-600"
                >
                  {{ code }}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              class="w-full" 
              :disabled="isLoading || !accessCode.trim()"
              size="lg"
            >
              <span v-if="isLoading" class="flex items-center gap-2">
                <span class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Verifying...
              </span>
              <span v-else>Continue</span>
            </Button>

            <div v-if="error" class="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md">
              {{ error }}
            </div>
          </form>
        </CardContent>
      </Card>

      <!-- OTP Verification Step -->
      <Card v-else>
        <CardContent class="grid gap-6 pt-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-foreground mb-2">Verify Your Identity</h2>
            <p class="text-sm text-muted-foreground">
              We've sent a verification code to your WhatsApp number
              <span v-if="isDevelopment" class="block text-blue-600 font-medium mt-1">(Development Mode)</span>
            </p>
          </div>

          <form @submit.prevent="handleOTPSubmit" class="grid gap-4">
            <div class="grid gap-2">
              <Label for="otp">Verification Code</Label>
              <Input
                id="otp"
                v-model="otpCode"
                type="text"
                placeholder="Enter 6-digit code"
                class="text-center text-lg tracking-wider"
                :disabled="isLoading"
                maxlength="6"
                required
              />
              <p class="text-xs text-muted-foreground text-center">Enter the 6-digit code from WhatsApp</p>
              
              <!-- Development Quick Actions -->
              <div v-if="isDevelopment" class="flex gap-1 justify-center flex-wrap">
                <button
                  v-for="otp in mockOTPs"
                  :key="otp"
                  type="button"
                  @click="otpCode = otp"
                  class="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border text-gray-600"
                >
                  {{ otp }}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              class="w-full" 
              :disabled="isLoading || otpCode.length !== 6"
              size="lg"
            >
              <span v-if="isLoading" class="flex items-center gap-2">
                <span class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Verifying...
              </span>
              <span v-else>Verify & Continue</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              @click="handleResendOTP"
              :disabled="isLoading || resendCooldown > 0"
              class="w-full"
            >
              <span v-if="resendCooldown > 0">
                Resend code in {{ resendCooldown }}s
              </span>
              <span v-else>Didn't receive the code? Resend</span>
            </Button>

            <div v-if="error" class="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md">
              {{ error }}
            </div>
          </form>

          <Button
            variant="ghost"
            @click="goBackToCodeStep"
            class="w-full"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to access code
          </Button>
        </CardContent>
      </Card>

      <!-- Footer -->
      <div class="text-center mt-6 text-sm text-muted-foreground space-y-1">
        <p>Having trouble accessing your account?</p>
        <p>Contact your photographer for assistance.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientAuthStore } from '@/stores/clientAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const route = useRoute()
const clientAuthStore = useClientAuthStore()

// Development mode detection
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development'

// Mock data for development helper
const mockAccessCodes = ['test123', 'demo456', 'dev789', 'client001']
const mockOTPs = ['123456', '000000', '111111']

const accessCode = ref('')
const otpCode = ref('')
const showOTPStep = ref(false)
const resendCooldown = ref(0)

const isLoading = computed(() => clientAuthStore.isLoading)
const error = computed(() => clientAuthStore.error)

// Auto-fill code from query string
onMounted(() => {
  const codeFromQuery = route.query.code as string
  if (codeFromQuery) {
    accessCode.value = codeFromQuery
  }
})

// Handle access code submission
async function handleCodeSubmit() {
  if (!accessCode.value.trim()) return

  try {
    const result = await clientAuthStore.verifyCode({ code: accessCode.value.trim() })
    
    if (result.requiresOTP) {
      showOTPStep.value = true
      otpCode.value = ''
    }
    // If no OTP required, store will handle redirect automatically
  } catch (error) {
    // Error handling is done in the store
    console.error('Code verification failed:', error)
  }
}

// Handle OTP submission
async function handleOTPSubmit() {
  if (otpCode.value.length !== 6) return

  try {
    await clientAuthStore.verifyOTP(otpCode.value)
    // Store will handle redirect to /client/home
  } catch (error) {
    // Error handling is done in the store
    console.error('OTP verification failed:', error)
  }
}

// Handle resend OTP
async function handleResendOTP() {
  try {
    await clientAuthStore.resendOTP()
    
    // Start cooldown timer
    resendCooldown.value = 30
    const interval = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(interval)
      }
    }, 1000)
  } catch (error) {
    // Error handling is done in the store
    console.error('Resend OTP failed:', error)
  }
}

// Go back to code step
function goBackToCodeStep() {
  showOTPStep.value = false
  otpCode.value = ''
  clientAuthStore.error = null
}
</script>

<style lang="scss" scoped>
// Component-specific styles if needed
</style>
