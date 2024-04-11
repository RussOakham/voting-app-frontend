/* eslint-disable no-console */
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { io } from 'socket.io-client'

interface SocketPayload {
	id?: string
	key: string
	action: string
	data: unknown
}

const useReactQuerySubscription = () => {
	const queryClient = useQueryClient()
	useEffect(() => {
		const websocket = io('http://localhost:8080')

		websocket.on('connect', () => {
			console.log(`[socket]: Socket connected ${websocket.id ?? ''}`)
		})

		websocket.on('message', async (event: SocketPayload) => {
			console.log('message caught')
			const queryKey = [event.key, event.id].filter(Boolean)
			console.log(queryKey)
			await queryClient.invalidateQueries({ queryKey })
		})

		return () => {
			websocket.close()
			console.log(`[socket]: Socket closed ${websocket.id ?? ''}`)
		}
	}, [queryClient])
}

export default useReactQuerySubscription
