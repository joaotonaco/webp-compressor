"use server";

import JSZip from "jszip";
import sharp from "sharp";

export async function compressImage(formData: FormData) {
	const file = formData.get("file") as File;
	const buffer = await file.arrayBuffer();
	const image = await sharp(buffer)
		.png({ compressionLevel: 8 })
		.jpeg({ quality: 80 })
		.webp({ quality: 80 })
		.toFormat("webp")
		.toBuffer();

	return image.toJSON();
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

	compressedFiles.forEach((buffer, index) => {
		zip.file(files[index].name, Buffer.from(buffer.data));
	});

	return zip.generateAsync({ type: "base64" });
}
