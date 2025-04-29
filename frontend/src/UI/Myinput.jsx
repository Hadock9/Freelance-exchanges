import React from 'react'

const Myinput = ({
	id,
	type,
	value,
	onChange,
	onBlur,
	placeholder,
	className,
}) => {
	return (
		<input
			id={id}
			type={type || 'text'}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			placeholder={placeholder}
			className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
				className || ''
			}`}
		/>
	)
}

export default Myinput
