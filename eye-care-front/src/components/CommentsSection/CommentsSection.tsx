import { useEffect, useState } from "react";

import Comment from "./Comment";

import "./commentsSection.scss";

export default function CommentsSection() {
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
  const [writedCommentValue, setWritedComment] = useState<string>("");
  const [writedCommentEmpty, setWritedCommentEmpty] = useState<boolean>();
  const [writedCommentLoadingState, setWritedCommentLoadingState] = useState<boolean>();
  const [writedCommentError, setWritedCommentError] = useState<boolean>();
  const [writedCommentSuccess, setWritedCommentSuccess] = useState<boolean>();

  const [totalComments, setTotalComments] = useState<number>(8);

  useEffect(() => {
    console.log("test");
  }, []);

  const handleChangeWritedComment = (e: any) => {
    setWritedComment(e.target.value);
  };

  async function sendCommentToAPI() {
    if (writedCommentValue == "") {
      setWritedCommentEmpty(true);
    } else {
      setWritedCommentEmpty(false);
      setWritedCommentLoadingState(true);
      setWritedCommentSuccess(false);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: writedCommentValue }),
      };

      try {
        const response = await fetch("localhost/comment", requestOptions);

        if (!response.ok) {
          setWritedCommentError(true);
          throw new Error("Erreur HTTP:" + response.status);
        }

        setWritedCommentSuccess(true);
        //
      } catch (error: any) {
        setWritedCommentError(true);
        console.log("Erreur lors de l'envoie : " + error.message);
        //
      } finally {
        setWritedCommentLoadingState(false);
      }
    }
  }

  return (
    <>
      <section className="commentSection">
        <article className="firstCommentSection">
          <h2>Publier un commentaire</h2>
          <hr />

          <div className="writeCommentContainer">
            <div className="writeComment">
              <div className="userIcon">
                <p>JD</p>
              </div>
              <textarea onChange={handleChangeWritedComment}></textarea>
              <div className="sendCommentContainer">
                <div className="sendingInfo">
                  {writedCommentLoadingState && <p>Envoie du commentaire en cours...</p>}

                  {writedCommentSuccess && (
                    <p className="success">Votre commentaire à bien été envoyé !</p>
                  )}

                  {writedCommentEmpty && (
                    <p className="error">
                      Veuillez remplir le champ commentaire avant de l'envoyer !
                    </p>
                  )}

                  {writedCommentError && (
                    <p className="error">Erreur lors de l'envoie du commentaire !</p>
                  )}
                </div>

                <button className="sendComment" onClick={sendCommentToAPI}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </article>
        <article className="secondCommentSection">
          <h2>{totalComments} Commentaires</h2>
          <hr />

          <div className="commentsContainer">
            {comments.map((comment: any) => {
              return <Comment key={comment.id} commentData={comment} />;
            })}
          </div>
        </article>
      </section>
    </>
  );
}
