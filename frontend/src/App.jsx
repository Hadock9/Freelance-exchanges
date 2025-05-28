import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import ContactFreelancer from './modules/freelancers/pages/ContactFreelancer/ContactFreelancer'
import SearchFreelancers from './modules/freelancers/pages/SearchFreelancers/SearchFreelancers'
import { News } from './modules/news/pages/News/News'
import { NewsContent } from './modules/news/pages/News/NewsContent'
import CreateProject from './modules/projects/pages/Projects/CreateProject'
import Donate from './modules/shared/pages/Donate'
import FAQ from './modules/shared/pages/FAQ'
import Feedback from './modules/shared/pages/Feedback'
// import SupportDashboard from './modules/support/pages/SupportDashboard/SupportDashboard'
import Chats from './modules/chat/pages/Chats/Chats'
import MyProjects from './modules/projects/pages/Projects/MyProjects'
import Categories from './modules/shared/pages/Categories'
import { Login } from './modules/user/pages/Auth/Login'
import { Registration } from './modules/user/pages/Auth/Registr'
import { ResetPassword } from './modules/user/pages/Auth/ResetPassword'
import { Erorpage } from './modules/user/pages/User/404'
import Balance from './modules/user/pages/User/Balance'
import FreelancerProfile from './modules/user/pages/User/FreelancerProfile'
import { Home } from './modules/user/pages/User/Home'
import Notifications from './modules/user/pages/User/Notifications'
import Profile from './modules/user/pages/User/Profile'

const App = () => {
	return (
		<>
			<Toaster />
			<Routes>
				<Route index element={<Navigate to='/Home' />} />
				<Route path='/Registration' element={<Registration />} />
				<Route path='/Login' element={<Login />} />
				<Route path='/Home' element={<Home />} />
				<Route path='/News' element={<News />} />
				<Route path='/News/:Content' element={<NewsContent />} />
				<Route path='/404' element={<Erorpage />} />
				<Route path='/Notifications' element={<Notifications />} />
				<Route path='/Balance' element={<Balance />} />
				<Route path='/Donate' element={<Donate />} />
				<Route path='/ResetPassword' element={<ResetPassword />} />
				<Route path='/Feedback' element={<Feedback />} />
				<Route path='/FAQ' element={<FAQ />} />
				<Route path='/create-project' element={<CreateProject />} />
				<Route path='/search-freelancers' element={<SearchFreelancers />} />
				<Route path='/contact-freelancer' element={<ContactFreelancer />} />
				<Route path='/freelancer/:id' element={<FreelancerProfile />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/chats' element={<Chats />} />
				<Route path='/projects' element={<MyProjects />} />
				<Route path='/categories' element={<Categories />} />
				<Route path='*' element={<Erorpage />} />

				{/* Видалено адмінські маршрути */}
				{/*
				<Route
					path='/admin/*'
					element={
						<ProtectedRoute requiredRole='admin'>
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>
				*/}
				{/*
				<Route
					path='/support/*'
					element={
						<ProtectedRoute requiredRole='support'>
							<SupportDashboard />
						</ProtectedRoute>
					}
				/>
				*/}
			</Routes>
		</>
	)
}

export default App
