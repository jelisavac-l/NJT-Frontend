<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-ppp-white rounded-xl shadow-lg w-96 p-6">
      <h2 class="text-xl font-bold text-ppp-primary mb-4">Dodaj izvođača</h2>

      <label for="authorName" class="block mb-2 text-ppp-primary font-medium">Ime izvođača</label>
      <input
        id="authorName"
        v-model="authorName"
        type="text"
        placeholder="Unesite ime"
        class="w-full border border-ppp-muted rounded p-2 mb-4"
      />

      <div class="flex justify-end space-x-3">
        <button @click="close" class="px-4 py-2 bg-ppp-muted text-white rounded hover:bg-gray-600">
          Otkaži
        </button>
        <button @click="saveAuthor" class="px-4 py-2 bg-ppp-accent text-ppp-primary font-semibold rounded hover:bg-yellow-400">
          Sačuvaj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
})

const emits = defineEmits(['close', 'add'])
const authorName = ref('')

watch(() => props.visible, (val) => {
  if (val) authorName.value = ''
})

const close = () => {
  emits('close')
}

const saveAuthor = () => {
  if (!authorName.value.trim()) {
    alert('Ime izvođača ne sme biti prazno.')
    return
  }
  emits('add', authorName.value.trim())
  close()
}
</script>
