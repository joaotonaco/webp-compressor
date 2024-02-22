import { Compressor } from "@/components/compressor";
import { GithubProfile } from "@/components/github/profile";
import { GithubRepository } from "@/components/github/repository";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	return (
		<main className="w-full h-screen py-24 md:px-24">
			<Card className="w-full mx-auto max-w-[25.25rem]">
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						WebP Compressor <GithubRepository />
					</CardTitle>
					<CardDescription>
						Opinionated WebP Compressor created by <GithubProfile />.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Compressor />
				</CardContent>
			</Card>
		</main>
	);
}
