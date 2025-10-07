<template>
    <main>
      <div class="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Référence</label>
              <input v-model="form.reference" type="text" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Montant (FCFA)</label>
              <input v-model="form.montant" type="number" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Type de paiement</label>
              <select v-model="form.type" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="" disabled>Choisir un type</option>
                <option value="frais_dossier">Frais d’étude de dossier</option>
                <option value="admission_letter">Frais d’admission</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Date du paiement</label>
              <input v-model="form.date" type="date" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Preuve de paiement (Capture)</label>
            <input
              type="file"
              @change="(e) => form.proof = e.target.files[0]"
              accept="image/*"
              required
              class="w-full px-3 py-2 border rounded text-dark"
            />
          </div>

          <div class="pt-4">
            <button type="submit" class="px-4 py-2 bg-green-600 text-gray-600 border rounded hover:bg-indigo-700">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </main>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { BASE_URL } from '../../config'

const form = reactive({
  reference: '',
  montant: '',
  type: '',
  statut: 'En attente',
  date: '',
  proof: null
})

let application_id;

const submitForm = async () => {
  const formDataToSend = new FormData()
  formDataToSend.append('reference', form.reference)
  formDataToSend.append('amount', form.montant)
  formDataToSend.append('type', form.type)
  formDataToSend.append('status', form.statut)
  formDataToSend.append('date', form.date)
  formDataToSend.append('application_id', application_id)
  formDataToSend.append('proof', form.proof)

  try {
    const response = await fetch(`${BASE_URL}/api/payments`, {
      method: 'POST',
      body: formDataToSend
    })

    const result = await response.json()
    console.log('Paiement enregistré :', result)
    window.location.reload()
  } catch (error) {
    console.error('Erreur lors de l’envoi du paiement', error)
  }
}

onMounted(()=>{
  application_id = JSON.parse(localStorage.getItem('application_id'))
})
</script>
