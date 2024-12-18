import "./field.scss";

interface FieldProps {
	name: string;
	type: string;
	placeholder?: string;
	className: string;
	img?: string | JSX.Element;
	noImg?: boolean;
}

export default function Field({
	name,
	type,
	placeholder,
	className,
	img,
	noImg,
}: FieldProps) {
	return (
		<div className={noImg ? "inputContainerWithoutImg" : "inputContainer"}>
			{type === "file" ? (
				<label className="customFileButton">
					<span>Parcourir</span>
					<input
						className={`${className} inputField`}
						name={name}
						type="file"
						placeholder={placeholder}
					/>
				</label>
			) : (
				<>
					<input
						className={`${className} inputField`}
						name={name}
						type={type}
						placeholder={placeholder}
					/>
					{img && <div className="inputIcon">{img}</div>}
				</>
			)}
		</div>
	);
}
