# LixFlow – Timesheet Management System

## 📌 Description

LixFlow est une application web permettant de gérer le suivi du temps de travail des employés ainsi que les projets, les tâches et les congés au sein d'une organisation.

L’objectif de l’application est de centraliser :

* la gestion des employés
* la gestion des équipes
* la gestion des projets
* la gestion des tâches
* le suivi du temps de travail (Timesheets)
* la gestion des demandes de congés

Cette application facilite la supervision du travail et améliore la productivité des équipes.

---

# 🛠 Technologies utilisées

* **Laravel** – Backend / API PHP
* **React** - Frontend(interfaces utilisateur dynamiques)
* **PHP/MySQL**
* **JavaScript / Blade / HTML / CSS / Tailwind ou Bootstrap**
* **Git & GitHub**
* **Figma** - Design UI

---

# 📂 Structure du projet

```
backend/            → Projet Laravel (API)
  ├─ app/           → Logique de l'application
  ├─ routes/        → Routes API
  ├─ database/      → Migrations et seeders
  └─ public/        → Fichiers publics backend

frontend/           → Projet React
  ├─ src/
      ├─ components/ → Composants réutilisables
      ├─ pages/      → Pages (Login, Dashboard, Listes, Formulaires)
      └─ services/   → Appels API
  └─ public/         → Fichiers publics frontend
```

---

# 🚀 Installation du projet

## 1️⃣ Cloner le repository

```bash
git clone https://github.com/saraalhane/lixflow-timesheet-system.git
cd lixflow-timesheet-system
```

---
## 2️⃣ Backend Laravel
**Installer les dépendances**
cd backend
composer install

**Configurer le fichier .env**
```
Sous Linux / Mac :

cp .env.example .env

Sous Windows :

copy .env.example .env
```
**Générer la clé Laravel**
php artisan key:generate

**Configurer la base de données**

Dans .env :
```
DB_DATABASE=lixflow
DB_USERNAME=root
DB_PASSWORD=
```

**Lancer les migrations**
php artisan migrate

**Démarrer le serveur Laravel (API)**
php artisan serve

API disponible sur : http://127.0.0.1:8000

## 3️⃣ Frontend React
**Installer les dépendances**
cd ../frontend
npm install

**Lancer le serveur de développement React**
npm start

Le frontend sera accessible sur : http://localhost:3000

Le frontend communique avec le backend Laravel via les endpoints API.
---

# 🌿 Structure des branches Git

Le projet utilise une organisation de branches basée sur le workflow suivant :

```
main → version stable du projet
dev  → branche principale de développement
```

Branches fonctionnalités :

```
feature/login
feature/dashboard
feature/employees
feature/teams
feature/projects
feature/tasks
feature/timesheets
feature/leaves
feature/layout
```

Workflow :

```
feature → dev → main
```

---

# 👥 Travail en équipe

Bonnes pratiques :

1. Toujours récupérer les dernières modifications :

```bash
git pull origin dev
```

2. Créer une branche pour chaque fonctionnalité :

```bash
git checkout dev
git checkout -b feature/nom-feature
```

3. Commit et push :

```bash
git add .
git commit -m "Description modification"
git push origin feature/nom-feature
```

4. Créer une **Pull Request vers `dev`**.

---

# 🎨 Design UI

Les maquettes et wireframes du projet sont disponibles sur Figma :

```
Lien Figma : (https://www.figma.com/design/wGBgaH38X4tKY44f4dxb6J/LixFlow---Design?node-id=0-1&t=iYezKcz6FbQtOW6t-1)
```

---

# 📄 Documentation

La documentation du projet est disponible sur Google Drive :

```
Lien Google Drive : (https://drive.google.com/drive/folders/1rtnODwb7VJ7lajPzyfqB-rGY3tcjd7Et?usp=drive_link)
```

---

# 👨‍💻 Auteurs

Projet réalisé dans le cadre d’un projet académique.

* Sara Alhane
* Reda Deroumi

---

# 📜 Licence

Ce projet est réalisé dans un cadre académique.
