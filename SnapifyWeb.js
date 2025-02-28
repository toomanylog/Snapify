// Function to click on an element with XPath, with improved error handling
function clickElementByXPath(xpath) {
    try {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            // Simulate more human behavior by adding a random delay before clicking
            setTimeout(() => {
                // Simulate mouse movement before clicking (mouseover event)
                const mouseoverEvent = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                element.dispatchEvent(mouseoverEvent);
                
                // Small delay before the actual click
                setTimeout(() => {
                    element.click();
                    console.log("Element clicked successfully");
                }, Math.random() * 300 + 50);
            }, Math.random() * 500 + 200);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error during click attempt: ", error);
        return false;
    }
}

// List of XPaths to use
const xpaths = [
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/button', // Enable camera
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]', // Take a photo
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div[1]/div[1]/button[2]', // Add text
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[3]', // Send photo
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div/ul/li[8]/div', // Choose recipient
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button', // Confirm recipient choice
];

// XPath variations to make the script more adaptable
const alternativeXpaths = {
    0: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/button', 
        '//button[contains(@class, "camera-enable")]'],
    1: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]', 
        '//button[contains(@class, "capture")]'],
    2: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div[1]/div[1]/button[2]', 
        '//button[contains(@aria-label, "text") or contains(@class, "text-button")]'],
    3: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[3]', 
        '//button[contains(text(), "Send") or contains(@class, "send")]'],
    4: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div/ul/li[8]/div', 
        '//li[contains(@class, "recipient")]'],
    5: ['/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button', 
        '//button[contains(@class, "confirm") or contains(text(), "Confirm")]']
};

// Variable to track the last processed index
let lastProcessedIndex = -1;
// Add an attempt counter for each step
let attemptCounters = [0, 0, 0, 0, 0, 0];
// Maximum number of attempts before moving to the next step
const MAX_ATTEMPTS = 5;

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

// Function to click on elements with more natural behavior
function processNextElement() {
    // Increment the index with a limit check
    lastProcessedIndex = (lastProcessedIndex + 1) % xpaths.length;
    
    // If we are at the text addition step (index 2), randomly decide whether to add text
    if (lastProcessedIndex === 2 && Math.random() > 0.7) { // 30% chance to add text
        console.log("Text addition step skipped this time");
        lastProcessedIndex++; // Skip directly to the next step
    }
    
    // Add an extra delay after taking the photo (index 1) to allow buttons to appear
    if (lastProcessedIndex === 2 && attemptCounters[1] === 0) {
        console.log("Waiting after taking the photo to allow buttons to appear...");
        setTimeout(() => {
            clickElementAndContinue();
        }, 2500); // Increased delay to 2.5 seconds after taking the photo
        return;
    }
    
    // Function to click on the element and continue the process
    clickElementAndContinue();
    
    function clickElementAndContinue() {
        // Determine if we should use the main XPath or an alternative
        const xpathOptions = alternativeXpaths[lastProcessedIndex] || [xpaths[lastProcessedIndex]];
        
        // Try each XPath option until one works
        let elementClicked = false;
        
        // Special case for the text addition button (index 2)
        if (lastProcessedIndex === 2) {
            // Use a more specific XPath for the text addition button
            const textButtonXPath = '//button[@title="Add a caption" or @aria-label="Add text" or contains(@class, "text-button")]';
            elementClicked = clickElementByXPath(textButtonXPath);
            
            // If the specific XPath doesn't work, try to find the button by its SVG icon
            if (!elementClicked) {
                console.log("Attempting to find the text button by its icon...");
                const textButtons = Array.from(document.querySelectorAll('button')).filter(btn => {
                    // Check if the button contains a text icon or has a text-related attribute
                    return (btn.title && (btn.title.includes('text') || btn.title.includes('caption'))) || 
                           (btn.innerHTML && btn.innerHTML.includes('svg')) ||
                           (btn.getAttribute('aria-label') && btn.getAttribute('aria-label').includes('text'));
                });
                
                if (textButtons.length > 0) {
                    // Click on the first button found
                    setTimeout(() => {
                        textButtons[0].click();
                        console.log("Text addition button found and clicked via alternative search");
                    }, Math.random() * 500 + 200);
                    elementClicked = true;
                }
            }
        } else {
            // For other elements, use the standard method
            for (let i = 0; i < xpathOptions.length && !elementClicked; i++) {
                elementClicked = clickElementByXPath(xpathOptions[i]);
            }
        }
        
        if (!elementClicked) {
            console.log(`Element ${lastProcessedIndex} not found, trying again later`);
            attemptCounters[lastProcessedIndex]++;
            
            // If we have exceeded the maximum number of attempts for this step
            if (attemptCounters[lastProcessedIndex] >= MAX_ATTEMPTS) {
                console.log(`Too many attempts for step ${lastProcessedIndex}, moving to the next step`);
                // Reset the counter for this step
                attemptCounters[lastProcessedIndex] = 0;
                // Move to the next step
                lastProcessedIndex = (lastProcessedIndex + 1) % xpaths.length;
            }
        } else {
            // Reset the attempt counter if the click was successful
            attemptCounters[lastProcessedIndex] = 0;
            
            // If we just clicked on the text addition button, add text after a short delay
            if (lastProcessedIndex === 2) {
                setTimeout(() => {
                    // Select a random phrase
                    const randomPhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
                    console.log(`Adding text: "${randomPhrase}"`);
                    
                    // Simulate typing text
                    simulateTyping(randomPhrase);
                }, 1200); // Increased delay to ensure the text area is active
            }
        }
        
        // Schedule the next click with a variable delay
        const nextDelay = Math.random() * 2000 + 1000; // Delay between 1-3 seconds
        
        // Add an occasional random pause to simulate human distraction
        if (Math.random() < 0.2) { // 20% chance to add a pause
            const pauseDuration = Math.random() * 5000 + 2000; // Pause of 2-7 seconds
            console.log(`Short pause of ${Math.round(pauseDuration/1000)} seconds...`);
            window.processTimeoutId = setTimeout(processNextElement, nextDelay + pauseDuration);
        } else {
            window.processTimeoutId = setTimeout(processNextElement, nextDelay);
        }
    }
}

// Function to simulate text typing
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
    } else {
        console.log("No active text field found for input");
    }
}

// Function to check if the page is active
function isPageActive() {
    return !document.hidden;
}

// Main function that starts the process with an initial delay
function startProcess() {
    // Random initial delay to hide automatic startup
    const initialDelay = Math.random() * 3000 + 1000;
    setTimeout(() => {
        console.log("Starting process...");
        
        // Periodically check if the page is active
        setInterval(() => {
            if (isPageActive()) {
                // Global variable to store the timeout ID
                if (!window.processTimeoutId) {
                    processNextElement();
                }
            } else {
                // Pause if the page is not active
                if (window.processTimeoutId) {
                    clearTimeout(window.processTimeoutId);
                    window.processTimeoutId = null;
                }
            }
        }, 5000);
    }, initialDelay);
}

// Start the process
startProcess();
