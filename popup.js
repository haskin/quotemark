function onClickHandler(event) {
  //Maybe wait until page loads somehow

  const quote = event.target.text;
  // const pageUrl = event.target.href;
  const pageUrl = event.target.target;
  // mostRecent = quote;

  const request = {
    quote: event.target.text,
    pageURL: event.target.target,
    action: "createTab"
  }
  //Send message to backgroundpage
  chrome.runtime.sendMessage(request, () => {
    //Message sent to background script
  });
};

const QUOTEMARK_KEY = "quoteMarkKey";
chrome.storage.sync.get("quoteMarkKey", function (object) {
  const storage = object.quoteMarkKey;
  //Reverse order to show most recent quotes
  storage.reverse().forEach((data) => {
    const quoteContainer = document.createElement("LI"); // Create a <li> node
	const quoteContent = document.createElement("a");
	quoteContent.textContent = data.quote;
    quoteContent.onclick = onClickHandler;
    quoteContent.className = "quoteContainer__quote";
	const quoteURL = document.createElement("a");
	quoteURL.className = "quoteContainer__URL"
	quoteURL.textContent = data.pageURL;
	// quoteURL.href= data.pageURL;
    const hr = document.createElement("hr");
    // data.href = dataObject[key].pageUrl;
    
    // data.target = "_blank";
    quoteContent.target = data.pageURL;
	quoteContainer.appendChild(quoteContent);
	quoteContainer.appendChild(quoteURL);
    quoteContainer.appendChild(hr);
    document.getElementById("items").appendChild(quoteContainer); ///append Item
  });
});