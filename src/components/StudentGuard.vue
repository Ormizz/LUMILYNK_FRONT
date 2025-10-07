<template>
  <!-- Si on est sur /connexion, on laisse passer sans contrôle -->
  <slot v-if="isAuthPage || isAuthorized" />

  <!-- Sinon, on affiche un écran de restriction -->
  <div v-else class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <div class="mb-6">
        <svg class="mx-auto h-16 w-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 
            1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 
            16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Accès restreint</h2>
      <p class="text-gray-600 mb-6">
        Cette page est réservée aux étudiants. Vous allez être redirigé vers la connexion.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const isAuthorized = ref(false)
const isAuthPage = ref(false)

const checkAuthorization = () => {
  const currentPath = router.currentRoute.value.path
  isAuthPage.value = currentPath === "/connexion"

  try {
    const userStr = localStorage.getItem("user")
    const user = userStr ? JSON.parse(userStr) : null

    if (user && user.role === "std") {
      isAuthorized.value = true
      // si l'étudiant va sur /connexion alors qu'il est déjà logué → on redirige
      if (isAuthPage.value) router.push("/mon-espace")
    } else {
      isAuthorized.value = false
      // s’il essaie d’aller ailleurs que /connexion → on le renvoie
      if (!isAuthPage.value) {
        setTimeout(() => router.push("/connexion"), 2000)
      }
    }
  } catch (err) {
    console.error("Erreur StudentGuard:", err)
    isAuthorized.value = false
    if (!isAuthPage.value) router.push("/connexion")
  }
}

onMounted(() => {
  checkAuthorization()
})
</script>
