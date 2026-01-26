---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Interface Adapters & DTO Strategy

Ce document définit la stratégie de découplage entre le monde extérieur (Web, API, CLI) et le cœur de l'application (Use Cases).

## 1. Philosophie : "Le Sas de Décompression"

Le monde extérieur ne parle jamais directement aux Entités ou aux Use Cases.

- **DTO (Data Transfer Object) :** Structure de données stupide (pas de méthode) qui définit le contrat d'entrée/sortie avec l'extérieur.
- **Controller :** Reçoit le DTO d'entrée, le valide, le convertit en Input de Use Case, et exécute.
- **Presenter :** Reçoit le résultat du Use Case (ou l'erreur), et le convertit en DTO de sortie (ou ViewModel pour l'UI).

## 2. Flux de Données Standard

### Sens Montant (Input)

`Extérieur (HTTP/Form)` -> **DTO Input** -> `Controller` -> **UseCase Request** -> `Use Case`

### Sens Descendant (Output)

`Use Case` -> **UseCase Response** -> `Presenter` -> **DTO Output / ViewModel** -> `Extérieur (JSON/HTML)`

## 3. Structure des DTOs

Les DTOs doivent être définis dans la couche Adapter (près du Controller/Presenter) ou dans une librairie partagée (`libs/shared/dtos`) si Client et Serveur partagent le même contrat.

- **Nommage :** `[Action][Entity]Dto` (ex: `CreateTodoDto`, `TodoResponseDto`).
- **Contenu :** Primitifs uniquement (string, number, boolean, array). Pas d'objets métier.

## 4. Rôle du Presenter & Gestion d'Erreur

Le Presenter est responsable de la transformation de la réponse ET des erreurs.

### Pattern de "Branching"

Le Presenter doit intercepter les erreurs typées (définies dans `*-business-protocol`) et les transformer en format compréhensible pour le client.

**Exemple de logique Presenter :**
```typescript
present(result: Result<Todo> | Error): TodoViewModel {
  if (result instanceof InvalidTodoTitleError) {
     return { error: "Le titre est invalide", status: "ERROR" };
  }
  if (result instanceof StorageFailureError) {
     return { error: "Erreur technique", status: "CRITICAL" };
  }
  // Success mapping
  return {
    id: result.id,
    title: result.title.toUpperCase(), // Logique de présentation
    status: "OK"
  };
}
```

## 5. Spécificités par Type d'Application

### A. Application Web (Angular)

- **Controller :** Fusionné avec une `Facade Service`. Il prend les valeurs du Formulaire (DTO) et appelle le Use Case.
- **Presenter :** Une classe (souvent liée aux Signals) qui transforme la donnée brute du Use Case en variables prêtes à afficher (`readonly vm = computed(...)`).

### B. Application Serveur (NestJS / Express)

- **Controller :** Classe décorée (ex: `@Post()`) qui désérialise le JSON en DTO.
- **Presenter :** Convertit le retour du Use Case en réponse HTTP (Status 201 + JSON DTO).

## 6. Génération

Lors de la création d'un Adapter :

1. Définir les **DTOs d'entrée et de sortie**.
2. Créer le **Mapper** (si complexe) ou la méthode de conversion.
3. Implémenter la gestion des erreurs du protocole.
