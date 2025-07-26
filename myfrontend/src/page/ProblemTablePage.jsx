import React, { useMemo, useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { useAuthStore } from "../store/useAuthStore.js";
import { Bookmark, PencilIcon, Trash, TrashIcon, Plus } from "lucide-react";
import { usePlayListStore } from "../store/usePlaylistStore.js";
import AddToPlaylist from "../components/AddToPlaylist.jsx";
import CreatePlaylistModal from "../components/CreatePlaylistModal.jsx";

const ProblemTablePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();
  const { createPlayList } = usePlayListStore();
  const { authUser } = useAuthStore();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  console.log("problems:", problems);

  // Extract all tags  unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));

    return Array.from(tagSet);
  }, [problems]);

  //Define allowed difficulties
  const difficulties = ["Easy", "Medium", "Hard"];

  //filter problems based on search , difficulties ,and tags

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLocaleLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tag?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const paginationProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  const handleCreatePlaylist = async (data) => {
    await createPlayList(data);
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen border-b-blue-700 items-center px-4 py-10 space-y-6 bg-base-100">
      <div className=" flex flex-wrap w-full justify-around items-center gap-4 mb-8 border-b border-blue-100 pb-4">
        <h2 className="text-3xl font-bold text-blue-700">Problems</h2>

        <button
          className="btn btn-primary gap-2 shadow-md hover:shadow-lg transition duration-300"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-4  w-full max-w-5xl items-center justify-around ">
        <input
          type="text"
          placeholder="🔍 Search by title"
          className="input input-bordered w-full sm:w-60 bg-base-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full sm:w-40 bg-base-200"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full sm:w-48 bg-base-200"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="w-full max-w-5xl overflow-x-auto border border-blue-500 rounded-xl shadow-md">
        <table className="table table-zebra">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th>Solved</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginationProblems.length > 0 ? (
              paginationProblems.map((problem) => {
                const isSolved = problem.solvedBy.some(
                  (user) => user.userId === authUser?.id
                );

                return (
                  <tr key={problem.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSolved}
                        readOnly
                        className="checkbox checkbox-sm"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/problem/${problem.id}`}
                        className="font-semibold hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td>
                      <span
                        className={`badge text-white font-bold text-xs ${
                          problem.difficulty === "Easy"
                            ? "badge-success"
                            : problem.difficulty === "Medium"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge badge-outline badge-info text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="flex gap-2 items-center">
                      {authUser?.role === "ADMIN" && (
                        <>
                          <button className="btn btn-xs btn-error text-white">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="btn btn-xs btn-warning text-white"
                            disabled
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() => handleAddToPlaylist(problem.id)}
                      >
                        <Bookmark className="w-4 h-4" />
                        <span className="hidden sm:inline">Save</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="join mt-4">
        <button
          className="join-item btn btn-sm btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <button className="join-item btn btn-sm btn-disabled bg-blue-100 text-blue-800">
          {currentPage} / {totalPages}
        </button>
        <button
          className="join-item btn btn-sm btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemTablePage;
