import "./field.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface FieldProps {
	name: string;
	type: string;
	placeholder?: string;
	className: string;
	img?: string | JSX.Element;
	password?: boolean;
	noImg?: boolean;
	show?: boolean;
	onToggleShow?: () => void;
}

export default function Field({
	name,
	type,
	placeholder,
	className,
	img,
	password,
	noImg,
	show,
	onToggleShow,
}: FieldProps) {
	return (
		<div className={noImg ? "inputContainerWithoutImg" : "inputContainer"}>
			<input
				className={`${className} inputField`}
				name={name}
				type={password && show ? "text" : type}
				placeholder={placeholder}
			/>
			{img && <div className="inputIcon">{img}</div>}
			{password && (
				<p onClick={onToggleShow} className="showPassword">
					{show ? (
						<FontAwesomeIcon icon={faEye} />
					) : (
						<FontAwesomeIcon icon={faEyeSlash} />
					)}
				</p>
			)}
		</div>
	);
}
