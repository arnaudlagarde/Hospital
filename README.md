# Projet 1: Gestion de patients

Le projet 1 vise à aider un hôpital situé en Corrèze à gérer ses patients et à prendre des rendez-vous pour ces derniers.

## Description du concept

L'application est accessible uniquement par l'administrateur, les médecins et les RH de l'hôpital. Voici les différents types d'utilisateurs :

1. Administrateur : a accès à toutes les fonctionnalités de l'application.
2. Médecins : peuvent gérer les traitements des patients, y compris l'ajout ou la suppression de médicaments et les prescriptions (dosage quotidien, etc.). Ils peuvent également communiquer des messages aux patients pour les informer des changements de traitement. Les médecins peuvent également prendre rendez-vous avec leurs patients. Chaque rendez-vous est enregistré dans l'agenda du médecin, après avoir prévenu le patient par message ou par e-mail. Les médecins ont également accès à la liste des patients.
3. RH (Ressources Humaines) : peuvent créer de nouveaux patients en fournissant des informations telles que l'ID, le nom, le prénom, l'âge, le poids, la taille et les traitements en cours (liste des médicaments). Ils peuvent également accéder à la liste des patients.

## Fonctionnalités

- Administrateur :
  - Ajouter, modifier, supprimer et afficher la liste des médecins, RH et patients.

- Médecins :
  - Gérer les traitements des patients : ajouter ou supprimer des médicaments, ajuster les prescriptions, etc.
  - Envoyer des messages aux patients pour les informer des changements de traitement.
  - Prendre rendez-vous avec les patients.

- RH :
  - Créer de nouveaux patients en fournissant des informations requises.
  - Accéder à la liste des patients.

