<template>
  <StudentGuard>
    <div class="min-h-full bg-gray-50">
      <CompHeader/>
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">
            Documents
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom du document</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'envoi</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="documents.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-gray-500">Aucun document</td>
                </tr>
                <tr v-for="document in documents" :key="document.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ document.filename }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(document.uploaded_at) }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ getDocIdLabel(document.typedocs_id) }}</td>
                  <td class="px-6 py-4">
                    <span
                      :class="{
                        'text-xs px-2 py-1 rounded-full': true,
                        'bg-green-100 text-green-700': document.status === 'Accepte',
                        'bg-yellow-100 text-yellow-700': document.status === 'Etude',
                        'bg-red-100 text-red-700': document.status === 'Refuse',
                      }"
                    >
                      {{ document.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm space-x-3">
                    <a
                      :href="`${BASE_URL}${document.file_url}`"
                      class="text-indigo-600 font-medium hover:underline"
                      target="_blank"
                    >
                      Voir
                    </a>
                    <button
                      @click="openEditModal(document)"
                      class="text-blue-600 font-medium hover:underline"
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Card View -->
          <div class="md:hidden space-y-4">
            <div v-if="documents.length === 0" class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Aucun document
            </div>
            
            <div v-for="document in documents" :key="document.id" class="bg-white rounded-lg shadow p-4 space-y-3">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-900 truncate">{{ document.filename }}</h3>
                  <p class="text-xs text-gray-500 mt-1">{{ getDocIdLabel(document.typedocs_id) }}</p>
                </div>
                <span
                  :class="{
                    'px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2': true,
                    'bg-green-100 text-green-700': document.status === 'Accepte',
                    'bg-yellow-100 text-yellow-700': document.status === 'Etude',
                    'bg-red-100 text-red-700': document.status === 'Refuse',
                  }"
                >
                  {{ document.status }}
                </span>
              </div>

              <div class="text-xs text-gray-500">
                <span class="font-medium">Date:</span> {{ formatDate(document.uploaded_at) }}
              </div>

              <div class="flex space-x-3 pt-2 border-t border-gray-100">
                <a
                  :href="`${BASE_URL}${document.file_url}`"
                  class="flex-1 text-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                  target="_blank"
                >
                  Voir
                </a>
                <button
                  @click="openEditModal(document)"
                  class="flex-1 text-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Edit Modal -->
      <div
        v-if="showEditModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeEditModal"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div class="flex justify-between items-center p-6 border-b">
            <h2 class="text-xl font-semibold text-gray-800">Remplacer le document</h2>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6">
            <p class="text-sm text-gray-600 mb-2">
              Document actuel: <span class="font-medium">{{ selectedDocument?.filename }}</span>
            </p>
            <p class="text-sm text-gray-500 mb-4">
              Sélectionnez un nouveau fichier pour remplacer ce document
            </p>

            <label class="block">
              <span class="sr-only">Choisir un fichier</span>
              <input
                type="file"
                @change="handleFileChange"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                class="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100
                  cursor-pointer"
              />
            </label>

            <p v-if="selectedFile" class="mt-2 text-sm text-green-600">
              Fichier sélectionné: {{ selectedFile.name }}
            </p>

            <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                @click="closeEditModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                @click="uploadNewDocument"
                :disabled="!selectedFile || uploading"
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ uploading ? 'Upload en cours...' : 'Remplacer' }}
              </button>
            </div>

            <p v-if="uploadError" class="mt-3 text-sm text-red-600">
              {{ uploadError }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </StudentGuard>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CompHeader from '../components/Dashboard/CompHeader.vue'
import { BASE_URL } from '../config'
import StudentGuard from '../components/StudentGuard.vue'

const documents = ref([])
const showEditModal = ref(false)
const selectedDocument = ref(null)
const selectedFile = ref(null)
const uploading = ref(false)
const uploadError = ref('')
let userParse

const fetchDocuments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/documents/${userParse.id}`)
    if (!response.ok) throw new Error('Error fetching documents')
    documents.value = await response.json()
  } catch (error) {
    console.error('Error fetching documents:', error)
  }
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

const getDocIdLabel = (DocId) => {
  switch (DocId) {
    case 6:
      return 'Identité'
    case 7:
      return 'Diplome'
    case 8:
      return 'Photo'
    case 4:
      return 'Bulletin & Baccalauréat'
    default:
      return 'Autre'
  }
}

const openEditModal = (document) => {
  selectedDocument.value = document
  selectedFile.value = null
  uploadError.value = ''
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  selectedDocument.value = null
  selectedFile.value = null
  uploadError.value = ''
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    uploadError.value = ''
  }
}

const uploadNewDocument = async () => {
  if (!selectedFile.value || !selectedDocument.value) return

  uploading.value = true
  uploadError.value = ''

  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    formData.append('student_id', userParse.id)

    const response = await fetch(`${BASE_URL}/api/documents/replace/${selectedDocument.value.id}`, {
      method: 'PUT',
      body: formData
    })

    if (!response.ok) {
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json()
        throw new Error(error.message || 'Erreur lors du remplacement du document')
      } else {
        const errorText = await response.text()
        console.error('Server returned HTML error:', errorText)
        throw new Error('Erreur serveur - vérifiez la console backend')
      }
    }

    await fetchDocuments()
    closeEditModal()
  } catch (error) {
    console.error('Error uploading document:', error)
    uploadError.value = error.message
  } finally {
    uploading.value = false
  }
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    userParse = user
  }
  fetchDocuments()
})
</script>