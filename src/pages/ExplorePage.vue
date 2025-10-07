<template>
    <LandingView>
        <!-- Breadcrumb-section Start -->
        <div class="breadcrumb-wrapper bg-cover" style="background-image: url('assets/img/ad.png');">
            <div class="container">
                <div class="page-heading">
                    <ul class="breadcrumb-items wow fadeInUp" data-wow-delay=".3s">
                        <li>
                            <a href="index.html">
                            Accueil
                            </a>
                        </li>
                        <li>
                            <i class="fa-regular fa-slash-forward"></i>
                        </li>
                        <li>
                            Étapes d'admission
                        </li>
                    </ul>
                    <h1 class="wow fadeInUp" data-wow-delay=".5s">Étapes d'admission</h1>
                </div>
            </div>
        </div>

        <!-- Feature Section Start -->
        <section class="feature-section-33 fix section-padding">
        <div class="container">
            <div class="row g-4">
                <div class="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                    <div class="feature-card-items">
                        <div class="feature-image">
                            <img src="assets/img/feature/Opening.png" alt="img">
                            <h3 class="feature-title">Étape 1: Ouverture de dossier</h3>
                            <div class="content">
                                <h3>1.</h3>
                                <p style="text-justify: inter-word;">
                                    Votre dossier sera analysé par notre équipe, et soumis à l'une de
                                    nos universités partenaires, après s'être acquitté des frais
                                    d'ouverture de dossier.(150 000 francs)
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                    <div class="feature-card-items" >
                        <div class="feature-image">
                            <img src="assets/img/feature/offer.png" alt="img">
                            <h3 class="feature-title">Étape 2: Lettre d'offre</h3>
                            <div class="content">
                                <h3>2.</h3>
                                <p style="text-justify: inter-word;">
                                    Validation de votre dossier par l'une de nos universités, réception de la lettre d'offre et obtention de 50% de bourse sur votre scolarité.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                    <div class="feature-card-items">
                        <div class="feature-image">
                            <img src="assets/img/feature/frais.png" alt="img">
                            <h3 class="feature-title">Étape 3: Frais et lettre d'admission</h3>
                            <div class="content">
                                <h3>3.</h3>
                                <p style="text-justify: inter-word;">
                                    Paiement du reste des frais LUMILYNK (200 000 francs) et pré-inscription
                                    dans votre filière choisie pour garantir votre place. (frais d'admission: selon l'université)
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                    <div class="feature-card-items">
                        <div class="feature-image">
                            <img src="assets/img/feature/visa.png" alt="img">
                            <h3 class="feature-title">Étape 4: Demande de Visa</h3>
                            <div class="content">
                                <h3>4.</h3>
                                <p style="text-justify: inter-word;">
                                    Recevez les documents et informations nécessaires pour votre demande de visa.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br>
        <div class="flex justify-center items-center">
            <div class="text-white rounded-lg">
                <router-link to="/connexion" id="btn-post" class="theme-btn" @click.prevent="reloadAbout('/connexion')">
                    Postuler
                </router-link>
            </div>
        </div>
        </section>
        
    </LandingView>
</template>

<script setup>
    import LandingView from '@/layouts/LandingView.vue';
    const reloadAbout = (path) => {
        window.location.href = path
    }
</script>