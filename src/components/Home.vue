<script setup>
  import { onMounted, ref } from 'vue'
  import { useStudentStore } from '../stores/student'
  
  const studentStore = useStudentStore()
  const studentName = ref('')
  const studentPhone = ref('')
  const studentEmail = ref('')
  
  const handleProfile = () => {
    studentStore.fetchStudent()
    studentEmail.value = studentStore.userMetadata?.email
    studentName.value = studentStore.userMetadata?.full_name
    studentPhone.value = studentStore.userMetadata?.phone
  } 

  onMounted(() => {
    handleProfile()
  })

</script>
<template>
  <section>
    <div class="mt-10 max-w-screen-xl mx-auto px-4 md:px-8">
      <div class="items-start justify-between md:flex">
        <div class="max-w-lg px-4 py-5">
            <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">
                Student Profile
            </h3>
            <!-- User Profile -->
            <div class="mt-10 border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Full name
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ studentName }}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ studentEmail }}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Phone number
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ studentPhone }}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            123 Main St<br>
                            Anytown, USA 12345
                        </dd>
                    </div>
                </dl>
            </div>
            <!-- end user profile-->
        </div>
      </div>
    </div>
  </section>
</template>