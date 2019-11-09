// chrome.storage.sync.clear(() => {
//   var error = chrome.runtime.lastError;
//   if (error) {
//     console.error(error);
//   }
// });

const highlightQuote = (tab) => {
  chrome.tabs.executeScript(tab.id,{ 
    file: 'contentscript.js'
  });
}

const saveQuote = (info, tab) => {
  highlightQuote(tab);
  const quote = info.selectionText;
  const pageUrl = info.pageUrl;

  var timestamp = new Date().getMilliseconds();
  var object = {};
  var data = {};
  data["quote"] = quote;
  data["pageURL"] = pageUrl;
  object[timestamp] = data;
  console.log("Here: ", object);

  chrome.storage.sync.get("quoteMarkKey", function(object) {
    const  storageArray = object.quoteMarkKey;
    storageArray.push(data);
    chrome.storage.sync.set({"quoteMarkKey": storageArray}, function() {
      //Set the array
    });
  });
  // chrome.storage.sync.set(object, function() {
  //   console.log(object);
  // });
};

chrome.contextMenus.create({
  title: "Save quote: %s",
  contexts: ["selection"],
  onclick: saveQuote
});
