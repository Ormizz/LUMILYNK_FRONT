<template>
    <!-- Footer section Start -->
    <footer class="footer-section bg-cover" style="background-image: url('assets/img/footer/footer-bg.png');">
        <div class="container">
            <div class="footer-widgets-wrapper">
                <div class="row justify-content-center">
                    <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                        <div class="single-footer-widget">
                            <div class="widget-head">
                                <a href="index.html">
                                    <img src="assets/img/logo/logo.png" height="50px" width="200px" alt="logo-img">
                                </a>
                            </div>
                            <div class="footer-content">
                                <h4 class="footer-sub-title">
                                    LumiLynk est une agence d’accompagnement dédiée aux étudiants souhaitant poursuivre leurs études en Inde
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 ps-lg-5 wow fadeInUp" data-wow-delay=".4s">
                        <div class="single-footer-widget">
                            <div class="widget-head">
                                <h3>Pages</h3>
                            </div>
                            <ul class="list-area">
                                <li>
                                    <router-link to="/" @click.prevent="reloadAbout('/')">
                                        Accueil
                                    </router-link>
                                </li>
                                <li>
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
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                        <div class="single-footer-widget">
                            <div class="widget-head">
                                <h3>Reseaux sociaux</h3>
                            </div>
                            <div class="footer-content">
                                <div class="social-icon d-flex align-items-center">
                                    <a href="https://www.facebook.com/profile.php?id=61578165950712" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                    <a href="https://www.instagram.com/lumilynk_2025/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                                </div>
                                <br>
                                <ul class="footer-contact">
                                    <li>
                                        <i class="fa-solid fa-envelope"></i>
                                        <a href="mailto:info@lumilynk.com">info@lumilynk.com</a>
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-phone"></i>
                                        <a href="https://wa.me/919041378984">+91 90413 78984</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-wrapper wow fadeInUp" data-wow-delay=".3s">
                    <p>
                        © Copyright 2025 by LUMILYNK
                    </p>
                </div>
            </div>
        </div>
    </footer>

</template>

<script setup>
    const reloadAbout = (path) => {
        window.location.href = path
    }
</script>