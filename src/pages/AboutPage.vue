<template>
    <LandingView>
        <!-- Breadcrumb-section Start -->
        <div class="breadcrumb-wrapper  bg-cover" style="background-image: url('assets/img/about/image4.png');">
            <div class="container">
                <div class="page-heading">
                    <ul class="breadcrumb-items wow fadeInUp" data-wow-delay=".3s">
                        <li>
                            <a href="index.html">
                            Home
                            </a>
                        </li>
                        <li>
                            <i class="fa-regular fa-slash-forward"></i>
                        </li>
                        <li>
                            À propos de nous
                        </li>
                    </ul>
                    <h1 class="wow fadeInUp" data-wow-delay=".5s">À propos de nous</h1>
                </div>
            </div>
        </div>

        <!-- About-section Start -->
        <section class="about-section section-padding pb-0 fix">
            <div class="container">
                <div class="about-wrapper-3 style-border">
                    <div class="row g-4">
                        <div class="col-lg-6">
                            <div class="about-image-3">
                                <img src="assets/img/about/propos.png" alt="img" class="wow img-custom-anim-left">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="about-content">
                                <div class="section-title">
                                    <span class="wow fadeInUp">À propos de LumiLynk</span>
                                    <h2 class="wow fadeInUp" data-wow-delay=".3s">
                                        LumiLynk, votre guide vers les études supérieures en Inde.
                                    </h2>
                                </div>
                                <p class="wow fadeInUp" data-wow-delay=".7s">
                                    Notre mission est simple : accompagner chaque étudiant vers l’université qui lui correspond,
                                    en lui offrant un suivi complet, depuis le choix du programme jusqu’à son installation sur place.
                                    Nous croyons en un accompagnement humain, rigoureux et sur mesure.
                                    Grâce à notre connaissance approfondie du système éducatif indien et à nos partenariats avec des
                                    institutions de qualité, nous facilitons chaque étape : admission, visa, logement, intégration et bien plus encore.
                                </p>
                                <div class="about-icon-items wow fadeInUp" data-wow-delay=".3s">
                                    <div class="about-icon" style="gap: 10px; margin-right: 20px;">
                                        <div class="icon flex items-center justify-center w-24 h-24">
                                            <img src="assets/img/icon/20.png" alt="img">
                                        </div>
                                        <div class="content">
                                            <h4>
                                                Orientation <br>
                                                personnalisée
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="about-icon" style="gap: 10px;">
                                        <div class="icon flex items-center justify-center w-24 h-24">
                                            <img src="assets/img/icon/21.png" alt="img">
                                        </div>
                                        <div class="content">
                                            <h4>
                                                Admission, visa, installation
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cta-bg-section Start -->
        <section class="cta-bg-section-3 section-padding fix bg-cover" style="background-image: url(assets/img/about/image2.png); height: 639px; width: 100%;">
            <div class="container">
                <div class="cta-wrapper-3">
                    <div class="circle-image">
                        <!-- <img src="assets/img/feature/text-circle.png" alt="img" class="animation-circle"> -->
                        <div class="icon">
                            <img src="assets/img/logo/logo.png" alt="img">
                        </div>
                    </div>
                    <br><br><br>
                    <div class="cta-content">
                        <h2 class="wow fadeInUp" data-wow-delay=".3s">
                            Et si votre avenir commençait en Inde ? <br>
                            Avec LumiLynk, une ambition en réalité
                        </h2>
                        <router-link to="/contact" class="theme-btn wow fadeInUp" data-wow-delay=".5s" @click.prevent="reloadAbout('/contact')">
                            Contactez nous
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

        <!-- FunFact-section Start -->
        <section class="funfact-section mt-2 fix section-padding bg-cover" style="background-image: url(assets/img/about/image.png);">
            <div class="container">
                <div class="row g-4">
                    <div class="col-lg-5">
                        <div class="section-title">
                            <span class="wow fadeInUp">Nos chiffres</span>
                            <h2 class="wow fadeInUp text-white" data-wow-delay=".3s">
                                Decouvrez en chiffres notre parcours
                            </h2>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="funfact-wrapper text-white">
                            <div class="funfact-box-items wow fadeInUp" data-wow-delay=".2s">
                                <div class="icon flex items-center justify-center w-24 h-24">
                                    <img src="assets/img/icon/04.png" style="height:60px; width:60px" alt="img" />
                                </div>
                                <div class="content">
                                    <h2><span class="count text-white">3</span></h2>
                                    <p>Universités partenaires</p>
                                </div>
                            </div>
                            <div class="funfact-box-items wow fadeInUp" data-wow-delay=".4s">
                                <div class="icon flex items-center justify-center w-24 h-24">
                                    <img src="assets/img/icon/05.png" style="height:60px; width:60px" alt="img">
                                </div>
                                <div class="content">
                                    <h2><span class="count text-white">100</span></h2>
                                    <p>Etudiants satisfaits</p>
                                </div>
                            </div>
                            <div class="funfact-box-items wow fadeInUp" data-wow-delay=".6s">
                                <div class="icon flex items-center justify-center w-24 h-24">
                                    <img src="assets/img/icon/06.png" style="height:60px; width:60px" alt="img">
                                </div>
                                <div class="content">
                                    <h2><span class="count text-white">50</span></h2>
                                    <p>Filieres que vous recherchez</p>
                                </div>
                            </div>
                            <div class="funfact-box-items wow fadeInUp" data-wow-delay=".8s">
                                <div class="icon flex items-center justify-center w-24 h-24">
                                    <img src="assets/img/icon/07.png" style="height:60px; width:60px" alt="img">
                                </div>
                                <div class="content">
                                    <h2><span class="count text-white">300</span></h2>
                                    <p>Logements disponibles</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cta Discuss Section Start -->
        <section class="cta-discuss-section fix section-padding pt-0">
            <div class="container">
                <div class="cta-discuss-wrapper">
                    <div class="cta-thumb">
                        <img src="assets/img/Plandetravail3.png" style="width:336px; height:219px" alt="img" class="wow img-custom-anim-left">
                    </div>
                    <div class="icon-items">
                        <div class="icon flex items-center justify-center w-24 h-24">
                            <img src="assets/img/icon/08.png" style="height:60px; width:60px" alt="img">
                        </div>
                        <h2 class="wow fadeInUp" data-wow-delay=".3s">
                            Confiez nous votre projet <br>
                            a lumilynk
                        </h2>
                    </div>
                    <router-link to="/explorer" class="theme-btn wow fadeInUp" @click.prevent="reloadAbout('/explorer')">
                        Comment le faire ?
                    </router-link>
                </div>
            </div>
        </section>

        <!-- team-section Start -->
        <section class="team-section fix section-padding">
            <div class="container">
                <div class="section-title text-center">
                    <span class="wow fadeInUp">Notre Equipe</span>
                    <h2 class="wow fadeInUp" data-wow-delay=".3s">
                        Soyez en contact avec notre equipe
                    </h2>
                </div>
                <div class="row justify-content-center">
                    <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                        <div class="team-box-items">
                            <div class="thumb">
                                <img src="assets/img/Abdel.png" alt="img">
                            </div>
                            <div class="content">
                                <span>CO Fondateur</span>
                                <h3>
                                    Kader Abdel OUATTARA
                                </h3>
                                <div class="social-profile">
                                    <ul>
                                        <li><a href="https://wa.me/919056820845" target="_blank"><i class="fab fa fa-whatsapp"></i></a></li>
                                        <li><a href="mailto:nabankader12@gmail.com" target="_blank"><i class="fa fa-envelope"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/abdel-kader-ouattara-079a39257/" target="_blank"><i class="fab fa-linkedin"></i></a></li>
                                    </ul>
                                    <span class="share-btn"><i class="fa-solid fa-share-nodes"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                        <div class="team-box-items">
                            <div class="thumb">
                                <img src="assets/img/uriel.png" alt="img">
                            </div>
                            <div class="content">
                                <span>CO Fondateur</span>
                                <h3>
                                    Katchi Uriel SORO
                                </h3>
                                <div class="social-profile">
                                    <ul>
                                        <li><a href="https://wa.me/919041378984" target="_blank"><i class="fab fa fa-whatsapp"></i></a></li>
                                        <li><a href="mailto:urielsoro@gmail.com" target="_blank"><i class="fa fa-envelope"></i></a></li>
                                        <li><a href="https://www.linkedin.com/in/katchi-dioba-chris-uriel-soro-6454b3224/" target="_blank"><i class="fab fa-linkedin"></i></a></li>
                                    </ul>
                                    <span class="share-btn"><i class="fa-solid fa-share-nodes"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
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