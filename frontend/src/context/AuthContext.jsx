import { jwtDecode } from 'jwt-decode'
import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isRegUser, setIsRegUser] = useState(false)
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const decoded = jwtDecode(token)
				console.log('Decoded token in AuthContext:', decoded)
				const currentTime = Date.now() / 1000

				if (decoded.exp < currentTime) {
					console.log('Token expired')
					localStorage.removeItem('token')
					setIsRegUser(false)
					setUser(null)
				} else {
					console.log('Token valid, setting user')
					setIsRegUser(true)
					setUser(decoded)
				}
			} catch (error) {
				console.error('Invalid token in AuthContext:', error)
				localStorage.removeItem('token')
				setIsRegUser(false)
				setUser(null)
			}
		} else {
			console.log('No token found in localStorage')
			setIsRegUser(false)
			setUser(null)
		}
		setIsLoading(false)
	}, [])

	const logout = () => {
		console.log('Logging out, removing token')
		localStorage.removeItem('token')
		setIsRegUser(false)
		setUser(null)
	}

	return (
		<AuthContext.Provider
			value={{ isRegUser, user, isLoading, setIsRegUser, setUser, logout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
