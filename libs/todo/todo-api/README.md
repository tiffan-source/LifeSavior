# Todo API (todo-api)

## 📍 Rôle

Fournit les **Controllers NestJS**, les **Presenters** et les **Filters** pour exposer les use cases via une API REST avec gestion d'erreurs typée.

## 📦 Contenu Clé

### Controllers
- **TodoController** : Endpoints `/todos` (GET, POST, PUT, DELETE)
  - Injecte les use cases via tokens
  - Utilise `TodoPresenter` pour la transformation et gestion d'erreur
- **LabelController** : Endpoints `/labels` (GET, PUT)
  - Injecte les use cases via tokens
  - Utilise `LabelPresenter` pour la transformation et gestion d'erreur

### Presenters
- **TodoPresenter** : Transforme les Todos en DTOs et gère les erreurs métier
- **LabelPresenter** : Transforme les Labels en DTOs et gère les erreurs métier

### Exception Filters
- **BusinessErrorFilter** : Mappe les erreurs métier (CoreError) en réponses HTTP typées

### DTOs
- **TodoResponseDto** / **CreateTodoDto** : Contrats pour les todos
- **LabelResponseDto** / **EditLabelDto** : Contrats pour les labels

### Module
- **TodoModule** : Configuration NestJS, injection de dépendance des use cases

## 🚀 Utilisation

```typescript
import { TodoModule } from '@org/todo-api';

@Module({
  imports: [TodoModule],
})
export class AppModule {}
```

## 🛡️ Gestion des Erreurs

Les erreurs métier sont automatiquement mappées en réponses HTTP :

| Erreur Métier | Status HTTP | Code |
| --- | --- | --- |
| `InvalidTodoTitleError` | 400 | `INVALID_TODO_TITLE` |
| `TodoNotFoundError` | 404 | `TODO_NOT_FOUND` |
| `LabelNotFoundError` | 404 | `LABEL_NOT_FOUND` |

**Exemple de réponse d'erreur :**
```json
{
  "statusCode": 404,
  "code": "TODO_NOT_FOUND",
  "message": "Todo with ID xyz not found",
  "timestamp": "2026-01-26T22:30:00.000Z"
}
```

## 🏗️ Architecture

Pattern **Controller-Presenter-Exception Filter** :

```
Request HTTP
    ↓
Controller (Reçoit le DTO)
    ↓
Use Case (Exécute la logique métier)
    ↓
Presenter (Transforme le résultat ou l'erreur)
    ↓
Exception Filter (Mappe en réponse HTTP)
    ↓
Response HTTP
```

## Notes Architecturales

- **Interface Adapters** : Les controllers et presenters traduisent les DTOs HTTP en requêtes de Use Case
- **DIP** : Les use cases sont injectés via tokens, pas via instances concrètes
- **Error Handling** : Les erreurs métier sont catchées et converties en réponses HTTP sémantiques
