import Image from "next/image";

interface CompressorPreviewProps {
	files?: File[];
}

export function CompressorPreview({ files }: CompressorPreviewProps) {
	if (!files) {
		return null;
	}

	return (
		<div className="flex items-center justify-start gap-2 flex-wrap">
			{Array.from(files).map((file: File) => {
				const previewUrl = URL.createObjectURL(file);

				return (
					<Image
						className="aspect-square object-cover rounded-md border"
						key={file.name}
						src={previewUrl}
						alt={file.name}
						width={64}
						height={64}
					/>
				);
			})}
		</div>
	);
}
