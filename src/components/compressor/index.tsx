"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { compressImage } from "@/lib/compress";
import JSZip from "jszip";
import { Form } from "../ui/form";
import { CompressorButtons } from "./buttons";
import { CompressorInput } from "./input";
import { CompressorPreview } from "./preview";

const MAX_MB_SIZE = 10;

const formSchema = z.object({
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

export function Compressor() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const compressFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		const jsonBuffer = await compressImage(formData);
		const buffer = Buffer.from(jsonBuffer.data);
		return buffer;
	};

	const onSubmit = async ({ files }: z.infer<typeof formSchema>) => {
		const compressedFiles = await Promise.all(files.map(compressFile));
		const zip = new JSZip();

		compressedFiles.forEach((buffer, index) => {
			zip.file(files[index].name, buffer);
		});

		zip.generateAsync({ type: "base64" }).then((base64) => {
			window.location.href = `data:application/zip;base64,${base64}`;
		});

		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<CompressorInput />
				<CompressorPreview files={form.watch("files")} />
				<CompressorButtons />
			</form>
		</Form>
	);
}
