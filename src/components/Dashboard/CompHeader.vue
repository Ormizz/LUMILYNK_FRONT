<template>
    <nav class="shadow-md" style="background-color: var(--theme);">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo (caché sur mobile) -->
                <div class="flex items-center">
                    <div class="shrink-0 hidden md:block">
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
                
                <!-- Bouton utilisateur desktop -->
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

                <!-- Bouton hamburger mobile - PLUS VISIBLE -->
                <div class="flex md:hidden ml-auto">
                    <button 
                        @click="mobileMenuOpen = !mobileMenuOpen" 
                        type="button" 
                        class="relative inline-flex items-center justify-center p-3 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        <span class="sr-only">Ouvrir le menu</span>
                        <!-- Hamburger icon animé -->
                        <div class="w-7 h-6 flex flex-col justify-between">
                            <span 
                                class="block h-1 w-full bg-white rounded-full transform transition-all duration-300 ease-in-out"
                                :class="{ 'rotate-45 translate-y-2.5': mobileMenuOpen }"
                            ></span>
                            <span 
                                class="block h-1 w-full bg-white rounded-full transition-all duration-300 ease-in-out"
                                :class="{ 'opacity-0': mobileMenuOpen }"
                            ></span>
                            <span 
                                class="block h-1 w-full bg-white rounded-full transform transition-all duration-300 ease-in-out"
                                :class="{ '-rotate-45 -translate-y-2.5': mobileMenuOpen }"
                            ></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <!-- Overlay sombre pour mobile -->
        <transition
            enter-active-class="transition-opacity ease-linear duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity ease-linear duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div 
                v-if="mobileMenuOpen" 
                @click="mobileMenuOpen = false"
                class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            ></div>
        </transition>

        <!-- Off-canvas menu mobile -->
        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform translate-x-full"
            enter-to-class="transform translate-x-0"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="transform translate-x-0"
            leave-to-class="transform translate-x-full"
        >
            <div 
                v-if="mobileMenuOpen" 
                class="fixed top-0 right-0 bottom-0 w-80 bg-gray-800 shadow-2xl z-50 md:hidden overflow-y-auto"
            >
                <!-- Header du menu off-canvas -->
                <div class="flex items-center justify-between p-4 border-b border-gray-700">
                    <div class="flex items-center space-x-3">
                        <img
                            class="h-8 w-8"
                            src="assets/img/logo/logo.png"
                            alt="Lumilynk logo"
                        />
                        <span class="text-white font-semibold text-lg">Menu</span>
                    </div>
                    <button 
                        @click="mobileMenuOpen = false"
                        class="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-lg transition-colors duration-200"
                    >
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Profil utilisateur -->
                <div class="p-4 border-b border-gray-700 bg-gray-750">
                    <div class="flex items-center space-x-3">
                        <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-base shadow-lg">
                            {{ userInitials }}
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-semibold text-white">{{ userName }}</p>
                            <p class="text-xs text-gray-400 truncate">{{ userEmail }}</p>
                        </div>
                    </div>
                </div>

                <!-- Menu items -->
                <div class="py-4">
                    <router-link 
                        v-for="item in menuItems" 
                        :key="item.path"
                        :to="item.path" 
                        @click="mobileMenuOpen = false"
                        class="flex items-center space-x-3 text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-3 transition-all duration-200 group"
                        active-class="bg-gray-700 text-white border-l-4 border-blue-500"
                    >
                        <svg class="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span class="text-sm font-medium">{{ item.label }}</span>
                    </router-link>
                </div>

                <!-- Bouton déconnexion -->
                <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800">
                    <button 
                        @click="logout" 
                        class="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Déconnexion</span>
                    </button>
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

<style scoped>
/* Hamburger icon animation smooth */
.transform {
    transform-origin: center;
}

/* Amélioration du scrollbar */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #374151;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

/* Animation pour le gradient */
.bg-gradient-to-br {
    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Effet hover sur les items du menu */
.group:hover svg {
    transform: translateX(0.25rem);
}
</style>