# Instructions Copilot - Error Handling & Mapping Strategy

Ce document définit la gestion typée des erreurs pour garantir le découplage total entre les couches.

## 1. Philosophie : "Protocol-Defined Errors"

Les erreurs font partie du contrat. Chaque librairie `*-protocol` doit définir les classes d'erreurs qu'elle est susceptible de lever.
L'objectif est que le consommateur (couche supérieure) puisse catcher une erreur connue sans jamais importer la librairie d'implémentation.

## 2. Hiérarchie des Erreurs (Taxonomie)

### A. Base Commune

Toutes les erreurs doivent hériter d'une classe abstraite `CoreError` (dans `libs/shared/domain`) :

- **message:** Description lisible (pour les logs).
- **code:** Chaîne unique pour le parsing machine (ex: `TODO_TITLE_EMPTY`).
- **metadata:** Objet optionnel pour le contexte (ex: `{ todoId: '123' }`).

### B. Erreurs de Domaine (dans `domain-protocol`)

Liées à la validité de la donnée interne.

- *Exemples :* `InvalidTodoTitleError`, `PastDueDateError`.
- *Trigger :* Levées par les Entités ou les Value Objects.

### C. Erreurs Business / Ports (dans `business-protocol`)

Liées à l'orchestration ou à l'échec d'une dépendance définie par le port.

- *Exemples :* `TodoNotFoundError`, `UserNotAuthorizedError`, `StorageFailureError`.
- *Trigger :* Levées par les Use Cases ou **implémentées par l'Infra**.

## 3. Mécanisme de "Catch & Map" (Conversion)

Une couche ne doit jamais laisser fuiter une erreur d'une couche inférieure inconnue du protocole.

### Règle pour l'Infrastructure

L'infrastructure (ex: Firebase) doit catcher ses propres erreurs techniques et les relancer (throw) sous forme d'erreurs définies dans le **Business Protocol**.

**Exemple Interdit :**

```typescript
// Infra
async save(todo) { await firebase.add(todo); } // Si ça plante, ça throw FirebaseError (Interdit)
```

**Exemple Obligatoire :**

```typescript
// Infra
async save(todo) {
    try {
        await firebase.add(todo);
    } catch (err) {
        // Conversion : FirebaseError -> StorageFailureError (défini dans le protocole)
        throw new StorageFailureError('Impossible de sauver la todo', { cause: err });
    }
}
```

## 4. Consommation par le Presenter (UI)

Le Presenter (Interface Adapter) est le seul autorisé à attraper ces erreurs typées pour les transformer en feedback utilisateur.

```typescript
try {
    await this.useCase.execute();
} catch (e) {
    if (e instanceof InvalidTodoTitleError) {
         this.form.setErrors({ title: 'Titre invalide' });
    } else if (e instanceof StorageFailureError) {
         this.toast.show('Erreur serveur, réessayez plus tard.');
    }
}
```

## 5. Instructions de Génération

Quand tu génères une Entité, un UseCase ou un Port :

1. Demande-toi : "Qu'est-ce qui peut échouer ?"
2. Crée les classes d'erreurs correspondantes dans le dossier `contracts/errors/` de la librairie Protocol.
3. Documente `@throws` dans les interfaces.
