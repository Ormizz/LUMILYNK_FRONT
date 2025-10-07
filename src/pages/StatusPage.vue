<template>
    <StudentGuard>
      <div class="min-h-full">
          <CompHeader/>
          <header class="bg-white shadow">
              <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                  <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">Status</h1>
              </div>
          </header>
          <!-- Main content -->
          <main>
              <div>
                <h2 class="mx-auto max-w-7xl sm:px-6 lg:px-8"> Suivi de mon status </h2>
                <div class="timeline-horizontal">
                  
                  <div class="event"
                      :class="{ active: application?.status === 'etude_payee' }">
                    <h3>Etude de dossiers</h3>
                    <p>Votre dossier est en cours d’analyse. Vous recevrez une lettre d'offre d'une université adaptée à votre profil.</p>
                  </div>

                  <div class="event"
                      :class="{ active: application?.status === 'offre_envoyee' }">
                    <h3>Lettre d'offre</h3>
                    <p>Lettre d'offre reçue. Aquittez vous des frais LumiLynk et aussi pensez à reserver votre place à travers les frais d'admission.</p>
                  </div>

                  <div class="event"
                      :class="{ active: application?.status === 'admission_envoyee' }">
                    <h3>Lettre d'admission</h3>
                    <p>Lettre d'admission reçue. Vous êtes maintenant pre-inscrit dans l'université. Vous êtes maintenant prêt pour le visa</p>
                  </div>

                  <div class="event"
                      :class="{ active: application?.status === 'visa' }">
                    <h3>VISA</h3>
                    <p>Démarrez votre demande de visa étudiant et chargez votre preuve dès obtention du document.</p>
                  </div>
                </div>
              </div>
          </main>
      </div>
    </StudentGuard>
</template>

<script setup>
  import CompHeader from '../components/Dashboard/CompHeader.vue'
  import { ref, onMounted } from 'vue'
  import { BASE_URL } from '../config'
  import StudentGuard from '../components/StudentGuard.vue'

  const application = ref(null);

  const fetchApplication = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await fetch(`${BASE_URL}/api/applications/${user.id}`);
      if (!res.ok) throw new Error('Erreur lors du chargement de l\'application');
      application.value = await res.json();
      console.log(application.value)
    } catch (err) {
      console.error("Erreur fetch application:", err);
    }
  };

  onMounted(() => {
    fetchApplication();
  });
</script>

<style scoped>

.timeline-horizontal {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin: 60px auto;
  max-width: auto;
  position: relative;
  padding-top: 40px;
}

.timeline-horizontal::before {
  content: '';
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #4298C3;
  z-index: 0;
}

.event {
  background: white;
  padding: 20px;
  margin-top: 35px;
  border-radius: 20px;
  width: 200px;
  text-align: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.event::before {
  content: attr(data-date);
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9em;
  font-weight: bold;
  color: #4298C3;
}

.event::after {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #4298C3;
  border: 3px solid white;
  border-radius: 50%;
  z-index: 2;
}

.event h3 {
  font-size: 1.1em;
  margin-bottom: 5px;
  color: #222;
}

.event p {
  font-size: 0.9em;
  color: #555;
}

.event.active {
  border: 2px solid #10b981;
  background-color: #f0fdf4;
}

</style>