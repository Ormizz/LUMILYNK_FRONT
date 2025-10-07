import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import About from "@/pages/AboutPage.vue";
import Contact from "@/pages/ContactPage.vue";
import Explore from "@/pages/ExplorePage.vue";
import Login from "@/pages/AuthPage.vue";
import Myspace from "@/pages/MySpacePage.vue";
import MultiStepForm from "@/pages/MultiStepForm.vue";
import PaimentPage from "@/pages/PaimentPage.vue";
import DocumentPage from "@/pages/DocumentPage.vue";
import LetterPage from "@/pages/LetterPage.vue";
import InfoPage from "@/pages/InfoPage.vue";
import StatusPage from "@/pages/StatusPage.vue";
import AdminDashboard from "@/pages/AdminPage.vue";
import AdminPaiements from "@/pages/AdminPaiements.vue";
import AdminDocuments from "@/pages/AdminDocuments.vue";
import AdminLettres from "@/pages/AdminLettres.vue";
import AdminEtudiants from "@/pages/AdminEtudiants.vue";
import VisaInfo from "@/pages/VisaInfo.vue";
import AdminMail from "@/pages/AdminMail.vue";



const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
    {
        path: "/explorer",
        name: "Explore",
        component: Explore,
    },
    {
        path: "/connexion",
        name: "Login",
        component: Login,
    },
    {
        path: "/mon-espace",
        name: "MySpace",
        component: Myspace,
    },
    {
        path: "/multi-step-form",
        name: "MultiStepForm",
        component: MultiStepForm,
    },
    {
        path: "/paiement",
        name: "PaimentPage",
        component: PaimentPage,
    },
    {
        path: "/document",
        name: "DocumentPage",
        component: DocumentPage,
    },
    {
        path: "/letter",
        name: "LetterPage",
        component: LetterPage,
    },
    {
        path: "/info",
        name: "InfoPage",
        component: InfoPage,
    },
    {
        path: "/status",
        name: "StatusPage",
        component: StatusPage,
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard
    },
    {
        path: '/admin/etudiants',
        name: 'AdminEtudiants',
        component: AdminEtudiants
    },
    {
        path: '/admin/paiements',
        name: 'AdminPaiements',
        component: AdminPaiements
    },
    {
        path: '/admin/documents',
        name: 'AdminDocuments',
        component: AdminDocuments
    },
    {
        path: '/admin/lettres',
        name: 'AdminLettres',
        component: AdminLettres
    },
    {
        path: '/visaInfo',
        name: 'VisaInfo',
        component: VisaInfo
    },
    {
        path: '/admin/mail',
        name: 'AdminMail',
        component: AdminMail
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/",
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router