import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthUser, getCurrentUser } from 'aws-amplify/auth'

import { useToast } from '@/components/ui/use-toast'

function useGetCurrentUser() {
	const [user, setUser] = useState<AuthUser | null>(null)
	const navigate = useNavigate()
	const { toast } = useToast()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const awsUser = await getCurrentUser()
				setUser(awsUser)
			} catch {
				throw new Error('Error fetching user')
			}
		}

		fetchUser().catch(() => {
			toast({
				title: 'Uh oh, something went wrong',
				description: 'Error fetching user information',
			})
			navigate('/')
		})
	}, [navigate, toast])

	return user
}

export default useGetCurrentUser
