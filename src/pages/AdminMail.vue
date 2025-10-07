<template>
  <AdminGuard>
    <div class="min-h-full">
      <NavAdmin />
      
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900" style="font-size: 50px;">
            Envoi de mails
          </h1>
        </div>
      </header>

      <main class="py-10">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          
          <!-- Section des filtres et sélection -->
          <div class="bg-white shadow rounded-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium text-gray-900">Sélectionner les destinataires</h2>
              <div class="flex space-x-2">
                <button
                  @click="selectAll"
                  class="px-6 py-2 text-sm text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 transition-colors duration-200"
                  style="margin-right: 5px;"
                >
                  Tout sélectionner
                </button>
                <button
                  @click="deselectAll"
                  class="px-6 py-2 text-sm text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  Tout désélectionner
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Filtre par nom -->
              <div>
                <label class="block text-sm font-medium text-dark mb-1">
                  Nom de l'étudiant
                </label>
                <input 
                  v-model="filters.nom" 
                  type="text" 
                  placeholder="Nom de l'étudiant..."
                  class="w-full px-3 py-2 border text-dark border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

            </div>

            <!-- Boutons d'action pour les filtres -->
            <div class="flex justify-between items-center mt-4">
              <button 
                @click="clearFilters" 
                class="px-4 py-2 text-sm text-gray-600 bg-gray-100 border rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Réinitialiser les filtres
              </button>
              <div class="text-sm text-gray-600">
                {{ selectedUsers.length }} utilisateur(s) sélectionné(s) sur {{ filteredUsers.length }} trouvé(s)
              </div>
            </div>
          </div>

          <!-- Formulaire de composition du mail -->
          <div v-if="selectedUsers.length > 0" class="bg-white shadow rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Composer le mail</h3>
            
            <div class="grid grid-cols-1 gap-4">
              <!-- Sujet -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Sujet du mail
                </label>
                <input 
                  v-model="emailData.subject" 
                  type="text" 
                  placeholder="Entrez le sujet du mail..."
                  class="w-full px-3 py-2 border border-gray-300 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>


              <!-- Corps du message -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  v-model="emailData.body"
                  rows="8"
                  placeholder="Entrez votre message..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                ></textarea>
                <p class="text-xs text-dark mt-1">
                  Variables disponibles: {nom}, {email}, {pays}, {ville}
                </p>
              </div>

              <!-- Pièce jointe -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Pièce jointe (optionnelle)
                </label>
                <input
                  type="file"
                  @change="handleFileUpload"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </div>

              <!-- Bouton d'envoi -->
              <div class="flex justify-end space-x-2">
                <button
                  @click="previewEmail"
                  class="px-6 py-2 text-sm text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 transition-colors duration-200"
                  style="margin-right: 5px;"
                >
                  Prévisualiser
                </button>
                <button
                  @click="sendEmails"
                  :disabled="!emailData.subject || !emailData.body || isSending"
                  class="px-6 py-2 text-sm text-gray-700 bg-gray-100 border rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  {{ isSending ? 'Envoi en cours...' : `Envoyer à ${selectedUsers.length} destinataire(s)` }}
                </button>
              </div>
            </div>
          </div>

          <!-- Tableau des utilisateurs -->
          <div class="overflow-x-auto bg-white shadow border rounded-lg">
            <table class="min-w-full text-left text-sm">
              <thead class="bg-gray-100 text-gray-600 uppercase text-xs font-medium">
                <tr>
                  <th class="p-4">
                    <input 
                      type="checkbox" 
                      @change="toggleSelectAll"
                      :checked="isAllSelected"
                      :indeterminate="isSomeSelected"
                      class="rounded border-gray-300"
                    />
                  </th>
                  <th class="p-4">Nom complet</th>
                  <th class="p-4">Email</th>
                  <th class="p-4">Téléphone</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="user in paginatedUsers" 
                  :key="user.id" 
                  class="border-t hover:bg-gray-50 transition-colors duration-150"
                  :class="{ 'bg-blue-50': selectedUsers.includes(user.id) }"
                >
                  <td class="p-4">
                    <input 
                      type="checkbox" 
                      v-model="selectedUsers"
                      :value="user.id"
                      class="rounded border-gray-300"
                    />
                  </td>
                  <td class="p-4 font-medium">{{ user.full_name }}</td>
                  <td class="p-4">{{ user.email }}</td>
                  <td class="p-4">{{ user.phone || '-' }}</td>
                </tr>
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="8" class="p-8 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Aucun utilisateur trouvé avec ces filtres.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Pagination -->
            <div 
              v-if="filteredUsers.length > itemsPerPage" 
              class="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6"
            >
              <div class="flex items-center justify-between">
                <!-- Mobile pagination -->
                <div class="flex-1 flex justify-between sm:hidden">
                  <button 
                    @click="previousPage" 
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Précédent
                  </button>
                  <button 
                    @click="nextPage" 
                    :disabled="currentPage === totalPages"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Suivant
                  </button>
                </div>
                
                <!-- Desktop pagination -->
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Affichage de 
                      <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> 
                      à 
                      <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredUsers.length) }}</span> 
                      sur 
                      <span class="font-medium">{{ filteredUsers.length }}</span> 
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
        </div>
      </main>

      <!-- Modal de prévisualisation -->
      <div v-if="showPreview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-hidden">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium">Prévisualisation du mail</h3>
              <button @click="showPreview = false" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="border rounded p-4 bg-gray-50 max-h-80 overflow-y-auto">
              <div class="mb-2">
                <strong>Sujet:</strong> {{ emailData.subject }}
              </div>
              <div class="mb-2">
                <strong>Destinataires:</strong> {{ selectedUsers.length }} utilisateur(s)
              </div>
              <div>
                <strong>Message:</strong>
                <div class="mt-2 whitespace-pre-wrap">{{ emailData.body }}</div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-2 mt-4">
              <button 
                @click="showPreview = false"
                class="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
              >
                Fermer
              </button>
              <button 
                @click="sendEmails"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-dark rounded transition-colors duration-200"
              >
                Confirmer et envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminGuard>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import NavAdmin from '@/components/Dashboard/Admin/NavAdmin.vue';
import AdminGuard from '@/components/AdminGuard.vue';
import { BASE_URL } from '@/config';

// ===========================
// REACTIVE DATA
// ===========================
const users = ref([]);
const selectedUsers = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const isSending = ref(false);
const showPreview = ref(false);
const selectedTemplate = ref('');

// Filtres
const filters = ref({
  nom: '',
  status: '',
  country: ''
});

// Données de l'email
const emailData = ref({
  subject: '',
  body: '',
  attachment: null
});


// ===========================
// API CALLS
// ===========================
const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des utilisateurs');
    }
    users.value = await response.json();
    console.log('Utilisateurs chargés:', users.value);
  } catch (error) {
    console.error('Erreur fetch users:', error);
  }
};

const sendEmails = async () => {
  if (selectedUsers.value.length === 0) {
    alert('Veuillez sélectionner au moins un destinataire');
    return;
  }

  if (!emailData.value.subject || !emailData.value.body) {
    alert('Veuillez remplir le sujet et le message');
    return;
  }

  isSending.value = true;
  showPreview.value = false;

  try {
    const formData = new FormData();
    formData.append('subject', emailData.value.subject);
    formData.append('body', emailData.value.body);
    formData.append('recipients', JSON.stringify(selectedUsers.value));
    
    if (emailData.value.attachment) {
      formData.append('attachment', emailData.value.attachment);
    }

    const response = await fetch(`${BASE_URL}/api/mail/`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi des emails');
    }

    const result = await response.json();
    console.log('Emails envoyés:', result);

    // Notification de succès
    if (window.$notify) {
      window.$notify.success(`${selectedUsers.value.length} email(s) envoyé(s) avec succès`);
    } else {
      alert(`${selectedUsers.value.length} email(s) envoyé(s) avec succès`);
    }

    // Reset du formulaire
    resetForm();

  } catch (error) {
    console.error('Erreur envoi emails:', error);
    
    if (window.$notify) {
      window.$notify.error('Erreur lors de l\'envoi des emails');
    } else {
      alert('Erreur lors de l\'envoi des emails');
    }
  } finally {
    isSending.value = false;
  }
};

// ===========================
// COMPUTED PROPERTIES
// ===========================
const filteredUsers = computed(() => {
    return users.value.filter(user => {
        const matchNom = !filters.value.nom ||
        user.full_name.toLowerCase().includes(filters.value.nom.toLowerCase());
        
        const matchStatus = !filters.value.status ||
        user.status === filters.value.status;
        
        const matchCountry = !filters.value.country ||
        (user.country && user.country.toLowerCase().includes(filters.value.country.toLowerCase()));

        return matchNom && matchStatus && matchCountry;
    });
});

const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPage.value);
});

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredUsers.value.slice(start, end);
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

const isAllSelected = computed(() => {
    return filteredUsers.value.length > 0 &&
        selectedUsers.value.length === filteredUsers.value.length;
});

const isSomeSelected = computed(() => {
    return selectedUsers.value.length > 0 &&
        selectedUsers.value.length < filteredUsers.value.length;
});

// ===========================
// METHODS
// ===========================
const clearFilters = () => {
  filters.value = {
    nom: '',
    status: '',
    country: ''
  };
  currentPage.value = 1;
};

const selectAll = () => {
  selectedUsers.value = filteredUsers.value.map(user => user.id);
};

const deselectAll = () => {
  selectedUsers.value = [];
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedUsers.value = [];
  } else {
    selectedUsers.value = filteredUsers.value.map(user => user.id);
  }
};

const handleFileUpload = (event) => {
  emailData.value.attachment = event.target.files[0];
};

const previewEmail = () => {
  if (!emailData.value.subject || !emailData.value.body) {
    alert('Veuillez remplir le sujet et le message avant la prévisualisation');
    return;
  }
  showPreview.value = true;
};

const resetForm = () => {
  emailData.value = {
    subject: '',
    body: '',
    attachment: null
  };
  selectedUsers.value = [];
  selectedTemplate.value = '';
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
  fetchUsers();
});
</script>

<style scoped>
/* Transitions personnalisées */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Style pour les cases cochées */
input[type="checkbox"]:indeterminate {
  background-color: #4f46e5;
  border-color: #4f46e5;
}
</style>