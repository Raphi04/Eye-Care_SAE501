import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faChevronDown,
  faChevronUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface CommentData {
  id: number;
  username: string;
  role: string;
  text: string;
  like: number;
  dislike: number;
  dateTime: Date;
  replies?: CommentData[];
}

interface CommentProps {
  commentData: CommentData; // Le composant attend une propriété commentData de type CommentData
}

export default function Comment({ commentData }: CommentProps) {
  const [usernameInitials, setUsernameInitials] = useState<string>();
  const [publishedAgo, setPublishedAgo] = useState<string>();
  const [showReplies, setShowReplies] = useState<boolean>(false);

  useEffect(() => {
    // Récupération de la première lettre de chaque mots dans username
    let usernameSplited = commentData.username.split(" ");

    let onlyInitials = usernameSplited.map((word: string) => {
      return word.charAt(0).toUpperCase();
    });

    setUsernameInitials(onlyInitials.join(""));

    //Récupération de l'intervale de temps entre le post et maintenant
    const now = new Date();
    const commentPublishedTime = new Date(commentData.dateTime);
    const differenceEnMs = now.getTime() - commentPublishedTime.getTime();

    let differenceSecondes = Math.round(differenceEnMs / 1000);
    let differenceMinutes = Math.round(differenceSecondes / 60);
    let differenceHeures = Math.round(differenceMinutes / 60);
    let differenceJours = Math.round(differenceHeures / 24);
    let differenceMois = Math.round(differenceJours / 30);
    let differenceAns = Math.round(differenceMois / 12);

    // Test de toutes les differences possibles selon si c'est des secondes, minutes etc
    if (differenceSecondes < 60) {
      if (differenceSecondes == 1) {
        setPublishedAgo(differenceSecondes + " seconde");
      } else {
        setPublishedAgo(differenceSecondes + " secondes");
      }
    } else if (differenceMinutes < 60) {
      if (differenceSecondes == 1) {
        setPublishedAgo(differenceMinutes + " minute");
      } else {
        setPublishedAgo(differenceMinutes + " minutes");
      }
    } else if (differenceHeures < 24) {
      if (differenceSecondes == 1) {
        setPublishedAgo(differenceHeures + " heure");
      } else {
        setPublishedAgo(differenceHeures + " heures");
      }
    } else if (differenceJours < 30) {
      if (differenceSecondes == 1) {
        setPublishedAgo(differenceJours + " jour");
      } else {
        setPublishedAgo(differenceJours + " jours");
      }
    } else if (differenceMois < 12) {
      setPublishedAgo(differenceMois + " mois");
    } else {
      if (differenceSecondes == 1) {
        setPublishedAgo(differenceAns + " an");
      } else {
        setPublishedAgo(differenceAns + " ans");
      }
    }
  }, []);

  function handleChangeShowReplies() {
    setShowReplies(!showReplies);
  }

  return (
    <>
      <div className="commentAndReplyContainer">
        <div className="comment">
          <div className="userIcon">
            <p>{usernameInitials}</p>
          </div>

          <div className="commentInformations">
            <div className="commentHeader">
              <p className="user">{commentData.username}</p>
              {commentData.role == "ROLE_CERTIFIED" && (
                <div className={"userRole professionnel"}>
                  <p>
                    Professionnel <FontAwesomeIcon icon={faCheck} />
                  </p>
                </div>
              )}
              {commentData.role == "ROLE_ADMIN" && (
                <div className={"userRole admin"}>
                  <p>
                    Administrateur <FontAwesomeIcon icon={faCheck} />
                  </p>
                </div>
              )}
              <p className="date">Il y a {publishedAgo}</p>
            </div>

            <p className="commentText">{commentData.text}</p>

            {!showReplies && commentData.replies && commentData.replies.length > 0 && (
              <p className="showReplies" onClick={handleChangeShowReplies}>
                <FontAwesomeIcon icon={faChevronDown} />
                {commentData.replies.length == 1 ? "Voir la réponse" : "Voir les réponses"}
              </p>
            )}

            {showReplies && commentData.replies && commentData.replies.length > 0 && (
              <p className="showReplies" onClick={handleChangeShowReplies}>
                <FontAwesomeIcon icon={faChevronUp} />
                {commentData.replies.length == 1 ? "Masquer la réponse" : "Masquer les réponses"}
              </p>
            )}

            <div className="commentValue">
              <div>
                <FontAwesomeIcon icon={faThumbsUp} />
                <p>{commentData.like}</p>
              </div>

              <div>
                <FontAwesomeIcon icon={faThumbsDown} />
                <p>{commentData.dislike}</p>
              </div>
            </div>
          </div>
        </div>

        {showReplies && commentData.replies && commentData.replies.length > 0 && (
          <div className="responseContainer">
            {commentData.replies.map((reply: any) => {
              return <Comment key={reply.id} commentData={reply} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
