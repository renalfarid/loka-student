<script setup>
 import { ref } from "vue"
 import { useAuthServices } from "../composables/useAuthServices"
 import router from "../router";
 
  const authServices = useAuthServices()

  const userEmail = ref('')
  const userPassword = ref('')
  const isLoggedIn = ref(false)
  const errorLogin = ref('')
  const isLoading = ref(false)
  
  const handleUserAuth = async() => {
    isLoading.value = true
    isLoggedIn.value =  await authServices.authLogin(userEmail.value, userPassword.value)
    console.log("isLoggedIn: ", isLoggedIn.value)
    if (!isLoggedIn.value) {
      errorLogin.value = "login error"
      isLoading.value = false
    } else {
      isLoading.value = false
      router.push("/")
    }   
  }
</script>

<template>
    <div class="w-full h-screen flex flex-col items-center justify-center px-4">
        <div class="max-w-sm w-full text-gray-600">
            <div class="text-center">
                <img src="/images/loka.jpeg" width="150" class="mx-auto" />
                <div class="mt-5 space-y-2">
                    <p class="">Don't have an account? <a href="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
                </div>
            </div>
            <div v-if="isLoading" class="flex justify-center">
             <img width="50" height="50" src="/images/loader.svg" />
            </div>
            <form
                @submit.prevent="handleUserAuth()"
                class="mt-8 space-y-5"
            >
                <div>
                    <label class="font-medium">
                        Email
                    </label>
                    <input v-model="userEmail" type="email" required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
                </div>
                <div>
                    <label class="font-medium">
                        Password
                    </label>
                    <input v-model="userPassword" type="password" required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
                </div>
                <button class="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                    Sign in
                </button>
                <div class="text-center">
                    <a href="javascript:void(0)" class="hover:text-indigo-600">Forgot password?</a>
                </div>
            </form>
        </div>
    </div>
</template>