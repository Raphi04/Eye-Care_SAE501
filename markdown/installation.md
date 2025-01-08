# Installation du projet Eye-Care
Vous retrouverez ici un guide pour installer le projet Eye-care après qu'il ait été cloné.

Il vous indiquera comment installer les différentes dépendances et comment lancer les serveurs en local.

## Partie Front

- La première chose à faire pour faire fonctionner le front est de créer un fichier `.env` à la racine du dossier *eye-care-front*.
- Ensuite veuillez écrire la ligne suivante dans le fichier :

`VITE_API_URL="http://localhost:8000"`

- Ouvrez un terminal dans **Visual Studio Code** et aller dans le dossier *eye-care-front* à l'aide de la commande suivante :

`cd chemin_vers_le_dossier/eye-care-front`

- Installer les dépendances du front avec la commande : 

`npm install`

- Lancer le server avec la commande :

 `npm run dev`

 - Si tout s'est bien déroulé, le front devrait être fonctionnel.

## Parti Back

- Pour commencer, il vous faudra lancer votre **XAMPP/WAMP/MAMP** pour que le back puisse utiliser la base de donnée.

- Ouvrez un terminal dans **Visual Studio Code** et aller dans le dossier *eye-care-api* à l'aide de la commande suivante :

`cd chemin_vers_le_dossier/eye-care-api`

- Installer les dépendances du front avec la commande : 

`composer install`

- Créer la base de données en utilisant cette commande : 

`php/bin doctrine:database create`

- Migrer la base de données : 

`php/bin doctrine:migration migrate`

- Chargement des données initiales dans la base de données : 

`php bin/console doctrine:fixtures:load`

- Lancer le server avec la commande :

 `symfony server:start`

 - Si tout s'est bien déroulé, le back devrait être fonctionnel.
