<template>
    <StudentGuard>
      <div class="min-h-full">
        <CompHeader/>
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">Dashboard</h1>
            </div>
        </header>

        <!-- Main content -->
        <main class="px-6 py-10 max-w-4xl mx-auto text-gray-700">
          <section class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800">Bienvenue sur <span style="color: var(--theme);">LumiLynk</span></h2>

            <p>
              Notre processus est conçu pour vous accompagner étape par étape vers votre admission dans une université en Inde.
            </p>

            <p>
              Voici comment cela fonctionne:
            </p>

            <ul class="list-disc list-inside space-y-2">
              <li><strong>1. Ouverture de dossier:</strong> Commencez votre processus en remplissant le formulaire et effectuant le paiement pour le traitement de votre dossier (150 000 francs)</li>
              <li><strong>2. Lettre d'offre:</strong> Validation de votre dossier par l'une de nos universités, réception de la lettre d'offre et obtention de 50% de bourse sur votre scolarité. 
                                                      Paiement du reste des frais LUMILYNK (200 000 francs)</li>
              <li><strong>3. Frais et lettre d'admission:</strong>Paiement des frais d'admission et pré-inscription
                                            dans votre filière choisie pour garantir votre place. (frais d'admission: selon l'université)</li>
              <li><strong>4. Demande de Visa:</strong> Recevez les documents et informations nécessaires pour votre demande de visa.</li>
            </ul>
            <br>

            <p class="mt-6">
              À chaque étape, notre équipe reste disponible pour vous assister.
            </p>

            <div v-if="value" class="mt-8 flex justify-center items-center">
              <router-link to="/status">
                <button class="px-3 py-3 border font-semibold rounded cursor-box transition"
                  style="background-color: #fff;" 
                  onmouseover="this.style.backgroundColor='var(--theme)'; this.style.color='#fff';" 
                  onmouseout="this.style.backgroundColor='#fff'; this.style.color='#000';">
                  Suivre mon processus
                </button>
              </router-link>
            </div>
            <div v-else class="mt-8 flex justify-center items-center">
              <router-link to="/multi-step-form">
                <button class="px-3 py-3 bg-indigo-600 border font-semibold rounded cursor-box transition"
                style="background-color: #fff;" 
                  onmouseover="this.style.backgroundColor='var(--theme)'; this.style.color='#fff';" 
                  onmouseout="this.style.backgroundColor='#fff'; this.style.color='#000';">
                  Commencer le processus
                </button>
              </router-link>
            </div>
          </section>
        </main>
      </div>
    </StudentGuard>
</template>

<script setup>
    import CompHeader from '../components/Dashboard/CompHeader.vue'
    import {BASE_URL} from '../config'
    import {onMounted, ref} from 'vue'
    import StudentGuard from '../components/StudentGuard.vue'
    
    let userParse
    let value = ref([])

    const fetchApp = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/applications/${userParse.id}`);

        if (response.status === 404) {
          console.warn("Aucune application trouvée");
          // Gère le cas où il n'y a pas d'application
          value.value = null;
          return;
        }

        if (!response.ok) {
          throw new Error("Erreur serveur");
        }

        const data = await response.json();
        value.value = data;
        localStorage.setItem('application_id', data.id);
        console.log("Application trouvée :", value.value);
        
      } catch (err) {
        console.error("Une erreur est survenue :", err.message);
      }
    };


    onMounted(()=>{
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        userParse = user
      }

      fetchApp()
    })
</script>

