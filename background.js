
chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action === "createTab"){
    chrome.tabs.create({url: request.pageURL, active:true} , function(tab){
      const newRequest = {
        quote: request.quote,
        pageURL: request.pageURL,
        action:"openQuote"
      }
      chrome.tabs.executeScript(tab.id, {file:"openQuote.js"}, ()=>{
        chrome.tabs.sendMessage(tab.id, newRequest, (response) => {
          //Message is sent to highlightQuote.js to highlight
          //the quote on the new tab.
          console.log(response);
        });
      });
    });
  }
  sendResponse("Dummy response"); //To prevent erros
});