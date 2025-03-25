const Button = ({children, href }) => {
  return href ? (
    <a
      href={href}
      className=" bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white text-xl px-4 py-2 rounded-full shadow-sm drop-shadow-lg hover:bg-[#118B50] hover:px-5 hover:shadow-lg transition-all duration-300 ease-in-out
    "
    >
      {children}
    </a>
  ) : (
    <button
      
      className=" bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white text-xl px-4 py-2 rounded-xl shadow-sm drop-shadow-lg hover:bg-[#118B50] hover:px-5 hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

export default Button;
