interface ModifyPopupProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	username: string;
	setUsername: (value: string) => void;
	email: string;
	setEmail: (value: string) => void;
	previousPassword: string;
	setPreviousPassword: (value: string) => void;
	newPassword: string;
	setNewPassword: (value: string) => void;
	verifNewPassword: string;
	setVerifNewPassword: (value: string) => void;
	globalErrors: string[];
}

export default function ModifyPopup({
	isOpen,
	onClose,
	onSubmit,
	username,
	setUsername,
	email,
	setEmail,
	previousPassword,
	setPreviousPassword,
	newPassword,
	setNewPassword,
	verifNewPassword,
	setVerifNewPassword,
	globalErrors,
}: ModifyPopupProps) {
	if (!isOpen) return null;

	return (
		<div className="popupOverlay">
			<div className="popupContent">
				<h1>Vos informations</h1>
				<h3>Vous pouvez modifier vos informations ci-dessous</h3>
				<form onSubmit={onSubmit}>
					{/* --- Champs de modification --- */}
					<div className="popupField">
						<input
							type="text"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="has-value"
							placeholder="Nom d'utilisateur"
						/>
					</div>
					<div className="popupField">
						<input
							type="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="has-value"
							placeholder="Email"
						/>
					</div>
					<div className="popupField">
						<input
							type="password"
							name="previousPassword"
							value={previousPassword}
							onChange={(e) => setPreviousPassword(e.target.value)}
							className="has-value"
							placeholder="Ancien mot de passe"
						/>
					</div>
					<div className="popupField">
						<input
							type="password"
							name="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="has-value"
							placeholder="Nouveau mot de passe"
						/>
					</div>
					<div className="popupField">
						<input
							type="password"
							name="verifNewPassword"
							value={verifNewPassword}
							onChange={(e) => setVerifNewPassword(e.target.value)}
							className="has-value"
							placeholder="Vérification nouveau mot de passe"
						/>
					</div>

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
						<button type="submit" className="popupButton modify">
							ENREGISTRER
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
