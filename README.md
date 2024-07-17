# Algorithme de placement d'événements dans un calendrier

Ce projet implémente une solution pour positionner des événements dans un calendrier sans chevauchements visuels, tout en maximisant l'utilisation de l'espace disponible.

## Problème

Le problème consiste à rendre des événements sur un calendrier en respectant deux contraintes principales :
1. Les événements qui se chevauchent doivent avoir la même largeur.
2. Chaque événement doit utiliser la largeur maximale disponible tout en satisfaisant la première contrainte.

## Solution

La solution utilise un algorithme de balayage (sweep line algorithm) pour traiter efficacement les événements et déterminer leur placement optimal. Voici les étapes principales de l'algorithme :

1. **Création des points** : Pour chaque événement, on crée deux points : un pour le début et un pour la fin.

2. **Tri des points** : Tous les points sont triés par ordre chronologique. En cas d'égalité, les points de début sont placés avant les points de fin.

3. **Balayage** : On parcourt les points triés de haut en bas (chronologiquement), en maintenant une liste d'événements actifs.

4. **Attribution des colonnes** : Pour chaque point de début, on attribue la première colonne disponible à l'événement.

5. **Calcul de la largeur** : La largeur de chaque événement est déterminée par le nombre maximum d'événements se chevauchant pendant sa durée.

6. **Mise à jour des largeurs** : À chaque point (début ou fin), on met à jour la largeur maximale pour tous les événements actifs qui se chevauchent.

## Implémentation

L'implémentation principale se trouve dans le hook `useEventProcessing`. Ce hook prend en entrée un tableau d'événements et renvoie un tableau d'événements traités avec leurs propriétés de positionnement et de dimensionnement calculées.

Les fonctions clés sont :
- `createSortedPoints` : Crée et trie les points de début et de fin.
- `processPoints` : Traite les points pour déterminer la disposition des événements.
- `findAvailableColumn` : Trouve une colonne disponible pour un nouvel événement.
- `overlapsWith` : Vérifie si deux événements se chevauchent.
- `createProcessedEvents` : Crée les événements traités avec leur position et largeur calculées.

# Démarrage du Projet ReactJS

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Node.js (version 12 ou supérieure)
- npm (version 6 ou supérieure)

## Installation

1. **Cloner le dépôt**

    ```sh
    git clone https://github.com/jacquesbagui/calendar-app.git
    cd calendar-app
    ```

2. **Installer les dépendances**

    ```sh
    npm install
    ```

## Lancer le Projet

1. **Démarrer le serveur de développement**

    ```sh
    npm start
    ```

    Cela lancera l'application sur `http://localhost:3000`.