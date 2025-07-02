import { db } from "../lib/db.js"

import { asyncHandler } from "../utils/async-handler.js"

import { ApiResponse } from "../utils/api-response.js"


import { ApiError } from "../utils/api-error.js";

const addProblemToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { problemIds } = req.body; // Accept an array of problem IDs

    try {
        // Ensure problemIds is an array
        if (!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json(new ApiError(400, "Invalid or missing problemIds"));
        }

        console.log(
            problemIds.map((problemId) => ({
                playlistId,
                problemId,
            }))
        );

        // Create records for each problem in the playlist
        const problemsInPlaylist = await db.problemInPlaylist.createMany({
            data: problemIds.map((problemId) => ({
                playListId: playlistId, // ✅ match your Prisma field name exactly
                problemId,
            })),
        });

        res.status(201).json(new ApiResponse(201, problemsInPlaylist, "Problems added to playlist successfully"));
    } catch (error) {
        console.error("Error adding problems to playlist:", error.message);
        res.status(500).json(new ApiError(500, "Failed to add problems to playlist"));
    }
})

const createPlayList = asyncHandler(async (req, res) => {
    try {

        const { name, description } = req.body
        const userId = req.user.id
        if (!name || !description) {
            return res.status(400).json(new ApiError(400, "All fields are required"))
        }

        console.log(`name ${name} and userId ${userId}`)
        const playlist = await db.playlist.create({
            data: {
                name,
                description,
                userId
            }
        })
        console.log("playlist", playlist)
        res.status(201).json(new ApiResponse(201, playlist, "Playlist created successfully"));
    } catch (error) {
        console.log(error)
        res.status(500).json(new ApiError(500, "Failed to create playlist"));
    }
})

const deletePlayList = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    try {
        const deletedPlaylist = await db.playlist.delete({
            where: {
                id: playlistId,
            },
        });

        res.status(200).json(new ApiResponse(
            200,
            deletedPlaylist,
            "Playlist deleted successfully",
        ));
    } catch (error) {
        console.error("Error deleting playlist:", error.message);
        res.status(500).json(new ApiError(500, "Failed to delete playlist"));
    }
})

const getPlayAllListDetails = asyncHandler(async (req, res) => {
    try {
        const playLists = await db.playlist.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });
        res.status(200).json(new ApiResponse(200,
            playLists,
            "Playlist fetched successfully",
        ))

    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json(new ApiError(500, "all playlist failed to  fetched "));
    }
})


const getPlayListDetails = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    try {
        const playList = await db.playlist.findUnique({
            where: { id: playlistId, userId: req.user.id },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });

        if (!playList) {
            return res.status(404).json(new ApiError(404, "Playlist not found"));
        }

        res.status(200).json(new ApiResponse(
            200,
            playList,
            "Playlist fetched successfully",
        ));
    } catch (error) {
        console.error("Error fetching playlist:", error);
        res.status(500).json(new ApiError(500, "Failed to fetch playlist"));
    }
})

const removeProblemFromPlaylist = asyncHandler(async (req, res) => {
    const { playListId } = req.params;
    const { problemIds } = req.body;

    try {
        if (!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json(new ApiError(400, "Invalid or missing problemIds"));
        }
        // Only delete given problemIds not all
        console.log("problemIds", problemIds, "playlist id ", playListId)
        const deletedProblem = await db.problemInPlaylist.deleteMany({
            where: {
                playListId,
                problemId: {
                    in: problemIds,
                },
            },
        });

        console.log("deletedProblem", deletedProblem)
        res.status(200).json(new ApiResponse(
            200,
            deletedProblem,
            "Problem removed from playlist successfully",
        )
        );
    } catch (error) {
        console.error("Error removing problem from playlist:", error.message);
        res.status(500).json(new ApiError(500, "Failed to remove problem from playlist"));
    }
})

export {
    addProblemToPlaylist,
    createPlayList,
    deletePlayList,
    getPlayAllListDetails,
    getPlayListDetails,
    removeProblemFromPlaylist
}