(function () {
    // Creation of a modern user interface with advanced styles
    const createModernUI = () => {
        // Creation of a main container with modern styles
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
        
        // Add a title bar with drag capability
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
        
        // Minimize button
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
        
        // Click counter with modern style
        const counter = document.createElement('div');
        counter.innerHTML = '<span>0</span> actions performed';
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
        
        // Container for action buttons
        const buttonsContainer = document.createElement('div');
        Object.assign(buttonsContainer.style, {
            display: 'flex',
            gap: '10px'
        });
        
        // Creation of buttons with modern style
        const startButton = createStyledButton('Start', '#4CAF50', '#3d8b40');
        const stopButton = createStyledButton('Stop', '#f44336', '#d32f2f');
        stopButton.disabled = true;
        
        // Status indicator
        const statusIndicator = document.createElement('div');
        statusIndicator.textContent = 'Waiting';
        Object.assign(statusIndicator.style, {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            marginBottom: '5px'
        });
        
        // Status dot
        const statusDot = document.createElement('div');
        Object.assign(statusDot.style, {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#FFC107',
            transition: 'background-color 0.3s ease'
        });
        statusIndicator.prepend(statusDot);
        
        // Add a collapsible section for logs
        const logsSection = document.createElement('div');
        logsSection.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;cursor:pointer;margin-bottom:5px;"><span>📋 Activity logs</span><span>▼</span></div>';
        
        // Logs container
        const logsContainer = document.createElement('div');
        logsContainer.id = 'action-logs';
        logsContainer.style.display = 'none';
        Object.assign(logsContainer.style, {
            maxHeight: '150px',
            overflowY: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            padding: '8px',
            fontSize: '12px',
            marginTop: '5px'
        });
        
        // Add a scrollbar style for the logs
        const style = document.createElement('style');
        style.textContent = `
            #action-logs::-webkit-scrollbar {
                width: 6px;
            }
            #action-logs::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.1);
                border-radius: 3px;
            }
            #action-logs::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 3px;
            }
            #action-logs::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5);
            }
        `;
        document.head.appendChild(style);
        
        // Add initial log
        const initialLog = document.createElement('div');
        initialLog.textContent = '▶ Assistant loaded successfully';
        initialLog.style.marginBottom = '4px';
        logsContainer.appendChild(initialLog);
        
        // Add a timestamp to the log
        const timestamp = document.createElement('span');
        timestamp.textContent = getCurrentTime();
        timestamp.style.opacity = '0.7';
        timestamp.style.marginRight = '5px';
        initialLog.prepend(timestamp);
        
        // Add all elements to the UI
        titleBar.appendChild(minimizeButton);
        buttonsContainer.appendChild(startButton);
        buttonsContainer.appendChild(stopButton);
        logsSection.appendChild(logsContainer);
        
        uiContainer.appendChild(titleBar);
        uiContainer.appendChild(counter);
        uiContainer.appendChild(statusIndicator);
        uiContainer.appendChild(buttonsContainer);
        uiContainer.appendChild(logsSection);
        
        document.body.appendChild(uiContainer);
        
        // Make the panel draggable
        makeDraggable(uiContainer, titleBar);
        
        // Toggle logs visibility
        logsSection.querySelector('div').addEventListener('click', () => {
            const arrow = logsSection.querySelector('div > span:last-child');
            const logsElement = document.getElementById('action-logs');
            
            if (logsElement.parentElement.style.display === 'none') {
                logsElement.parentElement.style.display = 'block';
                arrow.textContent = '▼';
            } else {
                logsElement.parentElement.style.display = 'none';
                arrow.textContent = '▶';
            }
        });
        
        // Minimize button functionality
        minimizeButton.addEventListener('click', () => {
            const isMinimized = uiContainer.classList.toggle('minimized');
            
            if (isMinimized) {
                // Save original height
                uiContainer.dataset.originalHeight = uiContainer.offsetHeight + 'px';
                
                // Hide all children except title bar
                Array.from(uiContainer.children).forEach((child, index) => {
                    if (index > 0) child.style.display = 'none';
                });
                
                // Update styles for minimized state
                uiContainer.style.height = 'auto';
                minimizeButton.textContent = '+';
            } else {
                // Restore all children
                Array.from(uiContainer.children).forEach((child, index) => {
                    if (index > 0) child.style.display = '';
                });
                
                // Update styles for expanded state
                uiContainer.style.height = '';
                minimizeButton.textContent = '−';
            }
        });
        
        return {
            container: uiContainer,
            counter: counter.querySelector('span'),
            statusDot: statusDot,
            statusText: statusIndicator.childNodes[1],
            startButton: startButton,
            stopButton: stopButton,
            logsContainer: logsContainer
        };
    };
    
    // Helper function to create styled buttons
    function createStyledButton(text, bgColor, hoverColor) {
        const button = document.createElement('button');
        button.textContent = text;
        Object.assign(button.style, {
            backgroundColor: bgColor,
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontWeight: 'bold',
            flex: '1',
            transition: 'background-color 0.2s ease'
        });
        
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = hoverColor;
        });
        
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = bgColor;
        });
        
        return button;
    }
    
    // Make an element draggable
    function makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        handle.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e.preventDefault();
            // Get mouse position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // Call function when mouse moves
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e.preventDefault();
            // Calculate new position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Set element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            element.style.bottom = "auto";
            element.style.right = "auto";
        }
        
        function closeDragElement() {
            // Stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // Get current time in HH:MM:SS format
    function getCurrentTime() {
        const now = new Date();
        return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    }
    
    // Add a log entry
    function addLog(message) {
        const logEntry = document.createElement('div');
        logEntry.style.marginBottom = '4px';
        
        // Add timestamp
        const timestamp = document.createElement('span');
        timestamp.textContent = getCurrentTime();
        timestamp.style.opacity = '0.7';
        timestamp.style.marginRight = '5px';
        
        logEntry.appendChild(timestamp);
        logEntry.appendChild(document.createTextNode(message));
        
        // Add to container and scroll to bottom
        ui.logsContainer.appendChild(logEntry);
        ui.logsContainer.scrollTop = ui.logsContainer.scrollHeight;
        
        // Limit the number of log entries to prevent memory issues
        if (ui.logsContainer.children.length > 100) {
            ui.logsContainer.removeChild(ui.logsContainer.children[0]);
        }
    }
    
    // Update the status indicator
    function updateStatus(text, isActive = false) {
        ui.statusText.textContent = text;
        ui.statusDot.style.backgroundColor = isActive ? '#4CAF50' : '#FFC107';
    }
    
    // Check if an element is visible
    function isElementVisible(element) {
        if (!element) return false;
        
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return false;
        }
        
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    }
    
    // Element detection methods
    
    // 1. XPath (main method)
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
            addLog(`XPath error: ${error.message}`);
            return null;
        }
    }
    
    // 2. CSS Selectors (complementary method)
    function getElementBySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (error) {
            return null;
        }
    }
    
    // 3. Button text detection
    function getButtonByText(text) {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(button => 
            button.textContent.includes(text) || 
            button.innerText.includes(text) ||
            button.getAttribute('aria-label')?.includes(text)
        );
    }
    
    // 4. Attribute detection
    function getElementByAttribute(attribute, value) {
        return document.querySelector(`[${attribute}*="${value}"]`);
    }
    
    // List of random phrases to add to photos
    const randomPhrases = [
        "Have a nice day!",
        "Hello!",
        "Hey there 👋",
        "Hi you!",
        "How are you?",
        "See you later!",
        "Good evening!",
        "Kisses 😘",
        "So cool!",
        "Awesome!",
        "Great!",
        "Can't wait to see you!",
        "Miss you!",
        "See you soon!",
        "Have a great day!"
    ];
    
    // Simulate typing text
    function simulateTyping(text) {
        // Look for the active text field
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable)) {
            // Simulate typing character by character with variable delays
            let i = 0;
            const typeNextChar = () => {
                if (i < text.length) {
                    // Simulate an input event for each character
                    const char = text.charAt(i);
                    
                    // Create and dispatch an input event
                    const inputEvent = new InputEvent('input', {
                        bubbles: true,
                        cancelable: true,
                        inputType: 'insertText',
                        data: char
                    });
                    
                    // Update the element's value if it's an input or textarea
                    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
                        activeElement.value += char;
                    } else if (activeElement.isContentEditable) {
                        // For contentEditable elements
                        activeElement.textContent += char;
                    }
                    
                    activeElement.dispatchEvent(inputEvent);
                    
                    i++;
                    // Variable delay between characters to simulate human typing
                    setTimeout(typeNextChar, Math.random() * 150 + 50);
                }
            };
            
            typeNextChar();
            return true;
        } else {
            addLog("No active text field found for input");
            return false;
        }
    }
    
    // Definition of elements to find with multiple detection methods
    const elementDefinitions = [
        {
            name: "enableCamera",
            description: "Camera activation button",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/button',
                '/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div/button'
            ],
            selectors: [".camera-enable", "button.primary[type='button']"],
            textContains: ["Enable", "Camera"],
            attributes: [{ name: "aria-label", value: "camera" }]
        },
        {
            name: "captureButton",
            description: "Capture button",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]',
                '/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]'
            ],
            selectors: [".capture-button", "button.capture"],
            textContains: ["Take", "Capture", "Photo"],
            attributes: [{ name: "aria-label", value: "capture" }]
        },
        {
            name: "textButton",
            description: "Add text button",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div[1]/div[1]/button[2]',
                '//button[@title="Add a caption" or @aria-label="Add text" or contains(@class, "text-button")]'
            ],
            selectors: [".text-button", "button.text"],
            textContains: ["Text", "Caption", "Add text"],
            attributes: [
                { name: "aria-label", value: "text" },
                { name: "title", value: "caption" }
            ]
        },
        {
            name: "sendButton",
            description: "Send button",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[3]',
                '/html/body/main/div[1]/div[3]/div/div/div/div[2]/div[1]/div/div/div/div/div[2]/div[2]/button[3]'
            ],
            selectors: ["button.send", "button.primary"],
            textContains: ["Send"],
            attributes: [{ name: "aria-label", value: "send" }]
        },
        {
            name: "recipientElement",
            description: "Recipient selection",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div/ul/li[8]/div',
                '//li[contains(@class, "recipient")]'
            ],
            selectors: ["li.recipient", "div.recipient-item"],
            textContains: ["Recipient"],
            attributes: [{ name: "role", value: "option" }]
        },
        {
            name: "confirmButton",
            description: "Confirmation button",
            xpaths: [
                '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button',
                '//button[contains(@class, "confirm") or contains(text(), "Confirm")]'
            ],
            selectors: ["button.confirm", "button.primary"],
            textContains: ["Confirm", "OK"],
            attributes: [{ name: "type", value: "submit" }]
        }
    ];
    
    // Add an attempt counter system and limit
    let attemptCounters = [0, 0, 0, 0, 0, 0];
    const MAX_ATTEMPTS = 5;
    
    // Advanced search with all available methods
    function findElement(elementDef) {
        // 1. Try XPaths
        for (const xpath of elementDef.xpaths) {
            const element = getElementByXPath(xpath);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        
        // 2. Try CSS selectors
        for (const selector of elementDef.selectors) {
            const element = getElementBySelector(selector);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        
        // 3. Try to find by text
        for (const text of elementDef.textContains) {
            const element = getButtonByText(text);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        
        // 4. Try to find by attribute
        for (const attr of elementDef.attributes) {
            const element = getElementByAttribute(attr.name, attr.value);
            if (element && isElementVisible(element)) {
                return element;
            }
        }
        
        // 5. Smart search as a last resort
        if (elementDef.name === "enableCamera") {
            // Look for the first visible button on the page
            const allButtons = Array.from(document.querySelectorAll('button'));
            const firstVisibleButton = allButtons.find(btn => isElementVisible(btn));
            return firstVisibleButton;
        }
        
        // Special case for text button
        if (elementDef.name === "textButton") {
            // Look for buttons with SVG icons that might be text buttons
            const buttons = Array.from(document.querySelectorAll('button'));
            const textButton = buttons.find(btn => {
                // Check if it has an SVG and is visible
                const hasSvg = btn.querySelector('svg');
                return hasSvg && isElementVisible(btn) && 
                       !btn.classList.contains('capture-button') && 
                       !btn.classList.contains('send');
            });
            return textButton;
        }
        
        return null;
    }
    
    // Create the UI
    const ui = createModernUI();
    
    // Variables to track state
    let clickCount = 0;
    let isClicking = false;
    let currentStep = 0;
    let processTimeout = null;
    
    // Main function to perform clicks
    function performClicks() {
        if (!isClicking) return;
        
        try {
            // Get the current element definition
            const elementDef = elementDefinitions[currentStep];
            
            // Add a special delay after taking a photo to allow UI to update
            if (currentStep === 2 && attemptCounters[1] === 0) {
                addLog("Waiting for UI to update after photo capture...");
                processTimeout = setTimeout(() => {
                    continueProcess();
                }, 2500);
                return;
            }
            
            continueProcess();
            
            function continueProcess() {
                // Find the element using all available methods
                const element = findElement(elementDef);
                
                if (element) {
                    // Reset attempt counter for this step
                    attemptCounters[currentStep] = 0;
                    
                    // Simulate human behavior with random delays
                    setTimeout(() => {
                        // Simulate mouse movement
                        const mouseoverEvent = new MouseEvent('mouseover', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        element.dispatchEvent(mouseoverEvent);
                        
                        // Click after a small delay
                        setTimeout(() => {
                            element.click();
                            clickCount++;
                            ui.counter.textContent = clickCount;
                            
                            addLog(`Clicked: ${elementDef.description}`);
                            
                            // Special case for text button - add random text
                            if (elementDef.name === "textButton" && Math.random() < 0.7) { // 70% chance to add text
                                setTimeout(() => {
                                    // Select a random phrase
                                    const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
                                    addLog(`Adding text: "${randomPhrase}"`);
                                    
                                    // Simulate typing
                                    if (simulateTyping(randomPhrase)) {
                                        // Move to the next step after typing
                                        currentStep = (currentStep + 1) % elementDefinitions.length;
                                    }
                                }, 1200);
                            } else {
                                // Move to the next step
                                currentStep = (currentStep + 1) % elementDefinitions.length;
                            }
                            
                            // Schedule next action with variable delay
                            const nextDelay = Math.random() * 2000 + 1000;
                            
                            // Add occasional random pauses to simulate human behavior
                            if (Math.random() < 0.2) { // 20% chance for a longer pause
                                const pauseDuration = Math.random() * 5000 + 2000;
                                addLog(`Taking a short break (${Math.round(pauseDuration/1000)}s)...`);
                                processTimeout = setTimeout(performClicks, nextDelay + pauseDuration);
                            } else {
                                processTimeout = setTimeout(performClicks, nextDelay);
                            }
                        }, Math.random() * 300 + 50);
                    }, Math.random() * 500 + 200);
                } else {
                    addLog(`Element not found: ${elementDef.description}`);
                    attemptCounters[currentStep]++;
                    
                    // If we've tried too many times, move to the next step
                    if (attemptCounters[currentStep] >= MAX_ATTEMPTS) {
                        addLog(`Too many attempts for ${elementDef.description}, skipping...`);
                        attemptCounters[currentStep] = 0;
                        currentStep = (currentStep + 1) % elementDefinitions.length;
                    }
                    
                    // Small pause before trying again
                    setTimeout(() => {
                        performClicks();
                    }, Math.random() * 2000 + 1000);
                }
            }
        } catch (error) {
            addLog(`Error: ${error.message}`);
            console.error("Error during process:", error);
            
            if (isClicking) {
                // Reset all attempt counters
                attemptCounters = [0, 0, 0, 0, 0, 0];
                
                processTimeout = setTimeout(() => {
                    addLog("Attempting to resume after error...");
                    performClicks();
                }, 5000);
            }
        }
    }
    
    // Event listener for start button
    ui.startButton.addEventListener('click', () => {
        if (!isClicking) {
            isClicking = true;
            ui.startButton.disabled = true;
            ui.stopButton.disabled = false;
            updateStatus("Running...", true);
            addLog("Process started");
            
            setTimeout(() => {
                performClicks();
            }, Math.random() * 500 + 200);
        }
    });
    
    // Event listener for stop button
    ui.stopButton.addEventListener('click', () => {
        isClicking = false;
        ui.startButton.disabled = false;
        ui.stopButton.disabled = true;
        updateStatus("Waiting");
        
        if (processTimeout) {
            clearTimeout(processTimeout);
            processTimeout = null;
        }
        
        addLog("Process stopped");
    });
    
    // Tab change detection
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isClicking) {
            addLog("Process paused (inactive tab)");
        } else if (!document.hidden && isClicking) {
            addLog("Process resumed (active tab)");
        }
    });
    
    // Welcome message in console
    console.log("%cEnhanced automation assistant loaded", "color:#4CAF50;font-size:14px;font-weight:bold;");
    
    // Keyboard shortcut (Alt+S)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 's') {
            if (isClicking) {
                ui.stopButton.click();
            } else {
                ui.startButton.click();
            }
        }
    });
    
    // Automatically show logs at startup
    setTimeout(() => {
        document.getElementById('action-logs').parentElement.style.display = 'block';
    }, 500);
})();
