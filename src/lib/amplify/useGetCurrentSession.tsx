import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthSession, fetchAuthSession } from 'aws-amplify/auth'

import { useToast } from '@/components/ui/use-toast'

function useGetCurrentSession() {
	const [session, setSession] = useState<AuthSession | null>(null)
	const navigate = useNavigate()
	const { toast } = useToast()

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const authSession = await fetchAuthSession()
				setSession(authSession)
			} catch {
				throw new Error('Error fetching session')
			}
		}

		fetchSession().catch(() => {
			toast({
				title: 'Uh oh, something went wrong',
				description: 'Error fetching user information',
			})
			navigate('/')
		})
	}, [navigate, toast])

	return session
}

export default useGetCurrentSession
