import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function OcularIssuesContent() {
	const [, setLoadingState] = useState<unknown>(null);
	const [isOpenMyopie, setIsOpenMyopie] = useState(false);
	const [isOpenDaltonisme, setIsOpenDaltonisme] = useState(false);
	const [userData, setUserData] = useState<{
		email: string;
		username: string;
		vision_disorder: { vision_disorder: string }[];
		vision_disorder_result: {
			result: number;
			vision_disorder: string;
		}[];
	} | null>(null);
	const token = localStorage.getItem("token");
	const APIURL = import.meta.env.VITE_API_URL;

	const handleSubmitModify = useCallback(async () => {
		try {
			setLoadingState(true);
			const response = await axios.get(`${APIURL}/user/profile`, {
				headers: { "auth-token": token },
			});
			setUserData(response.data);
		} catch (error: unknown) {
			console.error("Erreur lors de l'envoi : " + error);
		} finally {
			setLoadingState(false);
		}
	}, [APIURL, token]);

	const toggleDetailsMyopie = () => {
		setIsOpenMyopie(!isOpenMyopie);
	};

	const toggleDetailsDaltonisme = () => {
		setIsOpenDaltonisme(!isOpenDaltonisme);
	};

	useEffect(() => {
		handleSubmitModify();
	}, [handleSubmitModify]);

	const hasResults = (userData?.vision_disorder_result ?? []).length > 0;

	return (
		<div className="ocularIssuesContentPlus">
			<div className="ocularIssuesContent">
				<h1 className="titleIssues">VOTRE PROFIL OCULAIRE</h1>
				<div className="ocularIssues">
					{userData?.vision_disorder_result && hasResults ? (
						userData.vision_disorder_result.map((disorder, index) => (
							<div>
								{disorder.vision_disorder === "myopie" ? (
									<div
										key={index}
										className="ocularIssue"
										onClick={toggleDetailsMyopie}
									>
										<div className="ocularIssueMain">
											{disorder.result >= 0 && disorder.result <= 12 ? (
												<div className="ocularIssueIndicator danger"></div>
											) : disorder.result > 12 && disorder.result <= 25 ? (
												<div className="ocularIssueIndicator warning"></div>
											) : disorder.result > 25 && disorder.result <= 37 ? (
												<div className="ocularIssueIndicator medium"></div>
											) : disorder.result > 37 ? (
												<div className="ocularIssueIndicator good"></div>
											) : null}
											<h3 key={index} className="ocularIssuesTitle">
												{disorder.vision_disorder.charAt(0).toUpperCase() +
													disorder.vision_disorder.slice(1)}
											</h3>
										</div>
										<FontAwesomeIcon
											className="chevron"
											icon={isOpenMyopie ? faChevronUp : faChevronDown}
										/>
									</div>
								) : null}
								{disorder.vision_disorder === "daltonisme" ? (
									<div
										className="ocularIssue"
										onClick={toggleDetailsDaltonisme}
									>
										<div className="ocularIssueMain">
											{disorder.result >= 0 && disorder.result <= 12 ? (
												<div className="ocularIssueIndicator danger"></div>
											) : disorder.result > 12 && disorder.result <= 18 ? (
												<div className="ocularIssueIndicator warning"></div>
											) : disorder.result > 18 && disorder.result <= 24 ? (
												<div className="ocularIssueIndicator medium"></div>
											) : disorder.result > 24 ? (
												<div className="ocularIssueIndicator good"></div>
											) : null}
											<h3 key={index} className="ocularIssuesTitle">
												{disorder.vision_disorder.charAt(0).toUpperCase() +
													disorder.vision_disorder.slice(1)}
											</h3>
										</div>
										<FontAwesomeIcon
											className="chevron"
											icon={isOpenDaltonisme ? faChevronUp : faChevronDown}
										/>
									</div>
								) : null}
								<div
									className={`ocularIssueDetails ${
										disorder.vision_disorder === "myopie" && isOpenMyopie
											? "openMyopie"
											: ""
									}`}
								>
									<p className="ocularIssueNote">
										Résultat : {disorder.result}/50
									</p>
									{disorder.vision_disorder === "myopie" ? (
										disorder.result >= 0 && disorder.result <= 12 ? (
											<p className="ocularIssueText">
												Nous avons repéré un problème, ne tardez pas à prendre
												rendez-vous chez un ophtalmologue
											</p>
										) : disorder.result > 12 && disorder.result <= 25 ? (
											<p className="ocularIssueText">
												Nous avons repéré un problème, ne tardez pas à prendre
												rendez-vous chez un ophtalmologue
											</p>
										) : disorder.result > 25 && disorder.result <= 37 ? (
											<p>
												Vous avez peut être un problème de vue, prenez
												rendez-vous chez un ophtalmologue
											</p>
										) : disorder.result > 37 ? (
											<p className="ocularIssueText">
												Vous avez une très bonne vue, continuez à prendre soin
												de vos yeux
											</p>
										) : null
									) : null}
								</div>
								<div
									className={`ocularIssueDetails ${
										disorder.vision_disorder === "daltonisme" &&
										isOpenDaltonisme
											? "openDaltonisme"
											: ""
									}`}
								>
									<p className="ocularIssueNote">
										Résultat : {disorder.result}/30
									</p>
									{disorder.vision_disorder === "daltonisme" ? (
										disorder.result >= 0 && disorder.result <= 12 ? (
											<p className="ocularIssueText">
												Nous avons repéré un problème, ne tardez pas à prendre
												rendez-vous chez un ophtalmologue
											</p>
										) : disorder.result > 12 && disorder.result <= 18 ? (
											<p className="ocularIssueText">
												Nous avons repéré un problème, ne tardez pas à prendre
												rendez-vous chez un ophtalmologue
											</p>
										) : disorder.result > 18 && disorder.result <= 24 ? (
											<p className="ocularIssueText">
												Vous avez peut être un problème de vue, prenez
												rendez-vous chez un ophtalmologue
											</p>
										) : disorder.result > 24 ? (
											<p className="ocularIssueText">
												Vous avez une très bonne vue, continuez à prendre soin
												de vos yeux
											</p>
										) : null
									) : null}
								</div>
							</div>
						))
					) : (
						<p className="ocularIssuesTextNoTest">
							Vous n'avez pas encore effectué de tests
						</p>
					)}
				</div>
			</div>
			<p className="ocularIssuesTextWarning">
				Nos tests nécessitent le complément d’une expertise faite par un
				ophtalmologue
			</p>
		</div>
	);
}
