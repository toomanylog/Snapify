// Fonction pour cliquer sur un élément avec XPath, avec gestion d'erreurs améliorée
function clickElementByXPath(xpath) {
    try {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            // Simuler un comportement plus humain en ajoutant un délai aléatoire avant le clic
            setTimeout(() => {
                // Simuler un mouvement de souris avant le clic (événement mouseover)
                const mouseoverEvent = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                element.dispatchEvent(mouseoverEvent);
                
                // Petit délai avant le clic effectif
                setTimeout(() => {
                    element.click();
                    console.log("Élément cliqué avec succès");
                }, Math.random() * 300 + 50);
            }, Math.random() * 500 + 200);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Erreur lors de la tentative de clic: ", error);
        return false;
    }
}

// Liste des XPath à utiliser
const xpaths = [
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/button',
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]',
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[3]',
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div/ul/li[8]/div',
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button',
];

// Variation des XPath pour rendre le script plus adaptable
const alternativeXpaths = {
    0: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/button', 
        '//button[contains(@class, "camera-enable")]'],
    1: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]', 
        '//button[contains(@class, "capture")]'],
    2: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[3]', 
        '//button[contains(text(), "Envoyer") or contains(@class, "send")]'],
    3: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div/ul/li[8]/div', 
        '//li[contains(@class, "recipient")]'],
    4: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button', 
        '//button[contains(@class, "confirm") or contains(text(), "Confirmer")]']
};

// Variable pour suivre le dernier index traité
let lastProcessedIndex = -1;
// Ajouter un compteur de tentatives pour chaque étape
let attemptCounters = [0, 0, 0, 0, 0];
// Nombre maximum de tentatives avant de passer à l'étape suivante
const MAX_ATTEMPTS = 5;

// Fonction pour cliquer sur les éléments avec un comportement plus naturel
function processNextElement() {
    // Incrémenter l'index avec une vérification de limite
    lastProcessedIndex = (lastProcessedIndex + 1) % xpaths.length;
    
    // Déterminer si nous devons utiliser le XPath principal ou une alternative
    const xpathOptions = alternativeXpaths[lastProcessedIndex] || [xpaths[lastProcessedIndex]];
    
    // Essayer chaque option XPath jusqu'à ce qu'une fonctionne
    let elementClicked = false;
    for (let i = 0; i < xpathOptions.length && !elementClicked; i++) {
        elementClicked = clickElementByXPath(xpathOptions[i]);
    }
    
    if (!elementClicked) {
        console.log(`Élément ${lastProcessedIndex} non trouvé, réessai plus tard`);
        attemptCounters[lastProcessedIndex]++;
        
        // Si nous avons dépassé le nombre maximum de tentatives pour cette étape
        if (attemptCounters[lastProcessedIndex] >= MAX_ATTEMPTS) {
            console.log(`Trop de tentatives pour l'étape ${lastProcessedIndex}, passage à l'étape suivante`);
            // Réinitialiser le compteur pour cette étape
            attemptCounters[lastProcessedIndex] = 0;
            // Passer à l'étape suivante
            lastProcessedIndex = (lastProcessedIndex + 1) % xpaths.length;
        }
    } else {
        // Réinitialiser le compteur de tentatives si le clic a réussi
        attemptCounters[lastProcessedIndex] = 0;
    }
    
    // Programmer le prochain clic avec un délai variable
    const nextDelay = Math.random() * 2000 + 1000; // Délai entre 1-3 secondes
    
    // Ajouter une pause aléatoire occasionnelle pour simuler une distraction humaine
    if (Math.random() < 0.2) { // 20% de chance d'ajouter une pause
        const pauseDuration = Math.random() * 5000 + 2000; // Pause de 2-7 secondes
        console.log(`Courte pause de ${Math.round(pauseDuration/1000)} secondes...`);
        window.processTimeoutId = setTimeout(processNextElement, nextDelay + pauseDuration);
    } else {
        window.processTimeoutId = setTimeout(processNextElement, nextDelay);
    }
}

// Fonction pour vérifier si la page est active
function isPageActive() {
    return !document.hidden;
}

// Fonction principale qui démarre le processus avec un délai initial
function startProcess() {
    // Délai initial aléatoire pour masquer le démarrage automatique
    const initialDelay = Math.random() * 3000 + 1000;
    setTimeout(() => {
        console.log("Démarrage du processus...");
        
        // Vérifier périodiquement si la page est active
        setInterval(() => {
            if (isPageActive()) {
                // Variable globale pour stocker l'ID du timeout
                if (!window.processTimeoutId) {
                    processNextElement();
                }
            } else {
                // Mettre en pause si la page n'est pas active
                if (window.processTimeoutId) {
                    clearTimeout(window.processTimeoutId);
                    window.processTimeoutId = null;
                }
            }
        }, 5000);
    }, initialDelay);
}

// Démarrer le processus
startProcess();
