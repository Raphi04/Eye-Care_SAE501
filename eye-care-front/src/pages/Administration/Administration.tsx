import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import DataTable from "datatables.net-react";
import DT from "datatables.net";
import "datatables.net-responsive-dt";
import language from "datatables.net-plugins/i18n/fr-FR.mjs";

DataTable.use(DT);

import "./administration.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

export default function Administration() {
  //GET user token
  const token = localStorage.getItem("token") || "";

  //Liste des utilisateur qui doivent être certifiés
  const [allUserToCertificate, setAllUserToCertificate] = useState<any>();
  const [loadingStateUserCertificate, setLoadingStateUserCertificate] = useState<any>(true);

  //Liste des utilisateur qui doivent êListtre certifiés
  const [allUsers, setAllUsers] = useState<any>();
  const [loadingStateUsersList, setLoadingStateUsersList] = useState<any>(true);

  //URL dynamique de l'API
  const APIURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getUsersCertificate = async () => {
      try {
        setLoadingStateUserCertificate(true);
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json", "auth-token": token },
        };

        const response = await fetch(`${APIURL}/admin/user_to_certificate`, requestOptions);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        setAllUserToCertificate(await response.json());
      } catch (error: any) {
        console.log("Erreur lors de l'envoie : " + error);
      } finally {
        setLoadingStateUserCertificate(false);
      }
    };

    const getUsersList = async () => {
      try {
        setLoadingStateUsersList(true);
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json", "auth-token": token },
        };

        const response = await fetch(`${APIURL}/admin/user`, requestOptions);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        setAllUsers(await response.json());
      } catch (error: any) {
        console.log("Erreur lors de l'envoie : " + error);
      } finally {
        setLoadingStateUsersList(false);
      }
    };

    getUsersCertificate();
    getUsersList();
  }, []);

  async function downloadCertificate(id: number) {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "auth-token": token },
      };

      const response = await fetch(`${APIURL}/admin/user_certificate/${id}`, requestOptions);

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const url = URL.createObjectURL(await response.blob());

      window.open(url, "_blank");
    } catch (error: any) {
      console.log("Erreur lors de l'envoie : " + error);
    }
  }

  async function acceptCertificate(id: number) {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", "auth-token": token },
      };

      const response = await fetch(`${APIURL}/admin/user_certify/${id}`, requestOptions);

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const newAllUsersToCertificate = allUserToCertificate.filter((user: any) => {
        user.id !== id;
      });
      setAllUserToCertificate(newAllUsersToCertificate);

      console.log(newAllUsersToCertificate);
    } catch (error: any) {
      console.log("Erreur lors de l'envoie : " + error);
    }
  }

  const columnsCertificate = [
    { data: "email" },
    { data: "username" },
    {
      data: null,
      responsivePriority: 1,
      createdCell: function (td: HTMLElement, rowData: any) {
        const buttonSee = document.createElement("button");
        buttonSee.textContent = "VOIR";
        buttonSee.className = "button lookPDF";
        buttonSee.onclick = () => downloadCertificate(rowData.id);

        const buttonAccept = document.createElement("button");
        buttonAccept.textContent = "ACCEPTER";
        buttonAccept.className = "button accept";
        buttonAccept.onclick = () => acceptCertificate(rowData.id);

        const buttonRefuse = document.createElement("button");
        buttonRefuse.textContent = "REFUSER";
        buttonRefuse.className = "button refuse";
        buttonRefuse.onclick = () => downloadCertificate(rowData.id);

        td.innerHTML = "";
        td.appendChild(buttonSee);
        td.appendChild(buttonAccept);
        td.appendChild(buttonRefuse);
      },
    },
  ];

  const columnsUsers = [
    { data: "email" },
    { data: "username" },
    {
      data: null,
      render: function (row: any) {
        if (row.roles[0] == "ROLE_ADMIN") {
          return "Administrateur";
        } else if (row.roles[0] == "ROLE_CERTIFIED") {
          return "Utilisateur Certifié";
        } else {
          return "Utilisateur";
        }
      },
    },
  ];

  const options = {
    responsive: true,
    expandableRows: true,
    language: language,
  };

  return (
    <>
      <Header />
      <main className="administration">
        <div className="infosContainer">
          <section className="categorie">
            <h2>Certificats en attente</h2>
          </section>
          <div className="dataTableContainer">
            {!loadingStateUserCertificate && (
              <DataTable
                data={allUserToCertificate}
                columns={columnsCertificate}
                options={options}
                className="display"
              >
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Nom</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </DataTable>
            )}
          </div>
          {loadingStateUserCertificate && (
            <FontAwesomeIcon icon={faSpinner} spin className="speeeeeen" />
          )}
        </div>

        <div className="infosContainer">
          <section className="categorie">
            <h2>Liste des utilisateurs</h2>
          </section>
          <div className="dataTableContainer">
            {!loadingStateUsersList && (
              <DataTable
                data={allUsers}
                columns={columnsUsers}
                options={options}
                className="display"
              >
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Nom</th>
                    <th>Rôle</th>
                  </tr>
                </thead>
              </DataTable>
            )}
          </div>
          {loadingStateUsersList && <FontAwesomeIcon icon={faSpinner} spin className="speeeeeen" />}
        </div>
      </main>
      <Footer />
    </>
  );
}
