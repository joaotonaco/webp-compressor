import { useFormContext } from "react-hook-form";

import { Button } from "../ui/button";

export function CompressorButtons() {
	const {
		reset,
		formState: { isSubmitting },
	} = useFormContext();

	return (
		<div className="space-y-2">
			<Button disabled={isSubmitting} type="submit" className="w-full">
				Compress
			</Button>
			<Button
				disabled={isSubmitting}
				variant="outline"
				type="reset"
				onClick={() => reset()}
				className="w-full"
			>
				Reset
			</Button>
		</div>
	);
}
