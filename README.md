# FrontSkeleton



# 🌍 Flag Frontend

## Country Quiz – Angular App

### 🧩 Description

Ce projet est une application **Angular** servant d’interface utilisateur pour le jeu **Country Quiz**.
Elle permet de tester ses connaissances sur les pays du monde à travers un **quiz interactif** connecté à une API Spring Boot.

L’application permet :

* 🏠 de naviguer sur une page d’accueil et une page d’explication des règles,
* 🧑‍💻 de **créer un compte et se connecter** (avec gestion JWT),
* 🎮 de **configurer et jouer à un quiz** (choix du mode et du nombre de questions),
* 🏆 de **consulter le Hall of Fame** (classement des meilleures parties),
* 🛠️ pour les administrateurs : **gérer les scores (suppression de parties)** via un Hall of Fame Admin.

---

## ⚙️ Structure de l’application

L’application est construite en **Angular 17+** et utilise :

* **Angular Router** pour la navigation,
* **HttpClient** pour la communication avec l’API backend,
* **JWT Authentication** pour la gestion des sessions,
* **Services** pour la logique métier (auth, quiz, users, etc.),
* **Components modulaires** pour chaque page ou fonctionnalité.

---

## 🧱 Architecture des pages principales

| Page                         | Description                                                                   | Accès            |
| ---------------------------- | ----------------------------------------------------------------------------- | ---------------- |
| **homeComponent**            | Page d’accueil du jeu, présentation générale                                  | Publique         |
| **rulesComponent**           | Règles du jeu et explication du fonctionnement                                | Publique         |
| **inscriptionComponent**        | Formulaire d’inscription (création de compte utilisateur)                     | Publique         |
| **connexionComponent**           | Formulaire de connexion (récupération du token JWT)                           | Publique         |
| **quiz_choiceComponent**       | Page de paramétrage du quiz (choix du mode, du nombre de questions)           | Authentifié      |
| **quizComponent**            | Interface de jeu : un drapeau est affiché, l’utilisateur doit deviner le pays | Authentifié      |
| **HofComponent**      | Classement général des parties enregistrées                                   | Authentifié      |
| **Hof_admin** | Version admin du Hall of Fame, permet de supprimer des parties                | Admin prochainement |

---

## 🔐 Authentification & Sécurité

L’authentification repose sur un **token JWT** généré par le backend.

* Après connexion, le token est stocké (par exemple dans le `localStorage`).
* Il est ensuite ajouté dans les **headers HTTP** (`Authorization: Bearer <token>`) pour les requêtes protégées.
* Les routes sensibles sont protégées via un **AuthGuard** Angular.

---

## 🌐 Communication avec le backend

Toutes les requêtes passent par le service d’API du front vers le backend Spring Boot :
`http://localhost:8080/api/...`

Exemples :

* `POST /api/auth/register` → inscription
* `POST /api/auth/login` → connexion (retourne le JWT)
* `GET /api/games` → récupération des parties
* `POST /api/games` → sauvegarde d’une partie
* `DELETE /api/games/{id}` → suppression d’une partie (admin)

---

## 🚀 Installation & Lancement

### 🔧 Prérequis

* **Node.js :** https://nodejs.org/en/download
* **npm**
* **Angular :** `npm install -g @angular/cli`
* Le **backend Spring Boot** doit être lancé et accessible (par défaut sur `localhost:8080`)

### 📦 Installation des dépendances

```bash
npm install
```

### ▶️ Lancement du serveur de développement

```bash
npm start
```

puis accéder à :
👉 `http://localhost:4200/`

---

## 🧠 Technologies principales

| Technologie          | Rôle                                                |
| -------------------- | --------------------------------------------------- |
| **Angular**          | Framework principal                                 |
| **TypeScript**       | Langage principal                                   |
| **RxJS**             | Gestion des observables et des requêtes asynchrones |
| **Bootstrap / CSS**  | Mise en forme et responsive design                  |
| **JWT**              | Authentification sécurisée                          |
| **HttpClientModule** | Communication avec l’API backend                    |


---

## 📚 À venir

* [ ] Historique des parties par utilisateur
* [ ] Pagination du Hall of Fame
* [ ] Et bien d'autres améliorations...

---