# Todo Business Protocol

## 📍 Rôle (What)
Définit les contrats (Use Cases & Ports) pour la gestion métier des tâches (Todo).
C'est la couche d'abstraction pure : aucune dépendance vers l'implémentation logique ou l'infrastructure.

## 📦 Contenu Clé (Inside)

### Use Cases
- `ICreateTodoUseCase` : Création de tâche avec gestion des labels (existants ou volée).
- `IGetAllTodoUseCase` : Récupération des tâches avec filtres optionnels.
- `IEditTodoUseCase` : Mise à jour d'une tâche (titre, description, statut, labels).

### Ports (Infrastructure)
- `ITodoRepository` : Persistance des tâches.
- `ILabelRepository` : Recherche et persistance des labels.

### Tokens (DI)
- `TODO_TOKENS` : Clés d'injection pour les ports.

## 🚀 Usage Rapide

```typescript
// Injection
constructor(@Inject(TODO_TOKENS.CREATE_TODO_USECASE) private useCase: ICreateTodoUseCase) {}

// Appel
await this.useCase.execute({
  title: 'My Task',
  description: 'Desc',
  labelNames: ['Urgent']
});
```
