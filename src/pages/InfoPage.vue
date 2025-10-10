<template>
    <StudentGuard>
        <div class="min-h-full">
            <CompHeader/>
            <header class="bg-white shadow">
                <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">Informations</h1>
                </div>
            </header>
            <main>
                <br><br>
                <div class="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                                <input 
                                    v-model="userParse.full_name" 
                                    type="text" 
                                    class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    required 
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Date de naissance</label>
                                <input 
                                    v-model="formattedDate" 
                                    type="date" 
                                    class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    required 
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Email</label>
                                <input 
                                    v-model="userParse.email" 
                                    type="email" 
                                    class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    required 
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                                <input 
                                    v-model="userParse.phone" 
                                    type="text" 
                                    class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Pays</label>
                                <input 
                                    v-model="userParse.country" 
                                    type="text" 
                                    class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Ville</label>
                                <input 
                                    v-model="userParse.city" 
                                    type="text" 
                                    class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                        </div>
                        <div class="pt-4">
                            <button type="submit" class="px-4 py-2 bg-indigo-600 text-dark border rounded hover:bg-indigo-700 transition-colors">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </StudentGuard>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import CompHeader from '../components/Dashboard/CompHeader.vue'
import { BASE_URL } from '../config'
import StudentGuard from '../components/StudentGuard.vue'

let userParse = ref({})

// Computed property pour formater la date
const formattedDate = computed({
    get() {
        if (!userParse.value.dateNaissance) return ''
        // Convertir la date ISO en format YYYY-MM-DD
        const date = new Date(userParse.value.dateNaissance)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    },
    set(value) {
        // Mettre à jour la date dans userParse
        userParse.value.dateNaissance = value
    }
})

const fetchUser = async (user) => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/${user.id}`)
        if (!response.ok) throw new Error('Erreur lors du chargement des informations utilisateur')
        const data = await response.json()
        userParse.value = data
        console.log('User data:', data)
    } catch (error) {
        console.error('Erreur:', error)
        if (window.$notify) {
            window.$notify.error('Erreur lors du chargement des données')
        }
    }
}

const submitForm = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        const response = await fetch(`${BASE_URL}/api/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userParse.value),
        })
        
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour')
        }
        
        const updatedUser = await response.json()
        
        // Mettre à jour le localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser))
        
        if (window.$notify) {
            window.$notify.success('Informations mises à jour avec succès!')
        } else {
            alert('Informations mises à jour avec succès!')
        }
        
        console.log('User updated successfully')
    } catch (error) {
        console.error('Error updating user:', error)
        if (window.$notify) {
            window.$notify.error('Erreur lors de la mise à jour')
        } else {
            alert('Erreur lors de la mise à jour')
        }
    }
}

onMounted(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.id) {
        fetchUser(user)
    }
})
</script>

<style scoped>
/* Améliorer le style du bouton */
button[type="submit"] {
    font-weight: 600;
}

/* Style pour les inputs sur mobile */
@media (max-width: 767px) {
    input {
        font-size: 16px !important; /* Empêche le zoom sur iOS */
    }
}
</style>