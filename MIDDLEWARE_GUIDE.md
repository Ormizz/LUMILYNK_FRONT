# Guide du Système de Middleware de Protection

Ce guide explique comment utiliser le système de middleware pour protéger les pages selon le rôle de l'utilisateur.

## Composants Disponibles

### 1. AdminGuard
Protège les pages réservées aux administrateurs (rôle 'tld').

```vue
<template>
  <AdminGuard>
    <!-- Contenu de la page admin -->
    <div>Page d'administration</div>
  </AdminGuard>
</template>

<script setup>
import AdminGuard from '@/components/AdminGuard.vue'
</script>
```

### 2. StudentGuard
Protège les pages réservées aux étudiants (rôle 'std').

```vue
<template>
  <StudentGuard>
    <!-- Contenu de la page étudiant -->
    <div>Page étudiante</div>
  </StudentGuard>
</template>

<script setup>
import StudentGuard from '@/components/StudentGuard.vue'
</script>
```

### 3. RoleGuard (Générique)
Protège les pages selon un rôle spécifique avec des options personnalisables.

```vue
<template>
  <RoleGuard 
    required-role="tld" 
    redirect-to="/connexion"
    custom-message="Cette page nécessite des privilèges d'administrateur"
  >
    <!-- Contenu de la page -->
    <div>Page protégée</div>
  </RoleGuard>
</template>

<script setup>
import RoleGuard from '@/components/RoleGuard.vue'
</script>
```

## Props du RoleGuard

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `required-role` | String | ✅ | - | Rôle requis pour accéder à la page |
| `redirect-to` | String | ❌ | '/connexion' | Route de redirection si non autorisé |
| `custom-message` | String | ❌ | '' | Message personnalisé d'erreur |

## Pages Protégées

### Pages Administrateur (rôle 'tld')
- ✅ `AdminPage.vue` - Dashboard principal
- ✅ `AdminUsers.vue` - Gestion des utilisateurs
- ✅ `AdminLettres.vue` - Gestion des lettres
- ✅ `AdminDocuments.vue` - Gestion des documents
- ✅ `AdminEtudiants.vue` - Gestion des étudiants
- ✅ `AdminPaiements.vue` - Gestion des paiements

### Pages Étudiant (rôle 'std')
- 🔒 `MySpacePage.vue` - Espace personnel (à protéger si nécessaire)
- 🔒 `DocumentPage.vue` - Gestion des documents (à protéger si nécessaire)
- 🔒 `LetterPage.vue` - Gestion des lettres (à protéger si nécessaire)

## Fonctionnement

1. **Vérification automatique** : Le composant vérifie automatiquement le rôle de l'utilisateur au montage
2. **Stockage local** : Les informations utilisateur sont récupérées depuis `localStorage`
3. **Redirection automatique** : Si non autorisé, redirection automatique après 3 secondes
4. **Interface utilisateur** : Affichage d'une page d'erreur avec options de navigation

## Messages d'Erreur

### AdminGuard
- "Vous n'avez pas les autorisations nécessaires pour accéder à cette page."

### StudentGuard
- "Cette page est réservée aux étudiants. Vous serez redirigé vers votre espace d'administration."

### RoleGuard
- **Rôle 'tld'** : "Cette page est réservée aux administrateurs."
- **Rôle 'std'** : "Cette page est réservée aux étudiants."
- **Autre rôle** : "Cette page nécessite le rôle: [ROLE]"

## Redirections

- **Non connecté** → `/connexion`
- **Admin sur page étudiante** → `/admin/dashboard`
- **Étudiant sur page admin** → `/connexion`

## Sécurité

⚠️ **Important** : Ce système de protection est côté client et peut être contourné. Pour une sécurité complète, implémentez également des vérifications côté serveur.

## Exemples d'Utilisation

### Protection d'une page admin
```vue
<template>
  <AdminGuard>
    <div class="admin-dashboard">
      <h1>Dashboard Administrateur</h1>
      <!-- Contenu admin -->
    </div>
  </AdminGuard>
</template>
```

### Protection avec RoleGuard personnalisé
```vue
<template>
  <RoleGuard 
    required-role="tld" 
    redirect-to="/admin/dashboard"
    custom-message="Accès réservé aux administrateurs uniquement"
  >
    <div class="admin-only-content">
      <!-- Contenu réservé aux admins -->
    </div>
  </RoleGuard>
</template>
```

### Protection d'une page mixte
```vue
<template>
  <div>
    <!-- Contenu public -->
    <h1>Page publique</h1>
    
    <!-- Section admin -->
    <AdminGuard>
      <div class="admin-section">
        <h2>Section Administrateur</h2>
      </div>
    </AdminGuard>
    
    <!-- Section étudiant -->
    <StudentGuard>
      <div class="student-section">
        <h2>Section Étudiant</h2>
      </div>
    </StudentGuard>
  </div>
</template>
```

## Maintenance

- Vérifiez régulièrement que les rôles correspondent aux besoins
- Testez les redirections sur différents navigateurs
- Surveillez les erreurs de console liées aux autorisations
- Mettez à jour les messages d'erreur selon les besoins utilisateur


