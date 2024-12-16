import { useState } from "react";
import "./IssuesChoice.scss";

interface IssuesChoiceProps {
	name: string;
	className: string;
	value: string;
}

export default function IssuesChoice({
	name,
	className,
	value,
}: IssuesChoiceProps) {
	const [isChoose, setIsChoose] = useState(false);
	const toggleChoose = () => {
		setIsChoose(!isChoose);
	};

	return (
		<input
			type="button"
			name={name}
			value={value}
			className={isChoose ? `${className}-active` : className}
			onClick={toggleChoose}
		/>
	);
}
