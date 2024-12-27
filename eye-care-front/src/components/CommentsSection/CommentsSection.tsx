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

  //Variable listant tous les commentaires de l'articles et leurs réponses
  const [comments, setComments] = useState<any>([
    {
      id: 1,
      username: "Timothé Gogole",
      role: "ROLE_USER",
      text: "Bon, il est pas terrible votre site. Je trouve pas ce que je veux, y a rien qui va. Je cherche la partie “Alopécie” depuis 2 heures mais y a rien à faire. Moi pas content >:(",
      like: "600",
      dislike: "200",
      dateTime: "2024-12-11 12:09:44",
      replies: [
        {
          id: 2,
          username: "Andras Arato",
          role: "ROLE_CERTIFIED",
          text: "C’est normal Thimothé, tu te trouves sur un site qui parle d’ophtalmologie. Peu de chance que tu trouves ce que tu cherches... Mais puisque visiblement, il te reste autant de neurones que tu n’as de cheveux sur la tête, je te conseille le site “aledjesuischauve.com”, cela devrait t’aider à régler tes problèmes mentaux.",
          like: "600",
          dislike: "200",
          dateTime: "2024-12-11 12:09:44",
          replies: [],
        },
      ],
    },
    {
      id: 3,
      username: "Jérémie Parent",
      role: "ROLE_ADMIN",
      text: "Merci professeur Arato !",
      like: "6000",
      dislike: "0",
      dateTime: "1945-12-11 12:09:44",
      replies: [],
    },
    {
      id: "4",
      username: "Medhi Camant",
      role: "ROLE_USER",
      text: "Mais, vous aite pas janti, il as juste demander ou été la partie “Allo Pessi ?”. ",
      like: "600",
      dislike: "200",
      dateTime: "2022-12-11 12:09:44",
      replies: [
        {
          id: "5",
          username: "Lionel Pessi",
          role: "ROLE_USER",
          text: "Oui on m'a appelé ?",
          like: "52",
          dislike: "51",
          dateTime: "2022-11-11 12:09:44",
          replies: [],
        },
        {
          id: "6",
          username: "RonalGOAT",
          role: "ROLE_USER",
          text: "SUUUUUUUUUUUUUUUUUUUUUUUUUUUUU",
          like: "7",
          dislike: "0",
          dateTime: "2023-12-11 12:09:44",
          replies: [],
        },
      ],
    },
  ]);

  //Variable pour la rédaction de commentaire
  const [writedCommentValue, setWritedComment] = useState<string>("");
  const [writedCommentLoadingState, setWritedCommentLoadingState] = useState<boolean>();
  const [writedCommentError, setWritedCommentError] = useState<boolean>();
  const [writedCommentSuccess, setWritedCommentSuccess] = useState<boolean>();

  //Le nombre total de commentaire
  const [totalComments, setTotalComments] = useState<number>(() => {
    return comments.length;
  });

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: writedCommentValue,
        subject: subject,
      }),
    };

    try {
      const response = await fetch("localhost/comment", requestOptions);

      if (!response.ok) {
        setWritedCommentError(true);
        throw new Error("Erreur HTTP:" + response.status);
      }
      setWritedCommentSuccess(true);

      //Ajout du commentaire dans comments pour plus de fluidité
      let currentDate = new Date();
      currentDate.setSeconds(currentDate.getSeconds() - 1);
      let newComment = {
        id: new Date().getTime(),
        username: connectedUser.username,
        role: connectedUser.role,
        text: writedCommentValue,
        like: 0,
        dislike: 0,
        dateTime: currentDate,
      };
      setComments([newComment, ...comments]);
      //
    } catch (error: any) {
      setWritedCommentError(true);
      console.log("Erreur lors de l'envoie : " + error.message);
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
          comment.replies = [...comment.replies, replyObject]; //Si la réponse vient elle même d'une réponse
        } else {
          comment.replies = [replyObject, ...comment.replies]; //Si la réponse vient d'un commentaire
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
              Pour publier un commentaire, il est nécessaire de vous{" "}
              <Link to={"/authentification/login"}>connecter</Link>.
            </p>
          )}

          {!loadingState && connectedUser && (
            <div className="writeCommentContainer">
              <div className="writeComment">
                <div className="userIcon">
                  <p>{getConnectedUserInitials()}</p>
                </div>
                <textarea onChange={handleChangeWritedComment}></textarea>
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
          <h2>{totalComments} Commentaires</h2>
          <hr />

          <div className="commentsContainer">
            {comments.map((comment: any, index: number) => {
              return (
                <Comment
                  key={index}
                  commentData={comment}
                  isReply={false}
                  parentId={comment.id}
                  subject={subject}
                  updateComments={updateComments}
                />
              );
            })}
          </div>
        </article>
        <hr />
      </section>
    </>
  );
}
