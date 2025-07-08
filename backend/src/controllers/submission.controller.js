import { db } from "../lib/db.js"
import { asyncHandler } from "../utils/async-handler.js"
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"


export const getAllSubmission = asyncHandler(async(req , res)=>{
    try {
        const userId = req.user.id;

        const submissions = await db.submission.findMany({
            where:{
                userId:userId
            }
        })

        res.status(200).json( new ApiResponse
        (    true,
            {submissions},
            "Submissions fetched successfully",
        ))
        
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json(new ApiError (500 ,"Failed to fetch submissions") );
    }
})


export const getSubmissionsForProblem = asyncHandler(async (req , res)=>{
    try {
        const userId = req.user.id;
        const problemId = req.params.problemId;
        const submissions = await db.submission.findMany({
            where:{
                userId:userId,
                problemId:problemId
            }
        })

        res.status(200).json(new ApiResponse(200 ,
            
            {submissions},
            "Submission fetched successfully",
        ))
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json(new ApiError (500 ,"Failed to fetch submissions for problems") );
    }
})


export const getAllTheSubmissionsForProblem = asyncHandler(async (req , res)=>{

    try {
        const problemId = req.params.problemId;
        const submission = await db.submission.count({
            where:{
                problemId:problemId
            }
        })

        res.status(200).json(new ApiResponse(    
            200,
            {count:submission},
            "Submissions Fetched successfully",
        ))
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
             res.status(500).json(new ApiError (500 ,"Failed to fetch submissions for problems") );
    }
})