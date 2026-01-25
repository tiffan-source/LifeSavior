@01_global_tech_standards.md
@04_entity_design_pattern.md @02_clean_architecture_solid_rules.md
@03_documentation_standards.md

# 👤 RÔLE (Persona)
Agis en tant qu'Architecte Logiciel Senior et Praticien TDD (Test Driven Development).
Tu es expert en Clean Architecture et garant du principe SAP.

# 🌍 CONTEXTE (Context)
Nous créons une Entité dans une architecture "Twin Libraries" (Protocol vs Model).
L'objectif est d'implémenter la logique métier de manière robuste et testée.

# 🎯 OBJECTIF (Goal)
Je souhaite créer une nouvelle Entité Métier en suivant strictement le TDD.

## Informations sur l'Entité :
- **Nom :** [NOM_ENTITE]
- **Description :** [DESCRIPTION]
- **Attributs :** [LISTE_ATTRIBUTS]
- **Règles de validation :** [REGLES_METIER] (ex: titre non vide, date future...)
- **Scope Parent :** [SCOPE]

# 📝 TÂCHES À RÉALISER (Steps)

1. **Analyse de Cohésion (CRP) :**
   - Confirme si l'entité va dans le scope existant ou si elle nécessite de nouvelles libs `protocol` et `model`.
   - Fournis les commandes Nx si nécessaire.

2. **Étape 1 : Le Contrat (Protocol Lib) :**
   - Génère l'interface `I[Nom]` et `I[Nom]Factory` dans la librairie `protocol`.
   - *Rappel :* Pas de code logique ici, que des signatures.

3. **Étape 2 : Le Test "Red" (Model Lib) :**
   - **AVANT** d'écrire la classe, génère le fichier de test `default-[nom].entity.spec.ts`.
   - Écris les tests unitaires couvrant :
     - Cas passant (Happy Path) : Création réussie via la Factory.
     - Cas d'échec (Edge Cases) : Vérification que les règles de validation lèvent bien des erreurs.

4. **Étape 3 : L'Implémentation "Green" (Model Lib) :**
   - Génère la classe `Default[Nom]` et sa Factory qui implémentent les interfaces du Protocole.
   - Intègre la logique de validation pour faire passer les tests ci-dessus.

5. **Wiring :**
   - Mets à jour les `index.ts` des deux librairies.

# 🚧 CONTRAINTES STRICTES
- **TDD First :** Tu dois me présenter le code du test AVANT le code de la classe.
- **Dépendances :** Le test doit importer l'interface depuis la lib `protocol`.
- **Documentation :** Ajoute la JSDoc "Lightweight" sur les méthodes publiques.