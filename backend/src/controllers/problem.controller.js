import { db } from "../lib/db.js"

// import { asyncHandler } from "../utils/async-handler.js"
// import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"

import {
    getJudge0LanguageId,
    pollBatchResults,
    submitBatch,
} from "../lib/judge0.lib.js";

export const createProblem = async (req, res) => {

    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        hints,
    } = req.body;

    if (req.user.role !== "ADMIN") {
        return res
            .status(403)
            .json(new ApiResponse(403, "You are not allowed to create a problem"))

    }
    try {
        //   console.log("reference solutions",referenceSolutions)
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            console.log("referenceSolutions", referenceSolutions)
            const languageId = getJudge0LanguageId(language);
            // console.log("language and solution code",[language, solutionCode])
            // console.log("language id ",languageId)
            console.log("languageId", languageId)
            if (!languageId) {
                return res
                    .status(400)
                    .json(new ApiResponse(400, `Language ${language} is not supported`));

            }
            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }))

            console.log("submission", submissions)

            const submissionResults = await submitBatch(submissions);
            const tokens = submissionResults.map((res) => res.token)

            const results = await pollBatchResults(tokens);
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result--------", result);
                if (result.status.id !== 3) {
                    return res
                        .status(400)
                        .json(new ApiResponse(400, `Testcases ${i + 1} failed for language ${language}`));


                }
            }

        }
        // console.log("db",Object.keys(db));

        console.log("db.problem:", db.problem);
        const newProblem = await db.Problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,

                codeSnippets,
                hints,
                referenceSolutions,
                userId: req.user.id,
            }

        })

        console.log("newProblem", newProblem)
        return res.status(201).json({
            success: true,
            message: "Message Created Successfully",
            problem: newProblem
        });
    } catch (error) {
        console.error("Error creating problem:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const getAllProblems = async (req, res) => {

    try {
        const problems = await db.problem.findMany();
        if (!problems) {
            return res.status(404).json({
                error: "No problems Found",

            });
        }

        res.status(200).json({
            success: true,
            message: "Message fetched Successfully",
            problems
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Fetching Problems",
        })
    }
}

export const getProblemById = async (req, res) => {
    const { id } = req.params;

    try {

        const problem = await db.problem.findUnique({
            where: {
                id,

            }
        });

        if (!problem) {
            return res.status(404).json({
                error: "Problem not found."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Problem founded Successfully",
            problem,

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error While Fetching Problem by id",
        });
    }
};

export const updateProblem = async (req, res) => {
    const { id } = req.params;
   
    const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        hints,
    } = req.body;

    if (req.user.role !== "ADMIN") {
        return res
            .status(403)
            .json(new ApiResponse(403, "You are not allowed to create a problem"))

    }
    try {
        console.log("problem id",id)
        const existingProblem = await db.problem.findUnique({
            where: { id },
        });

        if (!existingProblem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        console.log("existing problem", existingProblem)


              for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            console.log("referenceSolutions", referenceSolutions)
            const languageId = getJudge0LanguageId(language);
            // console.log("language and solution code",[language, solutionCode])
            // console.log("language id ",languageId)
            console.log("languageId", languageId)
            if (!languageId) {
                return res
                    .status(400)
                    .json(new ApiResponse(400, `Language ${language} is not supported`));

            }
            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }))

            console.log("submission", submissions)

            const submissionResults = await submitBatch(submissions);
            const tokens = submissionResults.map((res) => res.token)

            const results = await pollBatchResults(tokens);
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result--------", result);
                if (result.status.id !== 3) {
                    return res
                        .status(400)
                        .json(new ApiResponse(400, `Testcases ${i + 1} failed for language ${language}`));


                }
            }

        }

        
        const updatedProblem = await db.problem.update({
            where: { id },
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                hints,
              
                testcases,
                codeSnippets,
                referenceSolutions,

            },
        });

        res.status(200).json({ message: "Problem updated successfully", data: updatedProblem });
    } catch (error) {
        console.error("Error updating problem:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({ where: { id } });

    if (!problem) {
      return res.status(404).json({ error: "Problem Not found" });
    }

    await db.problem.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Problem deleted Successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Error While deleting the problem",
    });
  }
};
export const getAllProblemsSolvedByUser = async (req, res) => { 

}


