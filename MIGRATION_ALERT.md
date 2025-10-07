# Guide de Migration : Remplacer tous les alert()

Ce guide vous aide à remplacer systématiquement tous les `alert()` de votre application par le nouveau système de notification.

## Fichiers déjà migrés ✅

- `src/components/Dashboard/CompLogin.vue`
- `src/components/Dashboard/CompRegister.vue`
- `src/components/Dashboard/LetterForm.vue`
- `src/components/Dashboard/CompHeader.vue`
- `src/pages/AdminLettres.vue`
- `src/pages/AdminDocuments.vue`

## Fichiers à migrer 🔄

### 1. `src/pages/MultiStepForm.vue`

**Rechercher et remplacer :**
```javascript
// AVANT
alert('Erreur pendant la soumission du formulaire')

// APRÈS
if (window.$notify) {
  window.$notify.error('Erreur pendant la soumission du formulaire', 'Erreur de soumission')
}
```

### 2. `src/utils/autoFetch.js`

**Rechercher et remplacer :**
```javascript
// AVANT
alert('Session expirée, veuillez vous reconnecter.')

// APRÈS
if (window.$notify) {
  window.$notify.unauthorized()
}
```

### 3. `public/assets/js/ajax-mail.js`

**Rechercher et remplacer :**
```javascript
// AVANT
$(formMessages).text('Oops! An error occurred and your message could not be sent.')

// APRÈS
if (window.$notify) {
  window.$notify.error('Oops! An error occurred and your message could not be sent.')
}
```

## Script de migration automatique

Vous pouvez utiliser ce script pour remplacer automatiquement tous les `alert()` :

```bash
# Remplacer tous les alert() par des notifications
find src/ -name "*.vue" -exec sed -i '' 's/alert(/if (window.$notify) { window.$notify.info(/g' {} \;
find src/ -name "*.js" -exec sed -i '' 's/alert(/if (window.$notify) { window.$notify.info(/g' {} \;

# Ajouter les accolades fermantes
find src/ -name "*.vue" -exec sed -i '' 's/);/); }/g' {} \;
find src/ -name "*.js" -exec sed -i '' 's/);/); }/g' {} \;
```

## Règles de remplacement

### 1. Messages de succès
```javascript
// AVANT
alert('Opération réussie')

// APRÈS
if (window.$notify) {
  window.$notify.success('Opération réussie')
}
```

### 2. Messages d'erreur
```javascript
// AVANT
alert('Une erreur est survenue')

// APRÈS
if (window.$notify) {
  window.$notify.error('Une erreur est survenue')
}
```

### 3. Messages d'information
```javascript
// AVANT
alert('Information importante')

// APRÈS
if (window.$notify) {
  window.$notify.info('Information importante')
}
```

### 4. Messages d'avertissement
```javascript
// AVANT
alert('Attention, action irréversible')

// APRÈS
if (window.$notify) {
  window.$notify.warning('Attention, action irréversible')
}
```

## Vérification post-migration

Après avoir remplacé tous les `alert()`, vérifiez que :

1. ✅ Aucun `alert(` ne reste dans le code
2. ✅ Toutes les notifications s'affichent correctement
3. ✅ Les messages sont appropriés pour chaque type
4. ✅ Les notifications disparaissent automatiquement
5. ✅ Le système fonctionne sur mobile

## Test de la migration

1. **Lancez l'application** : `npm run serve`
2. **Testez chaque fonctionnalité** qui utilisait des alert()
3. **Vérifiez la page de démo** : `/demo-notifications`
4. **Testez sur mobile** pour vérifier la responsivité

## Messages d'erreur courants

### "Notification component not initialized"
- Le composant n'est pas encore monté
- Utilisez `window.$notify` au lieu de `this.$notify`

### "notify is not defined"
- Importez le service : `import { inject } from 'vue'`
- Injectez-le : `const notify = inject('notify')`

### Notifications qui n'apparaissent pas
- Vérifiez que Font Awesome est chargé
- Vérifiez la console pour les erreurs JavaScript
- Vérifiez que le composant est bien monté dans App.vue

## Amélioration des messages

Profitez de la migration pour améliorer l'UX :

### Avant
```javascript
alert('Erreur')
```

### Après
```javascript
if (window.$notify) {
  window.$notify.error('Impossible de sauvegarder les données', 'Erreur de sauvegarde')
}
```

## Exemples de migration complète

### Formulaire de connexion
```javascript
// AVANT
try {
  await login()
  alert('Connexion réussie')
  redirect()
} catch (error) {
  alert('Erreur de connexion')
}

// APRÈS
try {
  await login()
  if (window.$notify) {
    window.$notify.loginSuccess()
  }
  redirect()
} catch (error) {
  if (window.$notify) {
    window.$notify.loginError('Identifiants incorrects')
  }
}
```

### Upload de fichier
```javascript
// AVANT
try {
  await uploadFile()
  alert('Fichier uploadé avec succès')
} catch (error) {
  alert('Erreur lors de l\'upload')
}

// APRÈS
try {
  await uploadFile()
  if (window.$notify) {
    window.$notify.fileUploaded('Fichier')
  }
} catch (error) {
  if (window.$notify) {
    window.$notify.fileUploadError('Fichier')
  }
}
```

## Bénéfices de la migration

- 🎨 **UX améliorée** : Notifications élégantes au lieu d'alertes basiques
- 📱 **Responsive** : S'adapte à tous les écrans
- ⚡ **Performance** : Pas de blocage de l'interface
- ♿ **Accessibilité** : Support des lecteurs d'écran
- 🔧 **Maintenance** : Code plus propre et maintenable
- 🌍 **Internationalisation** : Facilite la traduction des messages

## Support

Si vous rencontrez des problèmes lors de la migration :

1. Consultez le guide complet : `NOTIFICATION_GUIDE.md`
2. Testez la page de démo : `/demo-notifications`
3. Vérifiez la console pour les erreurs
4. Assurez-vous que tous les composants sont bien importés

La migration vers le système de notification moderne transformera complètement l'expérience utilisateur de votre application !

