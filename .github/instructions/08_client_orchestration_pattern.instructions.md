---
applyTo: "**"
excludeAgent: "code-review"
---

# Instructions Copilot - Client Architecture (UI & Adapters)

Ce document définit la stratégie architecturale pour la construction de **Clients** (Web, Mobile, CLI, Serveur API) consommant le cœur métier.

## 1. Philosophie : "Le Client est un Plugin"

Tout consommateur de l'application est un **Client**. Qu'il soit une page Angular, un écran React Native ou un Controller NestJS. Il doit adapter le Cœur (Core) à ses contraintes via un pattern **Controller - Gateway - Presenter**.

- **Règle d'Or :** La vue (UI) est "Passive". Elle ne prend aucune décision métier.
- **Responsabilité :** Le Client est responsable de l'**Orchestration** (La "Danse") entre l'interaction utilisateur et le Cœur.

## 2. Organisation Nx : "Libs First"

Les applications (`apps/`) sont des coquilles vides. Tout le code réside dans les librairies (`libs/`).

| Type de Lib | Pattern de Nommage | Contenu | Dépendances |
| :--- | :--- | :--- | :--- |
| **Feature UI** | `libs/[scope]/ui-[platform]` | Écrans Connectés (Smart), Routing, Facades. | Business Protocol, Shared UI. |
| **Design System** | `libs/shared/ui-[system]` | Composants Purs (Dumb), Boutons, Inputs. | Aucune (Framework only). |
| **Adapter/Gateway** | `libs/[scope]/adapter-[type]` | Implémentation technique de connexion (HTTP, Local). | Business Protocol, Shared DTOs. |

## 3. Le Pattern d'Orchestration (C-G-P)

Tout client doit implémenter ce trio pour dialoguer avec le métier.

### A. Le Controller (Le Chef d'Orchestre)

C'est celui qui reçoit l'input utilisateur/système et initie l'action.
Point d'entrée de l'interaction (Click, URL change, Init).

- **Web (Angular) :** `Facade`.
- **Web (React) :** `Custom Hook`.
- **Server (Nest) :** `Controller`.
- **Responsabilité :** Convertir l'Input UI en DTO -> Appeler le Gateway -> Gérer les Side Effects UI (Routing, Toast).

### B. Le Gateway (L'Abstraction d'Accès)

C'est le pont vers le "Cœur". Le Controller n'appelle jamais l'implémentation directe. Il appelle une abstraction. Le Controller ne sait jamais si le cœur est local ou distant.

- **Mode Local (Monolithe) :** Appelle directement le UseCase.
- **Mode Remote (API) :** Appelle un `HttpClient`.
- **Responsabilité Critique :** **Réhydratation des Erreurs**. Il doit catcher les erreurs HTTP (400, 404) et les thrower sous forme d'erreurs Métier (`InvalidTitleError`) définies dans le protocole.

### C. Le Presenter (La Stratégie d'État)

Comment le résultat est rendu à la Vue.

- **Mode "Stateful" (Ngrx, Signals) :** Le résultat met à jour un Store global. La vue réagit au Store.
- **Mode "Derived" (TanStack Query, AsyncPipe) :** Le résultat est retourné directement (Promise/Observable) et transformé par un sélecteur (`map/select`).

## 4. Implémentation par Framework

### Cas Angular (Facade Pattern)

Utiliser une classe `Facade` injectée.

```typescript
@Injectable()
export class TodoFacade {
    // Injection du Gateway via Token (DIP)
    private gateway = inject<ITodoGateway>(TODO_GATEWAY_TOKEN);
    private store = inject(TodoStore); // State

    // ViewModels
    readonly todos = computed(() => this.store.todos());

    async add(title: string) {
        this.store.setLoading(true);
        try {
            // Appel Gateway
            const result = await this.gateway.create({ title });
            // Update Store
            this.store.add(result);
        } catch (e) {
            // Error Mapping
            if (e instanceof InvalidTitleError) this.store.setError(e.message);
        }
    }
}
```

### Cas React (Hook Pattern)

Utiliser un Custom Hook combinant Query et Mutation.

```typescript
export const useCreateTodo = () => {
    const gateway = useInjection(TODO_GATEWAY_TOKEN);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (title: string) => gateway.create({ title }),
        onSuccess: () => queryClient.invalidateQueries(['todos']),
        onError: (e) => {
            if (e instanceof InvalidTitleError) toast.error(e.message);
        }
    });
};
```

## 5. Stratégie de Partage UI (Multi-Apps)

Si plusieurs applications partagent la même lib `ui-web` mais ont des gestions d'état différentes (ex: App A = Ngrx, App B = TanStack) :

1. **Dans la Lib UI :** Créer une **Abstract Facade** (Classe abstraite). Le composant utilise cette classe.
2. **Dans l'App A :** Créer `NgrxTodoFacade implements TodoFacade` et la provider dans `app.config`.
3. **Dans l'App B :** Créer `QueryTodoFacade implements TodoFacade` et la provider dans `app.config`.

## 6. Workflow de Génération Client

Quand je demande de créer une Feature UI :

1. **Analyser le Contexte :**
     - Framework ? (Angular/React)
     - State Strategy ? (Local, Store, Query)
     - Connexion ? (Directe UseCase ou HTTP Gateway)

2. **Générer les briques :**
     - Créer/Mettre à jour le **Gateway** (`adapter-http` ou `adapter-local`).
     - Créer la **Facade** (Angular) ou le **Hook** (React) avec la logique de mapping d'erreur.
     - Créer le **Composant** (Passive View) qui utilise la Facade/Hook.

3. **Vérifier le Wiring (DI) :**
     - S'assurer que le Gateway est bien injecté via son Token Protocol.
     - S'assurer que la gestion d'erreur couvre les cas du `business-protocol`.
