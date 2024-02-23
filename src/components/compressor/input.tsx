import { useFormContext } from "react-hook-form";

import { Dropzone, DropzoneInput, DropzoneMessage } from "../ui/dropzone";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

export function CompressorInput() {
	const {
		control,
		formState: { isSubmitting },
	} = useFormContext();

	return (
		<FormField
			control={control}
			name="files"
			render={({ field }) => (
				<FormItem>
					<FormLabel>
						File(s) to compress <span className="text-red-600">*</span>
					</FormLabel>
					<FormControl>
						<Dropzone className="h-20" handleOnDrop={field.onChange}>
							<DropzoneMessage>Select or drop files here</DropzoneMessage>
							<DropzoneInput
								{...field}
								accept="image/*"
								disabled={isSubmitting}
								multiple
							/>
						</Dropzone>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
