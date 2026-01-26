# Todo Business Protocol

## 📍 Rôle (What)
Définit les contrats (Use Cases & Ports) pour la gestion métier des tâches (Todo).
C'est la couche d'abstraction pure : aucune dépendance vers l'implémentation logique ou l'infrastructure.

## 📦 Contenu Clé (Inside)

### Use Cases
- `ICreateTodoUseCase` : Création de tâche avec gestion des labels (existants ou volée).
- `IGetAllTodoUseCase` : Récupération des tâches avec filtres optionnels.
- `IEditTodoUseCase` : Mise à jour d'une tâche (titre, description, statut, labels).
- `IDeleteTodoUseCase` : Suppression d'une tâche par son ID.

### Ports (Infrastructure)
- `ITodoRepository` : Persistance des tâches.
- `ILabelRepository` : Recherche et persistance des labels.

### Tokens (DI)
- `TODO_TOKENS` : Clés d'injection pour les ports.

### Erreurs
- `TodoNotFoundError` : Levée quand une tâche à supprimer n'existe pas.
- `LabelNotFoundError` : Levée quand les labels demandés n'existent pas.

## 🚀 Usage Rapide

```typescript
// Injection
constructor(@Inject(TODO_TOKENS.DELETE_TODO_USECASE) private useCase: IDeleteTodoUseCase) {}

// Appel
await this.useCase.execute({
  id: 'todo-id-to-delete'
});
```
