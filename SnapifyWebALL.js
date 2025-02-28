(function () {
    // Création d'une interface utilisateur moderne avec des styles avancés
    const createModernUI = () => {
        // Création d'un conteneur principal avec des styles modernes
        const uiContainer = document.createElement('div');
        uiContainer.id = 'assist-panel';
        Object.assign(uiContainer.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'rgba(33, 33, 33, 0.85)',
            color: '#fff',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            zIndex: '9999',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '220px'
        });
        
        // Ajout d'une barre de titre avec possibilité de déplacement
        const titleBar = document.createElement('div');
        titleBar.innerHTML = '<span>🤖 Assistant</span>';
        Object.assign(titleBar.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            cursor: 'move',
            userSelect: 'none',
            fontSize: '16px',
            fontWeight: 'bold'
        });
        
        // Bouton de réduction
        const minimizeButton = document.createElement('button');
        minimizeButton.textContent = '−';
        Object.assign(minimizeButton.style, {
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0 5px'
        });
        
        // Compteur de clics avec style moderne
        const counter = document.createElement('div');
        counter.innerHTML = '<span>0</span> actions effectuées';
        Object.assign(counter.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            marginBottom: '5px'
        });
        counter.querySelector('span').style.fontWeight = 'bold';
        
        // Conteneur pour les boutons d'action
        const buttonsContainer = document.createElement('div');
        Object.assign(buttonsContainer.style, {
            display: 'flex',
            gap: '10px'
        });
        
        // Création des boutons avec style moderne
        const startButton = createStyledButton('Démarrer', '#4CAF50', '#3d8b40');
        const stopButton = createStyledButton('Arrêter', '#f44336', '#d32f2f');
        stopButton.disabled = true;
        
        // Indicateur d'état
        const statusIndicator = document.createElement('div');
        statusIndicator.textContent = 'En attente';
        Object.assign(statusIndicator.style, {
            padding: '8px 10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            fontSize: '13px',
            textAlign: 'center',
            color: '#aaa'
        });
        
        // Logs des actions récentes
        const logsContainer = document.createElement('div');
        logsContainer.innerHTML = '<div style="font-size:12px;opacity:0.7;margin-bottom:5px">Journaux:</div><div id="action-logs" style="max-height:100px;overflow-y:auto;font-size:11px;color:#bbb"></div>';
        Object.assign(logsContainer.style, {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            padding: '8px',
            marginTop: '5px',
            display: 'none'
        });
        
        // Assemblage de l'interface
        titleBar.appendChild(minimizeButton);
        uiContainer.appendChild(titleBar);
        uiContainer.appendChild(counter);
        buttonsContainer.appendChild(startButton);
        buttonsContainer.appendChild(stopButton);
        uiContainer.appendChild(buttonsContainer);
        uiContainer.appendChild(statusIndicator);
        uiContainer.appendChild(logsContainer);
        document.body.appendChild(uiContainer);
        
        // Rendre l'interface déplaçable
        makeDraggable(uiContainer, titleBar);
        
        // Gestion de l'état minimisé
        let isMinimized = false;
        minimizeButton.addEventListener('click', () => {
            if (isMinimized) {
                uiContainer.style.height = 'auto';
                Array.from(uiContainer.children).forEach((child, index) => {
                    if (index > 0) child.style.display = child.id === 'action-logs' ? 'none' : 'flex';
                });
                minimizeButton.textContent = '−';
            } else {
                Array.from(uiContainer.children).forEach((child, index) => {
                    if (index > 0) child.style.display = 'none';
                });
                uiContainer.style.height = 'auto';
                minimizeButton.textContent = '+';
            }
            isMinimized = !isMinimized;
        });
        
        // Afficher les logs après quelques actions
        let shouldShowLogs = false;
        
        // Toggle pour afficher les logs
        setTimeout(() => {
            const toggleLink = document.createElement('a');
            toggleLink.textContent = 'Afficher les journaux';
            toggleLink.href = '#';
            Object.assign(toggleLink.style, {
                color: '#aaa',
                fontSize: '11px',
                textAlign: 'center',
                display: 'block',
                marginTop: '5px',
                textDecoration: 'none'
            });
            toggleLink.addEventListener('click', (e) => {
                e.preventDefault();
                shouldShowLogs = !shouldShowLogs;
                logsContainer.style.display = shouldShowLogs ? 'block' : 'none';
                toggleLink.textContent = shouldShowLogs ? 'Masquer les journaux' : 'Afficher les journaux';
            });
            uiContainer.appendChild(toggleLink);
        }, 1000);
        
        return {
            startButton,
            stopButton,
            counter,
            statusIndicator,
            logsContainer,
            uiContainer
        };
    };
    
    // Fonction pour créer des boutons stylisés
    function createStyledButton(text, bgColor, hoverColor) {
        const button = document.createElement('button');
        button.textContent = text;
        Object.assign(button.style, {
            flex: '1',
            padding: '10px',
            backgroundColor: bgColor,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.2s, transform 0.1s',
            outline: 'none'
        });
        
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = hoverColor;
        });
        
        button.addEventListener('mouseout', () => {
            if (!button.disabled) button.style.backgroundColor = bgColor;
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.97)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('focus', () => {
            button.style.boxShadow = `0 0 0 2px ${hoverColor}`;
        });
        
        button.addEventListener('blur', () => {
            button.style.boxShadow = 'none';
        });
        
        return button;
    }
    
    // Fonction pour rendre un élément déplaçable
    function makeDraggable(element, handle) {
        let posX = 0, posY = 0, posInitX = 0, posInitY = 0;
        
        handle.addEventListener('mousedown', dragStart);
        
        function dragStart(e) {
            e.preventDefault();
            posInitX = e.clientX;
            posInitY = e.clientY;
            
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', dragEnd);
        }
        
        function dragMove(e) {
            e.preventDefault();
            posX = posInitX - e.clientX;
            posY = posInitY - e.clientY;
            posInitX = e.clientX;
            posInitY = e.clientY;
            
            // Calculer la nouvelle position
            const newTop = element.offsetTop - posY;
            const newLeft = element.offsetLeft - posX;
            const maxTop = window.innerHeight - element.offsetHeight;
            const maxLeft = window.innerWidth - element.offsetWidth;
            
            // Appliquer la nouvelle position avec contraintes pour rester dans l'écran
            element.style.top = Math.min(Math.max(0, newTop), maxTop) + "px";
            element.style.left = Math.min(Math.max(0, newLeft), maxLeft) + "px";
        }
        
        function dragEnd() {
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
        }
    }
    
    // Création de l'interface
    const ui = createModernUI();
    
    // Variables pour gérer l'état du processus de clic
    let isClicking = false;
    let clickCounter = 0;
    let processTimeout = null;
    
    // Fonction pour mettre à jour le compteur
    function updateCounter() {
        clickCounter++;
        const counterSpan = ui.counter.querySelector('span');
        counterSpan.textContent = clickCounter;
        
        // Animation du compteur
        counterSpan.style.transition = 'transform 0.2s ease';
        counterSpan.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterSpan.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Fonction pour réinitialiser le compteur
    function resetCounter() {
        clickCounter = 0;
        ui.counter.querySelector('span').textContent = '0';
    }
    
    // Fonction pour mettre à jour l'indicateur d'état
    function updateStatus(text, isActive = false) {
        ui.statusIndicator.textContent = text;
        ui.statusIndicator.style.backgroundColor = isActive ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 255, 255, 0.1)';
        ui.statusIndicator.style.color = isActive ? '#4CAF50' : '#aaa';
    }
    
    // Fonction pour ajouter un message de log
    function addLog(message) {
        const logs = document.getElementById('action-logs');
        const logEntry = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString();
        logEntry.innerHTML = `<span style="opacity:0.7">${timestamp}</span> ${message}`;
        logs.appendChild(logEntry);
        logs.scrollTop = logs.scrollHeight;
        
        // Limiter le nombre de logs affichés
        if (logs.children.length > 20) {
            logs.removeChild(logs.firstChild);
        }
    }
    
    // Méthodes de détection des éléments
    
    // 1. XPath (méthode principale)
    function getElementByXPath(xpath, contextNode = document) {
        try {
            const result = document.evaluate(
                xpath,
                contextNode,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            );
            return result.singleNodeValue;
        } catch (error) {
            addLog(`Erreur XPath: ${error.message}`);
            return null;
        }
    }
    
    // 2. Sélecteurs CSS (méthode complémentaire)
    function getElementBySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            return null;
        }
    }
    
    // 3. Détection par texte du bouton
    function getButtonByText(text) {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(button => 
            button.textContent.includes(text) || 
            button.innerText.includes(text) ||
            button.getAttribute('aria-label')?.includes(text)
        );
    }
    
    // 4. Détection par attributs
    function getElementByAttribute(attribute, value) {
        return document.querySelector(`[${attribute}*="${value}"]`);
    }
    
    // Fonction pour vérifier si un élément est visible
    function isElementVisible(element) {
        if (!element) return false;
        
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return false;
        }
        
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            return false;
        }
        
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Fonction pour simuler un comportement de clic humain
    async function simulateHumanClick(element) {
        return new Promise((resolve) => {
            if (!element || !isElementVisible(element)) {
                resolve(false);
                return;
            }
            
            try {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Simuler le mouvement de la souris
                const mouseoverEvent = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: centerX,
                    clientY: centerY
                });
                
                element.dispatchEvent(mouseoverEvent);
                
                // Petit délai avant le clic pour que cela semble naturel
                setTimeout(() => {
                    try {
                        // Simuler le clic
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window,
                            clientX: centerX,
                            clientY: centerY
                        });
                        
                        element.dispatchEvent(clickEvent);
                        
                        // Essayer également d'appeler directement la méthode click() comme fallback
                        try {
                            element.click();
                        } catch (e) {
                            // Ignorer cette erreur, on a déjà essayé avec dispatchEvent
                        }
                        
                        updateCounter();
                        
                        // Simuler le mouseout après le clic
                        setTimeout(() => {
                            const mouseoutEvent = new MouseEvent('mouseout', {
                                bubbles: true,
                                cancelable: true,
                                view: window
                            });
                            element.dispatchEvent(mouseoutEvent);
                            resolve(true);
                        }, Math.random() * 150 + 50);
                    } catch (error) {
                        console.error("Erreur lors du clic:", error);
                        resolve(false);
                    }
                }, Math.random() * 300 + 100);
            } catch (error) {
                console.error("Erreur lors de la simulation du clic:", error);
                resolve(false);
            }
        });
    }
    
    // Définition des éléments à trouver avec plusieurs méthodes de détection
    const elementDefinitions = [
        {
            name: "enableCamera",
            description: "Bouton d'activation de la caméra",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/button',
                '/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div/button'
            ],
            selectors: [".camera-enable", "button.primary[type='button']"],
            textContains: ["Activer", "Camera", "Caméra"],
            attributes: [{ name: "aria-label", value: "camera" }]
        },
        {
            name: "captureButton",
            description: "Bouton de capture",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]',
                '/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]'
            ],
            selectors: [".capture-button", "button.capture"],
            textContains: ["Prendre", "Capture", "Photo"],
            attributes: [{ name: "aria-label", value: "capture" }]
        },
        {
            name: "sendButton",
            description: "Bouton d'envoi",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[3]',
                '/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div[2]/div[2]/button[3]'
            ],
            selectors: ["button.send", "button.primary"],
            textContains: ["Envoyer", "Send"],
            attributes: [{ name: "aria-label", value: "send" }]
        },
        {
            name: "recipientElement",
            description: "Sélection du destinataire",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div/ul/li[8]/div',
                '//li[contains(@class, "recipient")]'
            ],
            selectors: ["li.recipient", "div.recipient-item"],
            textContains: ["Destinataire", "Recipient"],
            attributes: [{ name: "role", value: "option" }]
        },
        {
            name: "confirmButton",
            description: "Bouton de confirmation",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button',
                '//button[contains(@class, "confirm") or contains(text(), "Confirmer")]'
            ],
            selectors: ["button.confirm", "button.primary"],
            textContains: ["Confirmer", "Confirm", "OK"],
            attributes: [{ name: "type", value: "submit" }]
        }
    ];
    
    // Ajouter un système de compteur de tentatives et de limite
    let attemptCounters = [0, 0, 0, 0, 0];
    const MAX_ATTEMPTS = 5;
    
    // Recherche avancée avec toutes les méthodes disponibles
    function findElement(elementDef) {
        // 1. Essayer les XPaths
        for (const xpath of elementDef.xpaths) {
            const element = getElementByXPath(xpath);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        
        // 2. Essayer les sélecteurs CSS
        for (const selector of elementDef.selectors) {
            const element = getElementBySelector(selector);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        
        // 3. Essayer de trouver par texte
        for (const text of elementDef.textContains) {
            const element = getButtonByText(text);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        
        // 4. Essayer de trouver par attribut
        for (const attr of elementDef.attributes) {
            const element = getElementByAttribute(attr.name, attr.value);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        
        // 5. Recherche intelligente en dernier recours
        if (elementDef.name === "enableCamera") {
            // Chercher le premier bouton visible dans la page
            const allButtons = Array.from(document.querySelectorAll('button'));
            const firstVisibleButton = allButtons.find(btn => isElementVisible(btn));
            return firstVisibleButton;
        }
        
        return null;
    }
    
    // Fonction pour trouver et cliquer sur des éléments spécifiques (génériquement)
    async function clickAllSpecificElements() {
        const specificButtons = [];
        
        // 1. Chercher spécifiquement les éléments de liste qui ressemblent à des destinataires
        document.querySelectorAll('li[role="option"], li.recipient, li[tabindex="0"]').forEach(li => {
            if (isElementVisible(li)) {
                specificButtons.push(li);
            }
        });
        
        // 2. Chercher des div qui pourraient être des destinataires
        document.querySelectorAll('div[role="option"], div.recipient-item').forEach(div => {
            if (isElementVisible(div)) {
                specificButtons.push(div);
            }
        });
        
        // 3. Chercher tous les boutons avec des icônes SVG (fallback)
        if (specificButtons.length === 0) {
            document.querySelectorAll('button svg, [role="button"] svg').forEach(svg => {
                const button = svg.closest('button') || svg.closest('[role="button"]');
                if (button && isElementVisible(button)) {
                    specificButtons.push(button);
                }
            });
        }
        
        if (specificButtons.length === 0) {
            addLog("Aucun destinataire trouvé");
            return false;
        }
        
        addLog(`${specificButtons.length} destinataires potentiels trouvés`);
        
        // Limiter le nombre de destinataires à cliquer (pour éviter de cliquer sur trop d'éléments)
        const maxToClick = Math.min(3, specificButtons.length);
        
        // Cliquer sur quelques éléments seulement
        for (let i = 0; i < maxToClick; i++) {
            if (!isClicking) return false;
            
            const element = specificButtons[i];
            const clicked = await simulateHumanClick(element);
            
            if (clicked) {
                addLog(`Destinataire ${i+1}/${maxToClick} cliqué`);
            }
            
            await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
        }
        
        return true;
    }
    
    // Fonction principale pour exécuter la séquence de clics
    async function performClicks() {
        if (!isClicking) return;
        
        resetCounter();
        updateStatus("En cours d'exécution...", true);
        
        try {
            // Séquence améliorée avec détection plus robuste et gestion des tentatives
            for (let i = 0; i < elementDefinitions.length; i++) {
                if (!isClicking) return;
                
                const elementDef = elementDefinitions[i];
                addLog(`Recherche de: ${elementDef.description}...`);
                
                let element = null;
                let attempts = 0;
                
                // Essayer plusieurs fois de trouver l'élément
                while (!element && attempts < MAX_ATTEMPTS && isClicking) {
                    element = findElement(elementDef);
                    
                    if (element) {
                        addLog(`${elementDef.description} trouvé, clic en cours...`);
                        await simulateHumanClick(element);
                        attemptCounters[i] = 0; // Réinitialiser le compteur si succès
                        
                        // Si c'est l'élément de liste, essayer également de cliquer sur des éléments spécifiques
                        if (elementDef.name === "recipientElement") {
                            await new Promise(resolve => setTimeout(resolve, 500)); // Attendre que la liste se charge
                            await clickAllSpecificElements();
                        }
                        
                        // Pause variable entre les clics
                        await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));
                    } else {
                        attempts++;
                        attemptCounters[i]++;
                        
                        if (attempts >= MAX_ATTEMPTS || attemptCounters[i] >= MAX_ATTEMPTS * 2) {
                            addLog(`Trop de tentatives pour ${elementDef.description}, passage à l'étape suivante`);
                            attemptCounters[i] = 0; // Réinitialiser pour la prochaine fois
                            break; // Passer à l'élément suivant
                        }
                        
                        addLog(`${elementDef.description} non trouvé, tentative ${attempts}/${MAX_ATTEMPTS}`);
                        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
                    }
                }
                
                // Si on n'a pas trouvé l'élément de liste après plusieurs tentatives, essayer une recherche générique
                if (!element && elementDef.name === "recipientElement") {
                    addLog("Tentative de recherche générique de destinataires...");
                    await clickAllSpecificElements();
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
            
            // Attendre le traitement du site
            addLog("Attente du traitement...");
            await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 5000));
            
            // Vérifier à nouveau la présence du premier élément pour savoir si on doit recommencer
            const firstElement = findElement(elementDefinitions[0]);
            
            if (isClicking) {
                if (firstElement) {
                    addLog("Premier élément toujours présent, redémarrage du processus...");
                } else {
                    addLog("Processus terminé, redémarrage...");
                }
                
                // Réinitialiser tous les compteurs de tentatives
                attemptCounters = [0, 0, 0, 0, 0];
                
                // Petite pause avant de recommencer
                setTimeout(() => {
                    performClicks();
                }, Math.random() * 2000 + 1000);
            }
        } catch (error) {
            addLog(`Erreur: ${error.message}`);
            console.error("Erreur durant le processus:", error);
            
            if (isClicking) {
                // Réinitialiser tous les compteurs de tentatives
                attemptCounters = [0, 0, 0, 0, 0];
                
                processTimeout = setTimeout(() => {
                    addLog("Tentative de reprise après erreur...");
                    performClicks();
                }, 5000);
            }
        }
    }
    
    // Écouteur d'événement pour le bouton de démarrage
    ui.startButton.addEventListener('click', () => {
        if (!isClicking) {
            isClicking = true;
            ui.startButton.disabled = true;
            ui.stopButton.disabled = false;
            updateStatus("En cours d'exécution...", true);
            addLog("Processus démarré");
            
            setTimeout(() => {
                performClicks();
            }, Math.random() * 500 + 200);
        }
    });
    
    // Écouteur d'événement pour le bouton d'arrêt
    ui.stopButton.addEventListener('click', () => {
        isClicking = false;
        ui.startButton.disabled = false;
        ui.stopButton.disabled = true;
        updateStatus("En attente");
        
        if (processTimeout) {
            clearTimeout(processTimeout);
            processTimeout = null;
        }
        
        addLog("Processus arrêté");
    });
    
    // Détection de changement d'onglet
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isClicking) {
            addLog("Processus mis en pause (onglet inactif)");
        } else if (!document.hidden && isClicking) {
            addLog("Reprise du processus (onglet actif)");
        }
    });
    
    // Message de bienvenue dans la console
    console.log("%cAssistant d'automatisation amélioré chargé", "color:#4CAF50;font-size:14px;font-weight:bold;");
    
    // Raccourci clavier (Alt+S)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 's') {
            if (isClicking) {
                ui.stopButton.click();
            } else {
                ui.startButton.click();
            }
        }
    });
    
    // Afficher automatiquement les logs au démarrage
    setTimeout(() => {
        document.getElementById('action-logs').parentElement.style.display = 'block';
    }, 500);
})();
