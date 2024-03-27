<script setup>
  import { ref } from "vue"
  import { useAuthServices } from "../composables/useAuthServices"
  import { useRouter } from "vue-router"

  const router = useRouter()

  const authServices = useAuthServices()

  const userEmail = ref('')
  const userPassword = ref('')
  const isLoading = ref(false)
  const signupError = ref(false)
  const errorMessage = ref('')
  

  const handleSignup = async () => {
    try {
      isLoading.value = true;
      const result = await authServices.signUpNewUser(userEmail.value, userPassword.value);
      processSignupResult(result);
    } catch (error) {
        isLoading.value = false
        signupError.value = true
        errorMessage.value = error
        closeAlert()
        console.error('Error during signup:', signupError.value);
    }
  }

  const processSignupResult = (result) => {
    if (result.user) {
        isLoading.value = false;
        router.push("/login")
    } else {
        // Handle the case where signup failed
        isLoading.value = false
        signupError.value = true
        errorMessage.value = result
        closeAlert()
        console.error('Signup failed:', result);
    }
  }

  const closeAlert = () => {
    setTimeout(() => {
        signupError.value = false;
    }, 3000);
  }

</script>
<template>
    <main
      class="w-full h-screen flex flex-col items-center justify-center px-4"
    >
    <div v-if="signupError" class="flex mb-10 justify-between p-4 rounded-md bg-red-50 border border-red-300">
        <div class="flex gap-3 sm:items-center">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <p class="text-red-600 sm:text-sm">
                Signup failed. {{ errorMessage }} <a href="/signup" class="underline font-medium hover:text-red-700">Sign up?</a>
            </p>
        </div>
    </div>
      <div class="max-w-sm w-full text-gray-600">
        <div class="text-center">
          <img src="/images/loka.jpeg" width="150" class="mx-auto" />
          <div class="mt-5 space-y-2">
            <p class="">
              Already have an account?
              <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500" >Log in</a
              >
            </p>
          </div>
        </div>
        <div v-if="isLoading">
            <img width="50" height="50" src="/images/loader.svg" />
        </div>
        <form @submit.prevent="handleSignup()" class="mt-8 space-y-5">
          <div>
            <label class="font-medium">Email</label>
            <input v-model="userEmail" type="email" required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
          </div>
          <div>
            <label class="font-medium">Password</label>
            <input v-model="userPassword" type="password" required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
          </div>
          <button class="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Create account
          </button>
        </form>
       <!-- <button
          class="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
        >
          <img
            src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
            alt="Google"
            class="w-5 h-5"
          />
          Continue with Google
        </button> -->
      </div>
    </main>
  </template>