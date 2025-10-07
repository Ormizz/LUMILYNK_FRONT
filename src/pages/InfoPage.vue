<template>
    <StudentGuard>
        <div class="min-h-full">
            <CompHeader/>
            <header class="bg-white shadow">
                <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-lg font-semibold tracking-tight text-gray-300" style="font-size: 50px;">Informations</h1>
                </div>
            </header>
            <main>
                <br><br>
                <div class="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Nom complet</label>
                                <input v-model="userParse.full_name" type="text" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Date de naissance</label>
                                <input v-model="userParse.dateNaissance" type="date" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Email</label>
                                <input v-model="userParse.email" type="email" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                                <input v-model="userParse.phone" type="text" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Pays</label>
                                <input v-model="userParse.country" type="text" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Ville</label>
                                <input v-model="userParse.city" type="text" class="w-full px-3 py-2 border rounded text-dark focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <div class="pt-4">
                            <button type="submit" class="px-4 py-2 bg-indigo-600 text-gray-600 border rounded hover:bg-indigo-700">
                            Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </StudentGuard>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import CompHeader from '../components/Dashboard/CompHeader.vue'
    import { BASE_URL } from '../config'
    import StudentGuard from '../components/StudentGuard.vue'


    let userParse = ref([])
    const fetchUser = async (user) =>{
        try{
            const response = await fetch (`${BASE_URL}/api/users/${user.id}`);
            console.log(`${BASE_URL}/api/payments/${user.id}`)
            if (!response.ok) throw new Error('Erreur lors du chargement des paiements');
            userParse.value = await response.json();
        }catch(error){
            console.error(error);
        }
    }

    const submitForm = async (user) => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userParse.value),
            });
            if (!response.ok) {
                throw new Error('Error updating user');
            }
            console.log('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    onMounted(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        fetchUser(user);
    }
    )
</script>
