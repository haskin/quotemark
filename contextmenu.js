chrome.storage.sync.clear(() => {
  var error = chrome.runtime.lastError;
  if (error) {
    console.error(error);
  }
});

const highlightQuote = () => {
  chrome.tabs.executeScript({
    file: 'contentScript.js'
  });
}

const saveQuote = (info, tab) => {
  highlightQuote();
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
