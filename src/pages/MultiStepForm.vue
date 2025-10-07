<template>
  <StudentGuard>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-2xl p-6 bg-white rounded shadow">
        <!-- Step Indicator -->
        <div class="flex justify-between mb-6">
          <div
            v-for="(stepLabel, index) in stepLabels"
            :key="index"
            class="flex-1 text-center py-2 border-b-4"
            :class="{
              'border-blue-500 text-blue-600 font-bold': currentStep === index,
              'border-gray-300 text-gray-500': currentStep !== index
            }"
          >
            {{ stepLabel }}
          </div>
        </div>

        <!-- Step 1: Coordonnées -->
        <div v-if="currentStep === 0">
          <h2 class="text-lg font-semibold mb-4 text-gray-700 text-center text-2xl">Étape 1: Coordonnées</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 font-medium mb-2">Adresse email *</label>
              <input v-model="formData.email" disabled type="email" required placeholder="Adresse email"
                class="text-dark w-full px-3 py-2 border rounded bg-gray-100" />
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Téléphone *</label>
              <input v-model="formData.phone" disabled type="tel" required placeholder="+00 00 000 000"
                class="text-dark w-full px-3 py-2 border rounded bg-gray-100" />
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Pays de résidence *</label>
              <v-select 
                v-model="selectedCountry" 
                :options="countries" 
                required 
                placeholder="Choisissez un pays" 
                label="label"
                class="required-field"
              />
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2">Ville *</label>
              <v-select 
                v-model="selectedCity" 
                :options="cities" 
                required 
                placeholder="Choisissez une ville" 
                label="label"
                class="required-field"
              />
            </div>
          </div>
        </div>

        <!-- Step 2: Niveau d'études -->
        <div v-if="currentStep === 1">
          <h2 class="text-lg font-semibold mb-4 text-gray-700 text-center text-2xl">Étape 2: Niveau d'études</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 font-medium mb-2">Niveau d'études envisagé *</label>
              <select v-model="formData.educationLevel" required class="text-dark w-full px-3 py-2 border rounded focus:border-blue-500">
                <option value="" disabled selected>Sélectionnez le niveau</option>
                <option v-for="level in levels" :key="level.id" :value="level.id">
                  {{ level.lib }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-2">Filière souhaitée *</label>
              <v-select
                v-model="formData.fieldId"
                :options="fields"
                required
                placeholder="Choisissez votre filière"
                label="label"
                :reduce="field => field.id"
                class="text-black required-field"
              >
                <!-- Template pour personnaliser l'affichage des options -->
                <template #option="{ name }">
                  <span class="text-black">{{ name }}</span>
                </template>
                <!-- Template pour l'option sélectionnée -->
                <template #selected-option="{ name }">
                  <span class="text-black">{{ name }}</span>
                </template>
              </v-select>
            </div>
          </div>
        </div>

        <!-- Step 3: Informations Parents -->
        <div v-if="currentStep === 2">
          <h2 class="text-lg font-semibold mb-4 text-gray-700 text-center text-2xl">Étape 3: Informations Parents</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 font-medium mb-2">Nom complet du père *</label>
              <input v-model="formData.pere" type="text" required placeholder="Nom complet du père"
                class="text-dark w-full px-3 py-2 border rounded focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-2">Nom complet de la mère *</label>
              <input v-model="formData.mere" type="text" required placeholder="Nom complet de la mère"
                class="text-dark w-full px-3 py-2 border rounded focus:border-blue-500" />
            </div>
          </div>
        </div>

        <!-- Step 4: Documents -->
        <div v-if="currentStep === 3" >
          <h2 class="text-lg font-semibold mb-4 text-gray-700 text-center text-2xl">Étape 4: Documents</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 font-medium mb-2">Pièce d'identité *</label>
              <input type="file" @change="handleFileUpload($event, 'identity')" required 
                accept=".pdf,.jpg,.jpeg,.png"
                class="w-full px-3 py-2 border text-dark rounded focus:border-blue-500" />
              <small class="text-gray-500">Formats acceptés: PDF, JPG, PNG</small>
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-2">Photo d'identité *</label>
              <input type="file" @change="handleFileUpload($event, 'photo')" required 
                accept=".jpg,.jpeg,.png"
                class="w-full px-3 py-2 border text-dark rounded focus:border-blue-500" />
              <small class="text-gray-500">Formats acceptés: JPG, PNG</small>
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-2">{{ diplomaLabel }} *</label>
              <input type="file" @change="handleFileUpload($event, 'diploma')" required
                accept=".pdf"
                @click="customAlert('Information', 'Combinez vos diplômes en un seul fichier PDF avant de les télécharger.')"
                class="w-full px-3 py-2 border rounded text-dark focus:border-blue-500"/>
              <small class="text-gray-500">Format accepté: PDF uniquement</small>
            </div>
            <div>
              <label class="block text-gray-700 font-medium mb-2">Bulletins de notes *</label>
              <input type="file" @change="handleFileUpload($event, 'transcripts')"
                required accept=".pdf"
                class="w-full px-3 py-2 border rounded text-dark focus:border-blue-500"/>
              <small class="text-gray-500">Format accepté: PDF uniquement</small>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-6">
          <button
            @click="prevStep"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 border cursor-pointer"
          >
            {{ currentStep === 0 ? 'Retour' : 'Précédent' }}
          </button>
          <button v-if="currentStep < stepLabels.length - 1" @click="nextStep"
            class="px-4 py-2 bg-blue-500 text-dark rounded hover:bg-blue-600 border cursor-pointer">
            Suivant
          </button>
          <button v-else @click="submitForm"
            class="px-4 py-2 bg-green-500 text-dark rounded hover:bg-green-600 border cursor-pointer">
            Soumettre
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Alert personnalisée -->
    <div v-if="showAlert" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeAlert">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" @click.stop>
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
          </div>
          <h3 class="ml-3 text-lg font-semibold text-gray-900">{{ alertTitle }}</h3>
        </div>
        <div class="mb-6">
          <p class="text-dark whitespace-pre-line">{{ alertMessage }}</p>
        </div>
        <div class="flex justify-end">
          <button
            @click="closeAlert"
            class="px-4 py-2 bg-blue-500 text-dark rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Compris
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Confirm personnalisée -->
    <div v-if="showConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeConfirm">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" @click.stop>
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
          </div>
          <h3 class="ml-3 text-lg font-semibold text-gray-900">Confirmation</h3>
        </div>
        <div class="mb-6">
          <p class="text-gray-700 whitespace-pre-line">{{ confirmMessage }}</p>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="confirmNo"
            class="px-4 py-2 bg-gray-300 text-dark rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Annuler
          </button>
          <button
            @click="confirmYes"
            class="px-4 py-2 bg-green-500 text-dark rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </StudentGuard>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { Country, City } from 'country-state-city'
import { BASE_URL } from '../config'
import StudentGuard from '../components/StudentGuard.vue'

let userParse;

// Étapes
const currentStep = ref(0)
const stepLabels = ["Coordonnées", "Niveau d'études", "Informations Parents" ,"Documents"]

// Formulaire
const formData = reactive({
  email: '',
  phone: '',
  country: '',
  city: '',
  educationLevel: '',
  fieldId: '',
  pere: '',
  mere: '',
  documents: {}
})

// Pays/Villes
const countries = ref([])
const cities = ref([])
const selectedCountry = ref(null)
const selectedCity = ref(null)

// Filières et niveaux
const fields = ref([])
const levels = ref([])
const allFields = ref([])

// État pour les modals personnalisées
const showAlert = ref(false)
const showConfirm = ref(false)
const alertMessage = ref('')
const alertTitle = ref('')
const confirmMessage = ref('')
const confirmCallback = ref(null)

// Fonctions pour gérer les modals personnalisées
const customAlert = (title, message) => {
  alertTitle.value = title
  alertMessage.value = message
  showAlert.value = true
}

const customConfirm = (message, callback) => {
  confirmMessage.value = message
  confirmCallback.value = callback
  showConfirm.value = true
}

const closeAlert = () => {
  showAlert.value = false
}

const closeConfirm = () => {
  showConfirm.value = false
  confirmCallback.value = null
}

const confirmYes = () => {
  if (confirmCallback.value) {
    confirmCallback.value()
  }
  closeConfirm()
}

const confirmNo = () => {
  closeConfirm()
}

// Chargement initial
onMounted(() => {
  countries.value = Country.getAllCountries().map(c => ({
    label: c.name,
    value: c.isoCode
  }))

  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    userParse = user
    formData.email = userParse.email
    formData.phone = userParse.phone
  }

  fetchFields()
  fetchLevels()
})

// Réagir au changement de pays
watch(selectedCountry, (country) => {
  if (country) {
    formData.country = country.label
    cities.value = City.getCitiesOfCountry(country.value).map(city => ({
      label: city.name,
      value: city.name
    }))
  } else {
    cities.value = []
    formData.country = ''
  }
})

// Réagir au changement de ville
watch(selectedCity, (city) => {
  formData.city = city?.value || ''
})

// Charger toutes les filières
const fetchFields = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/fields/`)
    const rawData = await res.json()
    
    allFields.value = rawData.map(f => ({ 
      ...f, 
      label: f.name
    }))
    
    fields.value = []
  } catch (err) {
    console.error("Erreur chargement filières:", err)
  }
}

// Charger les niveaux
const fetchLevels = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/levels/`)
    levels.value = await res.json()
  } catch (err) {
    console.error("Erreur chargement niveaux:", err)
  }
}

// FILTRAGE DES FILIÈRES SELON LE NIVEAU SÉLECTIONNÉ
watch(() => formData.educationLevel, (newLevel) => {
  if (!newLevel) {
    fields.value = []
    return
  }

  const levelNumber = parseInt(newLevel)
  
  if (levelNumber === 1) {
    // Bachelor: afficher seulement les filières de niveau 1
    fields.value = allFields.value.filter(f => f.level_id === 1)
  } else if (levelNumber === 2) {
    // Master: afficher Bachelor + Master (niveau 1 et 2)
    fields.value = allFields.value.filter(f => f.level_id === 2)
  } else if (levelNumber === 3) {
    // Doctorat: afficher toutes les filières
    fields.value = allFields.value.filter(f => f.level_id === 3)
  }

  // Réinitialiser la sélection si elle n'est plus valide
  if (formData.fieldId && !fields.value.some(f => f.id === formData.fieldId)) {
    formData.fieldId = ''
  }
}, { immediate: true })

// Navigation avec validation
const nextStep = () => { 
  if (validateCurrentStep()) {
    if (currentStep.value < stepLabels.length - 1) currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  } else {
    window.history.back()
  }
}

// Validation par étape avec modal personnalisée
const validateCurrentStep = () => {
  const errors = []

  if (currentStep.value === 0) {
    // Étape 1: Coordonnées
    if (!formData.email) errors.push("• L'adresse email est requise")
    if (!formData.phone) errors.push("• Le numéro de téléphone est requis")
    if (!selectedCountry.value) errors.push("• Le pays de résidence est requis")
    if (!selectedCity.value) errors.push("• La ville est requise")
  }
  
  else if (currentStep.value === 1) {
    // Étape 2: Niveau d'études
    if (!formData.educationLevel) errors.push("• Le niveau d'études est requis")
    if (!formData.fieldId) errors.push("• La filière souhaitée est requise")
  }
  
  else if (currentStep.value === 2) {
    // Étape 3: Informations Parents
    if (!formData.pere.trim()) errors.push("• Le nom complet du père est requis")
    if (!formData.mere.trim()) errors.push("• Le nom complet de la mère est requis")
  }
  
  else if (currentStep.value === 3) {
    // Étape 4: Documents
    if (!formData.documents.identity) errors.push("• La pièce d'identité est requise")
    if (!formData.documents.photo) errors.push("• La photo d'identité est requise")
    if (!formData.documents.diploma) errors.push("• Le diplôme est requis")
    if (!formData.documents.transcripts) errors.push("• Les bulletins de notes sont requis")
  }

  if (errors.length > 0) {
    customAlert("Champs obligatoires manquants", errors.join("\n"))
    return false
  }

  return true
}

// Validation complète avec modal personnalisée
const validateForm = () => {
  const errors = []

  // Vérifier toutes les étapes
  if (!formData.email) errors.push("• L'adresse email est requise")
  if (!formData.phone) errors.push("• Le numéro de téléphone est requis")
  if (!selectedCountry.value) errors.push("• Le pays de résidence est requis")
  if (!selectedCity.value) errors.push("• La ville est requise")
  if (!formData.educationLevel) errors.push("• Le niveau d'études est requis")
  if (!formData.fieldId) errors.push("• La filière souhaitée est requise")
  if (!formData.pere.trim()) errors.push("• Le nom complet du père est requis")
  if (!formData.mere.trim()) errors.push("• Le nom complet de la mère est requis")
  if (!formData.documents.identity) errors.push("• La pièce d'identité est requise")
  if (!formData.documents.photo) errors.push("• La photo d'identité est requise")
  if (!formData.documents.diploma) errors.push("• Le diplôme est requis")
  if (!formData.documents.transcripts) errors.push("• Les bulletins de notes sont requis")

  if (errors.length > 0) {
    customAlert("Formulaire incomplet", "Veuillez remplir les champs suivants :\n\n" + errors.join("\n"))
    return false
  }

  return true
}

// Upload fichiers avec validation des formats
const handleFileUpload = (event, key) => {
  const file = event.target.files[0]
  
  if (!file) return
  
  // Validation des types de fichiers
  const validFormats = {
    identity: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
    photo: ['image/jpeg', 'image/jpg', 'image/png'],
    diploma: ['application/pdf'],
    transcripts: ['application/pdf']
  }
  
  // Validation de la taille (10MB max)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    customAlert("Fichier trop volumineux", `Le fichier "${file.name}" est trop volumineux.\n\nTaille maximum autorisée : 10 MB\nTaille du fichier : ${(file.size / (1024 * 1024)).toFixed(2)} MB`)
    event.target.value = '' // Reset input
    return
  }
  
  // Validation du format
  if (validFormats[key] && !validFormats[key].includes(file.type)) {
    const allowedFormats = {
      identity: "PDF, JPG, PNG",
      photo: "JPG, PNG",
      diploma: "PDF uniquement",
      transcripts: "PDF uniquement"
    }
    
    customAlert("Format de fichier invalide", `Le fichier "${file.name}" n'est pas dans un format accepté.\n\nFormats autorisés pour ce champ : ${allowedFormats[key]}\nFormat détecté : ${file.type}`)
    event.target.value = '' // Reset input
    return
  }
  
  // Si tout est OK, sauvegarder le fichier
  formData.documents[key] = file
  console.log(`Fichier ${key} ajouté :`, file.name)
}

// Label dynamique pour les diplômes
const diplomaLabel = computed(() => {
  if (formData.educationLevel === 1) {
    return "Baccalauréat"
  } else if (formData.educationLevel === 2) {
    return "Baccalauréat & Licence"
  } else if (formData.educationLevel === 3) {
    return "Baccalauréat & Licence & Master"
  }
  return "Diplôme"
})

// Soumission du formulaire avec modal personnalisée
const submitForm = async () => {
  // Validation complète avant soumission
  if (!validateForm()) {
    return
  }

  // Confirmation finale avec modal personnalisée
  customConfirm(
    "Êtes-vous sûr de vouloir soumettre votre candidature ?\n\nVeuillez vérifier que toutes les informations sont correctes car vous ne pourrez plus les modifier.",
    async () => {
      console.log("Formulaire à soumettre :", formData)

      try {
        await updateUser()
        await createApplication()
        await CreateDocs(userParse.id)

        customAlert("Succès !", "Votre candidature a été soumise avec succès !\n\nVous allez être redirigé vers votre espace personnel.")
        
        // Redirection après 2 secondes
        setTimeout(() => {
          window.location.href = "/mon-espace"
        }, 2000)

      } catch (error) {
        console.error("Erreur pendant la soumission du formulaire :", error)
        customAlert("Erreur", "Une erreur est survenue lors de la soumission.\n\nVeuillez réessayer ou contacter le support.")
      }
    }
  )
}

const updateUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/restupdate/${userParse.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: formData.country,
        city: formData.city,
        pere: formData.pere,
        mere: formData.mere
      })
    })
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

const createApplication = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userParse.id,
        field_id: formData.fieldId,
        level_id: formData.educationLevel
      })
    })
    const data = await response.json()
    console.log(data)
    localStorage.setItem('application_id', data.id)
  } catch (error) {
    console.error(error)
  }
}

const CreateDocs = async (studentId) => {
  const data = new FormData()

  data.append('student_id', studentId)

  for (const key in formData.documents) {
    if (formData.documents[key]) {
      data.append(key, formData.documents[key])
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/api/documents/upload`, {
      method: 'POST',
      body: data
    })

    const text = await response.text()
    const result = JSON.parse(text)
    console.log(result)
  } catch (error) {
    console.error("Erreur de parsing JSON :", error)
  }
}
</script>

<style scoped>
  @import 'vue-select/dist/vue-select.css';
  
  /* Correction des couleurs pour v-select */
  :deep(.vs__dropdown-toggle) {
    background: white;
    border: 1px solid #d1d5db;
  }
  
  :deep(.vs__selected) {
    color: #000000 !important;
    background: transparent;
  }
  
  :deep(.vs__dropdown-option) {
    color: #000000 !important;
    background: white;
  }
  
  :deep(.vs__dropdown-option--highlight) {
    background: #3b82f6 !important;
    color: white !important;
  }
  
  :deep(.vs__search) {
    color: #000000 !important;
  }
  
  :deep(.vs__search::placeholder) {
    color: #9ca3af !important;
  }
  
  /* Style pour les labels */
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
  }

  /* Indicateur de champ requis */
  label::after {
    content: "";
  }

  /* Style pour les champs requis vides */
  .required-field :deep(.vs__dropdown-toggle) {
    border: 1px solid #d1d5db;
  }

  .required-field.error :deep(.vs__dropdown-toggle) {
    border-color: #ef4444;
    background-color: #fef2f2;
  }

  /* Styles pour les modals */
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-enter-from, .modal-leave-to {
    opacity: 0;
  }
  
  /* Animation pour le contenu de la modal */
  .modal-content-enter-active, .modal-content-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-content-enter-from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  
  .modal-content-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
</style>