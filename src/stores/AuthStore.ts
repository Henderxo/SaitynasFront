import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { type User } from "@/types/User";
import { isTokenValid, registerNewLogin, removeToken } from "@/services/AuthService";
import { useRouter } from "vue-router";
import { useNotificationStore } from "./NotificationStore";
import { refreshToken } from "@/services/APIService";
import { useModalStore } from "./ModalStore";


export const useAuthStore = defineStore('auth', ()=>{
    const currentUser = ref<User|null>(JSON.parse(localStorage.getItem('currentUser')))
    const authToken = ref<String|null>(localStorage.getItem('token'))
    const Notifications = useNotificationStore()
    const router = useRouter()

    async function logUserIn(email: String, password: String): Promise<void>{

        const res = await registerNewLogin(email, password);
        authToken.value = typeof res.token !== 'undefined' && isTokenValid(res.token) ? res.token : null
        if(res.error || !isUserLoggedIn()){
            Notifications.errorNotification(`Error: ${res.message}`)
            return
        }
        currentUser.value = res.data as User;
        useModalStore().TriggerUserChange()
        router.push({ name: 'home' });

    }


    async function refreshUser(token: string): Promise<void>{
        authToken.value = typeof token !== 'undefined' && isTokenValid(token) ? token : null

    }

    function isAdmin(): boolean {
        if(isUserLoggedIn() && currentUser.value?.type === 'admin'){
            return true
        }
        return false;
    }

    function isDev(): boolean {
        if(isUserLoggedIn() && currentUser.value?.type === 'dev'){
            return true
        }
        return false;
    }

    function isUserLoggedIn(): boolean{
        if(!isTokenValid(authToken.value as string) && currentUser.value === null){
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

    return {logUserIn,authToken: readonly(authToken), isUserLoggedIn, logUserOut, currentUser: readonly(currentUser), isAdmin, isDev, refreshUser}
})