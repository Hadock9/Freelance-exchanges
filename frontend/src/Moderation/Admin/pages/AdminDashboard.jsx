import restProvider from 'ra-data-simple-rest'
import React from 'react'
import { Admin, Resource } from 'react-admin'
import CommentsList from '../components/comments/CommentsList'
import NewsList from '../components/news/NewsList'
import NotificationsList from '../components/notifications/NotificationsList'
import UsersList from '../components/user/UsersList'

const AdminDashboard = () => {
	return (
		<Admin
			basename='/admin'
			dataProvider={restProvider('http://localhost:4000/api')}
		>
			<Resource name='news' list={NewsList} />
			<Resource name='user' list={UsersList} />
			<Resource name='notifications' list={NotificationsList} />
			<Resource name='comments' list={CommentsList} />
		</Admin>
	)
}

export default AdminDashboard
