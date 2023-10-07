<script setup>
import { ref, computed, watch, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useGistStore } from '@/stores/gist'
import { scrollToBottom } from '@/utilities/scroll'
import { useIsUserGistOwner } from '@/composables/useIsUserGistOwner'
import GistContainer from '@/components/GistContainer.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import InputButton from '@/components/InputButton.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import BackToListButton from '@/components/BackToListButton.vue'

const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const router = useRouter()

const gistStore = useGistStore()

const description = ref('')

const publicValue = ref(false)

const files = ref([])

const isLoading = computed(
  () => !!(props.id && gistStore.loadings.includes(`gist-details-${props.id}`))
)

const isSaving = computed(() =>
  gistStore.loadings.some((loading) => ['gist-create'].includes(loading))
)

const existingDetails = computed(() =>
  props.id ? gistStore.gistsDetails.find((gist) => gist.id === props.id) || null : null
)

const canSave = computed(
  () =>
    !!(
      !isLoading.value &&
      !isSaving.value &&
      files.value.length &&
      files.value.every((file) => file.filename && file.content)
    )
)

const getEmptyFile = () => ({
  filename: '',
  content: ''
})

watch(
  () => props.id,

  (id) => {
    if (id) {
      gistStore.fetchDetails(id)
    }
  },

  { immediate: true }
)

const goToDetails = (id) => {
  return router.replace({ name: 'gist-details', params: { id } })
}

const { isUserGistOwner } = useIsUserGistOwner(existingDetails)

watchEffect(() => {
  if (existingDetails.value && !isUserGistOwner.value) {
    goToDetails(props.id)
  }
})

watch(
  existingDetails,

  (details) => {
    // When creating a new gist, initialize with an empty file
    if (!details) {
      files.value = [getEmptyFile()]

      return
    }

    // Initialize the edit form with the existing gist data

    description.value = details.description

    publicValue.value = details.public

    files.value = Object.values(details.files)
  },

  { immediate: true }
)

const addFile = () => {
  files.value.push(getEmptyFile())

  nextTick(scrollToBottom)
}

const removeFile = (index) => {
  files.value.splice(index, 1)
}

const save = async () => {
  if (!canSave.value) {
    return
  }

  const processedFiles = files.value.reduce((result, { filename, content }) => {
    result[filename] = { content }

    return result
  }, {})

  const parameters = [processedFiles, description.value, publicValue.value]

  let id = props.id

  // Create new
  if (!id) {
    id = await gistStore.create(...parameters)
  } else {
    await gistStore.update(id, ...parameters)
  }

  return goToDetails(id)
}
</script>

<template>
  <div>
    <BackToListButton class="mb-6" />

    <GistContainer :loading="isLoading" :exists="!!(!id || existingDetails)" class="text-gray-700">
      <div class="flex flex-col">
        <ContainerCard class="mb-6 flex items-end p-6">
          <label class="grow">
            Description

            <input
              v-model="description"
              class="mt-2 w-full rounded border px-2 py-1 hover:border-blue-200 focus:border-blue-400 focus:outline-none"
            />
          </label>

          <label class="ml-2 flex items-center gap-2 px-2 py-1">
            Public

            <input type="checkbox" v-model="publicValue" class="" />
          </label>
        </ContainerCard>

        <ContainerCard v-for="(file, index) in files" :key="index" class="mb-6 p-6">
          <div class="mb-4">
            <label>
              File name

              <input
                v-model="file.filename"
                class="mt-2 w-full rounded border px-2 py-1 hover:border-blue-200 focus:border-blue-400 focus:outline-none"
              />
            </label>
          </div>

          <div>
            <label>
              Content

              <textarea
                v-model="file.content"
                class="mt-2 w-full rounded border px-2 py-1 hover:border-blue-200 focus:border-blue-400 focus:outline-none"
                rows="10"
              />
            </label>
          </div>

          <template #corner-actions>
            <InputButton variant="danger" icon @click="removeFile(index)">
              <IconTrash />
            </InputButton>
          </template>
        </ContainerCard>

        <div class="flex justify-between">
          <InputButton class="flex items-center" @click="addFile">
            <IconPlus />

            <span class="mx-2">Add file</span>
          </InputButton>

          <InputButton
            :disabled="!canSave"
            class="flex items-center"
            variant="primary"
            @click="save"
          >
            <LoadingSpinner v-if="isSaving" class="text-white" />

            <IconCheck v-else />

            <span class="mx-2">Save</span>
          </InputButton>
        </div>
      </div>
    </GistContainer>
  </div>
</template>
