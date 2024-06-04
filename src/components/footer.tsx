import { Button } from '@/components/ui/button'

import TwitterIcon from '@/icons/twitter'
import TelegramIcon from '@/icons/telegram'
import GithubIcon from '@/icons/github'
import GitbookIcon from '@/icons/gitbook'
import { TWITTER_URL, TELEGRAM_URL, GITHUB_URL, GITBOOK_URL } from '@/lib/constants'

export default function Footer() {
	return (
		<div className="flex justify-center sm:justify-between items-center h-14 max-w-screen-xl container mt-6">
			<div />
			<div className="flex items-center gap-4">
				<a href={TWITTER_URL} target="_blank" rel="noopener noreferrer">
					<Button variant="ghost" size="icon">
						<TwitterIcon className="h-5 w-5 fill-foreground/60 hover:fill-foreground/80" />
					</Button>
				</a>
				<a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
					<Button variant="ghost" size="icon">
						<TelegramIcon className="h-6 w-6 fill-foreground/60 hover:fill-foreground/80" />
					</Button>
				</a>
				<a href={GITBOOK_URL} target="_blank" rel="noopener noreferrer">
					<Button variant="ghost" size="icon">
						<GitbookIcon className="h-6 w-6 fill-foreground/60 hover:fill-foreground/80" />
					</Button>
				</a>
				<a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
					<Button variant="ghost" size="icon">
						<GithubIcon className="h-6 w-6 fill-foreground/60 hover:fill-foreground/80" />
					</Button>
				</a>
			</div>
		</div>
	)
}
