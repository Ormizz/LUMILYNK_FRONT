<template>
    <!-- Preloader Start -->
    <div id="preloader" class="preloader">
        <div class="animation-preloader">
            <div class="spinner">
            </div>
            <div class="txt-loading">
                <span data-text-preloader="L" class="letters-loading">
                    L
                </span>
                <span data-text-preloader="U" class="letters-loading">
                    U
                </span>
                <span data-text-preloader="M" class="letters-loading">
                    M
                </span>
                <span data-text-preloader="I" class="letters-loading">
                    I
                </span>
                <span data-text-preloader="L" class="letters-loading">
                    L
                </span>
                <span data-text-preloader="Y" class="letters-loading">
                    Y
                </span>
                <span data-text-preloader="N" class="letters-loading">
                    N
                </span>
                <span data-text-preloader="K" class="letters-loading">
                    K
                </span>
            </div>
            <p class="text-center">Votre passerelle vers les <br>meilleures universités</p>
        </div>
        <div class="loader">
            <div class="row">
                <div class="col-3 loader-section section-left">
                    <div class="bg"></div>
                </div>
                <div class="col-3 loader-section section-left">
                    <div class="bg"></div>
                </div>
                <div class="col-3 loader-section section-right">
                    <div class="bg"></div>
                </div>
                <div class="col-3 loader-section section-right">
                    <div class="bg"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Back To Top Start -->
    <button id="back-top" class="back-to-top">
        <i class="fa-regular fa-arrow-up"></i>
    </button>

    <!--<< Mouse Cursor Start >>-->
    <div class="mouse-cursor cursor-outer"></div>
    <div class="mouse-cursor cursor-inner"></div>
    
    <!-- Offcanvas Area Start -->
    <div class="fix-area">
    <div class="offcanvas__info">
        <div class="offcanvas__wrapper">
            <div class="offcanvas__content">
                <div class="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                    <div class="offcanvas__logo">
                        <router-link to="/">
                            <img src="assets/img/logo/logo.png" height="80px" width="200px" alt="logo-img" />
                        </router-link>
                    </div>
                    <div class="offcanvas__close">
                        <button>
                        <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="mobile-menu fix mb-3"></div>
                <div class="offcanvas__contact">
                    <h4>Contact Info</h4>
                    <ul>
                        <li class="d-flex align-items-center">
                            <div class="offcanvas__contact-icon">
                                <i class="fal fa-map-marker-alt"></i>
                            </div>
                            <div class="offcanvas__contact-text">
                                <a target="_blank" href="#">GBP CREST, Mohali, India</a>
                            </div>
                        </li>
                        <li class="d-flex align-items-center">
                            <div class="offcanvas__contact-icon mr-15">
                                <i class="fal fa-envelope"></i>
                            </div>
                            <div class="offcanvas__contact-text">
                                <a href="mailto:info@lumilynk.com"><span class="mailto:info@lumilynk.com">info@lumilynk.com</span></a>
                            </div>
                        </li>
                        <li class="d-flex align-items-center">
                            <div class="offcanvas__contact-icon mr-15">
                                <i class="fal fa-clock"></i>
                            </div>
                            <div class="offcanvas__contact-text">
                                <a target="_blank" href="#">Lun-Ven, 09h -17h</a>
                            </div>
                        </li>
                        <li class="d-flex align-items-center">
                            <div class="offcanvas__contact-icon mr-15 ">
                                <i class="far fa-phone" ></i>
                            </div>
                            <div class="offcanvas__contact-text">
                                <a href="https://wa.me/919056820845">+91 90568 20845</a>
                            </div>
                        </li>
                    </ul>
                    <div class="header-button mt-4">
                        
                    </div>
                    <!-- <a href="contact.html" class="theme-btn w-100">
                        Contactez nous
                    </a> -->
                    <router-link to="/contact" class="theme-btn w-100">
                        Contactez nous
                    </router-link>
                    <div class="social-icon d-flex align-items-center">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="offcanvas__overlay"></div>

    <!-- Header Section Start -->
    <header class="header-section header-section-1">
        <div id="header-sticky" class="header-1">
            <div class="container-fluid">
                <div class="mega-menu-wrapper">
                    <div class="header-main">
                        <div class="logo">
                            <router-link to="/" @click.prevent="reloadAbout" class="header-logo-">
                                <img src="assets/img/logo/logo.png" height="50px" width="200px" alt="logo-img">
                            </router-link>
                        </div>
                        <div class="mean__menu-wrapper">
                            <div class="main-menu">
                                <nav id="mobile-menu">
                                    <ul>
                                        <li class="has-dropdown">
                                            <!-- <a href="index.html">
                                                Accueil
                                            </a> -->
                                            <router-link to="/" @click.prevent="reloadAbout('/')">
                                                Accueil
                                            </router-link>
                                        </li>
                                        <li class="has-dropdown">
                                            <!-- <a href="about.html">
                                                A propos
                                            </a> -->
                                            <router-link to="/about" @click.prevent="reloadAbout('/about')">
                                                A propos
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/explorer" @click.prevent="reloadAbout('/explorer')">
                                                Admission
                                            </router-link>
                                        </li>
                                        
                                        <li>
                                            <!-- <a href="contact.html">Contact</a> -->
                                            <router-link to="/contact" @click.prevent="reloadAbout('/contact')">
                                                Contact
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link to="/connexion" @click.prevent="reloadAbout('/connexion')">
                                                Mon espace
                                            </router-link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div class="header-right d-flex justify-content-end align-items-center">
                            <div class="header-right-items">
                                <div class="contact-content">
                                    <div class="w-12 h-12 flex items-center justify-center rounded-full">
                                        <img src="assets/img/call.png" alt="img" class="w-6 h-6 object-contain">
                                    </div>
                                    <div class="info-content">
                                        <h6>Nous contacter</h6>
                                        <h3><a href="https://wa.me/919056820845">+91 90568 20845</a></h3>
                                    </div>
                                </div>
                            </div>
                            <div class="header__hamburger d-xl-none my-auto">
                                <div class="sidebar__toggle">
                                    <i class="fas fa-bars"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Search Area Start -->
    <div class="search-wrap">
        <div class="search-inner">
            <i class="fas fa-times search-close" id="search-close"></i>
            <div class="search-cell">
                <form method="get">
                    <div class="search-field-holder">
                        <input type="search" class="main-search-input" placeholder="Search...">
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Search Area End -->
</template>

<script setup>
    const reloadAbout = (path) => {
        window.location.href = path
    }
</script>