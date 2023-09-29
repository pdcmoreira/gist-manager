<script setup>
import { useRouter, RouterView } from 'vue-router'
import { useGithubOAuthFlow } from './composables/useGithubOAuthFlow'
import { useUserStore } from './stores/user'
import NavBar from './components/NavBar.vue'
import InputButton from '@/components/InputButton.vue'

const router = useRouter()

const userStore = useUserStore()

const { authorizeUrl, isLoading } = useGithubOAuthFlow()

const logout = () => {
  userStore.accessToken = null

  router.push({ name: 'home' })
}
</script>

<template>
  <!-- TODO: make a pretty loading -->
  <div v-if="isLoading">Loading...</div>

  <div class="mx-auto p-4 sm:max-w-6xl sm:p-10">
    <NavBar class="mb-4 sm:mb-10">
      <div>
        <InputButton v-if="!userStore.isLoggedIn" variant="primary" :href="authorizeUrl">
          Log in with GitHub
        </InputButton>

        <template v-else>
          <InputButton v-if="$route.name !== 'gists'" variant="primary" :to="{ name: 'gists' }">
            Go to gists
          </InputButton>

          <InputButton class="ml-2" @click="logout">Logout</InputButton>
        </template>
      </div>
    </NavBar>

    <RouterView />
  </div>
</template>
