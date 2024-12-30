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
	selectedNames: string[]; // Noms des options sélectionnées
	setSelectedNames: (names: string[]) => void; // Fonction pour mettre à jour les noms de maladies
}

export default function IssuesChoiceGroup({
	selectedNames,
	setSelectedNames,
}: IssuesChoiceGroupProps) {
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

	// Logique de clic pour gérer les noms des options sélectionnées
	const handleButtonClick = (clickedName: string, exclusive: boolean) => {
		// Désélectionner toutes les options si l'option cliquée est exclusive
		if (exclusive) {
			if (selectedNames.includes(clickedName)) {
				setSelectedNames([]);
			} else {
				setSelectedNames([clickedName]);
			}
		} else {
			// Désélectionner toutes les options si l'option cliquée est exclusive
			if (selectedNames.includes(clickedName)) {
				setSelectedNames(selectedNames.filter((name) => name !== clickedName));
			} else {
				setSelectedNames([
					...selectedNames.filter(
						(name) =>
							options.find((option) => option.name === name)?.exclusive ===
							false
					),
					clickedName,
				]);
			}
		}
	};

	return (
		<div className="issues-choice-group">
			{options.map((option) => (
				<IssuesChoice
					key={option.name}
					name={option.name}
					value={option.value}
					className={option.className}
					isActive={selectedNames.includes(option.name)}
					onClick={() => handleButtonClick(option.name, option.exclusive)}
				/>
			))}
		</div>
	);
}
