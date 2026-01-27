# Todo Infrastructure (todo-infra)

## 📍 Rôle

Fournit l'implémentation concrète des contrats définis dans `business-protocol` (Repositories et Factories).

## 📦 Contenu Clé

### Repositories
- **InMemoryTodoRepositoryImpl** : Implémentation en mémoire de `ITodoRepository`
- **InMemoryLabelRepositoryImpl** : Implémentation en mémoire de `ILabelRepository`

### Factories
- **TodoFactoryImpl** : Création de Todos avec génération d'ID
- **LabelFactoryImpl** : Création de Labels avec génération d'ID

## 🚀 Usage

```typescript
import { InMemoryTodoRepositoryImpl, TodoFactoryImpl } from '@org/todo-infra';

// Instanciation
const todoRepo = new InMemoryTodoRepositoryImpl();
const todoFactory = new TodoFactoryImpl();

// Utilisation
const todo = todoFactory.create('My Todo', 'Description', []);
await todoRepo.save(todo);
```

## Notes

- Cette implémentation en mémoire est destinée au **prototypage et tests**.
- Pour la **production**, créer une implémentation avec Firebase/PostgreSQL/etc.
