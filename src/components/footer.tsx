import { Button } from '@/components/ui/button'

import TwitterIcon from '@/icons/twitter'
import TelegramIcon from '@/icons/telegram'
import { TWITTER_URL, TELEGRAM_URL } from '@/lib/constants'

export default function Footer() {
	return (
		<div className="flex justify-between items-center h-14 max-w-screen-xl container">
			<div />
			<div className="flex items-center gap-4">
				<a href={TWITTER_URL} target="_blank">
					<Button variant="ghost" size="icon">
						<TwitterIcon className="h-5 w-5 fill-foreground/60 hover:fill-foreground/80" />
					</Button>
				</a>
				<a href={TELEGRAM_URL} target="_blank">
					<Button variant="ghost" size="icon">
						<TelegramIcon className="h-6 w-6 fill-foreground/60 hover:fill-foreground/80" />
					</Button>
				</a>
			</div>
		</div>
	)
}
