import { Link } from 'react-router-dom'
import { signOut } from 'aws-amplify/auth'

import { Button } from '@/components/ui/button'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useToast } from '@/components/ui/use-toast'

import { Shell } from '../shells/shell'

const MainNav = () => {
	const { toast } = useToast()

	const handleSignOut = async () => {
		try {
			await signOut()
		} catch (error: unknown) {
			toast({
				title: 'Uh oh! Something went wrong',
				description: 'We were unable to sign you out. Please try again.',
			})
		}
	}

	return (
		<Shell variant="zero-vertical-padding" className="max-w-6xl justify-end">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}
							asChild
						>
							<Link to="/">Polls</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}
							asChild
						>
							<Link to="/create-poll">Create Poll</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Button type="button" variant="outline" onClick={handleSignOut}>
							Sign Out
						</Button>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</Shell>
	)
}

export default MainNav
