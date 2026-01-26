# Todo Business Logic

## 📍 Rôle (What)
Implémente la logique métier des use cases de gestion de tâches (Todo).
C'est la "couche applicative" qui orchestre le flux de données entre les entités et les ports du domaine.

## 📦 Contenu Clé (Inside)

### Use Cases Implémentés
- `CreateTodoUseCase` : Création de tâche avec gestion des labels.
- `GetAllTodoUseCase` : Récupération filtrée des tâches.
- `EditTodoUseCase` : Mise à jour d'une tâche.
- `DeleteTodoUseCase` : Suppression d'une tâche par son ID.

### Infrastructure de Test
- `InMemoryTodoRepository` : Fausse repository pour tests unitaires.
- `InMemoryLabelRepository` : Fausse repository de labels.
- `InMemoryTodoFactory` : Factory pour créer des faux todos.
- `FakeTodo`, `FakeLabel` : Modèles en mémoire.

## 🧪 Testing Approach (TDD Strict)
Tous les use cases utilisent :
- **Real Fakes** : Implémentations en mémoire au lieu de mocks frameworks.
- **State Verification** : Vérification de l'état final du système, pas des appels.
- **No External Dependencies** : Tests purs, sans Firebase ou HTTP.

## 🚀 Usage Rapide

```typescript
// Exemple: Suppression d'une tâche
const repo = new InMemoryTodoRepository();
const useCase = new DeleteTodoUseCase(repo);

// Préparer les données
const todo = await repo.save(someTodo);

// Exécuter
await useCase.execute({ id: todo.id });

// Vérifier (state verification)
expect(await repo.findById(todo.id)).toBeUndefined();
```

## 📋 Construction et Tests

```bash
# Build
nx build business-logic

# Tests
nx test business-logic

# Tests with coverage
nx test business-logic --coverage
```
