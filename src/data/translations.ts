
export const translations: Record<string, Record<string, string>> = {
  // Language names
  language_ro: { ro: 'Română', en: 'Romanian', hu: 'Román', de: 'Rumänisch', es: 'Rumano', fr: 'Roumain', it: 'Rumeno', ru: 'Румынский' },
  language_en: { ro: 'Engleză', en: 'English', hu: 'Angol', de: 'Englisch', es: 'Inglés', fr: 'Anglais', it: 'Inglese', ru: 'Английский' },
  language_hu: { ro: 'Maghiară', en: 'Hungarian', hu: 'Magyar', de: 'Ungarisch', es: 'Húngaro', fr: 'Hongrois', it: 'Ungherese', ru: 'Венгерский' },
  language_de: { ro: 'Germană', en: 'German', hu: 'Német', de: 'Deutsch', es: 'Alemán', fr: 'Allemand', it: 'Tedesco', ru: 'Немецкий' },
  language_es: { ro: 'Spaniolă', en: 'Spanish', hu: 'Spanyol', de: 'Spanisch', es: 'Español', fr: 'Espagnol', it: 'Spagnolo', ru: 'Испанский' },
  language_fr: { ro: 'Franceză', en: 'French', hu: 'Francia', de: 'Französisch', es: 'Francés', fr: 'Français', it: 'Francese', ru: 'Французский' },
  language_it: { ro: 'Italiană', en: 'Italian', hu: 'Olasz', de: 'Italienisch', es: 'Italiano', fr: 'Italien', it: 'Italiano', ru: 'Итальянский' },
  language_ru: { ro: 'Rusă', en: 'Russian', hu: 'Orosz', de: 'Russisch', es: 'Ruso', fr: 'Russe', it: 'Russo', ru: 'Русский' },

  // Game interface
  select_language: { ro: 'Selectează limba', en: 'Select Language', hu: 'Válassz nyelvet', de: 'Sprache wählen', es: 'Seleccionar idioma', fr: 'Choisir la langue', it: 'Seleziona lingua', ru: 'Выбрать язык' },
  even_odd_game: { ro: 'Jocul Par-Impar', en: 'Even-Odd Game', hu: 'Páros-Páratlan Játék', de: 'Gerade-Ungerade Spiel', es: 'Juego Par-Impar', fr: 'Jeu Pair-Impair', it: 'Gioco Pari-Dispari', ru: 'Игра Четное-Нечетное' },
  
  // Levels
  beginner_level: { ro: 'Nivel Începător', en: 'Beginner Level', hu: 'Kezdő Szint', de: 'Anfänger Niveau', es: 'Nivel Principiante', fr: 'Niveau Débutant', it: 'Livello Principiante', ru: 'Уровень Начинающий' },
  intermediate_level: { ro: 'Nivel Interactiv', en: 'Interactive Level', hu: 'Interaktív Szint', de: 'Interaktives Niveau', es: 'Nivel Interactivo', fr: 'Niveau Interactif', it: 'Livello Interattivo', ru: 'Интерактивный Уровень' },
  advanced_level: { ro: 'Nivel Avansat', en: 'Advanced Level', hu: 'Haladó Szint', de: 'Fortgeschrittenes Niveau', es: 'Nivel Avanzado', fr: 'Niveau Avancé', it: 'Livello Avanzato', ru: 'Продвинутый Уровень' },
  pro_level: { ro: 'Nivel PRO', en: 'PRO Level', hu: 'PRO Szint', de: 'PRO Niveau', es: 'Nivel PRO', fr: 'Niveau PRO', it: 'Livello PRO', ru: 'ПРО Уровень' },

  // Numbers and math
  even: { ro: 'Par', en: 'Even', hu: 'Páros', de: 'Gerade', es: 'Par', fr: 'Pair', it: 'Pari', ru: 'Четное' },
  odd: { ro: 'Impar', en: 'Odd', hu: 'Páratlan', de: 'Ungerade', es: 'Impar', fr: 'Impair', it: 'Dispari', ru: 'Нечетное' },
  happy_number: { ro: 'Număr Vesel', en: 'Happy Number', hu: 'Boldog Szám', de: 'Fröhliche Zahl', es: 'Número Feliz', fr: 'Nombre Joyeux', it: 'Numero Felice', ru: 'Счастливое Число' },
  sad_number: { ro: 'Număr Trist', en: 'Sad Number', hu: 'Szomorú Szám', de: 'Traurige Zahl', es: 'Número Triste', fr: 'Nombre Triste', it: 'Numero Triste', ru: 'Грустное Число' },

  // Feedback messages
  almost_there: { ro: 'Ai fost aproape! Încearcă din nou.', en: 'Almost there! Try again.', hu: 'Majdnem sikerült! Próbáld újra.', de: 'Fast geschafft! Versuch\'s nochmal.', es: 'Casi lo tienes! Inténtalo de nuevo.', fr: 'Presque réussi! Essaie encore.', it: 'Quasi fatto! Prova ancora.', ru: 'Почти получилось! Попробуй еще раз.' },
  great_job: { ro: 'Bravo! Răspuns corect!', en: 'Great job! Correct answer!', hu: 'Szuper! Helyes válasz!', de: 'Großartig! Richtige Antwort!', es: '¡Genial! ¡Respuesta correcta!', fr: 'Excellent! Bonne réponse!', it: 'Ottimo! Risposta corretta!', ru: 'Отлично! Правильный ответ!' },
  oops_no_pair: { ro: 'OOPS! Nu are pereche. E puțin trist, pentru că nu are cu cine să țină de mână, dar poți fi tu prietenul lui!', en: 'OOPS! No pair. It\'s a bit sad because it has no one to hold hands with, but you can be its friend!', hu: 'Hoppá! Nincs párja. Kicsit szomorú, mert nincs kivel kézen fogva járnia, de te lehetsz a barátja!', de: 'Hoppla! Kein Paar. Es ist etwas traurig, weil es niemanden hat, mit dem es Händchen halten kann, aber du kannst sein Freund sein!', es: '¡Ups! No tiene pareja. Está un poco triste porque no tiene con quién tomarse de la mano, ¡pero puedes ser su amigo!', fr: 'Oups! Pas de paire. Il est un peu triste car il n\'a personne avec qui se tenir la main, mais tu peux être son ami!', it: 'Ops! Nessuna coppia. È un po\' triste perché non ha nessuno con cui tenere per mano, ma puoi essere tu il suo amico!', ru: 'Упс! Нет пары. Немного грустно, потому что не с кем держаться за руки, но ты можешь быть его другом!' },

  // Game controls
  start: { ro: 'Începe', en: 'Start', hu: 'Kezdés', de: 'Start', es: 'Comenzar', fr: 'Commencer', it: 'Inizia', ru: 'Начать' },
  pause: { ro: 'Pauză', en: 'Pause', hu: 'Szünet', de: 'Pause', es: 'Pausa', fr: 'Pause', it: 'Pausa', ru: 'Пауза' },
  restart: { ro: 'Restart', en: 'Restart', hu: 'Újraindítás', de: 'Neustart', es: 'Reiniciar', fr: 'Redémarrer', it: 'Riavvia', ru: 'Перезапуск' },
  back: { ro: 'Înapoi', en: 'Back', hu: 'Vissza', de: 'Zurück', es: 'Atrás', fr: 'Retour', it: 'Indietro', ru: 'Назад' },
  
  // Progress and scoring
  score: { ro: 'Scor', en: 'Score', hu: 'Pontszám', de: 'Punkte', es: 'Puntuación', fr: 'Score', it: 'Punteggio', ru: 'Счет' },
  time: { ro: 'Timp', en: 'Time', hu: 'Idő', de: 'Zeit', es: 'Tiempo', fr: 'Temps', it: 'Tempo', ru: 'Время' },
  lives: { ro: 'Vieți', en: 'Lives', hu: 'Életek', de: 'Leben', es: 'Vidas', fr: 'Vies', it: 'Vite', ru: 'Жизни' },

  // Game rules
  can_you_split: { ro: 'Poți să împarți acest număr în două grupe egale?', en: 'Can you split this number into two equal groups?', hu: 'Tudod két egyenlő csoportra osztani ezt a számot?', de: 'Kannst du diese Zahl in zwei gleiche Gruppen teilen?', es: '¿Puedes dividir este número en dos grupos iguales?', fr: 'Peux-tu diviser ce nombre en deux groupes égaux?', it: 'Puoi dividere questo numero in due gruppi uguali?', ru: 'Можешь ли ты разделить это число на две равные группы?' },
  
  // Place value
  hundreds: { ro: 'Sute', en: 'Hundreds', hu: 'Százak', de: 'Hunderter', es: 'Centenas', fr: 'Centaines', it: 'Centinaia', ru: 'Сотни' },
  tens: { ro: 'Zeci', en: 'Tens', hu: 'Tízek', de: 'Zehner', es: 'Decenas', fr: 'Dizaines', it: 'Decine', ru: 'Десятки' },
  units: { ro: 'Unități', en: 'Units', hu: 'Egységek', de: 'Einer', es: 'Unidades', fr: 'Unités', it: 'Unità', ru: 'Единицы' },
  thousands: { ro: 'Mii', en: 'Thousands', hu: 'Ezrek', de: 'Tausender', es: 'Miles', fr: 'Milliers', it: 'Migliaia', ru: 'Тысячи' },
  millions: { ro: 'Milioane', en: 'Millions', hu: 'Milliók', de: 'Millionen', es: 'Millones', fr: 'Millions', it: 'Milioni', ru: 'Миллионы' },

  group_1: { ro: 'Grupa 1', en: 'Group 1', hu: '1. Csoport', de: 'Gruppe 1', es: 'Grupo 1', fr: 'Groupe 1', it: 'Gruppo 1', ru: 'Группа 1' },
  group_2: { ro: 'Grupa 2', en: 'Group 2', hu: '2. Csoport', de: 'Gruppe 2', es: 'Grupo 2', fr: 'Groupe 2', it: 'Gruppo 2', ru: 'Группа 2' }
};
