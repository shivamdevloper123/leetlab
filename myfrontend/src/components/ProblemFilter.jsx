// ProblemFilter.jsx
import React, { useMemo, useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

const ProblemFilter = ({ problems = [], onFilter }) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [showFilter, setShowFilter] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [problems]);

  const difficulties = ["Easy", "Medium", "Hard"];

  const filtered = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  useMemo(() => {
    onFilter(filtered);
  }, [filtered, onFilter]);

  const toggleDropdown = (type) => {
    setActiveDropdown((prev) => (prev === type ? null : type));
  };

  return (
    <div className="mb-6 w-full flex flex-col gap-4 items-start">
      <div className="flex items-center gap-2 w-full md:w-1/2 relative">
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered w-full bg-base-200 pr-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-3 top-2.5 text-base-content opacity-70" size={20} />
        <button onClick={() => setShowFilter(!showFilter)} className="btn btn-sm btn-outline">
          <Filter size={18} className="mr-1" /> Filter
        </button>
      </div>

      {showFilter && (
        <div className="bg-base-100 border border-base-300 rounded-box w-72 shadow p-3">
          <div className="mb-2">
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("tag")}>Tag <ChevronDown className={`${activeDropdown === "tag" ? "rotate-180" : ""}`} /></button>
            {activeDropdown === "tag" && (
              <ul className="menu mt-1">
                {["ALL", ...allTags].map((tag) => (
                  <li key={tag}>
                    <button onClick={() => setSelectedTag(tag)}>{tag}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <button className="flex justify-between w-full" onClick={() => toggleDropdown("difficulty")}>Difficulty <ChevronDown className={`${activeDropdown === "difficulty" ? "rotate-180" : ""}`} /></button>
            {activeDropdown === "difficulty" && (
              <ul className="menu mt-1">
                {["ALL", ...difficulties].map((diff) => (
                  <li key={diff}>
                    <button onClick={() => setDifficulty(diff)}>{diff}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemFilter;