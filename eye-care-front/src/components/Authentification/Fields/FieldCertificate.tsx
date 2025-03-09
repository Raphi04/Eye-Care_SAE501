import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

interface FieldCertificateProps {
	name: string;
	type: string;
	onFileSelect: (file: File | null) => void;
}

export default function FieldCertificate({
	name,
	type,
	onFileSelect,
}: FieldCertificateProps) {
	const [fileName, setFileName] = useState<string>("");

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0] || null;
		setFileName(file ? file.name : "");
		onFileSelect(file);
	}

	return (
		<div className="containerFileAndImg">
			<FontAwesomeIcon className="fileImg" icon={faFile} />
			<div className="containerFieldFile">
				<p>Déposer un certificat</p>
				<div className="containerFile">
					<div className="customFileButton">
						<input
							id="fileInput"
							name={name}
							type={type}
							className="fileInput"
							onChange={handleFileChange}
							accept=".pdf"
						/>
						<label htmlFor="fileInput">Parcourir</label>
					</div>
					{fileName && <p className="fileText-certificate">{fileName}</p>}
				</div>
			</div>
		</div>
	);
}
