import axios from "axios";
import { useState } from "react";

export default function OcularIssuesContent() {
	const [globalErrors, setGlobalErrors] = useState<string[]>([]);
	const [, setLoadingState] = useState<unknown>(null);
	const [userData, setUserData] = useState<{
		email: string;
		username: string;
		vision_disorder: { vision_disorder: string }[];
		vision_disorder_result: string[];
	} | null>(null);
	const token = localStorage.getItem("token");

	const handleSubmitModify = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const APIURL = import.meta.env.VITE_API_URL;
		setGlobalErrors([]);

		try {
			const response = await axios.get(`${APIURL}/user/profile`, {
				headers: { "auth-token": token },
			});
			setUserData(response.data);
		} catch (error: unknown) {
			console.error("Erreur lors de l'envoi : " + error);
		} finally {
			setLoadingState(false);
		}
	};
	return (
		<div className="ocularIssuesContent">
			<h1 className="titleIssues">VOTRE PROFIL OCULAIRE</h1>
			<div className="ocularIssues">
				<div className="ocularIssue">
					<div />
					<h3 className="ocularIssuesTitle">Daltonisme</h3>
				</div>
				<div className="ocularIssue">
					<div />
					<h3 className="ocularIssuesTitle">DMLA</h3>
				</div>
				<div className="ocularIssue">
					<div />
					<h3 className="ocularIssuesTitle">Acuite visuelle</h3>
				</div>
			</div>
		</div>
	);
}
