// components/HeaderTitle.tsx

const HeaderTitle = () => {
  return (
    <header className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 text-center pointer-events-none">
      {/* LOGO PLANÈTE SVG */}
      <div className="flex justify-center items-center mb-2">
        <svg
          className="w-10 h-10 text-indigo-400 drop-shadow-md animate-spin-slow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36-6.36l-.707.707M6.343 17.657l-.707.707m0-13.414l.707.707M17.657 17.657l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
          />
        </svg>
      </div>

      {/* TITRE + SOUS-TITRE */}
      <h1 className="text-transparent text-4xl md:text-5xl font-extrabold bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300 drop-shadow-xl">
        Système Solaire 3D
      </h1>
      <p className="text-indigo-200 mt-2 text-base italic drop-shadow-md">
        Explore l’univers planète par planète
      </p>
    </header>
  );
};

export default HeaderTitle;
