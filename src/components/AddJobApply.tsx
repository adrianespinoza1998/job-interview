import { useDispatch, useSelector } from "react-redux";
import { JobApply, JobState } from "../types/reducersTypes";
import { setJob } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

export const AddJobApply = () => {
  const navigate = useNavigate();

  const job: JobApply = useSelector((state: JobState) => state.job);

  const { jobPosition, yearsExperience, language } = job;

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch(setJob({ ...job, [name]: value }));
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    dispatch(setJob({ ...job, language: value }));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (jobPosition !== "" && yearsExperience > 0 && language !== "") {
      navigate("interview");
    } else {
      alert("Please fill all the fields");
      console.log(job);
    }
  };

  return (
    <form className="p-5 mt-56" onSubmit={submit}>
      <div className="mb-6">
        <label
          htmlFor="job_position"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Job Position
        </label>
        <input
          className="w-full bg-zinc-200 border-2 border-zinc-200 rounded-md py-2 px-4 text-sm font-medium text-gray-600"
          type="text"
          placeholder="Driver"
          id="job_position"
          value={jobPosition}
          name="jobPosition"
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="years_experience"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Years of experience
        </label>
        <input
          className="w-full bg-zinc-200 border-2 border-zinc-200 rounded-md py-2 px-4 text-sm font-medium text-gray-600"
          type="number"
          placeholder="1"
          id="years_experience"
          value={yearsExperience}
          name="yearsExperience"
          onChange={handleChange}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="language"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Language
        </label>
        <select
          id="language"
          className="w-full bg-zinc-200 border-2 border-zinc-200 rounded-md py-2 px-4 text-sm font-medium text-gray-600"
          value={language}
          name="language"
          onChange={handleChangeSelect}
        >
          <option value="">Choose a language</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md w-full text-sm font-medium"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
