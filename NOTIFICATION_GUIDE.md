# Guide d'utilisation du Système de Notification

## Vue d'ensemble

Ce système de notification moderne remplace tous les `alert()` de votre application par des notifications élégantes et personnalisables. Il offre une meilleure expérience utilisateur avec des animations fluides et une gestion intelligente des notifications.

## Fonctionnalités

- ✅ **5 types de notifications** : Success, Error, Warning, Info, Loading
- ✅ **Animations fluides** : Entrée/sortie avec transitions CSS
- ✅ **Auto-destruction** : Disparition automatique après un délai configurable
- ✅ **Notifications persistantes** : Possibilité de garder certaines notifications ouvertes
- ✅ **Barre de progression** : Pour les opérations longues (upload, téléchargement)
- ✅ **Responsive** : S'adapte aux écrans mobiles
- ✅ **Accessibilité** : Support des lecteurs d'écran
- ✅ **Gestion globale** : Service accessible partout dans l'application

## Utilisation

### 1. Dans les composants Vue (Options API)

```javascript
// Accès via this.$notify
export default {
  methods: {
    async handleSubmit() {
      try {
        await this.submitData()
        this.$notify.success('Données envoyées avec succès !')
      } catch (error) {
        this.$notify.error('Erreur lors de l\'envoi')
      }
    }
  }
}
```

### 2. Dans les composants Vue (Composition API)

```javascript
import { inject } from 'vue'

export default {
  setup() {
    const notify = inject('notify')
    
    const handleSubmit = async () => {
      try {
        await submitData()
        notify.success('Données envoyées avec succès !')
      } catch (error) {
        notify.error('Erreur lors de l\'envoi')
      }
    }
    
    return { handleSubmit }
  }
}
```

### 3. Dans les composants Vue (Script Setup)

```javascript
<script setup>
import { inject } from 'vue'

const notify = inject('notify')

const handleSubmit = async () => {
  try {
    await submitData()
    notify.success('Données envoyées avec succès !')
  } catch (error) {
    notify.error('Erreur lors de l\'envoi')
  }
}
</script>
```

### 4. Depuis n'importe où (JavaScript vanilla)

```javascript
// Accès global via window.$notify
if (window.$notify) {
  window.$notify.success('Opération réussie !')
}
```

## Types de notifications

### Notifications de base

```javascript
// Succès
notify.success('Opération réussie !')

// Erreur
notify.error('Une erreur est survenue')

// Attention
notify.warning('Attention, action irréversible')

// Information
notify.info('Voici une information importante')

// Chargement
const loadingId = notify.loading('Traitement en cours...')
// ... plus tard
notify.remove(loadingId)
```

### Notifications avec titre

```javascript
notify.success('Votre profil a été mis à jour', 'Profil mis à jour')
notify.error('Impossible de sauvegarder', 'Erreur de sauvegarde')
```

### Notifications personnalisées

```javascript
notify.custom({
  type: 'info',
  title: 'Titre personnalisé',
  message: 'Message personnalisé',
  duration: 8000,        // Durée en millisecondes
  persistent: false,     // Ne disparaît pas automatiquement
  icon: 'fas fa-star',   // Icône personnalisée
  progress: 50           // Barre de progression (0-100)
})
```

## Méthodes utilitaires métier

### Opérations CRUD

```javascript
notify.created('utilisateur')      // "utilisateur créé avec succès"
notify.updated('profil')           // "profil mis à jour avec succès"
notify.deleted('document')         // "document supprimé avec succès"
```

### Authentification

```javascript
notify.loginSuccess()              // "Connexion réussie"
notify.loginError('Mauvais mot de passe')
notify.logoutSuccess()             // "Déconnexion réussie"
```

### Fichiers

```javascript
notify.fileUploaded('document.pdf')    // "document.pdf téléchargé avec succès"
notify.fileUploadError('image.jpg')    // "Erreur lors du téléchargement de image.jpg"
```

### Paiements

```javascript
notify.paymentSuccess('150€')          // "Paiement de 150€ effectué avec succès"
notify.paymentError('Carte refusée')   // "Erreur lors du traitement du paiement"
```

### Erreurs courantes

```javascript
notify.networkError()              // "Erreur de connexion au serveur"
notify.validationError('Message personnalisé')
notify.unauthorized()              // "Accès non autorisé"
notify.notFound('Utilisateur')     // "Utilisateur introuvable"
```

## Gestion des notifications

### Supprimer une notification spécifique

```javascript
const notificationId = notify.success('Message')
// ... plus tard
notify.remove(notificationId)
```

### Nettoyer toutes les notifications

```javascript
notify.clearAll()
```

### Notifications persistantes

```javascript
notify.custom({
  type: 'warning',
  message: 'Cette notification ne disparaîtra pas',
  persistent: true
})
```

### Barre de progression

```javascript
let progress = 0
const progressId = notify.custom({
  type: 'info',
  title: 'Téléchargement',
  message: 'En cours...',
  progress: progress,
  persistent: true
})

// Mettre à jour la progression
const interval = setInterval(() => {
  progress += 10
  if (progress <= 100) {
    notify.custom({
      id: progressId,
      type: 'info',
      title: 'Téléchargement',
      message: `En cours... ${progress}%`,
      progress: progress,
      persistent: true
    })
  } else {
    clearInterval(interval)
    notify.remove(progressId)
    notify.success('Téléchargement terminé !')
  }
}, 500)
```

## Configuration

### Durée par défaut

```javascript
// Changer la durée par défaut (5 secondes par défaut)
notify.success('Message', '', { duration: 10000 })
```

### Icônes personnalisées

```javascript
notify.custom({
  type: 'info',
  message: 'Message avec icône personnalisée',
  icon: 'fas fa-heart'
})
```

## Remplacement des alert()

### Avant (avec alert)

```javascript
try {
  await submitForm()
  alert('Formulaire envoyé avec succès !')
} catch (error) {
  alert('Erreur lors de l\'envoi')
}
```

### Après (avec notifications)

```javascript
try {
  await submitForm()
  notify.success('Formulaire envoyé avec succès !')
} catch (error) {
  notify.error('Erreur lors de l\'envoi')
}
```

## Test du système

Pour tester le système de notification, visitez la route `/demo-notifications` qui contient tous les exemples d'utilisation.

## Personnalisation des styles

Les styles sont définis dans le composant `NotificationSystem.vue`. Vous pouvez modifier :

- Couleurs des différents types
- Position des notifications
- Animations et transitions
- Taille et espacement
- Icônes par défaut

## Support des navigateurs

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Dépannage

### Les notifications n'apparaissent pas

1. Vérifiez que le composant `NotificationSystem` est bien monté dans `App.vue`
2. Vérifiez que le service est bien initialisé dans `main.js`
3. Vérifiez la console pour les erreurs JavaScript

### Erreur "Notification component not initialized"

Le composant de notification n'est pas encore monté. Utilisez `window.$notify` ou attendez que le composant soit prêt.

### Styles manquants

Vérifiez que Font Awesome est bien chargé pour les icônes.

## Migration depuis alert()

1. **Remplacer** `alert('message')` par `notify.info('message')`
2. **Remplacer** `alert('Succès')` par `notify.success('Succès')`
3. **Remplacer** `alert('Erreur')` par `notify.error('Erreur')`
4. **Adapter** les messages pour une meilleure UX
5. **Tester** chaque remplacement

## Exemples complets

### Gestion d'un formulaire

```javascript
const handleSubmit = async () => {
  const loadingId = notify.loading('Envoi en cours...')
  
  try {
    await submitForm()
    notify.remove(loadingId)
    notify.success('Formulaire envoyé avec succès !')
    resetForm()
  } catch (error) {
    notify.remove(loadingId)
    if (error.status === 422) {
      notify.validationError('Veuillez vérifier les informations')
    } else {
      notify.error('Erreur lors de l\'envoi')
    }
  }
}
```

### Upload de fichier avec progression

```javascript
const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const progressId = notify.custom({
    type: 'info',
    title: 'Upload en cours',
    message: '0%',
    progress: 0,
    persistent: true
  })
  
  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        notify.custom({
          id: progressId,
          type: 'info',
          title: 'Upload en cours',
          message: `${progress}%`,
          progress: progress,
          persistent: true
        })
      }
    })
    
    notify.remove(progressId)
    notify.fileUploaded(file.name)
  } catch (error) {
    notify.remove(progressId)
    notify.fileUploadError(file.name)
  }
}
```

Ce système de notification transforme complètement l'expérience utilisateur de votre application en remplaçant les alertes basiques par des notifications modernes et professionnelles.

