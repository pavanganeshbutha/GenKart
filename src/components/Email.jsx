import React from 'react'

const Email = ({value, action}) => {
    return <input
        type="email"
        className="w-full px-4 py-2  border rounded-xl"
        placeholder="Email"
        value={value}
        onChange={(event) => action(event)} />
}
export default Email;
