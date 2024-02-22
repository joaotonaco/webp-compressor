import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function GithubRepository() {
	return (
		<Link
			href="https://github.com/joaotonaco/webp-compressor"
			className="text-muted-foreground hover:text-secondary-foreground transition-colors"
		>
			<GitHubLogoIcon className="size-5" />
		</Link>
	);
}
