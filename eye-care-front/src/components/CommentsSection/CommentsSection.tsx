//Utilities
import { useEffect, useState } from "react";

//Components
import Comment from "./Comment";

//Stylesheet
import "./commentsSection.scss";
import { useApiContext } from "../ApiProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface CommentSectionProps {
  subject: string;
}

export default function CommentsSection({ subject }: CommentSectionProps) {
  //Variable de l'utilisateur actuellement connecté
  const { connectedUser, loadingState } = useApiContext();
  const token = localStorage.getItem("token") || "";

  //Variable listant tous les commentaires de l'article et leurs réponses
  const [comments, setComments] = useState<any>([]);
  const [commentsLoadingState, setCommentsLoadingState] = useState<boolean>(false);

  //Variable pour la rédaction de commentaire
  const [writedCommentValue, setWritedComment] = useState<string>("");
  const [writedCommentLoadingState, setWritedCommentLoadingState] = useState<boolean>();
  const [writedCommentError, setWritedCommentError] = useState<boolean>();
  const [writedCommentSuccess, setWritedCommentSuccess] = useState<boolean>();

  //Le nombre total de commentaire
  const [totalComments, setTotalComments] = useState<number>(() => {
    return comments.length;
  });

  //GET allComments
  useEffect(() => {
    const getAllComments = async () => {
      try {
        setCommentsLoadingState(true);

        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json", "auth-token": token },
        };

        const response = await fetch(`http://localhost:8000/post/${subject}`, requestOptions);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const allComments = await response.json();
        //On tri par le score de like - dislike
        const allCommentsSorted = allComments.sort((a: any, b: any) => {
          if (connectedUser && !loadingState && !commentsLoadingState) {
            let isAUser;
            let isBUser;

            if (a.user_id == connectedUser.id) {
              isAUser = true;
            }

            if (b.user_id == connectedUser.id) {
              isBUser = true;
            }

            if (isAUser && !isBUser) {
              return -1; // A vient avant B
              //
            } else if (!isAUser && isBUser) {
              return 1; // B vient avant A
              //
            } else {
              const scoreA = a.like - a.dislike;
              const scoreB = b.like - b.dislike;
              return scoreB - scoreA;
            }
          } else {
            const scoreA = a.like - a.dislike;
            const scoreB = b.like - b.dislike;
            return scoreB - scoreA;
          }
        });
        setComments(allCommentsSorted);
        //
      } catch (error: any) {
        console.log("Erreur lors de l'envoie : " + error);
        //
      } finally {
        setCommentsLoadingState(false);
      }
    };
    getAllComments();
  }, []);

  //Si l'utilisateur est connecté on met ses posts en haut
  useEffect(() => {
    if (connectedUser && !loadingState && !commentsLoadingState) {
      const allCommentsSorted = [...comments].sort((a: any, b: any) => {
        let isAUser;
        let isBUser;

        if (a.user_id == connectedUser.id) {
          isAUser = true;
        }

        if (b.user_id == connectedUser.id) {
          isBUser = true;
        }

        if (isAUser && !isBUser) {
          return -1; // A vient avant B
          //
        } else if (!isAUser && isBUser) {
          return 1; // B vient avant A
          //
        } else {
          const scoreA = a.like - a.dislike;
          const scoreB = b.like - b.dislike;
          return scoreB - scoreA;
        }
      });
      setComments([...allCommentsSorted]);
    }
  }, [connectedUser]);

  //Quand comments est mis à jour, on met à jour totalComments
  useEffect(() => {
    setTotalComments(comments.length);
  }, [comments]);

  //S'occupe du changement de valeur du textarea pour rédiger un commentaire
  const handleChangeWritedComment = (e: any) => {
    setWritedComment(e.target.value);
  };

  //Envoie du commentaire à l'API
  async function sendCommentToAPI() {
    setWritedCommentLoadingState(true);
    setWritedCommentSuccess(false);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "auth-token": token },
      body: JSON.stringify({
        subject: subject,
        post_parent_id: null,
        text: writedCommentValue,
      }),
    };

    try {
      const response = await fetch("http://localhost:8000/user/post", requestOptions);

      if (!response.ok) {
        setWritedCommentError(true);
        throw new Error("Erreur HTTP:" + response.status);
      }

      const result = await response.json();
      console.log(result);
      setWritedComment("");
      setWritedCommentSuccess(true);

      //Ajout du commentaire dans comments pour plus de fluidité
      let currentDate = new Date();
      currentDate.setSeconds(currentDate.getSeconds() - 1);
      let newComment = {
        id: result.id,
        username: connectedUser.username,
        user_roles: [connectedUser.roles[0]],
        text: writedCommentValue,
        like: 0,
        is_liked: false,
        dislike: 0,
        is_disliked: false,
        created_at: currentDate,
        responses: [],
      };

      const newAllComments = [newComment, ...comments];
      setComments(newAllComments);
      //
    } catch (error: any) {
      setWritedCommentError(true);
      //
    } finally {
      setWritedCommentLoadingState(false);
    }
  }

  function getConnectedUserInitials() {
    if (connectedUser.username) {
      let usernameSplited = connectedUser.username.split(" ");

      let onlyInitials = usernameSplited.map((word: string) => {
        return word.charAt(0).toUpperCase();
      });

      return onlyInitials.join("");
    }
  }

  //Fonction de mise à jour de la variable commentaire local pour améliorer la fluidité côté utilisateur lorsqu'il écrit une réponse
  //La fonction est passé dans les props du composant <Commentaire />
  function updateComments(commentId: number, replyObject: any, fromReply: boolean) {
    const newComments = comments.map((comment: any) => {
      if (comment.id === commentId) {
        if (fromReply) {
          comment.responses = [...comment.responses, replyObject]; //Si la réponse vient elle même d'une réponse
        } else {
          comment.responses = [replyObject, ...comment.responses]; //Si la réponse vient d'un commentaire
        }
      }
      return comment;
    });
    setComments(newComments);
  }

  return (
    <>
      <section className="commentSection">
        <article className="firstCommentSection">
          <h2>Publier un commentaire</h2>
          <hr />

          {loadingState && (
            <div className="writeCommentContainer">
              <p>
                <FontAwesomeIcon icon={faSpinner} spin /> Chargement...
              </p>
            </div>
          )}

          {!loadingState && !connectedUser && (
            <p className="notConnected">
              Pour publier un commentaire, il est nécessaire de vous
              <Link to={"/authentification/login"}> connecter</Link>.
            </p>
          )}

          {!loadingState && connectedUser && (
            <div className="writeCommentContainer">
              <div className="writeComment">
                <div className="userIcon">
                  <p>{getConnectedUserInitials()}</p>
                </div>
                <textarea
                  onChange={handleChangeWritedComment}
                  value={writedCommentValue}
                ></textarea>
                <div className="sendCommentContainer">
                  <div className="sendingInfo">
                    {writedCommentLoadingState && <p>Envoie du commentaire en cours...</p>}

                    {writedCommentSuccess && (
                      <p className="success">Votre commentaire à bien été envoyé !</p>
                    )}

                    {writedCommentError && (
                      <p className="error">Erreur lors de l'envoie du commentaire !</p>
                    )}
                  </div>

                  <button
                    className="sendComment"
                    onClick={sendCommentToAPI}
                    disabled={writedCommentValue.trim() == ""}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          )}
        </article>

        <article className="secondCommentSection">
          {totalComments > 1 && <h2>{totalComments} Commentaires</h2>}
          {totalComments <= 1 && <h2>{totalComments} Commentaire</h2>}

          <hr />
          {commentsLoadingState && (
            <p>
              <FontAwesomeIcon icon={faSpinner} spin /> Chargement...
            </p>
          )}
          {!commentsLoadingState && (
            <div className="commentsContainer">
              {comments.map((comment: any, index: number) => {
                return (
                  <Comment
                    key={comment.id}
                    commentData={comment}
                    isReply={false}
                    parentId={comment.id}
                    subject={subject}
                    updateComments={updateComments}
                  />
                );
              })}
            </div>
          )}
          {!commentsLoadingState && comments.length == 0 && (
            <p>Aucun commentaire n'a été écrit pour cette article.</p>
          )}
        </article>
        <hr />
      </section>
    </>
  );
}
