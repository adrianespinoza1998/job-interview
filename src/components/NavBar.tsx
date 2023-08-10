import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full">
      <div className="sm:h-16 h-20 flex flex-wrap items-center justify-between mx-auto">
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-2"
          onClick={toHome}
        >
          <FaHome />
        </button>
      </div>
    </nav>
  );
};
