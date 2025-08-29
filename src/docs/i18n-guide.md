# Ghid de utilizare a sistemului i18n

## Introducere

Acest document descrie cum să utilizați sistemul de internaționalizare (i18n) implementat în aplicația NextWise.

## Utilizare de bază

### 1. Importarea hook-ului useTranslation

```tsx
import { useTranslation } from '@/hooks/useTranslation';
```

### 2. Utilizarea în componente

```tsx
const MyComponent = () => {
  const { t, language, setLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.description')}</p>
    </div>
  );
};
```

### 3. Interpolarea variabilelor

Pentru a interpola variabile în textele traduse, utilizați al doilea parametru al funcției `t`:

```tsx
// În loc de:
t('testRunner.questionProgress').replace('{{current}}', String(currentQuestionIndex + 1))

// Utilizați:
t('testRunner.questionProgress', { current: String(currentQuestionIndex + 1), total: String(totalQuestions) })
```

## Adăugarea de noi traduceri

1. Adăugați cheile de traducere în fișierele JSON din directorul `public/locales/[language].json`
2. Asigurați-vă că adăugați aceeași cheie în toate fișierele de limbă (en.json, ro.json, etc.)
3. Organizați cheile pe categorii (common, header, pages, etc.)

## Bune practici

1. Utilizați întotdeauna hook-ul `useTranslation` în loc de `useLanguage` pentru a beneficia de funcționalitatea de interpolare
2. Evitați hardcodarea textelor în componente
3. Utilizați chei de traducere descriptive și organizate ierarhic (ex: `pages.home.title`)
4. Testați aplicația în toate limbile disponibile pentru a verifica dacă toate textele sunt traduse corect

## Depanare

Dacă o cheie de traducere nu este găsită, sistemul va:
1. Afișa un avertisment în consola de dezvoltare
2. Încerca să găsească cheia în limba de rezervă (engleză)
3. Afișa cheia însăși ca fallback dacă nu este găsită în nicio limbă

## Utilitare disponibile

În directorul `src/utils/i18n` veți găsi utilitare pentru:
- Interpolarea variabilelor
- Verificarea existenței cheilor de traducere
- Găsirea cheilor de traducere lipsă între diferite fișiere de limbă