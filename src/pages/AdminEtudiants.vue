<template>
  <AdminGuard>
    <div class="min-h-full bg-gray-50">
      <NavAdmin />

      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">
            Gestion des Étudiants
          </h1>
        </div>
      </header>

      <main class="py-6 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-6">
          
          <!-- Section des filtres -->
          <div class="bg-white shadow rounded-lg p-4 sm:p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Filtres</h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'étudiant
                </label>
                <input 
                  v-model="filters.nom" 
                  type="text" 
                  placeholder="Nom de l'étudiant..."
                  class="w-full px-3 py-2 border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  v-model="filters.email" 
                  type="text" 
                  placeholder="Email..."
                  class="w-full px-3 py-2 border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input 
                  v-model="filters.phone" 
                  type="text" 
                  placeholder="Téléphone..."
                  class="w-full px-3 py-2 border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Pays
                </label>
                <select 
                  v-model="filters.country" 
                  class="w-full px-3 py-2 border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tous les pays</option>
                  <option 
                    v-for="country in uniqueCountries" 
                    :key="country" 
                    :value="country"
                  >
                    {{ country }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select 
                  v-model="filters.status" 
                  class="w-full px-3 py-2 border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tous les status</option>
                  <option value="etude_payee">Étude payée</option>
                  <option value="offre_envoyee">Offre envoyée</option>
                  <option value="admission_envoyee">Admission envoyée</option>
                  <option value="visa">Visa</option>
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
                {{ filteredStudents.length }} étudiant(s) trouvé(s)
              </div>
            </div>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto bg-white shadow rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom Prénoms</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="loading">
                  <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                    Chargement des étudiants...
                  </td>
                </tr>

                <tr v-if="filteredStudents.length === 0 && !loading">
                  <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                    Aucun étudiant trouvé avec ces filtres.
                  </td>
                </tr>

                <tr 
                  v-for="etudiant in paginatedStudents" 
                  :key="etudiant.id" 
                  class="hover:bg-gray-50"
                >
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ etudiant.full_name || 'Non renseigné' }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ etudiant.email || 'Non renseigné' }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ etudiant.phone || 'Non renseigné' }}</td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {{ etudiant.country || 'Non renseigné' }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <select
                      v-model="etudiant.status"
                      @change="updateStatus(etudiant.id, etudiant.status)"
                      class="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      :class="getStatusClass(etudiant.status)"
                    >
                      <option value="etude_payee">Étude payée</option>
                      <option value="offre_envoyee">Offre envoyée</option>
                      <option value="admission_envoyee">Admission envoyée</option>
                      <option value="visa">Visa</option>
                    </select>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(etudiant.created_at) }}</td>
                  <td class="px-6 py-4 text-sm space-x-2">
                    <button
                      @click="viewStudent(etudiant)"
                      class="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Voir
                    </button>
                    <button
                      @click="deleteStudent(etudiant.id)"
                      class="text-red-600 hover:text-red-800 hover:underline"
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
            <div v-if="loading" class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Chargement des étudiants...
            </div>

            <div v-if="filteredStudents.length === 0 && !loading" class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Aucun étudiant trouvé avec ces filtres.
            </div>
            
            <div v-for="etudiant in paginatedStudents" :key="etudiant.id" class="bg-white rounded-lg shadow p-4 space-y-3">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-900">{{ etudiant.full_name || 'Non renseigné' }}</h3>
                  <p class="text-xs text-gray-500 mt-1">{{ etudiant.email || 'Non renseigné' }}</p>
                  <p class="text-xs text-gray-500">{{ etudiant.phone || 'Non renseigné' }}</p>
                </div>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                  {{ etudiant.country || 'N/A' }}
                </span>
              </div>

              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="etudiant.status"
                  @change="updateStatus(etudiant.id, etudiant.status)"
                  class="w-full px-2 py-1 text-xs border border-gray-300 rounded-md"
                  :class="getStatusClass(etudiant.status)"
                >
                  <option value="etude_payee">Étude payée</option>
                  <option value="offre_envoyee">Offre envoyée</option>
                  <option value="admission_envoyee">Admission envoyée</option>
                  <option value="visa">Visa</option>
                </select>
              </div>

              <div class="text-xs text-gray-500">
                <span class="font-medium">Inscription:</span> {{ formatDate(etudiant.created_at) }}
              </div>

              <div class="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                <button
                  @click="viewStudent(etudiant)"
                  class="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                >
                  Voir
                </button>
                <button
                  @click="deleteStudent(etudiant.id)"
                  class="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div 
            v-if="filteredStudents.length > itemsPerPage" 
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
                    <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredStudents.length) }}</span> 
                    sur 
                    <span class="font-medium">{{ filteredStudents.length }}</span> 
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

      <!-- Modal de détails -->
      <div 
        v-if="showModal" 
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4"
        @click="closeModal"
      >
        <div 
          class="relative top-4 sm:top-20 mx-auto p-4 sm:p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white"
          @click.stop
        >
          <div class="flex items-center justify-between pb-4 border-b">
            <h3 class="text-lg font-medium text-gray-900">
              Détails de l'étudiant
            </h3>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mt-4" v-if="selectedStudent">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h4 class="text-md font-semibold text-gray-800 border-b pb-2">
                  Informations personnelles
                </h4>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                  <p class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
                    {{ selectedStudent.full_name || 'Non renseigné' }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <p class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded break-words">
                    {{ selectedStudent.email || 'Non renseigné' }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                  <p class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
                    {{ selectedStudent.phone || 'Non renseigné' }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Pays</label>
                  <p class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
                    {{ selectedStudent.country || 'Non renseigné' }}
                  </p>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-md font-semibold text-gray-800 border-b pb-2">
                  Informations système
                </h4>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700">ID Étudiant</label>
                  <p class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
                    #{{ selectedStudent.id }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Date d'inscription</label>
                  <p class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded">
                    {{ formatDate(selectedStudent.created_at) }}
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Status</label>
                  <p class="mt-1">
                    <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusClass(selectedStudent.status)]">
                      {{ getStatusLabel(selectedStudent.status) }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end pt-4 border-t mt-6">
            <button 
              @click="closeModal"
              class="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminGuard>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import NavAdmin from '@/components/Dashboard/Admin/NavAdmin.vue'
import { BASE_URL } from '@/config'
import AdminGuard from '@/components/AdminGuard.vue'

const etudiants = ref([])
const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showModal = ref(false)
const selectedStudent = ref(null)

const filters = ref({
  nom: '',
  email: '',
  phone: '',
  country: '',
  status: ''
})

const fetchEtudiants = async () => {
  loading.value = true
  try {
    const response = await fetch(`${BASE_URL}/api/users`)
    if (!response.ok) throw new Error('Erreur lors du chargement des étudiants')
    etudiants.value = await response.json()
  } catch (error) {
    console.error('Erreur fetch étudiants:', error)
  } finally {
    loading.value = false
  }
}

const deleteStudent = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) return
  
  try {
    const response = await fetch(`${BASE_URL}/api/users/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Erreur lors de la suppression')
    await fetchEtudiants()
  } catch (error) {
    console.error('Erreur suppression étudiant:', error)
    alert('Échec de la suppression de l\'étudiant.')
  }
}

const uniqueCountries = computed(() => {
  const countries = [...new Set(etudiants.value
    .map(etudiant => etudiant.country)
    .filter(country => country && country.trim() !== '')
  )]
  return countries.sort()
})

const filteredStudents = computed(() => {
  return etudiants.value.filter(etudiant => {
    const matchNom = !filters.value.nom || 
      (etudiant.full_name && etudiant.full_name.toLowerCase().includes(filters.value.nom.toLowerCase()))
    const matchEmail = !filters.value.email || 
      (etudiant.email && etudiant.email.toLowerCase().includes(filters.value.email.toLowerCase()))
    const matchPhone = !filters.value.phone || 
      (etudiant.phone && etudiant.phone.toLowerCase().includes(filters.value.phone.toLowerCase()))
    const matchCountry = !filters.value.country || etudiant.country === filters.value.country
    const matchStatus = !filters.value.status || etudiant.status === filters.value.status
    return matchNom && matchEmail && matchPhone && matchCountry && matchStatus
  })
})

const totalPages = computed(() => Math.ceil(filteredStudents.value.length / itemsPerPage.value))

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredStudents.value.slice(start, end)
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
  filters.value = { nom: '', email: '', phone: '', country: '', status: '' }
  currentPage.value = 1
}

const formatDate = (dateString) => {
  if (!dateString) return 'Non renseigné'
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

const viewStudent = (student) => {
  selectedStudent.value = student
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedStudent.value = null
}

const updateStatus = async (studentId, newStatus) => {
  try {
    const response = await fetch(`${BASE_URL}/api/applications/${studentId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, studentId: studentId }),
    })
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du status')
    const student = etudiants.value.find(s => s.id === studentId)
    if (student) student.status = newStatus
  } catch (error) {
    console.error('Erreur mise à jour status:', error)
    await fetchEtudiants()
  }
}

const getStatusClass = (status) => {
  const statusClasses = {
    'etude_payee': 'bg-blue-100 text-blue-800',
    'offre_envoyee': 'bg-purple-100 text-purple-800',
    'admission_envoyee': 'bg-orange-100 text-orange-800',
    'visa': 'bg-green-100 text-green-800'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStatusLabel = (status) => {
  const statusLabels = {
    'etude_payee': 'Étude payée',
    'offre_envoyee': 'Offre envoyée',
    'admission_envoyee': 'Admission envoyée',
    'visa': 'Visa'
  }
  return statusLabels[status] || 'Non défini'
}

watch(filters, () => { currentPage.value = 1 }, { deep: true })

onMounted(() => {
  fetchEtudiants()
})
</script>