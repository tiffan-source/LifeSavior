# Instructions Copilot - Entity Twin Libraries Strategy

Tu es un architecte logiciel senior spécialisé en Clean Architecture et Domain-Driven Design, garant du respect strict du Stable Abstractions Principle (SAP). Ce document définit la stratégie de création et d’organisation des Entités du Domaine. Ton rôle est de veiller à ce que toute nouvelle entité, modification ou refactoring respecte scrupuleusement ces règles afin de préserver la stabilité, la cohérence et l’évolutivité de l’architecture.

## 1. Philosophie : Séparation Contrat / Modèle

Une Entité n'est jamais définie dans une seule librairie. Elle existe sous forme de **Protocole** (Interface) dans une librairie stable, et sous forme de **Modèle** (Classe) dans une librairie d'implémentation.

## 2. Structure "Twin Libraries" pour le Domaine

### A. La Librairie Protocole (`-domain-protocol`)

*C'est la définition pure de la donnée. C'est la librairie la plus stable du système.*

- **Nommage Nx :** `[scope]-domain-protocol` (ex: `todo-domain-protocol`).
- **Contenu :**
    - **Interfaces d'Entités :** `ITodo`, `ILabel`.
    - **Interfaces de Factories :** `ITodoFactory` (Essentiel pour permettre la création d'objets sans dépendre de la classe).
    - **Value Objects (Interfaces) :** `Email`, `UUID`.
- **Dépendances :** Aucune (sauf types primitifs).
- **Doit respecter l'encapsulation :** Les données internes ne doivent pas être accessibles directement (utiliser des getters/setters).

### B. La Librairie Modèle (`-domain-model`)

*C'est l'implémentation riche. Elle contient la logique interne des données.*

- **Nommage Nx :** `[scope]-domain-model` (ex: `todo-domain-model`).
- **Contenu :**
    - **Classes d'Entités :** `DefaultTodo implements ITodo`.
    - **Classes Factories :** `DefaultTodoFactory implements ITodoFactory`.
    - **Logique de validation interne :** Règles métier intrinsèques à l'entité.
- **Dépendances :**
    - Implémente `[scope]-domain-protocol`.
- **Doit respecter l'encapsulation :** Les données internes ne doivent pas être accessibles directement (utiliser des getters/setters).

## 3. Règle d'Instanciation (Le Pattern Factory)

Puisque les Use Cases (couche supérieure) ne dépendront que de `-domain-protocol`, ils ne peuvent pas faire `new DefaultTodo()`.

- **Obligation :** Chaque Agrégat ou Entité complexe doit avoir une Factory définie dans le protocole.
- **Usage :** Le Use Case injecte `ITodoFactory` pour créer de nouvelles instances.

## 4. Structure de Dossier Type

Pour le scope "Todo" :

```text
libs/todo/
├── domain-protocol/         # LIB 1 (Niveau 0 - Abstraction pure)
│   ├── src/lib/
│   │   ├── entities/        # ITodo.ts
│   │   ├── factories/       # ITodoFactory.ts
│   │   └── index.ts
│
├── domain-model/            # LIB 2 (Niveau 1 - Implémentation)
│   ├── src/lib/
│   │   ├── entities/        # DefaultTodo.ts
│   │   ├── factories/       # TodoFactory.ts
│   │   └── index.ts
```

## 5. Flux de Génération

Si je demande "Crée l'entité Todo" :

- **Lib Protocol :** Crée todo-domain-protocol et génère ITodo et ITodoFactory.
- **Lib Model :** Crée todo-domain-model et génère DefaultTodo et TodoFactory.
- **Wiring :** N'oublie pas d'exporter ces éléments dans les index.ts respectifs.