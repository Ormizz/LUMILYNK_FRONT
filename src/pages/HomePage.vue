<template>
    <LandingView>
        <!-- hero-section Start -->
        <section class="hero-section-1 fix">
            <div class="swiper hero-slider">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="hero-1">
                            <div class="slider-bg bg-cover" style="background-image: url(https://images.unsplash.com/photo-1645263012710-35e2fc89cb5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);">
                            </div>
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="hero-content">
                                            <h6 data-animation="fadeInUp" data-delay="1.3s">
                                                LUMILYNK, vous guide dans votre aventure
                                            </h6>
                                            <h1 data-animation="fadeInUp" data-delay="1.5s">
                                                AVEC UNE BOURSE DE 50% SUR VOTRE SCOLARITÉ
                                            </h1>
                                            <router-link to="/explorer" class="theme-btn" @click.prevent="reloadAbout('/explorer')">
                                                En savoir plus
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="hero-1">
                            <div class="slider-bg bg-cover" style="background-image: url(https://images.unsplash.com/photo-1639432042876-cf6066e0aee5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);">
                            </div>
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="hero-content">
                                            <h6 data-animation="fadeInUp" data-delay="1.3s">
                                                LUMILYNK, vous facilite votre recherche
                                            </h6>
                                            <h1 data-animation="fadeInUp" data-delay="1.5s">
                                                Trouvez facilement votre filiere de reve
                                            </h1>
                                            <router-link to="/explorer" class="theme-btn" @click.prevent="reloadAbout('/explorer')">
                                                En savoir plus
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="array-button">
                <button class="array-prev"><i class="fa-regular fa-arrow-left-long"></i></button>
                <button class="array-next"><i class="fa-regular fa-arrow-right-long"></i></button>
            </div>
        </section>

        <!-- Service Section Start -->
        <section class="service-section section-padding pt-0 pb-0 bg-cover" style="background-image: url('assets/img/service/bg.png');">
            <div class="container">
                <div class="service-wrapper">
                    <div class="row g-4">
                        <div class="col-xl-9 col-lg-8">
                            <div class="row g-4">
                                <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                                    <div class="service-box-items">
                                        <div class="icon">
                                            <img src="assets/img/icon/02.png" style="height:60px; width:60px" alt="img">
                                        </div>
                                        <div class="content">
                                            <h4><a>Denichez <br>
                                                une université</a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                                    <div class="service-box-items">
                                        <div class="icon">
                                            <img src="assets/img/icon/01.png" style="height:60px; width:60px" alt="img">
                                        </div>
                                        <div class="content">
                                            <h4><a>Obtenez <br>
                                                votre admission</a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                                    <div class="service-box-items">
                                        <div class="icon">
                                            <img src="assets/img/icon/03.png" style="height:60px; width:60px" alt="img">
                                        </div>
                                        <div class="content">
                                            <h4><a>Trouvez <br>
                                                un appartement</a>
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="service-info wow fadeInUp" data-wow-delay=".9s">
                                <div class="image">
                                    <img src="assets/img/Plandetravail2.png" alt="" id="pdtimage">
                                </div>
                                <div class="info-content">
                                    <p>
                                        Nous avons plus de 02 ans d'experience dans ce domaine
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4">
                            <div class="service-image">
                                <img src="https://images.unsplash.com/photo-1611093342893-e61fe4d65e22?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img">
                                <div class="service-content">
                                    <h3>
                                        <a>
                                            Prêt pour des services exceptionnels ?
                                        </a>
                                    </h3>
                                    <router-link to="/contact" class="theme-btn" @click.prevent="reloadAbout('/contact')">
                                        Contactez nous
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br><br><br><br>
            </div>
        </section>
        
        <!-- About-section Start -->
        <section class="about-section section-padding fix">
            <div class="container">
                <div class="about-wrapper">
                    <div class="row g-4">
                        <div class="col-lg-6">
                            <div class="about-image hover-underline">
                                <img src="https://images.unsplash.com/photo-1711500310970-1defb6bfce6b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxibGFjayUyMHN0dWRlbnQlMjBncm91cCUyMGFicm9hZHxlbnwwfHwwfHx8MA%3D%3D" alt="img" class="wow img-custom-anim-left">
                                <div class="about-image-2 hover-underline">
                                    <img src="https://images.unsplash.com/photo-1737742462464-b26eb948dfeb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="height: 328px; width: 233px;" alt="img" class="wow img-custom-anim-right" data-wow-duration="1.5s" data-wow-delay="0.3s">
                                    <div class="title">
                                        <div class="arrow-image">
                                            <img src="assets/img/about/arrow-title.png" style="height:60px; width:100px" alt="img">
                                        </div>
                                        <h5>
                                            Êtes vous prêt <br>
                                            à vous engager ?
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="about-content">
                                <div class="section-title">
                                    <span class="wow fadeInUp">Bienvenue à LUMILYNK</span>
                                    <h2 class="wow fadeInUp" data-wow-delay=".3s">
                                        LumiLynk – Étudier à l’international, en toute confiance
                                    </h2>
                                </div>
                                <p class="wow fadeInUp" data-wow-delay=".5s">
                                    LumiLynk est une agence d’accompagnement dédiée aux étudiants souhaitant poursuivre leurs études en Inde. Nous vous guidons à chaque étape : choix de l’université, dossier d’admission, visa, et installation, avec un suivi personnalisé et fiable.
                                </p>
                                <div class="about-area">
                                    <div class="about-items wow fadeInUp" data-wow-delay=".3s">
                                        <div class="title">
                                            <div class="number">01</div>
                                            <h5>
                                                Un service de qualité
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="about-items wow fadeInUp" data-wow-delay=".5s">
                                        <div class="title">
                                            <div class="number">02</div>
                                            <h5>
                                                Conseils avisés
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="pro-items wow fadeInUp" data-wow-delay=".3s">
                                    <div class="pro-head">
                                        <h6 class="title">
                                            Vous y êtes presque
                                        </h6>
                                        <span class="point">
                                            90%
                                        </span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress-value"></div>
                                    </div>
                                </div>
                                <router-link to="/about" class="theme-btn wow fadeInUp" @click.prevent="reloadAbout('/about')">
                                    En savoir plus
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Project-section Start -->
        <section class="project-section section-padding bg-cover pb-0 fix" style="background-image: url('assets/img/project/bg.jpg');">
            <!-- <div class="bg-image">
                <img src="assets/img/project/bg.jpg" alt="img">
            </div> -->
            <div class="section-title text-center">
                <span class="wow fadeInUp">Des images qui vous parlent</span>
                <h2 class="wow fadeInUp" data-wow-delay=".3s">
                    Explorez la connaissance avec LUMILYNK
                </h2>
            </div>
            <div class="swiper project-slider">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="project-card-items">
                            <div class="project-image">
                                <img src="https://images.unsplash.com/photo-1515091943-9d5c0ad475af?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="height: 463px; width: 470px;" alt="img">
                                <div class="project-content">
                                    <span>01</span>
                                    <div class="content">
                                        <h6>
                                            Decouvrez l'Inde
                                        </h6>
                                        <h3>
                                            <a>Des places à visiter</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="project-card-items">
                            <div class="project-image">
                                <img src="https://images.unsplash.com/photo-1744320951371-123a9b2ba9b1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="height: 463px; width: 470px;" alt="img">
                                <div class="project-content">
                                    <span>02</span>
                                    <div class="content">
                                        <h6>
                                            Avoir un large reseau
                                        </h6>
                                        <h3>
                                            <a >Faites vous plein de connaissance</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="project-card-items">
                            <div class="project-image">
                                <img src="https://images.unsplash.com/photo-1734914312670-1b540001a66d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="height: 463px; width: 470px;" alt="img">
                                <div class="project-content">
                                    <span>03</span>
                                    <div class="content">
                                        <h6>
                                            Scolarité
                                        </h6>
                                        <h3>
                                            <a>Des frais à moindre cout</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="project-card-items">
                            <div class="project-image">
                                <img src="https://images.unsplash.com/photo-1645262803528-1c2da0db3795?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="height: 463px; width: 470px;" alt="img">
                                <div class="project-content">
                                    <span>04</span>
                                    <div class="content">
                                        <h6>
                                            Un avenir prometteur
                                        </h6>
                                        <h3>
                                            <a>Des postes pour vos competences</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                    <p>Étudiants satisfaits</p>
                                </div>
                            </div>
                            <div class="funfact-box-items wow fadeInUp" data-wow-delay=".6s">
                                <div class="icon flex items-center justify-center w-24 h-24">
                                    <img src="assets/img/icon/06.png" style="height:60px; width:60px" alt="img">
                                </div>
                                <div class="content">
                                    <h2><span class="count text-white">50</span></h2>
                                    <p>Filières que vous recherchez</p>
                                </div>
                            </div>
                            <div class="funfact-box-items wow fadeInUp" data-wow-delay=".8s">
                                <div class="icon flex items-center justify-center w-24 h-24">
                                    <img style="height:60px; width:60px" src="assets/img/icon/07.png" alt="img">
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
                        </h2>
                    </div>
                    <router-link to="/explorer" class="theme-btn wow fadeInUp" data-wow-delay=".5s" @click.prevent="reloadAbout('/explorer')">
                        Comment le faire ?
                    </router-link>
                </div>
            </div>
        </section>
        <!-- Faq-section Start -->
        <section class="faq-section section-padding pt-0 fix">
            <div class="container">
                <div class="section-title text-center">
                    <span class="wow fadeInUp">La foire aux questions</span>
                    <h2 class="wow fadeInUp" data-wow-delay=".3s">
                        Nous répondons à vos questions
                    </h2>
                </div>
                <div class="faq-wrapper">
                    <div class="row align-items-center">
                        <div class="col-lg-6">
                            <div class="faq-items">
                                <div class="row g-3">
                                    <div class="col-md-6 wow img-custom-anim-left" data-wow-duration="1.5s" data-wow-delay="0.3s">
                                        <div class="faq-image">
                                            <img src="https://images.unsplash.com/photo-1677594332344-6234203fa86d?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img">
                                        </div>
                                    </div>
                                    <div class="col-md-6 wow img-custom-anim-right" data-wow-duration="1.5s" data-wow-delay="0.5s">
                                        <div class="counter-box">
                                            <div class="inner-icon">
                                                <div class="icon">
                                                    <i class="fa-solid fa-phone-volume" style="color: var(--theme);"></i>
                                                </div>
                                            </div>
                                            <div class="text">
                                                <span>Notre contact</span>
                                                <h3>
                                                    <a href="https://wa.me/919056820845">+91 90568 20845</a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div class="faq-image-2">
                                            <img src="https://images.unsplash.com/photo-1543501527-49e855165f73?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="height: 254px; width: 303px;" alt="img">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="space-y-4">
                            <div v-for="(item, index) in faqs" :key="index" class="border rounded-lg">
                                <!-- Header -->
                                <button
                                    @click="toggle(index)"
                                    class="w-full flex justify-between items-center p-4 text-left"
                                >
                                    <span class="font-semibold text-gray-800">{{ item.question }}</span>
                                    <svg
                                        :class="['w-5 h-5 transform transition-transform duration-300', openIndex === index ? 'rotate-180' : '']"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <!-- Content -->
                                <div v-show="openIndex === index" class="px-4 pb-4 text-gray-600">
                                    {{ item.answer }}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- team-section Start -->
        <section class="team-section fix section-padding" style="background-image: url('assets/img/testimonial/testi-bg.jpg');">
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
                                    Abdel Kader OUATTARA
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

        <!-- Contact-section Start -->
        <section class="contact-section fix bg-cover" style="background-image: url(assets/img/contact/bg.jpg);">
            <div class="container">
                <div class="contact-wrapper">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="faq-content">
                                <div class="section-title">
                                <span class="wow fadeInUp">Contactez nous</span>
                                    <h2 class="text-white wow fadeInUp" data-wow-delay=".3s">
                                        Laissez-nous un message
                                    </h2>
                                </div>
                                <form @submit.prevent="submitForm" id="contact-form" class="mt-4 mt-md-0" method="POST">
                                <div class="row g-4">
                                    <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                                        <div class="form-clt">
                                            <input type="text" v-model="form.name" id="name" placeholder="Votre nom">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                                        <div class="form-clt">
                                            <input type="text" v-model="form.email" id="email2" placeholder="Adresse email">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                                        <div class="form-clt">
                                            <input type="text" v-model="form.phone" id="phone" placeholder="Numero de téléphone">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                                        <div class="form-clt">
                                            <input type="text" v-model="form.subject" id="subject" placeholder="Objet">
                                        </div>
                                    </div>
                                    <div class="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
                                        <div class="form-clt">
                                            <textarea v-model="form.message" id="message" placeholder="Votre message"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
                                        <button type="submit" class="theme-btn">
                                            Envoyez
                                        </button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="faq-image">
                                <img src="https://images.unsplash.com/photo-1627897495484-229b29feb0d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="height: 738px; width: 871px;" alt="img" class="wow img-custom-anim-right cursor-box" data-wow-duration="1.5s" data-wow-delay="0.4s">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Map-section Start -->
        <div class="map-items">
            <div class="googpemap">
                <iframe width="0" height="0" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=gbp%20crest+(Lumylink)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>
        </div>
        <!-- News-section Start -->
        <!-- Cta section Start -->
        <section class="cta-section section-padding pt-0">
            <div class="cta-wrapper" style="background-image: url(assets/img/about/image2.png);">
                <div class="container">
                    <div class="cta-content">
                        <h2 class="wow fadeInUp">Plus qu'à un clic pour nous rejoindre</h2>
                        <p class="wow fadeInUp" data-wow-delay=".3s" style="color: var(--theme);">Engagez vous maintenant</p>
                        <router-link to="/connexion" class="theme-btn wow fadeInUp" data-wow-delay=".5s" @click.prevent="reloadAbout('/connexion')">
                            Encore plus avec LUMILYNK
                        </router-link>
                    </div>
                </div>
            </div>
        </section>


    </LandingView>
</template>

<script setup>
    import LandingView from '../layouts/LandingView.vue'
    import { BASE_URL } from '@/config'
    import { ref } from "vue"

    const reloadAbout = (path) => {
        window.location.href = path
    }

    const openIndex = ref(null)

    const faqs = ref([
        {
            question: "1. Les diplômes obtenus en Inde sont-ils reconnus ?",
            answer:
                "Oui ! Nous travaillons avec des universités accreditées dont les diplômes sont reconnus à l’international."
        },
        {
            question: "2. Qu'est ce que Lumilynk me garantit une fois arrivé en Inde ?",
            answer:
                "LumiLynk vous assure un suivi même après votre arrivée: accueil, insertion, conseils pratiques..."
        },
        {
            question: "3. Pourquoi étudier en Inde ?",
            answer:
                "L'Inde allie excellence académique, innovation, coût abordable et diversité culturelle..."
        }
    ])

    function toggle(index) {
        openIndex.value = openIndex.value === index ? null : index
    }


    const form = ref({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const submitForm = async () => {
        try {
        console.log(form.value)
        const response = await fetch(`"${BASE_URL}/api/contacts/"`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form.value),
        });

        const data = await response.json();
        if (response.ok && data) {
            if (window.$notify) {
            window.$notify.successAndRedirect(
                'Votre message a bien été envoyé.',
                'Succès',
                '/',
                2000
            )
            }
        }else {
            if (window.$notify) {
            window.$notify.error(
                "Une erreur est survenue.",
                "Échec de l'envoi"
            )
            }
        }
        
        } catch (error) {
            console.error(error)
            if (window.$notify) {
                window.$notify.networkError()
            }
        }
    };

</script>