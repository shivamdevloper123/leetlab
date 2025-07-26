import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { create } from "zustand";



export const useAuthStore = create((set) => ({
    authUser: null,
    isSignup: false,
    isLoggedIn: false,
    isCheckingAuth: false,

    signup: async (data) => {
        try {

            set({ isSignup: true })
            const res = await axiosInstance.post("/auth/register", data)

            console.log("authUser:", res.data.data)

            set({ authUser: res.data.data })

            toast.success(res.data.message || "Signed Up Successfully")

        } catch (error) {
            console.error("Error in signing up user", error)
            toast.error("Error in signing up user")
        } finally {
            set({ isSignup: false })
        }

    },

    login: async (data) => {
        try {

            set({ isLoggedIn: true })

            const res = await axiosInstance.post("/auth/login", data)

            console.log("authUser:", res.data.data)

            set({ authUser: res.data.data })

            toast.success(res.data.message || "Logged In successfully")
        } catch (error) {
            console.error("Failed to Logged In", error)
            toast.error("Failed to loggedIn")
        } finally {
            set({ isLoggedIn: false })
        }
    }
    ,
    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true })

            const res = await axiosInstance.get("/auth/check")

            set({ authUser: res.data.data.user })
            
            console.log("authUser:", res.data.data.user)
        }
        catch (error) {
            console.error("Failed to fetch auth User", error)

            toast.error("Failed to fetch auth User")
        } finally {
            set({ isCheckingAuth: false })

        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("Logout successfully")
        } catch (error) {
            console.error("Failed to Logout", error)
            toast.error("Failed to Logout")
        }
    }

}))

