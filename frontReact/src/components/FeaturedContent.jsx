import { Link } from "react-router-dom";

export const FeaturedContent = () => {
  return (
    <div className="mt-10">
      <figure className="max-w-screen-md mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-10 h-10 mx-auto mb-3 text-white dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-white dark:text-white">
              "Desde que eh creado esta sitio de viajes para compartir las
              experiencias entre los usuarios, la vida de la gente ah cambiado
              totalmente. Por eso te invito a seas parte de esta nueva
              experiencia."
            </p>
          </blockquote>
          <div className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <img
              className="w-6 h-6 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
              alt="profile picture"
            />
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
              <cite className="pe-3 font-medium text-white dark:text-white">
                Jhon
              </cite>
              <cite className="ps-3 text-sm text-white dark:text-gray-400">
                CEO
              </cite>
            </div>
          </div>
          <img
            className="transition-all duration-200 rounded-lg blur-sm hover:blur-none my-10"
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/296222947.jpg?k=0607db2bcec2f45df2ba0049cac490372238f475eaff25e7d72c0d7750f6a5fa&o=&hp=1"
            alt="imagen"
          />
          <div>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
              <Link
                to="/users/register"
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              >
                Iniciar
              </Link>
            </button>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
              <Link
                to="/posts"
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              >
                Ver Publicaciones
              </Link>
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
};