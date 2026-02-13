import React from 'react'

const Button = ({buttonType, buttonText, buttonIcon}) => {
    return (
        <button className="flex justify-center font-semibold  w-full rounded-xl py-1 border bg-blue-600 hover:bg-blue-900 text-white transition duration-300"
        type={buttonType}>
            <span>{buttonText}</span>
            <span>{buttonIcon}</span>
        </button>
    )
}
export default Button
