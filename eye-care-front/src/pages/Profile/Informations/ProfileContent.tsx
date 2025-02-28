import { useEffect, useState } from "react";
import ModifyPopup from "./PopUp/ModifyPopup";
import DeletePopup from "./PopUp/DeletePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAddressCard,
	faCheck,
	faEnvelope,
	faLock,
} from "@fortawesome/free-solid-svg-icons";

type UserData = {
	email: string;
	username: string;
	vision_disorder: { vision_disorder: string }[];
	vision_disorder_result: {
		result: number;
		vision_disorder: string;
	}[];
};

type ProfileContentProps = {
	userData: UserData | null;
	refreshUserData: () => void;
};

export default function ProfileContent({
	userData,
	refreshUserData,
}: ProfileContentProps) {
	const [isModifPopupOpen, setIsModifPopupOpen] = useState(false);
	const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
	const [email, setEmail] = useState(userData?.email);
	const [username, setUsername] = useState(userData?.username);
	const [previousPassword, setPreviousPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [verifNewPassword, setVerifNewPassword] = useState("");

	useEffect(() => {
		if (isModifPopupOpen && userData) {
			setEmail(userData.email);
			setUsername(userData.username);
		}
	}, [isModifPopupOpen, userData]);

	// Fonctions pour ouvrir/fermer les pop-up
	const modifyPopUp = () => {
		setIsModifPopupOpen(!isModifPopupOpen);
	};

	const deletePopUp = () => {
		setIsDeletePopupOpen(!isDeletePopupOpen);
	};

	const hasResults = (userData?.vision_disorder_result ?? []).length > 0;

	return (
		<div className="profileContent">
			<div className="userInformationsContent">
				<h2 className="titleInformations">VOS INFORMATIONS</h2>
				<div className="userInformations">
					<FontAwesomeIcon icon={faAddressCard} />
					<p>
						Nom d'utilisateur : <strong>{userData?.username}</strong>
					</p>
				</div>
				<div className="userInformations">
					<FontAwesomeIcon icon={faEnvelope} />
					<p>
						Email : <strong>{userData?.email || "Utilisateur inconnu"}</strong>
					</p>
				</div>
				<div className="userInformations last">
					<FontAwesomeIcon icon={faLock} />
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
					<button
						type="submit"
						className="buttonInformations danger"
						onClick={deletePopUp}
					>
						<p>SUPPRIMER LE COMPTE</p>
					</button>
				</div>
			</div>

			{/* --- Faire/Refaire les tests --- */}
			<div className="userInformationsContent last">
				<h2 className="titleInformations">FAIRE/REFAIRE LES TESTS</h2>
				<div className="userInformations">
					<div
						className={`checkInformationsAcuity ${
							hasResults
								? userData?.vision_disorder_result
										.filter((disorder) => disorder.vision_disorder === "myopie")
										.map(() => "done")
										.join(" ")
								: ""
						}`}
					>
						{hasResults
							? userData?.vision_disorder_result.map((disorder, index) =>
									disorder.vision_disorder === "myopie" ? (
										<FontAwesomeIcon icon={faCheck} key={index} />
									) : null
							  )
							: null}
					</div>
					<p>Faire le test d'acuité visuelle</p>
				</div>
				<div className="userInformations">
					<div
						className={`checkInformationsAcuity ${
							hasResults
								? userData?.vision_disorder_result
										.filter((disorder) => disorder.vision_disorder === "DMLA")
										.map(() => "done")
										.join(" ")
								: ""
						}`}
					>
						{hasResults
							? userData?.vision_disorder_result.map((disorder, index) =>
									disorder.vision_disorder === "DMLA" ? (
										<FontAwesomeIcon icon={faCheck} key={index} />
									) : null
							  )
							: null}
					</div>
					<p>Faire le test de DMLA</p>
				</div>
				<div className="userInformations">
					<div
						className={`checkInformationsAcuity ${
							hasResults
								? userData?.vision_disorder_result
										.filter(
											(disorder) => disorder.vision_disorder === "daltonisme"
										)
										.map(() => "done")
										.join(" ")
								: ""
						}`}
					>
						{hasResults
							? userData?.vision_disorder_result.map((disorder, index) =>
									disorder.vision_disorder === "daltonisme" ? (
										<FontAwesomeIcon icon={faCheck} key={index} />
									) : null
							  )
							: null}
					</div>
					<p>Faire le test de d'Ishihara</p>
				</div>
			</div>
			<ModifyPopup
				isOpen={isModifPopupOpen}
				onClose={modifyPopUp}
				username={username || ""}
				setUsername={setUsername}
				email={email || ""}
				setEmail={setEmail}
				previousPassword={previousPassword}
				setPreviousPassword={setPreviousPassword}
				newPassword={newPassword}
				setNewPassword={setNewPassword}
				verifNewPassword={verifNewPassword}
				setVerifNewPassword={setVerifNewPassword}
				refreshUserData={refreshUserData}
				setIsModifPopupOpen={setIsModifPopupOpen}
			/>
			<DeletePopup isOpen={isDeletePopupOpen} onClose={deletePopUp} />
		</div>
	);
}
