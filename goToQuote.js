console.log("in goTo.js");

const goTo = (quote) => {
    chrome.extension.getBackgroundPage().console.log(quote);
    const notHighlightedText = quote;
    const html = document.body.innerHTML;
    // console.log(html);
    const highlightedText = "<mark>" + notHighlightedText + "</mark>";
    const newInnerHTML = html.replace(notHighlightedText, highlightedText);
    document.body.innerHTML = newInnerHTML;
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    console.log(message);
    goTo(message);
});
goTo();

// chrome.tabs.onActivated.addListener(function(object){
//     console.log(object);
//     chrome.tabs.query({url: pageUrl}, function(tabs){
//       tabs.forEach((tab) => {
//         console.log(tab);
//         chrome.extension.getBackgroundPage().console.log(tab.id);
//         chrome.tabs.sendMessage(tab.id, {quote: quote});
//         chrome.tabs.executeScript(tab.id, {file:"goToQuote.js"});
//       });     
//     });
//   });