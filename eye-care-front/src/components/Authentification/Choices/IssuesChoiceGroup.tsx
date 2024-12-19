import "./IssuesChoice.scss";

interface IssuesChoiceProps {
	name: string;
	className: string;
	value: string;
	isActive: boolean;
	onClick: () => void;
}

function IssuesChoice({
	name,
	className,
	value,
	isActive,
	onClick,
}: IssuesChoiceProps) {
	return (
		<input
			type="button"
			name={name}
			value={value}
			className={isActive ? `${className}-active` : className}
			onClick={onClick}
		/>
	);
}

interface IssuesChoiceGroupProps {
	activeIndices: number[];
	setActiveIndices: (indices: number[]) => void;
}

export default function IssuesChoiceGroup({
	activeIndices,
	setActiveIndices,
}: IssuesChoiceGroupProps) {
	const handleButtonClick = (index: number, exclusive: boolean) => {
		if (exclusive) {
			if (activeIndices.includes(index)) {
				setActiveIndices([]);
			} else {
				setActiveIndices([index]);
			}
		} else {
			if (activeIndices.includes(index)) {
				setActiveIndices(activeIndices.filter((i) => i !== index));
			} else {
				setActiveIndices([
					...activeIndices.filter((i) => !options[i].exclusive),
					index,
				]);
			}
		}
	};

	const options = [
		{
			name: "myopie",
			value: "Myopie",
			className: "choice",
			exclusive: false,
		},
		{
			name: "presbytie",
			value: "Presbytie",
			className: "choice",
			exclusive: false,
		},
		{
			name: "daltonisme",
			value: "Daltonisme",
			className: "choice",
			exclusive: false,
		},
		{
			name: "astigmatie",
			value: "Astigmatie",
			className: "choice",
			exclusive: false,
		},
		{
			name: "hypermetropie",
			value: "Hypermétropie",
			className: "choice",
			exclusive: false,
		},
		{
			name: "cecite",
			value: "Cécité",
			className: "choice",
			exclusive: false,
		},
		{
			name: "no-issues",
			value: "Je n'ai pas de problèmes de vue",
			className: "choice2",
			exclusive: true,
		},
		{
			name: "no-info",
			value: "Je ne souhaite pas répondre",
			className: "choice2",
			exclusive: true,
		},
	];

	return (
		<div className="issues-choice-group">
			{options.map((option, index) => (
				<IssuesChoice
					key={index}
					name={option.name}
					value={option.value}
					className={option.className}
					isActive={activeIndices.includes(index)}
					onClick={() => handleButtonClick(index, option.exclusive)}
				/>
			))}
		</div>
	);
}
