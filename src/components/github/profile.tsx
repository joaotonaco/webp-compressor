import Link from "next/link";

export function GithubProfile() {
	return (
		<Link
			href="https://github.com/joaotonaco"
			className="underline underline-offset-4 hover:text-secondary-foreground"
		>
			joaotonaco
		</Link>
	);
}
