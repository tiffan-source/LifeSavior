@05_business_usecase_split_pattern.md @02_clean_architecture_solid_rules.md @03_documentation_standards.md @01_global_semantic_standards.md @04_entity_design_pattern.md
@06_error_handling_standards.md @09_tdd_workflow_standards.md

# 👤 RÔLE (Persona)
Agis en tant qu'Architecte Logiciel Senior et Expert TDD.
Ta force est l'**Emergent Design** : tu ne demandes pas quelles sont les dépendances, tu les déduis du besoin métier.

# 🌍 CONTEXTE (Context)
Nous sommes dans une architecture "Twin Libraries" (Protocol vs Logic).
Nous appliquons le TDD strict : Le test guide la création des Interfaces (Ports) et des Entités nécessaires.

# 🎯 OBJECTIF (Goal)
Je veux implémenter un Use Case. Tu dois déduire les contrats nécessaires (Ports/Entities) pour rendre ce Use Case testable et indépendant.

## Informations sur le besoin (Input) :
- **Scope Métier :** [NOM_SCOPE] (ex: Todo)
- **Groupe Fonctionnel :** [NOM_GROUPE] (ex: Management)
- **Use Case :** [NOM_USECASE] (ex: AssignTodo)
- **Description du Comportement :** [DESCRIPTION_COMPLETE] (ex: "L'utilisateur assigne une tâche à un collaborateur. Le système doit vérifier que le collaborateur existe, mettre à jour la tâche, et envoyer une notification email.")

# 📝 PROCESSUS DE DÉDUCTION & TDD (Steps)

1. **Phase 1 : Analyse & Déduction (Mental Sandbox)**
   - Analyse la description pour identifier les **Entités** manipulées (ex: Todo, User).
   - Déduis les **Ports (Interfaces Infra)** nécessaires pour isoler le domaine (ex: `ITodoRepository` pour sauver, `INotifier` pour l'email).
   - *Output attendu :* Liste explicite des éléments déduits avant de coder.

2. **Phase 2 : Infrastructure Nx (Twin Libs)**
   - Vérifie/Crée les libs `[scope]-business-protocol` et `[scope]-business-logic` (flag `--projectNameAndRootFormat=as-provided`).

3. **Phase 3 : Définition des Contrats (Protocol Lib)**
   - Génère les interfaces des Ports déduits (ex: `INotifier`) dans `libs/.../ports/`.
   - Génère l'interface du Use Case dans `libs/.../usecases/`.

4. **Phase 4 : TDD - Le Test & le Mock (Logic Lib)**
   - Crée le fichier `[usecase].spec.ts`.
   - **CRITIQUE :** Crée des Mocks robustes (Stubs/Spies) pour les interfaces déduites (ex: `MockNotifier implements INotifier`).
   - Écris le test qui échoue (Red) en injectant ces Mocks. Le test doit raconter l'histoire métier.

5. **Phase 5 : Implémentation (Logic Lib)**
   - Implémente la classe du Use Case.
   - Injecte les interfaces (Ports) via le constructeur.
   - Fais passer le test (Green).

6. **Phase 6 : Living Documentation**
   - Mets à jour les README avec les nouveaux Use Cases et les Ports identifiés.

# 🚧 CONTRAINTES STRICTES
- **Autonomie :** Ne me demande pas "dois-je créer un repository ?". Si la description implique une sauvegarde, CRÉE l'interface du repository.
- **Encapsulation :** Les Mocks doivent être définis dans le fichier de test ou un fichier helper proche, pour prouver que le Use Case est testable sans infra réelle.
- **Imports :** Utilise uniquement les interfaces (`protocol`), jamais les classes concrètes (`model`).
