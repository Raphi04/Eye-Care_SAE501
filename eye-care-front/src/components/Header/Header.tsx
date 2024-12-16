import { useState } from "react";
import { Link } from "react-router-dom";

import DayNightMode from "../DayNightMode/DayNightMode";

import EyeCareLogo from "../../assets/Eye_care_proposition_finale.svg?react";

import "./header.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
	active: string;
}

export default function Header({ active }: HeaderProps) {
	const [onProfileHover, setOnProfileHover] = useState<boolean>(false);
	//const [onArticleHover, setOnArticleHover] = useState<boolean>(false);

	function handleOnProfileHover() {
		let newState = !onProfileHover;
		setOnProfileHover(newState);
	}

	/* function handleOnArticleHover() {
    let newState = !onArticleHover;
    setOnArticleHover(newState);
  }*/

	return (
		<>
			<header>
				<div className="headerContainer">
					<Link to="/">
						<EyeCareLogo className="logo"></EyeCareLogo>
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

						<Link
							to="/blog"
							className={
								"linkContainer " + (active == "blog" ? "isActive" : "")
							}
						>
							<p>Blog</p>
						</Link>

						<Link
							to="/articles/myopie"
							className={
								"linkContainer " + (active == "articles" ? "isActive" : "")
							}
						>
							<p>Articles</p>
						</Link>

						<Link
							to="/tests"
							className={
								"linkContainer " + (active == "tests" ? "isActive" : "")
							}
						>
							<p>Tests</p>
						</Link>
					</nav>

					<div className="headers-side">
						<DayNightMode />

						<div
							className="userProfile"
							onMouseEnter={handleOnProfileHover}
							onMouseLeave={handleOnProfileHover}
						>
							<div className="icon">
								<p>JD</p>
							</div>
							<p>John Doe</p>

							{onProfileHover && (
								<div className="dropDown">
									<Link to="/profile" className="link">
										<p>Mon profile</p>
									</Link>
									<Link to="./authentification/login" className="link">
										<FontAwesomeIcon
											icon={faArrowRightFromBracket}
											className="exit"
										/>
										<p>Déconnexion</p>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
