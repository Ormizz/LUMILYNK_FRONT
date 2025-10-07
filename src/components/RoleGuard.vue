<template>
  <div v-if="isAuthorized">
    <slot />
  </div>
  <div v-else class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <div class="mb-6">
        <svg class="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h2>
      <p class="text-gray-600 mb-6">
        {{ message }}
      </p>
      <div class="space-y-3">
        <button
          @click="goBack"
          class="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
        >
          Retour
        </button>
        <button
          @click="goHome"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Accueil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  requiredRole: {
    type: String,
    required: true
  },
  redirectTo: {
    type: String,
    default: '/connexion'
  },
  customMessage: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const isAuthorized = ref(false)

const message = computed(() => {
  if (props.customMessage) return props.customMessage
  
  switch (props.requiredRole) {
    case 'tld':
      return 'Vous ne pouvez pas acceder à cette page.'
    case 'std':
      return 'Vous ne pouvez pas acceder à cette page.'
    default:
      return `Vous ne pouvez pas acceder à cette page.`
  }
})

const checkAuthorization = () => {
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      isAuthorized.value = false
      return
    }

    const user = JSON.parse(userStr)
    
    // Vérifier si l'utilisateur a le rôle requis
    if (user && user.role === props.requiredRole) {
      isAuthorized.value = true
    } else {
      isAuthorized.value = false
      // Rediriger automatiquement après 3 secondes
      setTimeout(() => {
        router.push(props.redirectTo)
      }, 3000)
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des autorisations:', error)
    isAuthorized.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/')
}

onMounted(() => {
  checkAuthorization()
})
</script>


