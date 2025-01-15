import axios from "axios";
import { useEffect, useState } from "react";
import { useApiContext } from "../../../components/ApiProvider";
import ModifyPopup from "./PopUp/ModifyPopup";
import DeletePopup from "./PopUp/DeletePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);

	//	Token et URL de l'API
	const APIURL = import.meta.env.VITE_API_URL;

	//	Pour savoir si l'utilisateur est connecté
	const { connectedUser, refreshConnectedUser } = useApiContext();

	// Mise à jour des champs
	useEffect(() => {
		setEmail(connectedUser?.email || "");
		setUsername(connectedUser?.username || "");
	}, [connectedUser]);

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

	const handleSubmitModify = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		const email = formData.get("email")?.toString().trim();
		const username = formData.get("username")?.toString().trim();
		const password = formData.get("newPassword")?.toString().trim();

		const payload = {
			email,
			username,
			password,
		};

		setGlobalErrors([]);
		const errors: string[] = [];

		if (
			(!previousPassword && !newPassword && verifNewPassword) ||
			(!previousPassword && newPassword && !verifNewPassword) ||
			(previousPassword && !newPassword && !verifNewPassword)
		) {
			errors.push(
				"Veuillez remplir tous les champs concernant le mot de passe."
			);
		}

		if (username && (username.length < 2 || username.length > 20)) {
			errors.push(
				"Le nom d'utilisateur doit contenir entre 2 et 20 caractères."
			);
		}

		if (
			newPassword &&
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
				newPassword
			)
		) {
			errors.push(
				"Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
			);
		}

		if (
			(username && (username.match(/ /g) || []).length >= 2) ||
			username?.startsWith(" ") ||
			username?.endsWith(" ")
		) {
			errors.push(
				"Le nom d'utilisateur ne peut pas contenir plus d'un espace, ni commencer ou terminer par un espace."
			);
		}

		if (newPassword !== verifNewPassword) {
			errors.push("Les mots de passe ne correspondent pas.");
		}

		if (errors.length > 0) {
			setGlobalErrors(errors);
			return;
		}

		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setGlobalErrors(["Token d'authentification manquant."]);
				return;
			}

			// Envoi d'une requête POST au serveur pour la connexion
			const response = await axios.put(`${APIURL}/user/user`, payload, {
				headers: {
					"Content-Type": "application/json",
					"auth-token": token,
				},
			});

			if (response.status === 200) {
				refreshUserData();
				await refreshConnectedUser();
				setIsModifPopupOpen(false);
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const status = error.response?.status;
				const message = error.response?.data?.message;

				// Traitement des erreurs spécifiques à l'API
				if (status === 400) {
					setGlobalErrors([`Erreur : ${message || "Données invalides."}`]);
				} else if (status === 401) {
					setGlobalErrors(["Mot de passe actuel incorrect."]);
				} else {
					setGlobalErrors([`Erreur de mise à jour : ${message || "Inconnue"}`]);
				}
			} else {
				console.error("Erreur inattendue :", error);
				setGlobalErrors(["Une erreur inattendue s'est produite."]);
			}
		}
	};

	const hasResults = (userData?.vision_disorder_result ?? []).length > 0;

	return (
		<div className="profileContent">
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
				onSubmit={handleSubmitModify}
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
				globalErrors={globalErrors}
			/>
			<DeletePopup
				isOpen={isDeletePopupOpen}
				onClose={deletePopUp}
				globalErrors={globalErrors}
			/>
		</div>
	);
}
