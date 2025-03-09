import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiContext } from "../../../../components/ApiProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
interface DeletePopupProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function DeletePopup({ isOpen, onClose }: DeletePopupProps) {
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	const navigate = useNavigate();
	const { logoutUser } = useApiContext();
	const APIURL = import.meta.env.VITE_API_URL;
	const [stateTokenForDeleteUser, setStateTokenForDeleteUser] =
		useState<string>("");
	useEffect(() => {
		setStateTokenForDeleteUser(localStorage.getItem("token") || "");
	}, [isOpen]);

	if (!isOpen) return null;

	const handleSubmitDelete = async (token: string) => {
		setGlobalErrors([]);

		try {
			setLoadingState(true);
			if (!token) {
				setGlobalErrors(["Token d'authentification manquant."]);
				return;
			}

			const response = await axios.delete(`${APIURL}/user/user`, {
				headers: {
					"auth-token": token,
				},
			});

			if (response.status === 200) {
				logoutUser(false);
				localStorage.removeItem("token");
				localStorage.removeItem("username");
				navigate("/");
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setGlobalErrors([
					"Une erreur est survenue lors de la suppression du compte",
				]);
			} else {
				console.error("Erreur inattendue :", error);
				setGlobalErrors(["Une erreur inattendue s'est produite."]);
			}
		} finally {
			setLoadingState(false);
		}
	};
	return (
		<>
			<div className="popupOverlay">
				<div className="popupContent">
					<h1>Supprimer votre compte</h1>
					<h3>Nous sommes désolés de vous voir partir</h3>
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
						<button
							type="button"
							onClick={() => {
								handleSubmitDelete(stateTokenForDeleteUser);
							}}
							className="popupButton danger"
						>
							{loadingState ? (
								<div>
									<p>
										<FontAwesomeIcon icon={faSpinner} spin /> Chargement...
									</p>
								</div>
							) : (
								<p>SUPPRIMER LE COMPTE</p>
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
