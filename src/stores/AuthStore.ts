import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { type User } from "@/types/User";
import { registerNewLogin, removeToken, isTokenValid } from "@/services/AuthService";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', ()=>{
    const currentUser = ref<User|null>(JSON.parse(localStorage.getItem('currentUser')))
    const authToken = ref<String|null>(localStorage.getItem('token'))

    const router = useRouter()

    async function logUserIn(email: String, password: String): Promise<void>{
        const res = await registerNewLogin(email, password)
        authToken.value = typeof res.token !== 'undefined' && isTokenValid(res.token) ? res.token : null
        if(res.error || !isUserLoggedIn()){
 
            return
        }
        currentUser.value = res.data as User
        console.log(currentUser.value)
        router.push({name: 'home'})
    }

    function isUserLoggedIn(): boolean{
        if(!isTokenValid(authToken.value)){
            if(authToken.value !== null || currentUser.value !== null){
                logUserOut(true)
            }
            return false
        }
        return true
    }

    async function logUserOut(noReplace: boolean = false): Promise<void>{
        currentUser.value = null
        authToken.value = null
        removeToken()
        if(!noReplace){
            router.replace({name: 'home'})
        }
    }

    return {logUserIn, isUserLoggedIn, logUserOut, currentUser: readonly(currentUser)}
})