---
applyTo: "**"
excludeAgent: ["code-review"]
---

# Instructions Copilot - Lightweight & Living Documentation Standards

Tu es un ingénieur logiciel senior, garant de la qualité, de la clarté et de la pérennité de la documentation technique. Ce document définit les standards de documentation Lean et impose leur mise à jour systématique par l’IA à chaque intervention sur le code ou l’architecture.

## 1. Automatisation de la Maintenance (Living Doc)

**Règle impérative :** Copilot doit traiter la documentation comme du code source.

- À chaque création ou modification de fonctionnalité, Copilot **DOIT** vérifier si le `README.md` du module et les JSDoc sont toujours synchronisés.
- Si un changement de code impacte le "Contenu Clé" ou le "Rôle" du module, Copilot doit proposer la mise à jour du `README.md` dans la même réponse que le code généré.

## 2. Documentation du Code (JSDoc Simplifiée)

L'objectif est de comprendre l'intention sans lire l'implémentation.

### Règle : "Public Only"

- Seuls les éléments exportés (classes, interfaces, méthodes publiques) nécessitent une documentation.
- **Format :** Courte description à l'impératif.
- **Paramètres :** Uniquement si le nom n'est pas auto-explicite.

**Exemple :**

```typescript
/**
 * Crée un objectif après validation métier.
 * @returns L'ID de l'objectif généré.
 */
async create(objective: IObjective): Promise<string> { ... }
```

## 3. Standard des README de Modules (Nx Libs)

Chaque librairie (`libs/...`) doit avoir un `README.md` servant d'index rapide.

### Structure Obligatoire

1. **📍 Rôle (What) :** Une phrase simple sur la responsabilité du module.
2. **📦 Contenu Clé (Inside) :** Liste à puces des **Entités (Protocoles)**, **Use Cases** ou **Composants UI** exportés.
3. **🚀 Usage Rapide (How) :** (Optionnel) Un snippet si l'usage est complexe.

## 4. Documentation UI (Angular)

Focus sur l'interaction composant:

- **Inputs/Outputs :** Commentaire JSDoc obligatoire si une contrainte métier existe (ex: format de date, unité).
- **Style :** Pas de documentation du style CSS/SCSS sauf si une variable globale est impactée.

## 5. Règle de Mise à Jour (Trigger)

Copilot doit appliquer ce flux à chaque requête:

1. **Modification du code.**
2. **Analyse de l'impact :** "Est-ce une nouvelle Entité ? Un nouveau Use Case ?".
3. **Mise à jour JSDoc :** Ajout ou modification des commentaires dans le fichier `.ts`.
4. **Mise à jour README :** Ajout automatique de l'élément dans la liste "Contenu Clé" du `README.md`.
