<template>
    <LandingView>
        <!-- Breadcrumb-section Start -->
        <div class="breadcrumb-wrapper  bg-cover" style="background-image: url('assets/img/about/image3.png');">
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
                            Contact
                        </li>
                    </ul>
                    <h1 class="wow fadeInUp" data-wow-delay=".5s">Contact</h1>
                </div>
            </div>
        </div>

        <!-- Map-section Start -->
        <div class="map-items-2 fix section-padding">
            <div class="map-items">
                <div class="googpemap">
                    <iframe width="0" height="0" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=gbp%20crest+(Lumylink)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
            </div>
            <div class="container">
                <div class="map-contact-info-wrapper">
                    <div class="icon-items">
                        <div class="icon">
                            <img src="assets/img/contact/location.png" style="width:60px; height:60px" alt="img">
                        </div>
                        <div class="content">
                            <p>Adresse</p>
                            <h3>GBP CREST, Mohali, India</h3>
                        </div>
                    </div>
                    <div class="icon-items">
                        <div class="icon">
                            <img src="assets/img/contact/call.png" style="width:60px; height:60px" alt="img">
                        </div>
                        <div class="content">
                            <p>Téléphone</p>
                            <h3><a href="https://wa.me/919056820845" target="_blank">+91 90568 20845</a></h3>
                            <h3><a href="https://wa.me/919041378984" target="_blank">+91 90413 78984</a></h3>
                        </div>
                    </div>
                    <div class="icon-items">
                        <div class="icon">
                            <img src="assets/img/contact/email.png" style="width:60px; height:60px" alt="img">
                        </div>
                        <div class="content">
                            <p>email</p>
                            <h3><a href="mailto:info@lumilynk.com" class="link">info@lumilynk.com</a></h3>
                        </div>
                    </div>
                    <div class="social-icon d-flex align-items-center">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Contact section Start -->
        <section class="contact-section-4 fix section-padding pt-0">
            <div class="container">
                <div class="section-title text-center">
                    <span class="wow fadeInUp">  Laissez-nous un message</span>
                        <h2 class="wow fadeInUp" data-wow-delay=".3s">
                            Toujours connectés
                        </h2>
                </div>
                <form @submit.prevent="submitForm" id="contact-form" method="POST" class="contact-form-123">
                    <div class="row g-4 justify-content-center">
                        <div class="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                            <div class="form-clt">
                                <input type="text" v-model="form.name" id="name" placeholder="Nom complet">
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
                                <input type="text" v-model="form.subject" id="subject" placeholder="Sujet">
                            </div>
                        </div>
                        <div class="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
                            <div class="form-clt">
                                <textarea v-model="form.message" id="message" placeholder="Écrivez un message"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
                            <div class="text-center">
                                <button type="submit" class="theme-btn">
                                    Envoyez le message
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </LandingView>
</template>

<script setup>
    import LandingView from '@/layouts/LandingView.vue';
    import { BASE_URL } from '@/config'

    import { ref } from "vue";


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
        const response = await fetch(`${BASE_URL}/api/contacts/`, {
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
                '/contact',
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
