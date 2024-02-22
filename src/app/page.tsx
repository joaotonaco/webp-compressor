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
		<main className="w-full h-screen p-24">
			<Card className="w-fit mx-auto">
				<CardHeader>
					<CardTitle>WebP Compressor</CardTitle>
					<CardDescription>
						Opinionated WebP Compressor created by <GithubLink />.
					</CardDescription>
				</CardHeader>
			</Card>
		</main>
	);
}
