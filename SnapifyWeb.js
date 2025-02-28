// Define a function to click an element using its XPath
function clickElementByXPath(xpath) {
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element) {
        element.click();
        return true;
    } else {
        return false;
    }
}

// Define a list of XPath elements to click on
const xpaths = [
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/button',// enable cam
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div/div[1]/button[1]', // capture
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[2]/div[2]/button[3]', //send to
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div/ul/li[8]/div',// you can change this xpath to be someone elses
    '/html/body/main/div[1]/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/form/div[2]/button',
];

// Define a function to click all elements in the list
function clickAllElements() {
    for (let i = 0; i < xpaths.length; i++) {
        const elementClicked = clickElementByXPath(xpaths[i]);
        if (!elementClicked) {
            console.log(`Element with XPath ${xpaths[i]} not found.`);
        }
    }
}

// Define a function to continuously click all elements in the list
function clickAllElementsContinuously() {
    clickAllElements();
    setTimeout(clickAllElementsContinuously, 1000);
}

// Start clicking elements continuously
clickAllElementsContinuously();
