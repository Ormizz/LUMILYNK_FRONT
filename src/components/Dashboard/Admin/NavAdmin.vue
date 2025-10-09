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
                                            <span class="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">Admin</span>
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

                <!-- Bouton hamburger mobile -->
                <div class="flex md:hidden ml-auto">
                    <button 
                        @click="mobileMenuOpen = !mobileMenuOpen" 
                        type="button" 
                        class="p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                    >
                        <span class="sr-only">Menu</span>
                        <div class="w-6 h-5 flex flex-col justify-between">
                            <span 
                                class="block h-0.5 w-full bg-white rounded-full transition-all duration-300"
                                :class="{ 'rotate-45 translate-y-2': mobileMenuOpen }"
                            ></span>
                            <span 
                                class="block h-0.5 w-full bg-white rounded-full transition-all duration-300"
                                :class="{ 'opacity-0': mobileMenuOpen }"
                            ></span>
                            <span 
                                class="block h-0.5 w-full bg-white rounded-full transition-all duration-300"
                                :class="{ '-rotate-45 -translate-y-2': mobileMenuOpen }"
                            ></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <!-- Overlay -->
        <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div 
                v-if="mobileMenuOpen" 
                @click="mobileMenuOpen = false"
                class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            ></div>
        </transition>

        <!-- Off-canvas menu mobile - COMPACT -->
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
                class="fixed top-0 right-0 bottom-0 w-72 bg-gray-800 shadow-2xl z-50 md:hidden flex flex-col"
            >
                <!-- Header compact -->
                <div class="flex items-center justify-between p-3 border-b border-gray-700">
                    <div class="flex items-center space-x-2">
                        <img
                            class="h-7 w-7"
                            src="assets/img/logo/logo.png"
                            alt="Logo"
                        />
                        <div>
                            <p class="text-white font-semibold text-sm">Menu Admin</p>
                            <p class="text-xs text-gray-400">Administration</p>
                        </div>
                    </div>
                    <button 
                        @click="mobileMenuOpen = false"
                        class="text-gray-400 hover:text-white p-1 rounded"
                    >
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Profil compact -->
                <div class="p-3 bg-gray-750 border-b border-gray-700">
                    <div class="flex items-center space-x-2">
                        <div class="relative">
                            <div class="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold text-xs">
                                {{ userInitials }}
                            </div>
                            <span class="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold bg-yellow-400 text-gray-900 rounded-full">
                                A
                            </span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-xs font-semibold text-white truncate">{{ userName }}</p>
                            <p class="text-xs text-gray-400 truncate">{{ userEmail }}</p>
                        </div>
                    </div>
                </div>

                <!-- Menu items compact -->
                <div class="flex-1 overflow-y-auto py-2">
                    <router-link 
                        v-for="item in menuItems" 
                        :key="item.path"
                        :to="item.path" 
                        @click="mobileMenuOpen = false"
                        class="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 transition-colors duration-200"
                        active-class="bg-gray-700 text-white border-l-2 border-blue-500"
                    >
                        <svg class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path v-if="item.path.includes('dashboard')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            <path v-else-if="item.path.includes('etudiants')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            <path v-else-if="item.path.includes('paiements')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path v-else-if="item.path.includes('documents')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            <path v-else-if="item.path.includes('lettres')" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <span class="text-xs font-medium">{{ item.label }}</span>
                    </router-link>
                </div>

                <!-- Bouton déconnexion compact -->
                <div class="p-3 border-t border-gray-700">
                    <button 
                        @click="logout" 
                        class="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs font-semibold transition-colors"
                    >
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
    { path: '/admin/dashboard', label: 'Tableau de bord' },
    { path: '/admin/etudiants', label: 'Étudiants' },
    { path: '/admin/paiements', label: 'Paiements' },
    { path: '/admin/documents', label: 'Documents' },
    { path: '/admin/lettres', label: 'Lettres' },
    { path: '/admin/mail', label: 'Mail' }
]

const userInitials = computed(() => {
    if (!userName.value) return 'A'
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
        window.location.href = '/'
    }
}

onMounted(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    userName.value = user.full_name || 'Administrateur'
    userEmail.value = user.email || ''
})
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #374151;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 2px;
}
</style>