import { z } from "zod";

export const MAX_MB_SIZE = 10;

export const compressorFormSchema = z.object({
	files: z
		.unknown()
		.transform((value) => value as FileList)
		.transform((value) => Array.from(value || []))
		.refine((value) => value.length > 0, {
			message: "One or more images required",
		})
		.refine((value) => value.every((file) => file.type.startsWith("image")), {
			message: "Only images are allowed",
		})
		.refine(
			(value) =>
				value.reduce((acc, file) => acc + file.size, 0) <
				MAX_MB_SIZE * 1024 * 1024,
			{
				message: "Total size of images should be less than 10MB",
			},
		),
});

export type CompressorFormValues = z.infer<typeof compressorFormSchema>;
