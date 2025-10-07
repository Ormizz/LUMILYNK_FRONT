<template>
  <div class="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-semibold mb-6">Ajouter un document</h2>
    <form @submit.prevent="submitForm" class="space-y-6">

      <!-- Étudiant -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Étudiant</label>
        <v-select
            v-model="form.student_id"
            :options="etudiants"
            placeholder="Choisir un étudiant"
            label="full_name"
            :reduce="etudiant => etudiant.id"
            />
      </div>

      <!-- Type de document -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Type de document</label>
        <select
          v-model="form.typedocs_id"
          class="w-full px-3 py-2 border text-dark rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>Choisir un type</option>
          <option value="2">Lettre d'offre</option>
          <option value="3">Lettre d'admission</option>
        </select>
      </div>

      <!-- Fichier -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Fichier</label>
        <input
          type="file"
          @change="handleFile"
          accept="application/pdf,image/*"
          class="w-full px-3 py-2 border rounded text-dark"
          required
        />
      </div>

      <!-- Submit -->
      <div class="pt-4">
        <button
          type="submit"
          class="px-4 py-2 bg-green-600 text-dark border rounded hover:bg-green-700"
        >
          Enregistrer le document
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { BASE_URL } from '@/config'


const etudiants = ref([])

const fetchEtudiants = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`)
    if (!response.ok) throw new Error('Erreur chargement étudiants')
    const data = await response.json()
    etudiants.value = data
  } catch (error) {
    console.error('Erreur chargement étudiants :', error)
  }
}


onMounted(() => {
  fetchEtudiants()
})

const form = reactive({
  student_id: '',
  typedocs_id: '',
  file: null,
  status: 'Accepte',
});

const handleFile = (event) => {
  form.file = event.target.files[0];
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append('student_id', form.student_id);
  formData.append('typedocs_id', form.typedocs_id);
  formData.append('file', form.file);
  formData.append('status', form.status);

  try {
    const response = await fetch(`${BASE_URL}/api/documents`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Erreur lors de l\'upload du fichier');
    const result = await response.json();
    console.log(result)
    
    // Remplacer alert par notification
    if (window.$notify) {
      window.$notify.fileUploaded('Document')
    }
    
    window.location.reload();
  } catch (error) {
    console.error('Erreur ajout document :', error);
    
    // Remplacer alert par notification
    if (window.$notify) {
      window.$notify.fileUploadError('Document')
    }
  }
};
</script>
