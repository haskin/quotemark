const saveQuote = (info, tab) => {
    const quote = info.selectionText;
    const URL = info.pageUrl;
}

chrome.contextMenus.create({
    title: "Save quote: %s", 
    contexts:["selection"],
    onclick:saveQuote
});