<script setup>
import { computed } from 'vue'
import GistBadge from '@/components/GistBadge.vue'
import GistDetailDate from '@/components/GistDetailDate.vue'

const props = defineProps({
  gist: {
    type: Object,
    required: true
  }
})

const mainFile = computed(() => Object.values(props.gist.files)[0])

const visibility = computed(() => (props.gist.public ? 'Public' : 'Secret'))

const filesCount = computed(() => Object.keys(props.gist.files).length)
</script>

<template>
  <div
    class="flex cursor-pointer justify-between gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
    tabindex="0"
    @click="$router.push({ name: 'gist-details', params: { id: gist.id } })"
  >
    <div class="flex grow items-center gap-3 overflow-hidden">
      <div class="flex shrink-0 items-center" @click.stop>
        <a :href="gist.owner.html_url" target="_blank" tabindex="-1">
          <img
            class="h-10 w-10 rounded-full object-cover"
            :src="gist.owner.avatar_url"
            alt="Owner avatar"
          />
        </a>
      </div>

      <div class="flex grow flex-col overflow-hidden">
        <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">
          <span @click.stop>
            <a class="text-gray-600 hover:underline" :href="gist.owner.html_url" target="_blank">{{
              gist.owner.login
            }}</a>
          </span>

          <span class="px-2">/</span>

          <span class="font-semibold">{{ mainFile.filename }}</span>
        </div>

        <GistDetailDate :gist="gist" />
      </div>
    </div>

    <div class="flex shrink-0 items-center gap-1">
      <GistBadge>{{ visibility }}</GistBadge>

      <GistBadge>{{ filesCount }} files</GistBadge>
    </div>
  </div>
</template>
