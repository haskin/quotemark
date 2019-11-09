console.log("in goTo.js");

const goTo = (quote) => {
    const notHighlightedText = quote;
    const html = document.body.innerHTML;
    // console.log(html);
    const highlightedText = "<mark class='quotemark__quote'>" + notHighlightedText + "</mark>";
    const newInnerHTML = html.replace(notHighlightedText, highlightedText);
    document.body.innerHTML = newInnerHTML;

    const highlightedQuote = document.querySelector(".quotemark__quote");
    highlightedQuote.scrollIntoView();
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action === "openQuote"){
        goTo(request.quote);
    }
    // console.log(request);
    sendResponse("Quote is being opened.");
});
// goTo();

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