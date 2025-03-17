import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DayNightMode from "../DayNightMode/DayNightMode";
import EyeCareLogo from "../../assets/Eye_care_proposition_finale.svg?react";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faArrowRightFromBracket,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useApiContext } from "../ApiProvider";

interface HeaderProps {
	active?: string;
}

export default function Header({ active }: HeaderProps) {
	const { connectedUser, loadingState, logoutUser, profilePicture } =
		useApiContext();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [onProfileClick, setOnProfileClick] = useState<boolean>(false);
	const profileRef = useRef<HTMLDivElement | null>(null);

	const handleOnProfileDisplay = () => {
		setOnProfileClick(!onProfileClick);
	};

	const handleOnArticleDisplay = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				profileRef.current &&
				!profileRef.current.contains(event.target as Node)
			) {
				setOnProfileClick(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const getInitials = () => {
		if (connectedUser?.username) {
			return connectedUser.username
				.split(" ")
				.map((word: string) => word[0].toUpperCase())
				.join("");
		}
		return "?";
	};

	return (
		<header>
			<div className="headerContainer">
				<Link to="/">
					<EyeCareLogo className="logo" />
				</Link>
				<nav>
					<Link
						to="/"
						className={
							"linkContainer " + (active == "accueil" ? "isActive" : "")
						}
					>
						<p>Accueil</p>
					</Link>

					<div
						className={
							"linkContainer linkArticles " +
							(active == "articles" ? "isActive" : "") +
							(isDropdownOpen ? "isActive" : "")
						}
						onClick={handleOnArticleDisplay}
					>
						<p>Articles</p>
						{isDropdownOpen && (
							<div className="dropDownArticle">
								<Link to="/articles/myopie" className="linkMenu">
									Myopie
								</Link>
								<Link to="/articles/presbytie" className="linkMenu">
									Presbytie
								</Link>
								<Link to="/articles/astigmatisme" className="linkMenu">
									Astigmatisme
								</Link>
								<Link to="/articles/dmla" className="linkMenu">
									DMLA
								</Link>
								<Link to="/articles/daltonisme" className="linkMenu">
									Daltonisme
								</Link>
								<Link to="/articles/hypermetropie" className="linkMenu">
									Hypermétropie
								</Link>
							</div>
						)}
					</div>

					<Link
						to="/tests/acuite"
						className={"linkContainer " + (active == "tests" ? "isActive" : "")}
					>
						<p>Tests</p>
					</Link>
				</nav>

				<div className="headers-side">
					<DayNightMode />
					<div className="separator"></div>
					{loadingState && (
						<Link to="/login" className="seConnecter">
							<p>
								<FontAwesomeIcon icon={faSpinner} spin /> Chargement...
							</p>
						</Link>
					)}
					{!loadingState && !connectedUser && (
						<Link to="/authentification/login" className="seConnecter">
							<p>Se connecter</p>
						</Link>
					)}
					{!loadingState && connectedUser && (
						<div className="userProfile" onClick={handleOnProfileDisplay}>
							<div className="icon">
								{profilePicture ? (
									<img
										src={profilePicture}
										alt="Photo de profil"
										className="previewImage"
									/>
								) : (
									<p>{getInitials()}</p>
								)}
							</div>
							<p className="username">{connectedUser.username}</p>
							{onProfileClick && (
								<div className="dropDown" ref={profileRef}>
									<Link to="/profile" className="link">
										<p>Mon profil</p>
									</Link>
									<div onClick={() => logoutUser(true)} className="link">
										<FontAwesomeIcon
											icon={faArrowRightFromBracket}
											className="exit"
										/>
										<p>Déconnexion</p>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
