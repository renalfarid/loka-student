import { defineStore } from 'pinia'
import { useSupabaseServices } from '../composables/useSupabaseServices'

const supabase = useSupabaseServices()

export const useStudentStore = defineStore('studentStore', {
    state: () => ({ 
        id: null,
        studentName: null,
        studentEmail: [],
        studentPhone: '',
        studentAddress: '',
        userMetadata: null,
        apiStudent: [],
        studentError: null,
        successAddStudent: false,
        successMessage: null,
    }),
    actions: {
        fetchStudent() {
            const localKeyObj = Object.entries(localStorage)
            if (localKeyObj.length > 0) {
                this.apiStudent = localKeyObj[0]
                if(this.apiStudent.length > 1) {
                    const authObj = JSON.parse(this.apiStudent[1])
                    this.userMetadata = authObj.user.user_metadata
                    //console.log('user_metadata: ', this.userMetadata)
                }
            }
        }
    }
})