"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { bulkCompressImages } from "@/lib/compress";
import { Form } from "../ui/form";
import { CompressorButtons } from "./buttons";
import { CompressorInput } from "./input";
import { CompressorPreview } from "./preview";
import { type CompressorFormValues, compressorFormSchema } from "./schema";

export function Compressor() {
	const form = useForm<CompressorFormValues>({
		resolver: zodResolver(compressorFormSchema),
	});

	const onSubmit = async ({ files }: CompressorFormValues) => {
		const formData = new FormData();

		for (const file of files) {
			formData.append("file", file);
		}

		const compressedZip = await bulkCompressImages(formData);

		window.location.href = `data:application/zip;base64,${compressedZip}`;
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
