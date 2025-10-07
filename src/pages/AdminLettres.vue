<template>
  <AdminGuard>
    <div class="min-h-full">
      <NavAdmin />
      
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
          <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">
            Lettres générées
          </h1>
        </div>
      </header>

      <main class="py-4 sm:py-6 lg:py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <!-- Section des filtres -->
          <div class="bg-white shadow rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
              <h2 class="text-base sm:text-lg font-medium text-gray-900">Filtres</h2>
              <button
                @click="showForm = !showForm"
                class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-dark text-sm font-semibold px-4 py-2 rounded shadow transition-colors duration-200"
              >
                {{ showForm ? '- Fermer le formulaire' : '+ Ajouter un document' }}
              </button>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <!-- Filtre par nom -->
              <div>
                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Nom de l'étudiant
                </label>
                <input 
                  v-model="filters.nom" 
                  type="text" 
                  placeholder="Nom de l'étudiant..."
                  class="w-full px-3 py-2 text-sm border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <!-- Filtre par nom de fichier -->
              <div>
                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Nom du fichier
                </label>
                <input 
                  v-model="filters.filename" 
                  type="text" 
                  placeholder="Nom du fichier..."
                  class="w-full px-3 py-2 text-sm border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <!-- Filtre par statut -->
              <div>
                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select 
                  v-model="filters.status" 
                  class="w-full px-3 py-2 text-sm border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tous les statuts</option>
                  <option value="Etude">En étude</option>
                  <option value="Accepte">Accepté</option>
                  <option value="Refuse">Refusé</option>
                </select>
              </div>

              <!-- Filtre par type -->
              <div>
                <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Type de lettre
                </label>
                <select 
                  v-model="filters.type" 
                  class="w-full px-3 py-2 text-sm border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

            <!-- Boutons d'action pour les filtres -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
              <button 
                @click="clearFilters" 
                class="w-full sm:w-auto px-4 py-2 text-sm text-gray-600 bg-gray-100 border rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Réinitialiser les filtres
              </button>
              <div class="text-xs sm:text-sm text-gray-600 text-center sm:text-right">
                {{ filteredDocuments.length }} lettre(s) trouvée(s)
              </div>
            </div>
          </div>

          <!-- Formulaire d'ajout (conditionnel) -->
          <div v-if="showForm" class="bg-white shadow rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-4">Ajouter une nouvelle lettre</h3>
            <AddLetter @letter-added="onLetterAdded" />
          </div>

          <!-- Tableau des lettres - Desktop -->
          <div class="hidden lg:block overflow-x-auto bg-white shadow border rounded-lg">
            <table class="min-w-full text-left text-sm">
              <thead class="bg-gray-100 text-gray-600 uppercase text-xs font-medium">
                <tr>
                  <th class="p-4">Nom de l'étudiant</th>
                  <th class="p-4">Nom du fichier</th>
                  <th style="text-align: center;" class="p-4">Type de lettre</th>
                  <th class="p-4">Date de création</th>
                  <th class="p-4">Statut</th>
                  <th class="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="doc in paginatedDocuments" 
                  :key="doc.id" 
                  class="border-t hover:bg-gray-50 transition-colors duration-150"
                >
                  <td class="p-4 font-medium">{{ doc.full_name }}</td>
                  <td class="p-4">
                    <span class="text-gray-600">{{ doc.filename }}</span>
                  </td>
                  <td class="p-2" style="text-align: center;">
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {{ getTypeLabel(doc.typedocs_id) }}
                    </span>
                  </td>
                  <td class="p-4">
                    {{ formatDate(doc.uploaded_at) }}
                  </td>
                  <td class="p-4">
                    <span 
                      :class="getStatusClass(doc.status)"
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ getStatusLabel(doc.status) }}
                    </span>
                  </td>
                  <td class="p-4">
                    <div class="flex space-x-2">
                      <a 
                        :href="`${BASE_URL}${doc.file_url}`" 
                        target="_blank" 
                        class="text-indigo-600 hover:text-indigo-800 hover:underline text-sm transition-colors duration-200"
                      >
                        Voir
                      </a>
                      <button 
                        @click="updateStatus(doc.id, 'Accepte')" 
                        class="text-green-600 hover:text-green-800 hover:underline text-sm transition-colors duration-200"
                      >
                        Valider
                      </button>
                      <button 
                        @click="updateStatus(doc.id, 'Refuse')"
                        class="text-red-600 hover:text-red-800 px-2 hover:underline text-sm transition-colors duration-200"
                      >
                        Rejeter
                      </button>
                      <button
                        @click="deleteDocument(doc.id)" 
                        class="text-gray-600 hover:text-gray-800 hover:underline text-sm transition-colors duration-200"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredDocuments.length === 0">
                  <td colspan="6" class="p-8 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Aucune lettre trouvée avec ces filtres.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Cards View - Mobile & Tablet -->
          <div class="lg:hidden space-y-4">
            <div
              v-for="doc in paginatedDocuments"
              :key="doc.id"
              class="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <!-- Header with Student Name and Status -->
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <p class="text-xs text-gray-500 mb-1">Nom de l'étudiant</p>
                  <p class="font-medium text-gray-900 text-sm">{{ doc.full_name }}</p>
                </div>
                <span 
                  :class="getStatusClass(doc.status)" 
                  class="px-2 py-1 rounded-full text-xs font-medium ml-2"
                >
                  {{ getStatusLabel(doc.status) }}
                </span>
              </div>

              <!-- Filename -->
              <div class="mb-3">
                <p class="text-xs text-gray-500 mb-1">Nom du fichier</p>
                <p class="text-gray-900 text-sm break-words">{{ doc.filename }}</p>
              </div>

              <!-- Type and Date -->
              <div class="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p class="text-xs text-gray-500 mb-1">Type de lettre</p>
                  <span class="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                    {{ getTypeLabel(doc.typedocs_id) }}
                  </span>
                </div>
                <div>
                  <p class="text-xs text-gray-500 mb-1">Date de création</p>
                  <p class="text-gray-900 text-xs">{{ formatDateShort(doc.uploaded_at) }}</p>
                </div>
              </div>

              <!-- Actions -->
              <div class="grid grid-cols-2 gap-2 pt-3 border-t border-gray-200">
                <a
                  :href="`${BASE_URL}/${doc.file_url}`"
                  target="_blank"
                  class="col-span-2 text-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md text-xs font-medium hover:bg-indigo-100 transition-colors duration-200"
                >
                  Voir le document
                </a>
                <button
                  @click="updateStatus(doc.id, 'Accepte')"
                  class="px-3 py-2 bg-green-50 text-green-600 rounded-md text-xs font-medium hover:bg-green-100 transition-colors duration-200"
                >
                  Valider
                </button>
                <button 
                  @click="updateStatus(doc.id, 'Refuse')"
                  class="px-3 py-2 bg-red-50 text-red-600 rounded-md text-xs font-medium hover:bg-red-100 transition-colors duration-200"
                >
                  Rejeter
                </button>
                <button
                  @click="deleteDocument(doc.id)"
                  class="col-span-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Supprimer
                </button>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredDocuments.length === 0" class="bg-white shadow rounded-lg p-8 text-center">
              <svg class="w-12 h-12 text-gray-300 mb-2 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-gray-500 text-sm">Aucune lettre trouvée avec ces filtres.</p>
            </div>
          </div>

          <!-- Pagination -->
          <div 
            v-if="filteredDocuments.length > itemsPerPage" 
            class="mt-4 sm:mt-6 px-4 py-3 bg-white shadow rounded-lg border border-gray-200"
          >
            <div class="flex items-center justify-between">
              <!-- Mobile pagination -->
              <div class="flex-1 flex justify-between sm:hidden">
                <button 
                  @click="previousPage" 
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Précédent
                </button>
                <span class="text-xs text-gray-700 flex items-center">
                  Page {{ currentPage }} / {{ totalPages }}
                </span>
                <button 
                  @click="nextPage" 
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Suivant
                </button>
              </div>
              
              <!-- Desktop pagination -->
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-xs sm:text-sm text-gray-700">
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
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <span class="sr-only">Précédent</span>
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
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200'
                      ]"
                    >
                      {{ page }}
                    </button>
                    
                    <button 
                      @click="nextPage" 
                      :disabled="currentPage === totalPages"
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <span class="sr-only">Suivant</span>
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
import { ref, onMounted, computed, watch } from 'vue';
import NavAdmin from '@/components/Dashboard/Admin/NavAdmin.vue';
import AddLetter from '@/components/Dashboard/LetterForm.vue';
import AdminGuard from '@/components/AdminGuard.vue';
import { BASE_URL } from '@/config';

// ===========================
// REACTIVE DATA
// ===========================
const documents = ref([]);
const showForm = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Filtres
const filters = ref({
  nom: '',
  filename: '',
  status: '',
  type: ''
});

// ===========================
// API CALLS
// ===========================
const fetchDocuments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/documents/letters`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement');
    }
    documents.value = await response.json();
    console.log('Lettres chargées:', documents.value);
  } catch (error) {
    console.error('Erreur fetch documents:', error);
  }
};

const updateStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`${BASE_URL}/api/documents/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour");
    }

    const result = await response.json();
    console.log(result.message);

    // Recharge les documents après mise à jour
    await fetchDocuments();
  } catch (error) {
    console.error("Erreur mise à jour status:", error);
    
    // Remplacer alert par notification
    if (window.$notify) {
      window.$notify.error("Échec de la mise à jour du statut.", "Erreur de mise à jour")
    }
  }
};

const deleteDocument = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette lettre ?')) {
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/documents/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }

    console.log('Document supprimé');
    
    // Notification de succès
    if (window.$notify) {
      window.$notify.deleted('Lettre')
    }
    
    // Recharge les documents après suppression
    await fetchDocuments();
  } catch (error) {
    console.error("Erreur suppression document:", error);
    
    // Remplacer alert par notification
    if (window.$notify) {
      window.$notify.error("Échec de la suppression du document.", "Erreur de suppression")
    }
  }
};

// ===========================
// COMPUTED PROPERTIES
// ===========================
const uniqueTypes = computed(() => {
  const typeMap = new Map();
  documents.value
    .filter(doc => doc.typedocs_id === 2 || doc.typedocs_id === 3)
    .forEach(doc => {
      if (!typeMap.has(doc.typedocs_id)) {
        typeMap.set(doc.typedocs_id, {
          id: doc.typedocs_id,
          lib: getTypeLabel(doc.typedocs_id)
        });
      }
    });
  return Array.from(typeMap.values()).sort((a, b) => a.lib.localeCompare(b.lib));
});

const filteredDocuments = computed(() => {
  return documents.value
    .filter(doc => doc.typedocs_id === 2 || doc.typedocs_id === 3)
    .filter(doc => {
      const matchNom = !filters.value.nom || 
        doc.full_name.toLowerCase().includes(filters.value.nom.toLowerCase());
      
      const matchFilename = !filters.value.filename || 
        doc.filename.toLowerCase().includes(filters.value.filename.toLowerCase());
      
      const matchStatus = !filters.value.status || 
        doc.status === filters.value.status;
      
      const matchType = !filters.value.type || 
        doc.typedocs_id.toString() === filters.value.type.toString();

      return matchNom && matchFilename && matchStatus && matchType;
    });
});

const totalPages = computed(() => {
  return Math.ceil(filteredDocuments.value.length / itemsPerPage.value);
});

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredDocuments.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

// ===========================
// METHODS
// ===========================
const clearFilters = () => {
  filters.value = {
    nom: '',
    filename: '',
    status: '',
    type: ''
  };
  currentPage.value = 1;
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Accepte':
      return 'bg-green-100 text-green-800';
    case 'Refuse':
      return 'bg-red-100 text-red-800';
    case 'Etude':
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'Accepte':
      return 'Accepté';
    case 'Refuse':
      return 'Refusé';
    case 'Etude':
    default:
      return 'En étude';
  }
};

const getTypeLabel = (typeId) => {
  switch (typeId) {
    case 2:
      return 'Offer letter';
    case 3:
      return 'Admission letter';
    default:
      return `Type ${typeId}`;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatDateShort = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const onLetterAdded = () => {
  // Callback quand une nouvelle lettre est ajoutée
  fetchDocuments();
  showForm.value = false;
};

// Pagination methods
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

// ===========================
// WATCHERS
// ===========================
// Reset pagination when filters change
watch(filters, () => {
  currentPage.value = 1;
}, { deep: true });

// ===========================
// LIFECYCLE
// ===========================
onMounted(() => {
  fetchDocuments();
});
</script>

<style scoped>
/* Transitions personnalisées si nécessaire */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>