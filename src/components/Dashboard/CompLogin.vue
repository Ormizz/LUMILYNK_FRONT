<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div class="w-full max-w-6xl flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            

            <!-- Form section -->
            <div class="w-full lg:w-7/12 p-8 flex flex-col justify-center">
                <div class="d-flex">
                    <p class="font-bold text-start col-4 text-gray-800 mb-6">
                        <router-link to="/" @click.prevent="reloadAbout('/')">
                            <i class="fa fa-arrow-left" aria-hidden="true" style="color: var(--theme); font-size: 24px;"></i>
                        </router-link>
                    </p>
                    <h3 id="title-login" class="text-2xl font-bold text-center text-gray-800 mb-6">
                        Connectez vous à <span style="color: var(--theme);">LUMILYNK</span>
                    </h3>
                </div>
                <form class="space-y-4" @submit.prevent="handleLogin">
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-bold text-gray-700">Adresse Email</label>
                        <input
                        class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        placeholder="email@email.com"
                        v-model="email"
                        required />
                    </div>
                    <!-- Mot de passe -->
                    <div class="flex flex-col md:flex-row md:space-x-4">
                        <div class="w-full">
                        <label class="block text-sm font-bold text-gray-700">Mot de passe</label>
                        <input
                            class="w-full px-3 py-2 border text-dark rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="***********"
                            v-model="password"
                            required />
                        </div>
                    </div>
                    <!-- Bouton -->
                    <div>
                        <button
                        type="submit"
                        class="w-full bg-blue-600 text-gray-600 border font-bold py-2 px-4 rounded cursor-box hover:bg-blue-700 transition">
                        Se connecter
                        </button>
                    </div>
                    <!-- Liens -->
                    <div class="text-center text-sm mt-4">
                        <p>
                            <a href="#" class="text-blue-500 hover:underline">Mot de passe oublié ?</a>
                        </p>
                        <p>
                        Vous n'avez pas encore de compte ?
                        <a href="#" class="text-blue-500 font-semibold hover:underline" @click="$emit('toggle-form')">Créer un compte</a>
                        </p>
                    </div>
                </form>
            </div>
            <!-- Image (cachée sur mobile) -->
            <div
                class="hidden lg:block lg:w-5/12 bg-cover bg-center"
                style="background-image: url('https://images.unsplash.com/photo-1744320911030-1ab998d994d7?q=80&w=968&auto=format&fit=crop&ixlib=rb-4.1.0')">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { BASE_URL } from '../../config'

const email = ref('')
const password = ref('')

const reloadAbout = (path) => {
    window.location.href = path
}

const handleLogin = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({ email: email.value, password: password.value })
    })
        const data = await response.json()
        if (!response.ok) {
            alert(data.message || 'Erreur de connexion')
            return
        }
        // Tu peux ensuite stocker l'utilisateur dans le localStorage ou redirect :
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('user', JSON.stringify(data.user))
        if (data.user.role === 'tld') {
            window.location.href = "/admin/dashboard"
        } else if (data.user.role === 'std') {
            window.location.href = "/mon-espace"
        } else {
            window.location.href = "/connexion"
        }
    } catch (error) {
        alert('Erreur de connexion au serveur')
        console.error(error)
    }
}
</script>

