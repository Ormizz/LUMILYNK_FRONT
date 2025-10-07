<template>
    <nav class="shadow-md" style="background-color: var(--theme);">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center">
                    <div class="shrink-0">
                        <img
                            class="h-10 w-10"
                            src="assets/img/logo/logo.png"
                            alt="Lumilynk logo"
                        />
                    </div>
                </div>

                <!-- Menu desktop -->
                <div class="hidden md:block flex-1">
                    <div class="flex items-baseline justify-center space-x-1">
                        <router-link 
                            v-for="item in menuItems" 
                            :key="item.path"
                            :to="item.path" 
                            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            active-class="bg-gray-600 text-white"
                        >
                            {{ item.label }}
                        </router-link>
                    </div>
                </div>
                
                <!-- Bouton utilisateur -->
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6">
                        <div class="relative">
                            <button 
                                @click="userMenuOpen = !userMenuOpen" 
                                type="button" 
                                class="flex items-center space-x-2 rounded-md hover:bg-gray-700 px-2 py-1 transition-colors duration-200 focus:outline-none"
                            >
                                <div class="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-gray-500">
                                    {{ userInitials }}
                                </div>
                                <span class="text-gray-300 text-sm">{{ userName }}</span>
                                <svg class="h-4 w-4 text-gray-300 transition-transform duration-200" :class="{ 'rotate-180': userMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            
                            <transition
                                enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95"
                            >
                                <div v-if="userMenuOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div class="p-2">
                                        <div class="px-3 py-2 border-b border-gray-100">
                                            <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                                            <p class="text-xs text-gray-500">{{ userEmail }}</p>
                                        </div>
                                        <button 
                                            @click="logout" 
                                            class="w-full mt-2 flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
                                        >
                                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Déconnexion</span>
                                        </button>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>

                <!-- Bouton menu mobile -->
                <div class="-mr-2 flex md:hidden">
                    <button 
                        @click="mobileMenuOpen = !mobileMenuOpen" 
                        type="button" 
                        class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    >
                        <span class="sr-only">Open main menu</span>
                        <svg class="h-6 w-6" :class="{ 'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                        </svg>
                        <svg class="h-6 w-6" :class="{ 'block': mobileMenuOpen, 'hidden': !mobileMenuOpen }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile menu -->
        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 -translate-y-2"
            enter-to-class="transform opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-2"
        >
            <div v-if="mobileMenuOpen" class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <router-link 
                        v-for="item in menuItems" 
                        :key="item.path"
                        :to="item.path" 
                        @click="mobileMenuOpen = false"
                        class="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        active-class="bg-gray-600 text-white"
                    >
                        {{ item.label }}
                    </router-link>
                    
                    <!-- User info mobile -->
                    <div class="border-t border-gray-700 mt-3 pt-3">
                        <div class="px-3 py-2 mb-2">
                            <div class="flex items-center space-x-3">
                                <div class="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold border-2 border-gray-500">
                                    {{ userInitials }}
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-white">{{ userName }}</p>
                                    <p class="text-xs text-gray-400">{{ userEmail }}</p>
                                </div>
                            </div>
                        </div>
                        <button 
                            @click="logout" 
                            class="w-full flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Déconnexion</span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const userMenuOpen = ref(false)
const mobileMenuOpen = ref(false)
const userName = ref('')
const userEmail = ref('')

const menuItems = [
    { path: '/mon-espace', label: 'Mon espace' },
    { path: '/paiement', label: 'Mes paiements' },
    { path: '/document', label: 'Mes documents' },
    { path: '/letter', label: 'Mes lettres' },
    { path: '/status', label: 'Mon status' },
    { path: '/visaInfo', label: 'Info Visa' },
    { path: '/info', label: 'Mes Informations' }
]

const userInitials = computed(() => {
    if (!userName.value) return 'U'
    const names = userName.value.split(' ')
    if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase()
    }
    return userName.value.substring(0, 2).toUpperCase()
})

const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    if (window.$notify) {
        window.$notify.logoutSuccess()
        setTimeout(() => {
            window.location.href = '/'
        }, 2000)
    } else {
        window.location.href = '/connexion'
    }
}

onMounted(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    userName.value = user.full_name || 'Utilisateur'
    userEmail.value = user.email || ''
})
</script>