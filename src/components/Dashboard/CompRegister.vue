<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="w-full max-w-6xl flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      
      <!-- Image -->
      <div class="hidden lg:block lg:w-5/12 bg-cover bg-center"
           style="background-image: url('https://images.unsplash.com/photo-1744320911030-1ab998d994d7?q=80&w=968&auto=format&fit=crop&ixlib=rb-4.1.0')">
      </div>

      <!-- Form section -->
      <div class="w-full lg:w-7/12 p-8 flex flex-col justify-center">
        <!-- Header avec flèche et titre -->
        <div class="relative mb-6">
          <!-- Flèche de retour (position absolue) -->
          <div class="absolute left-0 top-0">
            <router-link to="/" @click.prevent="reloadAbout('/')">
              <i class="fa fa-arrow-left" aria-hidden="true" 
                 style="color: var(--theme); font-size: 20px;"></i>
            </router-link>
          </div>
          
          <!-- Titre centré -->
          <h3 id="title-register" class="text-2xl font-bold text-center text-gray-800">
            Rejoignez <span style="color: var(--theme);">LUMILYNK</span>
          </h3>
        </div>

        <!-- Formulaire -->
        <form class="space-y-4" @submit.prevent="handleRegister">
          <!-- Nom et Date de naissance -->
          <div class="flex flex-col md:flex-row md:space-x-4">
            <div class="w-full">
              <label class="block text-sm font-bold text-gray-700">Nom complet</label>
              <input v-model="full_name"
              class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text" placeholder="Nom complet" required />
            </div>
            <div class="w-full">
              <label class="block text-sm font-bold text-gray-700">Date de naissance</label>
              <input v-model="dateNaissance"
              class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="date" placeholder="Date de naissance" required />
            </div>
          </div>

          <!-- Email et Téléphone -->
          <div class="flex flex-col md:flex-row md:space-x-4">
            <div class="w-full">
              <label class="block text-sm font-bold text-gray-700">Adresse Email</label>
              <input v-model="email"
              class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email" placeholder="email@email.com" required />
            </div>
            <div class="w-full">
              <label class="block text-sm font-bold text-gray-700">Téléphone</label>
              <input v-model="phone"
              class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text" placeholder="+225010101010" required />
            </div>
          </div>

          <!-- Mots de passe -->
          <div class="flex flex-col md:flex-row md:space-x-4">
            <div class="w-full">
              <label class="block text-sm font-bold text-gray-700">Mot de passe</label>
              <input v-model="password"
              class="w-full px-3 py-2 border text-dark rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password" placeholder="***********" required />
            </div>
            <div class="w-full">
              <label class="block text-sm font-bold text-gray-700">Confirmer</label>
              <input v-model="confirmPassword"
              class="w-full px-3 py-2 border text-dark rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password" placeholder="***********" required />
            </div>
          </div>

          <!-- Bouton -->
          <div>
            <button type="submit"
                    class="w-full bg-blue-600 text-gray-600 border font-bold py-2 px-4 rounded cursor-box hover:bg-blue-700 transition">
              S'enregistrer
            </button>
          </div>

          <!-- Lien connexion -->
          <div class="text-center text-sm mt-4">
            <p>
              Vous avez déjà un compte ?
              <a href="#" class="text-blue-500 font-semibold hover:underline" @click="$emit('toggle-form')">Se connecter</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BASE_URL } from '../../config'

const full_name = ref('')
const dateNaissance = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

const reloadAbout = (path) => {
    window.location.href = path
}

const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
        // Remplacer alert par notification
        if (window.$notify) {
            window.$notify.validationError('Les mots de passe ne correspondent pas')
        } else {
            console.error('Les mots de passe ne correspondent pas')
        }
        return
    }
    try {
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            full_name: full_name.value, 
            email: email.value,
            password: password.value, 
            phone: phone.value, 
            dateNaissance: dateNaissance.value 
        }),
        })

        const data = await response.json()
        console.log(data)

        if (!response.ok) {
            // Remplacer alert par notification
            if (window.$notify) {
                window.$notify.error(data.message || 'Erreur lors de l\'inscription')
            } else {
                console.error(data.message || 'Erreur lors de l\'inscription')
            }
            return console.error(data)
        }

        // Remplacer alert par notification
        if (window.$notify) {
            window.$notify.successAndRedirect(
                'Inscription réussie ! Connectez-vous.',
                'Inscription réussie',
                '/connexion',
                2000
            )
        } else {
            // Redirection immédiate si pas de notifications
            window.location.href = "/connexion"
        }
    } catch (error) {
        console.error(error)
        // Remplacer alert par notification
        if (window.$notify) {
            window.$notify.networkError()
        } else {
            console.error(error)
            console.error('Erreur de connexion au serveur:', error)
        }
    }
}
</script>

<style scoped>
/* Centrage parfait du titre Register */
#title-register {
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

/* Tablets */
@media (max-width: 1023px) {
  #title-register {
    font-size: 1.5rem !important;
    padding: 0 1.5rem;
  }
}

/* Mobile */
@media (max-width: 767px) {
  #title-register {
    font-size: 1.2rem !important;
    line-height: 1.4;
    padding: 0 1rem;
    word-wrap: break-word;
  }
}

/* Small Mobile */
@media (max-width: 575px) {
  #title-register {
    font-size: 1rem !important;
    padding: 0 0.5rem;
  }
}

/* Very Small Mobile */
@media (max-width: 399px) {
  #title-register {
    font-size: 0.9rem !important;
    line-height: 1.3;
  }
}

/* Espacement des champs en colonne sur mobile */
@media (max-width: 767px) {
  .md\:space-x-4 > * + * {
    margin-left: 0 !important;
    margin-top: 1rem;
  }
}
</style>