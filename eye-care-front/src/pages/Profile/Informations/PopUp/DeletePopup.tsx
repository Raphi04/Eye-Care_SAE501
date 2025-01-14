interface DeletePopupProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	globalErrors: string[];
}

export default function DeletePopup({
	isOpen,
	onClose,
	onSubmit,
	globalErrors,
}: DeletePopupProps) {
	if (!isOpen) return null;

	return (
		<div className="popupOverlay">
			<div className="popupContent">
				<h1>Supprimer votre compte</h1>
				<h3>Nous sommes désolés de vous voir partir</h3>
				<form onSubmit={onSubmit}>
					{/* Message d'erreur global */}
					{globalErrors.length > 0 && (
						<div className="error-container">
							{globalErrors.map((err, index) => (
								<p key={index} className="error-message">
									{err}
								</p>
							))}
						</div>
					)}

					{/* --- Boutons de validation --- */}
					<div className="popupButtons">
						<button
							type="button"
							className="popupButton none"
							onClick={onClose}
						>
							ANNULER
						</button>
						<button type="submit" className="popupButton danger">
							SUPPRIMER LE COMPTE
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
