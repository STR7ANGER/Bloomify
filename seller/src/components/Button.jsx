const Button = ({children, href }) => {
  return href ? (
    <a
      href={href}
      className="bg-[#1E5128] text-white text-xl px-4 py-2 rounded-full shadow-sm drop-shadow-lg hover:bg-[#118B50] hover:px-5 hover:shadow-lg transition-all duration-300 ease-in-out
    "
    >
      {children}
    </a>
  ) : (
    <button
      
      className="bg-[#1E5128] text-white text-xl px-4 py-2 rounded-xl shadow-sm drop-shadow-lg hover:bg-[#118B50] hover:px-5 hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

export default Button;
