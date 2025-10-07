<template>
  <StudentGuard>
    <div class="min-h-full bg-gray-50">
      <CompHeader />
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">
            Lettres
          </h1>
        </div>
      </header>

      <!-- Main content -->
      <main class="py-6 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <!-- Desktop Table View -->
          <div class="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de génération</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="lettres.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-gray-500">Aucune lettre trouvée.</td>
                </tr>
                <tr v-for="lettre in lettres" :key="lettre.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ lettre.filename }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ getLetterType(lettre.typedocs_id) }}
                  </td>
                  <td class="px-6 py-4">
                    <span
                      :class="{
                        'px-2 py-1 text-xs font-medium rounded-full': true,
                        'bg-green-100 text-green-700': lettre.status === 'Accepte',
                        'bg-yellow-100 text-yellow-700': lettre.status === 'Etude',
                        'bg-red-100 text-red-700': lettre.status === 'Refuse',
                      }"
                    >
                      {{ lettre.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(lettre.uploaded_at) }}</td>
                  <td class="px-6 py-4 text-sm">
                    <a
                      :href="`${BASE_URL}/${lettre.file_url}`"
                      target="_blank"
                      class="text-indigo-600 font-medium hover:underline"
                    >
                      Voir
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Card View -->
          <div class="md:hidden space-y-4">
            <div v-if="lettres.length === 0" class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Aucune lettre trouvée.
            </div>
            
            <div v-for="lettre in lettres" :key="lettre.id" class="bg-white rounded-lg shadow p-4 space-y-3">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-900 truncate">{{ lettre.filename }}</h3>
                  <p class="text-xs text-gray-500 mt-1">{{ getLetterType(lettre.typedocs_id) }}</p>
                </div>
                <span
                  :class="{
                    'px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2': true,
                    'bg-green-100 text-green-700': lettre.status === 'Accepte',
                    'bg-yellow-100 text-yellow-700': lettre.status === 'Etude',
                    'bg-red-100 text-red-700': lettre.status === 'Refuse',
                  }"
                >
                  {{ lettre.status }}
                </span>
              </div>

              <div class="text-xs text-gray-500">
                <span class="font-medium">Date:</span> {{ formatDate(lettre.uploaded_at) }}
              </div>

              <div class="pt-2 border-t border-gray-100">
                <a
                  :href="`${BASE_URL}/${lettre.file_url}`"
                  target="_blank"
                  class="block text-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                >
                  Voir
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </StudentGuard>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CompHeader from '../components/Dashboard/CompHeader.vue'
import StudentGuard from '../components/StudentGuard.vue'
import { BASE_URL } from '../config'

const lettres = ref([])
let userParse

const getLetterType = (typeId) => {
  if (typeId === 2) return 'Offer letter'
  if (typeId === 3) return 'Admission letter'
  return 'Type inconnu'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const fetchLettres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/documents/letters/${userParse.id}`)
    if (!response.ok) throw new Error('Error fetching letters')
    lettres.value = await response.json()
  } catch (error) {
    console.error('Error fetching letters:', error)
  }
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    userParse = user
  }
  fetchLettres()
})
</script>