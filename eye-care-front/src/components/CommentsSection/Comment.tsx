//Utilities
import { useEffect, useRef, useState } from "react";

//Les imports de FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faChevronDown,
  faChevronUp,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpBorder } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownBorder } from "@fortawesome/free-regular-svg-icons";
import { useApiContext } from "../ApiProvider";

//Typing de commentData
interface CommentData {
  id: number;
  username: string;
  role: string;
  text: string;
  like: number;
  isLiked?: boolean;
  dislike: number;
  isDisliked?: boolean;
  dateTime: Date;
  replies?: CommentData[];
}

//Définition des props de <Comments />
interface CommentProps {
  commentData: CommentData;
  parentId: number;
  subject: string;
  isReply: boolean;
  updateComments: (commentId: number, replyObject: any, fromReply: boolean) => void; //Fonction venant du parent pour mettre à jour les commentaires
}

export default function Comment({
  commentData,
  parentId,
  subject,
  isReply,
  updateComments,
}: CommentProps) {
  //ConnectedUser
  const { connectedUser, loadingState } = useApiContext();

  //Variables des commentaires
  const [publishedAgo, setPublishedAgo] = useState<string>();
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    return commentData.isLiked || false;
  });
  const [isDisliked, setIsDisliked] = useState<boolean>(() => {
    return commentData.isDisliked || false;
  });

  //Variable des réponses
  const [replyText, setReplyText] = useState<string>(() => {
    if (isReply) {
      return `@${commentData.username} `;
    } else {
      return "";
    }
  });
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);
  const [replyError, setReplyError] = useState<boolean>(false);
  const [replyLoading, setReplyLoading] = useState<boolean>(false);

  useEffect(() => {
    //Récupération de l'intervale de temps entre le post et maintenant
    getDifferenceTime();
  }, []);

  function getInitials(variable: any) {
    if (variable) {
      let usernameSplited = variable.username.split(" ");

      let onlyInitials = usernameSplited.map((word: string) => {
        return word.charAt(0).toUpperCase();
      });

      return onlyInitials.join("");
    }
  }

  function getDifferenceTime() {
    const now = new Date();
    const commentPublishedTime = new Date(commentData.dateTime);
    const differenceEnMs = now.getTime() - commentPublishedTime.getTime();

    let differenceSecondes = Math.round(differenceEnMs / 1000);
    let differenceMinutes = Math.round(differenceSecondes / 60);
    let differenceHeures = Math.round(differenceMinutes / 60);
    let differenceJours = Math.round(differenceHeures / 24);
    let differenceMois = Math.round(differenceJours / 30);
    let differenceAns = Math.round(differenceMois / 12);

    // Test de toutes les differences possibles selon si c'est des secondes, des minutes, etc...
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
  }

  function handleChangeShowReplies() {
    setShowReplies(!showReplies);
  }

  function handleChangeIsReplying() {
    const newIsReplying = !isReplying;
    setIsReplying(newIsReplying);
  }

  //Permet l'auto focus de l'input quand on écrit une réponse
  useEffect(() => {
    if (isReplying && input.current) {
      input.current.focus();
    }
  }, [isReplying]);

  //Permet de forcer la mention d'un utilisateur quand c'est une réponse de réponse
  function handleChangeReplyText(e: any) {
    setReplyError(false);
    if (isReply) {
      let mention = `@${commentData.username} `;
      setReplyText(mention + e.target.value.slice(mention.length));
    } else {
      setReplyText(e.target.value);
    }
  }

  function handleChangeIsLiked() {
    const newIsLikes = !isLiked;
    setIsLiked(newIsLikes);

    if (newIsLikes == true) {
      commentData.like++;
    } else {
      commentData.like--;
    }
  }

  function handleChangeIsDisliked() {
    const newIsDisliked = !isDisliked;
    setIsDisliked(newIsDisliked);

    if (newIsDisliked == true) {
      commentData.dislike++;
    } else {
      commentData.dislike--;
    }
  }

  async function sendResponse() {
    setReplyError(false);
    setReplyLoading(true);
    let newErrorState = false;
    //Permet de mettre le temps de publication du commentaire à 1 seconde au lieu de 0
    //Impossible de mettre directement un nombre, il faut que ce soit une valeur de type Date
    let currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - 1);

    let reply = {
      id: new Date().getTime(),
      username: connectedUser.username,
      role: connectedUser.role,
      subject: subject,
      text: replyText,
      like: 0,
      dislike: 0,
      dateTime: currentDate,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reply),
    };

    try {
      const response = await fetch("localhost/comment", requestOptions);

      if (!response.ok) {
        newErrorState = true;
        setReplyError(newErrorState);
        throw new Error("Erreur HTTP:" + response.status);
      }
      //
    } catch (error: any) {
      newErrorState = true;
      setReplyError(newErrorState);
      console.log("Erreur lors de l'envoie : " + error.message);
      //
    } finally {
      setReplyLoading(false);
      if (!newErrorState) {
        //Mise à jour de la variable du parent pour plus de fluidité et éviter de refaire un appel à l'API
        updateComments(parentId, reply, isReply);

        setReplyText("");
        setIsReplying(false);
        setShowReplies(true);
      }
    }
  }

  return (
    <>
      <div className="commentAndReplyContainer">
        <div className="comment">
          <div className="userIcon">
            <p>{getInitials(commentData)}</p>
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

            <div className="actions">
              <div className="mainActions">
                {loadingState && (
                  <p className="response loading">
                    <FontAwesomeIcon icon={faSpinner} spin /> Chargement...
                  </p>
                )}
                {!loadingState && connectedUser && (
                  <p
                    className={`response ${isReplying ? "isReplying" : ""}`}
                    onClick={handleChangeIsReplying}
                  >
                    Répondre
                  </p>
                )}

                <div className="commentValue" onClick={handleChangeIsLiked}>
                  <FontAwesomeIcon
                    icon={isLiked ? faThumbsUp : faThumbsUpBorder}
                    className={isLiked ? "green" : ""}
                  />
                  <p>{commentData.like}</p>
                </div>

                <div className="commentValue" onClick={handleChangeIsDisliked}>
                  <FontAwesomeIcon
                    icon={isDisliked ? faThumbsDown : faThumbsDownBorder}
                    className={isDisliked ? "red" : ""}
                  />
                  <p>{commentData.dislike}</p>
                </div>
              </div>

              {isReplying && (
                <div className="comment responding">
                  <div className="userIcon">
                    <p>{getInitials(connectedUser)}</p>
                  </div>

                  <div className="commentInformations">
                    <div className="commentHeader">
                      <p className="user">{connectedUser.username}</p>
                      {connectedUser.role == "ROLE_CERTIFIED" && (
                        <div className={"userRole professionnel"}>
                          <p>
                            Professionnel <FontAwesomeIcon icon={faCheck} />
                          </p>
                        </div>
                      )}
                      {connectedUser.role == "ROLE_ADMIN" && (
                        <div className={"userRole admin"}>
                          <p>
                            Administrateur <FontAwesomeIcon icon={faCheck} />
                          </p>
                        </div>
                      )}

                      <p className="date">En cours d'écriture ...</p>
                    </div>

                    <div className="inputReply">
                      <input
                        ref={input}
                        type="text"
                        className="commentText"
                        value={replyText}
                        onChange={handleChangeReplyText}
                        placeholder="Ajouter une réponse ..."
                      ></input>
                      <hr />
                    </div>

                    <div className="actions">
                      <div className="mainActions">
                        {replyError && (
                          <p className="stateMessage error">
                            Une erreur est survenue lors de l'envoie de la réponse
                          </p>
                        )}

                        {replyLoading && (
                          <p className={`stateMessage ${replyError ? "error" : ""}`}>
                            <FontAwesomeIcon icon={faSpinner} spin /> Votre réponse est en cours
                            d'envoie...
                          </p>
                        )}

                        <button className="cancelButton" onClick={handleChangeIsReplying}>
                          Annuler
                        </button>

                        <button
                          className="responseButton"
                          disabled={
                            replyText.trim() == "" ||
                            replyText.trim() == `@${commentData.username}` ||
                            replyLoading
                          }
                          onClick={sendResponse}
                        >
                          Répondre
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
            </div>
          </div>
        </div>

        {showReplies && commentData.replies && commentData.replies.length > 0 && (
          <div className="responseContainer">
            {commentData.replies.map((reply: any, index: number) => {
              return (
                <Comment
                  key={index}
                  commentData={reply}
                  parentId={parentId}
                  subject={subject}
                  isReply={true}
                  updateComments={updateComments}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
