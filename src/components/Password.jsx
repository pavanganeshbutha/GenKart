import React from 'react'

export const Password = ({value, action}) => {
    return <input
        type="password"
        value={value}
        onChange={(event) => action(event)}
        className="w-full border py-2 px-4 rounded-xl"
        placeholder="Password"
    />
}
