<template>
    <StudentGuard>
      <div class="min-h-full">
        <CompHeader/>
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-lg font-semibold tracking-tight text-gray-800" style="font-size: 50px;">VISA ÉTUDES</h1>
            </div>
        </header>

        <!-- Main content -->
        <main class="px-6 py-10 max-w-4xl mx-auto text-gray-700">
          <section class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-800">Documents requis pour la <span style="color: var(--theme);">demande de visa d'études</span> en Inde</h2>

            <div class="bg-white rounded-lg shadow-md p-6">
              <ol class="space-y-4">
                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <div>
                    <strong>&nbsp;&nbsp;FORMULAIRE DE DEMANDE DE VISA À REMPLIR EN LIGNE VIA CE LIEN</strong>
                    <p class="text-sm text-gray-600 mt-1">
                      <a href="https://indianvisaonline.gov.in/visa/index.html" target="_blank">https://indianvisaonline.gov.in/visa/index.html</a>(photo à télécharger obligatoirement). IMPRIMER PAR VOUS-MÊME ET SIGNER À L'AMBASSADE
                    </p>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <div>
                    <strong>&nbsp;&nbsp;PHOTOS D'IDENTITÉ DE LA MÊME PRISE (5x5 cm, Fond blanc)</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <div>
                    <strong>&nbsp;&nbsp;PHOTOCOPIE DU CARNET DE VACCINATION CONTRE LA FIÈVRE JAUNE (avec présentation de l'original)</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <div>
                    <strong>&nbsp;&nbsp;ATTESTATION DE RÉUSSITE AU BAC</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                  <div>
                    <strong>&nbsp;&nbsp;RELEVÉ DE NOTES AU BAC</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">6</span>
                  <div>
                    <strong>&nbsp;&nbsp;LETTRE D'ADMISSION ET BONAFIDE D'UNE UNIVERSITÉ RECONNUE EN INDE ACCOMPAGNÉE DU REÇU DE PAIEMENT</strong>
                    <p class="text-sm text-gray-600 mt-1">
                      DE L'ADRESSE COMPLÈTE DE L'ÉCOLE (mail, tél, du principal et celui de l'école)
                    </p>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">7</span>
                  <div>
                    <strong>&nbsp;&nbsp;ATTESTATION LÉGALISÉE DE PRISE EN CHARGE PAR L'UN DES PARENTS</strong>
                    <p class="text-sm text-gray-600 mt-1">
                      (la fonction du parent doit être précisée sur l'attestation ainsi que son lien de parenté avec l'étudiant) ACCOMPAGNÉE DE LA COPIE DE LA CARTE D'IDENTITÉ
                    </p>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">8</span>
                  <div>
                    <strong>&nbsp;&nbsp;RELEVÉ BANCAIRE DES SIX DERNIERS MOIS CACHETÉ ET SIGNÉ DU PARENT</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">9</span>
                  <div>
                    <strong>&nbsp;&nbsp;FRAIS DE VISA 51,100 FCFA (49,100fcfa + 2,000fcfa)</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">10</span>
                  <div>
                    <strong>&nbsp;&nbsp;VISITE MÉDICALE (TEST VIH PAS OBLIGATOIRE)</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">11</span>
                  <div>
                    <strong>&nbsp;&nbsp;CERTIFICAT DE RÉSIDENCE</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">12</span>
                  <div>
                    <strong>&nbsp;&nbsp;PHOTOCOPIE DU TRAVELLER'S CHEQUE OU DE LA CARTE BANCAIRE DE L'ÉTUDIANT</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">13</span>
                  <div>
                    <strong>&nbsp;&nbsp;PHOTOCOPIE DU DERNIER DIPLÔME OBTENU</strong>
                  </div>
                </li>

                <li class="flex items-start space-x-3">
                  <span class="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold">14</span>
                  <div>
                    <strong>&nbsp;&nbsp;RÉSERVATION DE BILLET D'AVION</strong>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Payment Information -->
            <div class="bg-blue-50 rounded-lg p-6 mt-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4">Informations de paiement</h3>
              <p class="mb-4"><strong>Les frais de visa sont payables par deux versements à la banque UBA comme suit :</strong></p>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg">
                  <p class="font-semibold">N° de Compte 10110002533</p>
                  <p class="text-lg">49,100 FCfa <span class="text-sm text-gray-600">(frais de timbre inclus)</span></p>
                </div>
                <div class="bg-white p-4 rounded-lg">
                  <p class="font-semibold">N° de Compte 10110002542</p>
                  <p class="text-lg">2,000 FCfa <span class="text-sm text-gray-600">(frais de timbre inclus)</span></p>
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="bg-gray-100 rounded-lg p-6 mt-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4">Informations de contact</h3>
              <div class="space-y-3">
                <div>
                  <p><strong>POUR PLUS D'INFORMATION SUR LES ÉCOLES EN INDE VEUILLEZ VISITER :</strong></p>
                  <p>SITE WEB : <a href="https://www.naac.gov.in" class="text-blue-600 underline">www.naac.gov.in</a></p>
                </div>
                
                <div>
                  <p><strong>POUR PLUS D'INFORMATION VEUILLEZ NOUS CONTACTER AU :</strong></p>
                  <p>Tél : +225 2722479580/ +225 2722479581</p>
                  <p>email : <a href="mailto:cons.abidjan@mea.gov.in" class="text-blue-600 underline">cons.abidjan@mea.gov.in</a></p>
                  <p><a href="mailto:yawforkuo@yahoo.fr" class="text-blue-600 underline">yawforkuo@yahoo.fr</a></p>
                </div>
              </div>
            </div>

            <!-- Important Note -->
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
              <div class="flex">
                <div class="ml-3">
                  <p class="text-sm text-yellow-700">
                    <strong>NB :</strong> L'Ambassade invite tous les demandeurs de visa à s'assurer qu'ils ont en leur possession les dossiers susmentionnés et de paiements de la banque avant tout dépôt (9h à 12h tous les jours ouvrables)
                  </p>
                </div>
              </div>
            </div>

          </section>
        </main>
      </div>
    </StudentGuard>
</template>

<script setup>
    import CompHeader from '../components/Dashboard/CompHeader.vue'
    import StudentGuard from '../components/StudentGuard.vue'
    
</script>