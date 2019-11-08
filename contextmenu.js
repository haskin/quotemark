chrome.storage.sync.clear(() => {
  var error = chrome.runtime.lastError;
  if (error) {
    console.error(error);
  }
});

const highlightQuote = (tab) => {
  chrome.tabs.executeScript(tab.id,{ 
    file: 'contentScript.js'
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
  data["pageUrl"] = pageUrl;
  object[timestamp] = data;
  console.log("Here: ", object);
  chrome.storage.sync.set(object, function() {
    console.log(object);
  });
};

chrome.contextMenus.create({
  title: "Save quote: %s",
  contexts: ["selection"],
  onclick: saveQuote
});
