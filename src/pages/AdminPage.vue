<template>
  <AdminGuard>
    <div class="min-h-screen bg-gray-50">
      <NavAdmin />
      
      <!-- Container principal -->
      <div class="p-4 md:p-6 lg:p-8">
        <!-- En-tête du dashboard -->
        <div class="mb-6">
          <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">Tableau de bord</h1>
          <p class="text-gray-600 mt-1">Vue d'ensemble des activités</p>
        </div>

        <!-- Cartes de statistiques -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          <!-- Paiements -->
          <div class="bg-white shadow-lg rounded-2xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-indigo-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <span :class="stats.payments.trend > 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-semibold">
                {{ stats.payments.trend > 0 ? '+' : '' }}{{ stats.payments.trend }}%
              </span>
            </div>
            <p class="text-gray-500 text-sm">Paiements reçus</p>
            <div class="flex items-baseline justify-between mt-2">
              <h2 class="text-2xl md:text-3xl font-bold text-indigo-600">
                <span v-if="loading" class="animate-pulse">...</span>
                <transition name="fade" mode="out-in">
                  <span v-if="!loading" :key="stats.payments.value">{{ animatedPayments }}</span>
                </transition>
              </h2>
              <span class="text-xs text-gray-400">ce mois</span>
            </div>
            <div class="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
                   :style="{width: progressPayments + '%'}"></div>
            </div>
          </div>

          <!-- Documents -->
          <div class="bg-white shadow-lg rounded-2xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <span :class="stats.documents.trend > 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-semibold">
                {{ stats.documents.trend > 0 ? '+' : '' }}{{ stats.documents.trend }}%
              </span>
            </div>
            <p class="text-gray-500 text-sm">Documents validés</p>
            <div class="flex items-baseline justify-between mt-2">
              <h2 class="text-2xl md:text-3xl font-bold text-green-600">
                <span v-if="loading" class="animate-pulse">...</span>
                <transition name="fade" mode="out-in">
                  <span v-if="!loading" :key="stats.documents.value">{{ animatedDocuments }}</span>
                </transition>
              </h2>
              <span class="text-xs text-gray-400">total</span>
            </div>
            <div class="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-green-600 rounded-full transition-all duration-1000" 
                   :style="{width: progressDocuments + '%'}"></div>
            </div>
          </div>

          <!-- Étudiants -->
          <div class="bg-white shadow-lg rounded-2xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-blue-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <span :class="stats.students.trend > 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-semibold">
                {{ stats.students.trend > 0 ? '+' : '' }}{{ stats.students.trend }}%
              </span>
            </div>
            <p class="text-gray-500 text-sm">Étudiants actifs</p>
            <div class="flex items-baseline justify-between mt-2">
              <h2 class="text-2xl md:text-3xl font-bold text-blue-600">
                <span v-if="loading" class="animate-pulse">...</span>
                <transition name="fade" mode="out-in">
                  <span v-if="!loading" :key="stats.students.value">{{ animatedStudents }}</span>
                </transition>
              </h2>
              <span class="text-xs text-gray-400">inscrits</span>
            </div>
            <div class="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-blue-600 rounded-full transition-all duration-1000" 
                   :style="{width: progressStudents + '%'}"></div>
            </div>
          </div>

          <!-- Lettres -->
          <div class="bg-white shadow-lg rounded-2xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between mb-4">
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <span :class="stats.letters.trend > 0 ? 'text-green-500' : 'text-red-500'" class="text-sm font-semibold">
                {{ stats.letters.trend > 0 ? '+' : '' }}{{ stats.letters.trend }}%
              </span>
            </div>
            <p class="text-gray-500 text-sm">Lettres générées</p>
            <div class="flex items-baseline justify-between mt-2">
              <h2 class="text-2xl md:text-3xl font-bold text-purple-600">
                <span v-if="loading" class="animate-pulse">...</span>
                <transition name="fade" mode="out-in">
                  <span v-if="!loading" :key="stats.letters.value">{{ animatedLetters }}</span>
                </transition>
              </h2>
              <span class="text-xs text-gray-400">ce mois</span>
            </div>
            <div class="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-purple-600 rounded-full transition-all duration-1000" 
                   :style="{width: progressLetters + '%'}"></div>
            </div>
          </div>
        </div>

        <!-- Graphiques -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Graphique des paiements -->
          <div class="bg-white shadow-lg rounded-2xl p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Évolution des paiements</h3>
              <select v-model="selectedPeriod" class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="week">7 jours</option>
                <option value="month">30 jours</option>
                <option value="year">12 mois</option>
              </select>
            </div>
            <div class="relative" style="height: 250px;">
              <canvas ref="paymentsChart"></canvas>
            </div>
          </div>

          <!-- Graphique de répartition -->
          <div class="bg-white shadow-lg rounded-2xl p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Répartition par statut</h3>
              <button @click="refreshDoughnutChart" class="text-sm text-indigo-600 hover:text-indigo-800">
                <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Actualiser
              </button>
            </div>
            <div class="relative" style="height: 250px;">
              <canvas ref="statusChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Activité récente -->
        <div class="mt-6 bg-white shadow-lg rounded-2xl p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="activity in recentActivities" :key="activity.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span :class="getActivityIcon(activity.type)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ activity.type }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">{{ activity.description }}</td>
                  <td class="px-4 py-3 text-sm text-gray-500">{{ formatDate(activity.date) }}</td>
                  <td class="px-4 py-3">
                    <span :class="getStatusClass(activity.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ activity.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminGuard>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import NavAdmin from '@/components/Dashboard/Admin/NavAdmin.vue'
import AdminGuard from '@/components/AdminGuard.vue'
import Chart from 'chart.js/auto'

// État des données
const loading = ref(true)
const selectedPeriod = ref('month')

// Statistiques
const stats = ref({
  payments: { value: 0, trend: 0, target: 12 },
  documents: { value: 0, trend: 0, target: 27 },
  students: { value: 0, trend: 0, target: 54 },
  letters: { value: 0, trend: 0, target: 19 }
})

// Animation des nombres
const animatedPayments = ref(0)
const animatedDocuments = ref(0)
const animatedStudents = ref(0)
const animatedLetters = ref(0)

// Progress bars
const progressPayments = ref(0)
const progressDocuments = ref(0)
const progressStudents = ref(0)
const progressLetters = ref(0)

// Références des graphiques
const paymentsChart = ref(null)
const statusChart = ref(null)
let paymentsChartInstance = null
let statusChartInstance = null

// Activités récentes
const recentActivities = ref([
  { id: 1, type: 'Paiement', description: 'Paiement reçu - Jean Dupont', date: new Date(), status: 'Complété' },
  { id: 2, type: 'Document', description: 'Validation diplôme - Marie Martin', date: new Date(Date.now() - 86400000), status: 'En cours' },
  { id: 3, type: 'Inscription', description: 'Nouvel étudiant - Pierre Durand', date: new Date(Date.now() - 172800000), status: 'Complété' },
  { id: 4, type: 'Lettre', description: 'Attestation générée - Sophie Bernard', date: new Date(Date.now() - 259200000), status: 'Complété' }
])

// Fonction pour récupérer les données depuis le backend
const fetchDashboardData = async () => {
  try {
    loading.value = true
    
    // Remplacez par votre endpoint API réel
    const response = await fetch('/api/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const data = await response.json()
      
      // Mise à jour des statistiques
      stats.value = {
        payments: { value: data.payments || 12, trend: data.paymentsTrend || 8 },
        documents: { value: data.documents || 27, trend: data.documentsTrend || -3 },
        students: { value: data.students || 54, trend: data.studentsTrend || 12 },
        letters: { value: data.letters || 19, trend: data.lettersTrend || 5 }
      }
      
      // Mise à jour des activités récentes si disponibles
      if (data.recentActivities) {
        recentActivities.value = data.recentActivities
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
    // Utiliser les valeurs par défaut en cas d'erreur
    stats.value = {
      payments: { value: 12, trend: 8, target: 12 },
      documents: { value: 27, trend: -3, target: 27 },
      students: { value: 54, trend: 12, target: 54 },
      letters: { value: 19, trend: 5, target: 19 }
    }
  } finally {
    loading.value = false
    animateNumbers()
    animateProgress()
  }
}

// Animation des nombres
const animateNumbers = () => {
  const duration = 1500
  const steps = 60
  const interval = duration / steps
  
  const animateValue = (startValue, endValue, setter) => {
    let current = startValue
    const increment = (endValue - startValue) / steps
    let stepCount = 0
    
    const timer = setInterval(() => {
      current += increment
      setter(Math.round(current))
      stepCount++
      
      if (stepCount >= steps) {
        setter(endValue)
        clearInterval(timer)
      }
    }, interval)
  }
  
  animateValue(0, stats.value.payments.value, (val) => animatedPayments.value = val)
  animateValue(0, stats.value.documents.value, (val) => animatedDocuments.value = val)
  animateValue(0, stats.value.students.value, (val) => animatedStudents.value = val)
  animateValue(0, stats.value.letters.value, (val) => animatedLetters.value = val)
}

// Animation des barres de progression
const animateProgress = () => {
  setTimeout(() => {
    progressPayments.value = (stats.value.payments.value / 20) * 100
    progressDocuments.value = (stats.value.documents.value / 40) * 100
    progressStudents.value = (stats.value.students.value / 100) * 100
    progressLetters.value = (stats.value.letters.value / 30) * 100
  }, 100)
}

// Initialisation du graphique des paiements
const initPaymentsChart = () => {
  const ctx = paymentsChart.value?.getContext('2d')
  if (!ctx) return
  
  if (paymentsChartInstance) {
    paymentsChartInstance.destroy()
  }
  
  const labels = selectedPeriod.value === 'week' 
    ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    : selectedPeriod.value === 'month'
    ? Array.from({length: 30}, (_, i) => i + 1)
    : ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
  
  const data = selectedPeriod.value === 'week'
    ? [2, 3, 1, 4, 2, 0, 0]
    : selectedPeriod.value === 'month'
    ? Array.from({length: 30}, () => Math.floor(Math.random() * 5))
    : [8, 12, 15, 10, 18, 14, 20, 16, 22, 19, 24, 12]
  
  paymentsChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Paiements',
        data: data,
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: 'rgb(79, 70, 229)',
        pointBorderColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(79, 70, 229)',
        pointHoverBorderColor: '#fff',
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgb(79, 70, 229)',
          borderWidth: 1
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6B7280',
            font: {
              size: 11
            },
            maxRotation: 0
          }
        }
      }
    }
  })
}

// Initialisation du graphique de répartition
const initStatusChart = () => {
  const ctx = statusChart.value?.getContext('2d')
  if (!ctx) return
  
  if (statusChartInstance) {
    statusChartInstance.destroy()
  }
  
  statusChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Validés', 'En attente', 'Rejetés', 'En cours'],
      datasets: [{
        data: [45, 25, 10, 20],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)'
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 12
            },
            usePointStyle: true,
            color: '#4B5563'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: 'white',
          bodyColor: 'white',
          borderWidth: 1,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: false
      }
    }
  })
}

// Rafraîchir le graphique doughnut
const refreshDoughnutChart = () => {
  if (statusChartInstance) {
    const newData = [
      Math.floor(Math.random() * 50) + 20,
      Math.floor(Math.random() * 30) + 10,
      Math.floor(Math.random() * 20) + 5,
      Math.floor(Math.random() * 30) + 10
    ]
    statusChartInstance.data.datasets[0].data = newData
    statusChartInstance.update()
  }
}

// Formatage de la date
const formatDate = (date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Classes pour les icônes d'activité
const getActivityIcon = (type) => {
  const classes = {
    'Paiement': 'bg-indigo-100 text-indigo-800',
    'Document': 'bg-green-100 text-green-800',
    'Inscription': 'bg-blue-100 text-blue-800',
    'Lettre': 'bg-purple-100 text-purple-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

// Classes pour les statuts
const getStatusClass = (status) => {
  const classes = {
    'Complété': 'bg-green-100 text-green-800',
    'En cours': 'bg-yellow-100 text-yellow-800',
    'En attente': 'bg-gray-100 text-gray-800',
    'Rejeté': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Watchers
watch(selectedPeriod, () => {
  initPaymentsChart()
})

// Lifecycle
onMounted(() => {
  fetchDashboardData()
  
  // Initialiser les graphiques après un court délai
  setTimeout(() => {
    initPaymentsChart()
    initStatusChart()
  }, 500)
  
  // Rafraîchir les données toutes les 30 secondes
  setInterval(() => {
    fetchDashboardData()
  }, 30000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animation pour les chiffres */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-count {
  animation: countUp 0.5s ease-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .relative {
    height: 200px !important;
  }
}

/* Fix pour empêcher l'étirement du canvas */
canvas {
  max-width: 100%;
  height: auto !important;
}
</style>