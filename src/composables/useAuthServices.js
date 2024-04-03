import { useSupabaseServices } from './useSupabaseServices'
import { useStudentStore } from '../stores/student'

const supabase = useSupabaseServices()
let localStorageKey = null
let session = null

export function useAuthServices() {

    const authLogin = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
    
            if (error) {
                console.error("Authentication error:", error.message)
                return false; // Optionally, return the error message
            } else {
                const apiAuth = data.session
                //localStorage.setItem('lokaSess', JSON.stringify(apiAuth));
                console.log("Authentication successful. Session data stored in local storage.", data);
                return true; // No error occurred
            }
        } catch (error) {
            console.error("An unexpected error occurred during authentication:", error)
            return false // Optionally, return a generic error message
        }
    }

    const createStudent = async (student_name, phoneNumber) => {
      
        const { data, error } = await supabase
        .from('student')
        .insert([
        { student_name: student_name, mobile_number: phoneNumber },
        ])
        .select()

        if (error) {
            console.log("error create student: ", error)
            return false
        } else {
            return true
        }
        
    }


    const signUpNewUser = async (email, password, fullName, phoneNumber) => {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: fullName,
              phone: phoneNumber,
              role: 'student'
            },
            redirectTo: '/confirmation'
          }
        });
        if (error) {
            return error
        } else {
            const createStudent = await createStudent(fullName, phoneNumber)
            if (createStudent) {
                return data
            }
            
        }
        // Handle the response and errors
      }


    const checkAuth = () => {
        localStorageKey = localStorage.key(localStorageKey)
        session = localStorage.getItem(localStorageKey)
        if (!session) {
            return false
        } else {
            return true
        }
        
        //return !!localStorage.getItem(localStorageKey);
    }

    const authLogout = async () => {

        let { error } = await supabase.auth.signOut()

        if (!error) {
            return true
        } else {
            return false
        }
    }

    return {
        authLogin,
        checkAuth,
        signUpNewUser,
        authLogout
    }

} 