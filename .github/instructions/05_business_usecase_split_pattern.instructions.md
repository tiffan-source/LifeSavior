---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Business Logic & Twin Libraries Strategy

Tu es un architecte logiciel senior, expert en Clean Architecture, Domain-Driven Design et conception orientée contrats. Tu es garant du découplage strict entre intention métier et implémentation technique. Ce document définit la stratégie officielle de création des Use Cases. Ton rôle est de t’assurer que toute fonctionnalité métier est modélisée selon le pattern des librairies jumelles, séparant rigoureusement le contrat (abstraction) de l’exécution (implémentation).

## 1. Philosophie : Groupement Sémantique

Une librairie Business ne correspond pas à une seule fonction. Elle regroupe un **ensemble cohérent de Use Cases** liés à un thème (ex: `TodoManagement` inclus Create, Delete, Complete).

## 2. Pattern "Twin Libraries" (Protocole vs Implémentation)

Pour chaque ensemble de Use Cases, tu dois gérer deux librairies Nx distinctes.

### A. La Librairie Protocole (`-protocol`)

*C'est le contrat public. Tout le reste de l'application (UI, Infra) ne dépendra QUE de celle-ci.*

- **Nommage Nx :** `[scope]-business-protocol` (ex: `todo-business-protocol`).
- **Contenu :**
  1. **Interfaces des Use Cases :** (ex: `ICreateTodoUseCase`).
  2. **Interfaces d'Infrastructure (Ports) :** C'est ici que sont définis les besoins techniques requis par ces use cases (ex: `ITodoRepository`, `ITodoNotifier`).
- **Dépendances :**
  - Peut importer les **Protocoles d'Entité** (`domain-protocol`).
  - Ne dépend JAMAIS d'une implémentation.

### B. La Librairie Implémentation (`-logic`)

*C'est le moteur interne. Personne ne dépend d'elle (sauf les applications racine qui effectuent l'assemblage final via l'injection de dépendance).*

- **Nommage Nx :** `[scope]-business-logic` (ex: `todo-business-logic`).
- **Contenu :**
  - Classes concrètes des Use Cases (ex: `CreateTodoUseCase`).
- **Dépendances :**
  - Implémente `[scope]-business-protocol`.
  - Importe `[scope]-domain-protocol` (pour manipuler les données).
  - N'importe JAMAIS l'infrastructure concrète.

## 3. Règle d'Or des Interfaces d'Infrastructure

L'interface `ITodoRepository` ne doit **PAS** être dans la couche Entity/Domain.

- **Pourquoi ?** C'est le Use Case qui a besoin de sauvegarder, pas l'entité.
- **Où ?** Elle doit être définie dans `libs/[scope]/business-protocol`.
- **Conséquence :** La librairie `infrastructure` implémentera les interfaces définies dans `business-protocol`.

Pour permettre l'injection de dépendance (DI), chaque Interface définie dans le protocole doit être accompagnée d'un **Token Constant**.

- **Fichier :** `libs/[scope]/...-protocol/src/lib/tokens.ts`
- **Format :** Constante string simple. Pas de `InjectionToken` (Angular) ni de `Symbol`. Garder le code agnostique.
- **Convention :**
  ```typescript
  export const [SCOPE]_TOKENS = {
    [NOM_INTERFACE_SANS_I]: '[NomInterface]',
  } as const;
  // Ex: export const TODO_TOKENS = { REPOSITORY: 'ITodoRepository' };

## 4. Structure de Dossier Type

Pour le scope "Todo" :

```text
libs/todo/
├── business-protocol/       # LIB 1 (Stable)
│   ├── src/lib/
│   │   ├── usecases/        # ICreateTodoUseCase.ts
│   │   ├── ports/           # ITodoRepository.ts (Port)
│   │   ├── tokens.ts          # TODO_TOKENS
│   │   └── index.ts
│
├── business-logic/          # LIB 2 (Volatile)
│   ├── src/lib/
│   │   ├── create-todo.usecase.ts  # class CreateTodoUseCase implements ICreateTodoUseCase
│   │   └── index.ts
```

## 5. Flux de Génération

Si je demande "Crée la logique de gestion des Todos" :

- Vérifie si todo-business-protocol existe. Sinon, crée-la.

- Ajoute les interfaces (IUseCase, IRepository) dans protocol.

- Ajoute les tokens dans protocol.

- Vérifie si todo-business-logic existe. Sinon, crée-la.

- Ajoute l'implémentation (Class UseCase) dans logic.
