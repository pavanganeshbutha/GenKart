import React from 'react'
import {ChevronRight} from "lucide-react";

const NextButton = () => {
    return (
        <button className="flex justify-center font-semibold  w-full rounded-xl py-1 border bg-blue-600 hover:bg-blue-900 text-white transition duration-300" type="submit">
            <span>Next</span>
            <ChevronRight />
        </button>
    )
}
export default NextButton
