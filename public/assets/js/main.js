(function($) {
    "use strict";

    $(document).ready( function() {

        //>> Mobile Menu Js Start <<//
        $('#mobile-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1199",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });

        //>> AJOUTE CE CODE ICI - FIX RETOUR ARRIÈRE <<//
        // Réinitialiser au retour arrière (bfcache)
        $(window).on('pageshow', function(event) {
            if (event.originalEvent.persisted || performance.navigation.type === 2) {
                console.log('Retour arrière détecté - réinitialisation navbar');
                
                // 1. Nettoyer le body
                $('body').css('overflow', '').removeAttr('style');
                
                // 2. Fermer l'offcanvas
                $('.offcanvas__info').removeClass('info-open');
                $('.offcanvas__overlay').removeClass('overlay-open');
                
                // 3. Réinitialiser Mean Menu
                var $mobileMenu = $('#mobile-menu');
                
                if ($mobileMenu.length) {
                    try {
                        // Détruire l'instance existante
                        $mobileMenu.meanmenu('destroy');
                        
                        // Supprimer les éléments générés
                        $('.mean-container').remove();
                        $('.mean-bar').remove();
                        $('.mobile-menu').empty();
                        
                        // Réinitialiser après un délai
                        setTimeout(function() {
                            $mobileMenu.meanmenu({
                                meanMenuContainer: '.mobile-menu',
                                meanScreenWidth: "1199",
                                meanExpand: ['<i class="far fa-plus"></i>'],
                            });
                            console.log('Mean Menu réinitialisé avec succès');
                        }, 150);
                        
                    } catch(e) {
                        console.error('Erreur Mean Menu:', e);
                        // Si erreur, forcer le rechargement
                        window.location.reload();
                    }
                }
                
                // 4. Forcer le recalcul du layout
                $(window).trigger('resize');
            }
        });
        
        // Nettoyer aussi au chargement normal
        $(window).on('load', function() {
            $('body').css('overflow', '');
            $('.offcanvas__info').removeClass('info-open');
            $('.offcanvas__overlay').removeClass('overlay-open');
        });
        //>> FIN DU CODE AJOUTÉ <<//

        //>> Sidebar Toggle Js Start <<//
        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
            $('body').css('overflow', ''); // Ajoute cette ligne aussi
        });
        $(".sidebar__toggle").on("click", function() {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
            $('body').css('overflow', 'hidden'); // Ajoute cette ligne aussi
        });

        // ... reste de ton code inchangé ...

        //>> Body Overlay Js Start <<//
        $(".body-overlay").on("click", function() {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");;
            $(".body-overlay").removeClass("opened");
        });

        //>> Sticky Header Js Start <<//
        $(window).scroll(function() {
            if ($(this).scrollTop() > 250) {
                $("#header-sticky").addClass("sticky");
            } else {
                $("#header-sticky").removeClass("sticky");
            }
        });

        //>> Video Popup Start <<//
        $(".img-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });

        $('.video-popup').magnificPopup({
            type: 'iframe',
            callbacks: {
            }
        });
        
        //>> Counterup Start <<//
        $(".count").counterUp({
            delay: 15,
            time: 4000,
        });

        //>> Wow Animation Start <<//
        new WOW().init();

        //>> Nice Select Start <<//
        $('select').niceSelect();

        //>> Hero Slider 1 Start <<//
        const sliderActive2 = ".hero-slider";
        const sliderInit2 = new Swiper(sliderActive2, {
            loop: true,
            slidesPerView: 1,
            effect: "fade",
            speed: 3000,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
        });

        function animated_swiper(selector, init) {
            const animated = function animated() {
                $(selector + " [data-animation]").each(function () {
                    let anim = $(this).data("animation");
                    let delay = $(this).data("delay");
                    let duration = $(this).data("duration");
                    $(this)
                        .removeClass("anim" + anim)
                        .addClass(anim + " animated")
                        .css({
                            webkitAnimationDelay: delay,
                            animationDelay: delay,
                            webkitAnimationDuration: duration,
                            animationDuration: duration,
                        })
                        .one("animationend", function () {
                            $(this).removeClass(anim + " animated");
                        });
                });
            };
            animated();
            init.on("slideChange", function () {
                $(sliderActive2 + " [data-animation]").removeClass("animated");
            });
            init.on("slideChange", animated);
        }
        animated_swiper(sliderActive2, sliderInit2);

        //>> Hero-3 Slider Start <<//
        const sliderActive1 = ".hero-slider-2";
        const sliderInit1 = new Swiper(sliderActive1, {
            loop: true,
            slidesPerView: 1,
            effect: "fade",
            speed: 2000,
            autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".array-prev",
                prevEl: ".array-next",
            },
            
        });
        // content animation when active start here
        function animated_swiper(selector, init) {
            let animated = function animated() {
                $(selector + " [data-animation]").each(function () {
                    let anim = $(this).data("animation");
                    let delay = $(this).data("delay");
                    let duration = $(this).data("duration");
                    $(this)
                        .removeClass("anim" + anim)
                        .addClass(anim + " animated")
                        .css({
                            webkitAnimationDelay: delay,
                            animationDelay: delay,
                            webkitAnimationDuration: duration,
                            animationDuration: duration,
                        })
                        .one("animationend", function () {
                            $(this).removeClass(anim + " animated");
                        });
                });
            };
            animated();
            init.on("slideChange", function () {
                $(sliderActive1 + " [data-animation]").removeClass("animated");
            });
            init.on("slideChange", animated);
        }
        animated_swiper(sliderActive1, sliderInit1);

        //>> Brand Slider Start <<//
        if($('.brand-slider').length > 0) {
            const brandeSlider = new Swiper(".brand-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 5,
                    },
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        if($('.brand-slider-2').length > 0) {
            const brandeSlider2 = new Swiper(".brand-slider-2", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1399: {
                        slidesPerView: 5,
                    },
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Project Slider Start <<//
        if($('.project-slider').length > 0) {
            const projectSlider = new Swiper(".project-slider", {
                spaceBetween: 5,
                speed: 2000,
                loop: true,
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        if($('.project-slider-2').length > 0) {
            const projectSlider = new Swiper(".project-slider-2", {
                spaceBetween: 5,
                speed: 2000,
                loop: true,
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 3,
                    },
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Testimonial Slider Start <<//
        if($('.testimonial-slider').length > 0) {
            const projectSlider = new Swiper(".testimonial-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    991: {
                        slidesPerView: 2,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        if($('.testimonial-slider-2').length > 0) {
            const projectSlider2 = new Swiper(".testimonial-slider-2", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
            });
        }

        if($('.text-move-slider').length > 0) {
            const textMoveSlider = new Swiper(".text-move-slider", {
                slidesPerView: 'auto',
                spaceBetween: 35,
                freemode: true,
                centeredSlides: true,
                loop: true,
                speed: 6000,
                allowTouchMove: false,
                autoplay: {
                    delay: 1,
                    disableOnInteraction: true,
                },
            });
        }

        // Search Popup
        $(".search-trigger").on("click", function (e) {
            e.preventDefault();
            $(".search-wrap").fadeToggle(500);
            $(".nav-search, #search-close").toggleClass("open");
        });

        $(".search-close").on("click", function (e) {
            e.preventDefault();
            $(".search-wrap").fadeOut(500);
            $(".nav-search, #search-close").removeClass("open");
        });

        //>> Mouse Cursor Start <<//
        function mousecursor() {
            const e = document.querySelector(".cursor-inner");
            const t = document.querySelector(".cursor-outer");

            if (!e || !t) return;

            let n,
                i = 0,
                o = false;

            window.onmousemove = function(s) {
                if (!o && t) {
                    t.style.transform = `translate(${s.clientX}px, ${s.clientY}px)`;
                }
                if (e) {
                    e.style.transform = `translate(${s.clientX}px, ${s.clientY}px)`;
                }
                n = s.clientY;
                i = s.clientX;
            };

            $("body").on("mouseenter", "a, .cursor-pointer", function () {
                e.classList.add("cursor-hover");
                t.classList.add("cursor-hover");
            });

            $("body").on("mouseleave", "a, .cursor-pointer", function () {
                if (!($(this).is("a") && $(this).closest(".cursor-pointer").length)) {
                    e.classList.remove("cursor-hover");
                    t.classList.remove("cursor-hover");
                }
            });

            e.style.visibility = "visible";
            t.style.visibility = "visible";
        }

        $(function () {
            mousecursor();
        });

        //>> Back To Top Slider Start <<//
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 20) {
                $("#back-top").addClass("show");
            } else {
                $("#back-top").removeClass("show");
            }
        });

        $(document).on('click', '#back-top', function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });

    }); // End Document Ready Function

})(jQuery); // End jQuery