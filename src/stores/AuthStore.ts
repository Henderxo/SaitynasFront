import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { type User } from "@/types/User";
import { registerNewLogin, removeToken, isTokenValid } from "@/services/AuthService";
import { useRouter } from "vue-router";
import { useNotificationStore } from "./NotificationStore";

export const useAuthStore = defineStore('auth', ()=>{
    const currentUser = ref<User|null>(JSON.parse(localStorage.getItem('currentUser')))
    const authToken = ref<String|null>(localStorage.getItem('token'))
    const Notifications = useNotificationStore()
    const router = useRouter()

    async function logUserIn(email: String, password: String): Promise<void>{
        const res = await registerNewLogin(email, password)
        authToken.value = typeof res.token !== 'undefined' && isTokenValid(res.token) ? res.token : null
        if(res.error || !isUserLoggedIn()){
            Notifications.errorNotification(`Error: ${res.message}`)
            return
        }
        currentUser.value = res.data as User
        router.push({name: 'home'})
    }

    function isAdmin(): boolean{
        if(isUserLoggedIn() && currentUser.value?.type === 'admin'){
            return true
        }
        return false
    }

    function isDev(): boolean{
        if(isUserLoggedIn() && currentUser.value?.type === 'dev'){
            return true
        }
        return false
    }

    function isUserLoggedIn(): boolean{
        if(!isTokenValid(authToken.value)){
            if(authToken.value !== null || currentUser.value !== null){
                logUserOut()
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

    return {logUserIn, isUserLoggedIn, logUserOut, currentUser: readonly(currentUser), isAdmin, isDev}
})