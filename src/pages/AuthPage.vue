<template>
  <StudentGuard>
    <div class="page-container">
        <div class="bg-white rounded shadow auth-form-container">
            <transition name="fade" mode="out-in">
                <LoginForm v-if="isLogin" @toggle-form="toggleForm" key="login" />
                <RegisterForm v-else @toggle-form="toggleForm" key="register" />
            </transition>
        </div>
    </div>
  </StudentGuard>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '../components/Dashboard/CompLogin.vue'
import RegisterForm from '../components/Dashboard/CompRegister.vue'
import StudentGuard from '../components/StudentGuard.vue'

const isLogin = ref(true)

const toggleForm = () => {
  isLogin.value = !isLogin.value
}
</script>


<style scoped>
/* Animation de chargement de la page */
.page-container {
  animation: pageLoad 0.6s ease-out;
}

.auth-form-container {
  animation: formSlideUp 0.5s ease-out 0.15s both;
}

/* Animation de la page entière */
@keyframes pageLoad {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animation du formulaire qui monte */
@keyframes formSlideUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transitions existantes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Animation des éléments internes */
.auth-form-container * {
  animation: fadeInElements 0.4s ease-out 0.3s both;
}

@keyframes fadeInElements {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de hover sur le container */
.auth-form-container:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>
