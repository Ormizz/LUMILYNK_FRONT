<template>
  <StudentGuard>
    <div class="min-h-full bg-gray-50">
      <CompHeader/>
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">
              Paiements
            </h1>
            <button
              @click="showForm = !showForm"
              class="bg-indigo-600 hover:bg-indigo-700 text-dark text-sm font-semibold px-4 py-2 rounded-lg shadow transition-colors duration-200"
            >
              {{ showForm ? '✕ Fermer' : '+ Ajouter un paiement' }}
            </button>
          </div>
        </div>
      </header>

      <!-- Main content -->
      <main class="py-6 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl space-y-6">
          
          <!-- Formulaire d'ajout -->
          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 -translate-y-2"
            enter-to-class="transform opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-2"
          >
            <div v-if="showForm" class="bg-white rounded-lg shadow p-4 sm:p-6">
              <AddPaiementForm @payment-added="handlePaymentAdded" />
            </div>
          </transition>

          <!-- Desktop Table View -->
          <div class="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="paiements.length === 0">
                  <td colspan="6" class="px-6 py-8 text-center text-gray-500">Aucun paiement</td>
                </tr>
                <tr v-for="paiement in paiements" :key="paiement.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ paiement.reference }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ paiement.amount }} FCFA</td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ paiement.type }}</td>
                  <td class="px-6 py-4">
                    <span
                      :class="{
                        'px-2 py-1 text-xs font-medium rounded-full': true,
                        'bg-green-100 text-green-700': paiement.status === 'valide',
                        'bg-yellow-100 text-yellow-700': paiement.status === 'en attente',
                        'bg-red-100 text-red-700': paiement.status === 'rejeter',
                      }"
                    >
                      {{ paiement.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(paiement.uploaded_at) }}</td>
                  <td class="px-6 py-4 text-sm">
                    <a
                      :href="`${BASE_URL}${paiement.proof_url}`"
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
            <div v-if="paiements.length === 0" class="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Aucun paiement
            </div>

            <div v-for="paiement in paiements" :key="paiement.id" class="bg-white rounded-lg shadow p-4 space-y-3">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-semibold text-gray-900 truncate">{{ paiement.reference }}</h3>
                  <p class="text-xs text-gray-500 mt-1">{{ paiement.type }}</p>
                </div>
                <span
                  :class="{
                    'px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ml-2': true,
                    'bg-green-100 text-green-700': paiement.status === 'valide',
                    'bg-yellow-100 text-yellow-700': paiement.status === 'en attente',
                    'bg-red-100 text-red-700': paiement.status === 'refuse',
                  }"
                >
                  {{ paiement.status }}
                </span>
              </div>

              <div class="text-xs text-gray-500">
                <span class="font-medium">Montant:</span> {{ paiement.amount }} FCFA
              </div>
              <div class="text-xs text-gray-500">
                <span class="font-medium">Date:</span> {{ formatDate(paiement.uploaded_at) }}
              </div>

              <div class="pt-2 border-t border-gray-100">
                <a
                  :href="`${BASE_URL}${paiement.proof_url}`"
                  target="_blank"
                  class="block text-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                >
                  Voir la preuve
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
import { onMounted, ref } from 'vue'
import CompHeader from '../components/Dashboard/CompHeader.vue'
import AddPaiementForm from '../components/Dashboard/PaymentForm.vue'
import { BASE_URL } from '../config'
import StudentGuard from '../components/StudentGuard.vue'

const showForm = ref(false)
const paiements = ref([])

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const fetchPayments = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/api/payments/${user.id}`)
    if (!response.ok) throw new Error('Erreur lors du chargement des paiements')
    paiements.value = await response.json()
  } catch (error) {
    console.error(error)
  }
}

const handlePaymentAdded = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  fetchPayments(user)
  showForm.value = false
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  fetchPayments(user)
})
</script>
