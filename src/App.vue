<script setup>
import { useRouter, RouterView } from 'vue-router'
import { useGithubOAuthFlow } from '@/composables/useGithubOAuthFlow'
import { useUserStore } from '@/stores/user'
import FadeTransition from '@/components/FadeTransition.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import NavBar from '@/components/NavBar.vue'
import InputButton from '@/components/InputButton.vue'

const router = useRouter()

const userStore = useUserStore()

const { authorizeUrl, isLoading } = useGithubOAuthFlow()

const logout = () => {
  userStore.setToken(null)

  router.push({ name: 'home' })
}
</script>

<template>
  <FadeTransition>
    <div v-if="isLoading" class="flex h-full w-full flex-col items-center justify-center">
      <LoadingSpinner size="xl" />

      <div class="mt-6 text-gray-500">Loading, please wait...</div>
    </div>

    <div v-else class="mx-auto p-4 sm:max-w-6xl sm:p-10">
      <NavBar class="mb-4 sm:mb-10">
        <div>
          <InputButton v-if="!userStore.isLoggedIn" variant="primary" :href="authorizeUrl">
            Log in with GitHub
          </InputButton>

          <template v-else>
            <InputButton v-if="$route.name === 'home'" variant="primary" :to="{ name: 'gists' }">
              Go to gists
            </InputButton>

            <InputButton class="ml-2" @click="logout">Logout</InputButton>
          </template>
        </div>
      </NavBar>

      <RouterView />
    </div>
  </FadeTransition>
</template>
