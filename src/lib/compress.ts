"use server";

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
