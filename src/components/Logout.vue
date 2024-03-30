<script setup>
import { ref } from "vue"
import { useAuthServices } from "../composables/useAuthServices"
import router from "../router";
const authServices = useAuthServices()
const isLoggedOut = ref(false)

const handleLogout = async () => {
    isLoggedOut.value = await authServices.authLogout()
    
    if (!isLoggedOut.value) {
        isLoggedOut.value = authServices.authLogout()
    } else {
        router.push("/login")
    }
}

</script>

<template>
    <div class="flex justify-center mb-10">
        <button @click="handleLogout()" class="logout-button hover:bg-gray-200 hover:text-gray-600 hover:rounded-lg">Logout</button>
    </div>
    
</template>
<style scoped>
.logout-button {
  padding: 8px 16px; /* Example styling */
  cursor: pointer; /* Example styling */
}
</style>