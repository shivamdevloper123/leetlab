import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const usePlayListStore = create((set, get) => ({
    playlists: [],
    currentPlaylist: null,
    isLoading: false,
    error: null,

    createPlayList: async (PlaylistData) => {
        try {
            set({ isLoading: true });
            const res = await axiosInstance.post("/playlist/create-playlist", PlaylistData)

            set((state) => ({
                playlists: [...state.playlists, res.data.data]
            }))
            toast.success("Playlist created successfully")


            return res.data.data;

        } catch (error) {
            console.error("Error creating playlist", error)
            toast.error(error.res?.data?.error || "Failed to create playlist")
        } finally {
            set({ isLoading: false })
        }


    },
    getAllPlaylists: async () => {
        try {
            set({ isLoading: true })
            const res = await axiosInstance.get("/playlist/")
            set({ playlists: res.data.data })
            toast.success("Fetched all playlist successfully")
        } catch (error) {
            console.error("Error fetching playlists:", error)
            toast.error("Failed to fetch playlists")
        } finally {
            set({ isLoading: false })
        }
    },

    getPlaylistDetails: async (playlistId) => {
        try {
            set({ isLoading: true });
            const res = await axiosInstance.get(`/playlist/${playlistId}`)
            set({ currentPlaylist: res.data.data });
            toast.success(res.data.data || "playlist details fetch successfully")
        } catch (error) {
            console.error("Error fetching playlist details:", error)
            toast.error("Failed to fetch playlist details");

        } finally {
            set({ isLoading: false })
        }
    },
    addProblemToPlaylist: async (playlistId, problemIds) => {
        try {
            set({ isLoading: true });
            
            console.log("problemIds:",problemIds,"\n playlistId: ",playlistId)
     /**
      * log output:
      problemIds: ['01JXB6Q84VM9SKXYBDY72YA6WQ'] 
 playlistId:  d6c83b84-3bc4-4927-a5f6-94068582475e
      * 
      *  */       
            const res = await axiosInstance.post(`/playlist/${playlistId}/add-problem`, {problemIds})
            
            
            toast.success(res.data.data.message || "problem added to playlist")
            //Refresh the playlist details
            if (get().currentPlaylist?.id === playlistId) {
                await get().getPlaylistDetails(playlistId)
            }
        } catch (error) {
            console.error("Error adding problem to playlist:", error)
            toast.error("Failed to add problem to playlist");
        } finally {
            set({ isLoading: false })
        }
    },
    removeProblemFromPlaylist: async (playlistId, problemIds) => {
        try {
            set({ isLoading: true })
            await axiosInstance.post(`/playlist/${playlistId}/remove-problem`, problemIds)

            toast.success("Problem removed from playlist");
            //Refresh the playlist details
            if (get().currentPlaylist?.id === playlistId) {
                await get().getPlaylistDetails(playlistId)
            }
        } catch (error) {
            console.error("Error removing the problem form playlist:", error)
            toast.error("Failed to remove problem from playlist ");
        } finally {
            set({ isLoading: false })
        }
    },

    deletePlayList: async (playListId) => {
        try {
            set({ isLoading: true });
            await axiosInstance.delete(`/playlist/${playListId}`)
            set((state) => ({
                playlists: state.playlists.filter((p) => p.id !== playListId),
            }))
            toast.success("Playlist deleted successfully")
        } catch (error) {
            console.error("Error deleting Playlist: ", error)
            toast.error("Failed to delete playlist")
        } finally {
            set({ isLoading: false })
        }
    }

}))



