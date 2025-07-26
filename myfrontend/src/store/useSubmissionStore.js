import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useSubmissionStore = create((set) => ({

    isLoading: false,
    submissions: [],
    problemSubmissions: {},
    submissionCount: null,

    getAllSubmission: async () => {
        try {
            set({ isLoading: true })
            const res = await axiosInstance.get("/submission/get-all-submissions")

            set({ submissions: res.data.data.submissions })
            toast.success(res.data.message || "Getting all Submission Successfully")
            console.log("all submission", res.data.data.submissions)

        } catch (error) {
            console.log("Error getting all submission", error)
            toast.error("Error getting all submission")
        } finally {
            set({ isLoading: false });
        }
    },
    getSubmissionForProblem: async (problemId) => {
        try {
            const res = await axiosInstance.get(`submission/get-submission/${problemId}`)
            set((state) => ({
                problemSubmissions: {
                    ...state.problemSubmissions,
                    [problemId]: res.data.data.submissions
                }
            }))
//  set({submissions: res.data.data.submissions})

            console.log("submission for problem", res.data.data.submissions)
        } catch (error) {
            console.log("Error getting submissions for problem", error)
            toast.error("Error getting submissions for problem")


        }
    },
    getSubmissionCountForProblem: async (problemId) => {
        try {
            const res = await axiosInstance.get(`/submission/get-submissions-count/${problemId}`)
            set({ submissionCount: res.data.data.count })
            console.log(" submission count ", res.data.data.count)

        } catch (error) {
            console.log("Error getting submission count for problem", error)
            toast.error("Error getting submission count for problem")

        }
    }
}))