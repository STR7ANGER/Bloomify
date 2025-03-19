import React from 'react'

const Button_2 = ({ href, onClick, children }) => {

    return href ? (
        <a
          href={href}
          className="relative text-sm space-mono cursor-pointer uppercase p-2 
          after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-0 after:h-[2px] 
          after:bg-black/50 after:transition-all after:duration-300 hover:after:w-full"
        >
          <span>{children}</span>
        </a>
      ) : (
        <button
          onClick={onClick}
          className="relative text-md space-mono cursor-pointer p-2 
          after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-0 after:h-[2px] 
          after:bg-black/50 after:transition-all after:duration-300 hover:after:w-full"
        >
          <span>{children}</span>
        </button>
  )
}

export default Button_2
