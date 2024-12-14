interface FieldProps {
	name: string;
	type: string;
	placeholder: string;
	className: string;
	img: string | JSX.Element;
}

export default function Field({
	name,
	type,
	placeholder,
	className,
	img,
}: FieldProps) {
	return (
		<div className="inputContainer">
			<input
				className={`${className} inputField`}
				name={name}
				type={type}
				placeholder={placeholder}
			/>
			<div className="inputIcon">{img}</div>
		</div>
	);
}
