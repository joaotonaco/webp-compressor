"use server";

import JSZip from "jszip";
import sharp from "sharp";

export async function compressImage(formData: FormData) {
	const file = formData.get("file") as File;
	const fileBuffer = await file.arrayBuffer();

	const image = sharp(fileBuffer).toFormat("webp", { compression: "webp" });
	const buffer = await image.toBuffer();

	const fileName = file.name.replace(/\.[^/.]+$/, ".webp");
	const { data } = buffer.toJSON();

	return { fileName, data };
}

export async function bulkCompressImages(formData: FormData) {
	const files = Array.from(formData.getAll("file") as File[]);
	const zip = new JSZip();

	const compressedFiles = await Promise.all(
		files.map((file) => {
			const formData = new FormData();
			formData.append("file", file);
			return compressImage(formData);
		}),
	);

	for (const compressedFile of compressedFiles) {
		zip.file(compressedFile.fileName, Buffer.from(compressedFile.data));
	}

	return zip.generateAsync({ type: "base64" });
}
