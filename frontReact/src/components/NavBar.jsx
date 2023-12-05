import { Link } from "react-router-dom";
import { useContext } from "react";                       // importamos para q funcione traer el logout
import { AuthContext } from "../providers/AuthProvider";  // importamos para traer el logout

export const NavBar = () => {

  const {auth, logout } = useContext(AuthContext);                       // lo importo cada vez q necesite hacer un logout

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 mb-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <svg
              width="30px"
              height="30px"
              viewBox="-4.8 -4.8 57.60 57.60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              strokeWidth="0.00048000000000000007"
              transform="matrix(-1, 0, 0, 1, 0, 0)rotate(90)"
            >
              <g
                id="SVGRepo_bgCarrier"
                strokeWidth="0"
                transform="translate(24,24), scale(0)"
              ></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.192"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <rect
                  width="48"
                  height="48"
                  fill="white"
                  fillOpacity="0.01"
                ></rect>{" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 3.00018L24.3489 3.00304C35.7257 3.1893 45 12.4679 45 24.074L44.9971 24.424C44.8086 35.8367 35.4189 45.0002 24 45.0002L23.6511 44.9973C12.2743 44.811 3 35.5318 3 24.074C3 12.3495 12.4645 3.00018 24 3.00018ZM38.3795 25.3873L21.0667 29.7236C20.9031 29.7647 20.7389 29.7839 20.5776 29.7839L20.3895 29.775C19.9542 29.7338 19.5478 29.551 19.2294 29.2627L17.5405 35.1412L17.5176 35.2718C17.3081 36.7882 19.0777 38.028 20.9166 37.0902L36.8999 27.9968L37.0914 27.8822C38.2023 27.1817 38.6291 26.2589 38.3795 25.3873ZM17.9799 12.7781C16.7704 11.8506 14.8215 12.7632 14.7143 14.82L14.5981 33.2086C14.5891 34.6499 15.1893 35.5632 16.1184 35.7939L21.0193 18.6333L21.0736 18.4695C21.2962 17.883 21.7718 17.4537 22.337 17.2727L18.091 12.8704L17.9799 12.7781ZM21.0617 11.2795C19.8993 10.6677 18.887 10.7597 18.2574 11.4122L30.6688 24.2365C31.1534 24.7369 31.3249 25.4251 31.1884 26.0586L37.1238 24.5818L37.2594 24.5317C38.667 23.9481 38.8508 21.8041 37.1238 20.6833L21.2568 11.388L21.0617 11.2795Z"
                  fill="#4abfa8"
                ></path>{" "}
              </g>
            </svg>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {auth ? (
              <>
                <li>
                  <Link
                    to="/posts/createPost"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Crear Post
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/users/login"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/users/register"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Crear Cuenta
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};