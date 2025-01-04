import { useState } from "react";

type UserData = {
	email: string;
	username: string;
	vision_disorder: { vision_disorder: string }[];
	vision_disorder_result: string[];
};

type ProfileContentProps = {
	userData: UserData | null;
};

export default function ProfileContent({ userData }: ProfileContentProps) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	// Fonction pour ouvrir/fermer la pop-up
	const modifyPopUp = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<div className="profileContent">
			{/* --- Informations utilisateur --- */}
			<div className="userInformationsContent">
				<h2 className="titleInformations">VOS INFORMATIONS</h2>
				<div className="userInformations">
					<p>
						Nom d'utilisateur : <strong>{userData?.username}</strong>
					</p>
				</div>
				<div className="userInformations">
					<p>
						Email : <strong>{userData?.email || "Utilisateur inconnu"}</strong>
					</p>
				</div>
				<div className="userInformations last">
					<p>
						Mot de passe : <strong>*********</strong>
					</p>
				</div>
				<div className="buttonsInformations">
					<button
						type="button"
						className="buttonInformations modify"
						onClick={modifyPopUp}
					>
						<p>MODIFIER</p>
					</button>
					<button type="submit" className="buttonInformations delete">
						<p>SUPPRIMER LE COMPTE</p>
					</button>
				</div>
			</div>

			{/* --- Faire/Refaire les tests --- */}
			<div className="userInformationsContent last">
				<h2 className="titleInformations">FAIRE/REFAIRE LES TESTS</h2>
				<div className="userInformations">
					<p>Faire le test de Daltonisme</p>
				</div>
				<div className="userInformations">
					<p>Faire le test de Myopie</p>
				</div>
				<div className="userInformations">
					<p>Faire le test de DMLA</p>
				</div>
			</div>

			{/* --- Pop-Up Modal --- */}
			{isPopupOpen && (
				<div className="popupOverlay">
					<div className="popupContent">
						<h3>Modifier vos informations</h3>
						<form>
							<div className="popupField">
								<label>Nom d'utilisateur :</label>
								<input type="text" defaultValue={userData?.username} />
							</div>
							<div className="popupField">
								<label>Email :</label>
								<input type="email" defaultValue={userData?.email} />
							</div>
							<div className="popupButtons">
								<button
									type="button"
									className="popupButton save"
									onClick={modifyPopUp}
								>
									Enregistrer
								</button>
								<button
									type="button"
									className="popupButton cancel"
									onClick={modifyPopUp}
								>
									Annuler
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
