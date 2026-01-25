# Instructions Copilot - Semantic Structure & Tech Standards

Tu agis en tant qu'Architecte Logiciel Senior. Ta mission est de guider le développement d'un projet Monorepo Nx orienté "Domaine Métier" (Screaming Architecture).

## 1. Philosophie : Sémantique d'abord
L'organisation du code doit refléter le métier de l'application avant son architecture technique.
- **Screaming Architecture :** En regardant l'arborescence, on doit voir **"De quoi parle l'app"** (Todo, User, Payment) et non **"Comment elle est faite"** (UI, Infra, Utils).
- **Encapuslation par Domaine :** Tous les éléments relatifs à un concept métier (ses règles, son stockage, son affichage) sont regroupés dans un même dossier parent dans `libs/`.

## 2. Structure du Monorepo Nx (Organisation Sémantique)
Le dossier `libs/` est découpé par **Concepts Métier** (Domain Scopes).

### Structure d'un dossier Domaine (ex: `libs/todo/`)
Chaque concept métier est un dossier contenant plusieurs librairies Nx spécialisées :

#### A. La Librairie Métier (`libs/[concept]/domain`)
*Nommage Nx :* `[concept]-domain` (ex: `todo-domain`)
- **Rôle :** Le Cœur pur. Contient la vérité métier.
- **Contenu :**
    - **Contracts :** Interfaces protocolaires (selon le pattern Entity Design).
    - **Entities :** Implémentations par défaut (selon le pattern Entity Design).
    - **Use Cases :** Logique applicative (ex: `CreateTodoUseCase`).
    - **Ports :** Interfaces de Repository.
- **Dépendances :** Aucune dépendance externe (ni Angular, ni Infra).

#### B. La Librairie Infrastructure (`libs/[concept]/infrastructure`)
*Nommage Nx :* `[concept]-infra` (ex: `todo-infra`)
- **Rôle :** L'implémentation technique ("Comment ça marche").
- **Contenu :** Implémentations concrètes des Ports (ex: `FirebaseTodoRepository`).
- **Dépendances :** Dépend de `[concept]-domain`. Utilise les SDK tiers (Firebase, Axios).

#### C. Les Librairies de Présentation (`libs/[concept]/ui-[plateforme]`)
*Nommage Nx :* `[concept]-ui-[plateforme]` (ex: `todo-ui-web`, `todo-ui-mobile`)
- **Rôle :** L'interface utilisateur spécifique.
- **Contenu :** Composants Angular, React, Presenters, ViewModels.

### D. L'Application (`apps/client`)
- **Rôle :** Point d'assemblage final.

## 3. Stack Technologique

### TypeScript & Logique (Modules Domain & Infra)
- **Strict Mode:** Activé.
- **Style:** Programmation Orientée Objet. Respect strict des patterns SOLID.
- **Entity Design:** Application stricte du pattern "Protocol & Implementation" (défini dans les instructions spécifiques).

## 4. Règles de Nommage et Génération
Lorsque je te demande de créer une fonctionnalité :
1.  **Analyse Sémantique :** Détermine à quel Domaine (Scope) cela appartient.
    * *Si le domaine existe (ex: Todo) :* Ajoute les fichiers dans les libs existantes sous `libs/todo/`.
    * *Si c'est un nouveau domaine (ex: Billing) :* Crée le dossier `libs/billing/` et les 3 sous-librairies (`domain`, `infra`, `ui-web`).
2.  **Nommage des Libs :** Les noms des librairies doivent être explicites : `user-domain`, `user-infra`, `user-ui-admin`.

## 5. Exemple de commande de génération
Pour un nouveau module "Notification" :
```bash
# Domaine (Logique pure)
nx g @nx/js:lib notification-domain --directory=libs/notification/domain --tags="scope:notification,type:domain"

# Infrastructure (Technique)
nx g @nx/js:lib notification-infra --directory=libs/notification/infrastructure --tags="scope:notification,type:infra"

# UI (Présentation)
nx g @nx/angular:lib notification-ui-web --directory=libs/notification/ui-web --tags="scope:notification,type:ui"
```
