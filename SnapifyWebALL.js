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
    
    // Fonction pour obtenir un élément par XPath avec une meilleure gestion d'erreurs
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
            console.log(`Erreur XPath: ${error.message}`);
            return null;
        }
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
    function simulateHumanClick(element) {
        return new Promise((resolve) => {
            if (!element || !isElementVisible(element)) {
                resolve(false);
                return;
            }
            
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
                // Simuler le clic
                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: centerX,
                    clientY: centerY
                });
                
                element.dispatchEvent(clickEvent);
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
            }, Math.random() * 300 + 100);
        });
    }
    
    // XPaths mis à jour (versions multiples pour plus de robustesse)
    const xpathMap = {
        // Bouton d'activation de la caméra
        enableCamera: [
            "/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div/div/div/div/button[1]",
            "/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/button",
            "//button[contains(text(), 'Activer') or contains(@class, 'camera')]"
        ],
        // Bouton de capture
        captureButton: [
            "/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/div[2]/div/div[1]/button[1]",
            "/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]",
            "//button[contains(@class, 'capture') or contains(text(), 'Prendre')]"
        ],
        // Bouton d'envoi
        sendButton: [
            "/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div[2]/div[2]/button[2]",
            "/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[3]",
            "//button[contains(text(), 'Envoyer') or contains(@class, 'send')]"
        ],
        // Bouton de confirmation final
        confirmButton: [
            "/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button",
            "/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button",
            "//button[contains(@class, 'submit') or contains(text(), 'Confirmer')]"
        ]
    };
    
    // Fonction pour trouver un élément en essayant plusieurs XPaths
    function findElementByMultipleXPaths(xpathArray) {
        for (const xpath of xpathArray) {
            const element = getElementByXPath(xpath);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        return null;
    }
    
    // Fonction pour trouver et cliquer sur tous les éléments spécifiques
    async function clickAllSpecificElements() {
        // Utiliser des sélecteurs CSS et des attributs de données pour être moins détectable
        const containers = document.querySelectorAll('[class*="Ewfl"], [class*="list-container"]');
        const elementsToClick = [];
        
        containers.forEach(container => {
            // Recherche plus générique pour éviter de s'appuyer sur des noms de classe spécifiques
            const elements = container.querySelectorAll('button, [role="button"], [tabindex="0"]');
            elements.forEach(element => {
                // Vérifier si l'élément contient un SVG
                const svg = element.querySelector('svg');
                if (svg && (svg.classList.contains('DYSLz') || svg.getAttribute('aria-label') === 'Ajouter')) {
                    elementsToClick.push(element);
                }
            });
        });
        
        if (elementsToClick.length === 0) {
            addLog("Aucun élément spécifique trouvé");
            return false;
        }
        
        addLog(`${elementsToClick.length} éléments spécifiques trouvés`);
        
        // Cliquer sur chaque élément avec un délai variable entre les clics
        for (let i = 0; i < elementsToClick.length; i++) {
            if (!isClicking) return false;
            
            const element = elementsToClick[i];
            const clicked = await simulateHumanClick(element);
            
            if (clicked) {
                addLog(`Élément spécifique ${i+1}/${elementsToClick.length} cliqué`);
            }
            
            // Pause aléatoire entre les clics
            await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
        }
        
        return true;
    }
    
    // Fonction principale pour cliquer sur les éléments dans un ordre précis
    async function performClicks() {
        if (!isClicking) return;
        
        resetCounter();
        updateStatus("En cours d'exécution...", true);
        
        try {
            // 1. Activer la caméra
            const cameraButton = findElementByMultipleXPaths(xpathMap.enableCamera);
            if (cameraButton) {
                addLog("Activation de la caméra...");
                await simulateHumanClick(cameraButton);
                await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
            } else {
                addLog("Bouton de caméra non trouvé");
            }
            
            if (!isClicking) return;
            
            // 2. Bouton de capture
            const captureButton = findElementByMultipleXPaths(xpathMap.captureButton);
            if (captureButton) {
                addLog("Capture de la photo...");
                await simulateHumanClick(captureButton);
                await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
            } else {
                addLog("Bouton de capture non trouvé");
            }
            
            if (!isClicking) return;
            
            // 3. Bouton d'envoi
            const sendButton = findElementByMultipleXPaths(xpathMap.sendButton);
            if (sendButton) {
                addLog("Envoi de la photo...");
                await simulateHumanClick(sendButton);
                await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 1000));
            } else {
                addLog("Bouton d'envoi non trouvé");
            }
            
            if (!isClicking) return;
            
            // 4. Cliquer sur tous les éléments spécifiques
            addLog("Recherche des éléments spécifiques...");
            await clickAllSpecificElements();
            
            if (!isClicking) return;
            
            // 5. Bouton de confirmation final
            const confirmButton = findElementByMultipleXPaths(xpathMap.confirmButton);
            if (confirmButton) {
                addLog("Confirmation finale...");
                await simulateHumanClick(confirmButton);
            } else {
                addLog("Bouton de confirmation non trouvé");
            }
            
            // Attendre que le site traite les actions
            addLog("Attente du traitement...");
            await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 8000));
            
            if (isClicking) {
                addLog("Redémarrage du processus...");
                performClicks();
            }
        } catch (error) {
            addLog(`Erreur: ${error.message}`);
            console.error("Erreur durant le processus:", error);
            
            // Réessayer après un délai en cas d'erreur
            if (isClicking) {
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
            
            // Démarrer avec un léger délai aléatoire
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
    
    // Détection de changement d'onglet ou de fenêtre pour mettre en pause automatiquement
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isClicking) {
            addLog("Processus mis en pause (onglet inactif)");
            // Ne pas arrêter complètement, juste mettre en pause
        } else if (!document.hidden && isClicking) {
            addLog("Reprise du processus (onglet actif)");
        }
    });
    
    // Message de bienvenue dans la console
    console.log("%cAssistant d'automatisation chargé", "color:#4CAF50;font-size:14px;font-weight:bold;");
    
    // Ajout d'un raccourci clavier pour démarrer/arrêter (Alt+S)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 's') {
            if (isClicking) {
                ui.stopButton.click();
            } else {
                ui.startButton.click();
            }
        }
    });
})();
