<template>
  <AdminGuard>
    <div class="min-h-full bg-gray-50">
      <NavAdmin />
      
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">
            Documents étudiants
          </h1>
        </div>
      </header>

      <main class="py-6 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-6">
          
          <!-- Section des filtres -->
          <div class="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Filtres</h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Rechercher par nom
                </label>
                <input
                  v-model="filters.name"
                  type="text"
                  placeholder="Nom de l'étudiant..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nom du fichier
                </label>
                <input 
                  v-model="filters.filename" 
                  type="text" 
                  placeholder="Nom du fichier..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select 
                  v-model="filters.status" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tous les statuts</option>
                  <option value="Etude">En étude</option>
                  <option value="Accepte">Accepté</option>
                  <option value="Refuse">Refusé</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Type de document
                </label>
                <select 
                  v-model="filters.type" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tous les types</option>
                  <option 
                    v-for="type in uniqueTypes" 
                    :key="type.id" 
                    :value="type.id"
                  >
                    {{ type.lib }}
                  </option>
                </select>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 space-y-2 sm:space-y-0">
              <button 
                @click="clearFilters" 
                class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Réinitialiser les filtres
              </button>
              <div class="text-sm text-gray-600">
                {{ filteredDocuments.length }} document(s) trouvé(s)
              </div>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto bg-white shadow rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiant</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fichier</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="filteredDocuments.length === 0">
                  <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                    Aucun document trouvé avec ces filtres.
                  </td>
                </tr>
                <tr 
                  v-for="doc in paginatedDocuments" 
                  :key="doc.id" 
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ doc.full_name }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ doc.filename }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ doc.type_name }}</td>
                  <td class="px-6 py-4">
                    <span 
                      :class="getStatusClass(doc.status)" 
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ getStatusLabel(doc.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(doc.uploaded_at) }}</td>
                  <td class="px-6 py-4 text-sm space-x-2">
                    <a 
                      :href="`${BASE_URL}${doc.file_url}`"
                      target="_blank" 
                      class="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Voir
                    </a>
                    <button 
                      @click="updateStatus(doc.id, 'Accepte')"
                      class="text-green-600 hover:text-green-800 hover:underline"
                      style="margin-right: 10px;"
                    >
                      Valider
                    </button>
                    <button 
                      @click="updateStatus(doc.id, 'Refuse')"
                      class="text-red-600 hover:text-red-800 hover:underline"
                      style="margin-right: 10px;"
                    >
                      Rejeter
                    </button>
                    <button
                      @click="deleteDocument(doc.id)"
                      class="text-gray-600 hover:text-gray-800 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile/Tablet Card View -->
          <div class="lg:hidden space-y-4">
            <div v-if="filteredDocuments.length === 0" class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Aucun document trouvé avec ces filtres.
            </div>
            
            <div v-for="doc in paginatedDocuments" :key="doc.id" class="bg-white rounded-lg shadow p-4 space-y-3">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-900">{{ doc.full_name }}</h3>
                  <p class="text-xs text-gray-500 mt-1 truncate">{{ doc.filename }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ doc.type_name }}</p>
                </div>
                <span 
                  :class="getStatusClass(doc.status)" 
                  class="px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2"
                >
                  {{ getStatusLabel(doc.status) }}
                </span>
              </div>

              <div class="text-xs text-gray-500">
                <span class="font-medium">Date:</span> {{ formatDate(doc.uploaded_at) }}
              </div>

              <div class="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <a
                  :href="`${BASE_URL}/${doc.file_url}`"
                  target="_blank"
                  class="text-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                >
                  Voir
                </a>
                <button
                  @click="updateStatus(doc.id, 'Accepte')"
                  class="px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100"
                >
                  Valider
                </button>
                <button
                  @click="updateStatus(doc.id, 'Refuse')"
                  class="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                >
                  Rejeter
                </button>
                <button
                  @click="deleteDocument(doc.id)"
                  class="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div 
            v-if="filteredDocuments.length > itemsPerPage" 
            class="bg-white rounded-lg shadow px-4 py-3"
          >
            <div class="flex items-center justify-between">
              <div class="flex-1 flex justify-between sm:hidden">
                <button 
                  @click="previousPage" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Précédent
                </button>
                <button 
                  @click="nextPage" 
                  :disabled="currentPage === totalPages"
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </button>
              </div>
              
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    Affichage de
                    <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                    à
                    <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredDocuments.length) }}</span>
                    sur
                    <span class="font-medium">{{ filteredDocuments.length }}</span>
                    résultats
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      @click="previousPage"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    
                    <button
                      v-for="page in visiblePages"
                      :key="page"
                      @click="goToPage(page)"
                      :class="[
                        page === currentPage
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                      ]"
                    >
                      {{ page }}
                    </button>
                    
                    <button 
                      @click="nextPage" 
                      :disabled="currentPage === totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </AdminGuard>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import NavAdmin from '@/components/Dashboard/Admin/NavAdmin.vue'
import AdminGuard from '@/components/AdminGuard.vue'
import { BASE_URL } from '@/config'

const documents = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)

const filters = ref({
  name: '',
  filename: '',
  status: '',
  type: ''
})

const fetchDocuments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/documents`)
    if (!response.ok) throw new Error('Erreur lors du chargement')
    documents.value = await response.json()
  } catch (error) {
    console.error('Erreur fetch documents:', error)
  }
}

const updateStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`${BASE_URL}/api/documents/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
    
    if (!response.ok) throw new Error("Erreur lors de la mise à jour")
    
    if (window.$notify) {
      window.$notify.updated('Statut du document')
    }
    
    await fetchDocuments()
  } catch (error) {
    console.error("Erreur mise à jour status:", error)
    if (window.$notify) {
      window.$notify.error("Échec de la mise à jour du statut.", "Erreur de mise à jour")
    }
  }
}

const deleteDocument = async (id) => {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) return
  
  try {
    const response = await fetch(`${BASE_URL}/api/documents/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Erreur lors de la suppression du document")
    
    if (window.$notify) {
      window.$notify.deleted("Document supprimé")
    }
    await fetchDocuments()
  } catch (error) {
    console.error("Erreur suppression document:", error)
    if (window.$notify) {
      window.$notify.error("Échec de la suppression du document.", "Erreur de suppression")
    }
  }
}

const uniqueTypes = computed(() => {
  const typeMap = new Map()
  documents.value.forEach(doc => {
    if (!typeMap.has(doc.typedocs_id)) {
      typeMap.set(doc.typedocs_id, { id: doc.typedocs_id, lib: doc.type_name })
    }
  })
  return Array.from(typeMap.values()).sort((a, b) => a.lib.localeCompare(b.lib))
})

const filteredDocuments = computed(() => {
  return documents.value.filter(doc => {
    const matchName = !filters.value.name || 
      doc.full_name.toLowerCase().includes(filters.value.name.toLowerCase())
    const matchFilename = !filters.value.filename || 
      doc.filename.toLowerCase().includes(filters.value.filename.toLowerCase())
    const matchStatus = !filters.value.status || doc.status === filters.value.status
    const matchType = !filters.value.type || doc.typedocs_id.toString() === filters.value.type.toString()
    return matchName && matchFilename && matchStatus && matchType
  })
})

const totalPages = computed(() => Math.ceil(filteredDocuments.value.length / itemsPerPage.value))

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredDocuments.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  start = Math.max(1, end - maxVisible + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const clearFilters = () => {
  filters.value = { name: '', filename: '', status: '', type: '' }
  currentPage.value = 1
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Accepte': return 'bg-green-100 text-green-800'
    case 'Refuse': return 'bg-red-100 text-red-800'
    default: return 'bg-yellow-100 text-yellow-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'Accepte': return 'Accepté'
    case 'Refuse': return 'Refusé'
    default: return 'En étude'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page) => {
  currentPage.value = page
}

watch(filters, () => { currentPage.value = 1 }, { deep: true })

onMounted(() => {
  fetchDocuments()
})
</script>