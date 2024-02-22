import { Compressor } from "@/components/compressor";
import { GithubLink } from "@/components/github-link";
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
					<CardTitle>WebP Compressor</CardTitle>
					<CardDescription>
						Opinionated WebP Compressor created by <GithubLink />.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Compressor />
				</CardContent>
			</Card>
		</main>
	);
}
