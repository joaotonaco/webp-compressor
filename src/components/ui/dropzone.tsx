"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

interface DropzoneContextProps {
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
	handleOnDrop: (acceptedFiles: FileList | null) => void;
}

const DropzoneContext = createContext({} as DropzoneContextProps);
export const useDropzoneContext = () => useContext(DropzoneContext);

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
	handleOnDrop: (acceptedFiles: FileList | null) => void;
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
	({ className, handleOnDrop, children, ...props }, ref) => {
		const inputRef = useRef<HTMLInputElement | null>(null);
		const [dragging, setDragging] = useState(false);

		const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			handleOnDrop(null);
			setDragging(true);
		};

		const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setDragging(false);
		};

		const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			setDragging(false);
			const { files } = e.dataTransfer;
			if (inputRef.current) {
				inputRef.current.files = files;
				handleOnDrop(files);
			}
		};

		const handleButtonClick = () => {
			if (inputRef.current) {
				inputRef.current.click();
			}
		};

		return (
			<DropzoneContext.Provider value={{ inputRef, handleOnDrop }}>
				<Card
					ref={ref}
					className={cn(
						"border border-dashed rounded-md bg-background hover:cursor-pointer hover:border-muted-foreground/50 flex items-center justify-center",
						"has-[input:disabled]:bg-muted-foreground/10 has-[input:disabled]:text-muted-foreground has-[input:disabled]:pointer-events-none",
						dragging && "border-muted-foreground/50",
						className,
					)}
					{...props}
				>
					<CardContent
						className="flex items-center justify-center space-y-2 px-2 py-4 text-sm"
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						onClick={handleButtonClick}
					>
						{children}
					</CardContent>
				</Card>
			</DropzoneContext.Provider>
		);
	},
);
Dropzone.displayName = "Dropzone";

const DropzoneMessage = React.forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span ref={ref} className={cn("font-medium", className)} {...props} />
));
DropzoneMessage.displayName = "DropzoneMessage";

interface DropzoneInputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"value" | "onChange"
	> {}

const DropzoneInput = ({ className, ...props }: DropzoneInputProps) => {
	const { inputRef, handleOnDrop } = useDropzoneContext();
	const [ref, setRef] =
		useState<React.MutableRefObject<HTMLInputElement | null>>();

	useEffect(() => {
		setRef(inputRef);
	}, [inputRef]);

	return (
		<Input
			{...props}
			value={undefined}
			ref={ref}
			type="file"
			className={cn("hidden peer/input", className)}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				handleOnDrop(e.target.files)
			}
		/>
	);
};
DropzoneInput.displayName = "DropzoneInput";

export { Dropzone, DropzoneMessage, DropzoneInput };
