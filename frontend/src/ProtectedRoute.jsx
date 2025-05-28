import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Loader from './modules/shared/components/Disclaimer/Loader'

const ProtectedRoute = ({ children, requiredRole }) => {
	const { isAuthenticated, user, loading } = useContext(useAuth)

	if (loading) {
		return <Loader />
	}

	if (!isAuthenticated) {
		toast.error('You need to be logged in to access this page')
		return <Navigate to='/Login' />
	}

	if (user.role === 'developer') {
		toast.success('Welcome developer :)')
		return children
	}

	if (requiredRole && user.role !== requiredRole) {
		toast.error(
			`You do not have permission to access this page. Your role is ${user.role}, but you need to be an ${requiredRole}.`
		)
		return <Navigate to='/Home' />
	}

	return children
}

export default ProtectedRoute
