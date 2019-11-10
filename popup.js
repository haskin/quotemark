const QUOTEMARK_KEY = "quoteMarkKey";
function setPopUp() {
	/* Deletes the quoteContainer that has all copies. This is done to 
   * refresh the popup when one of the copies is deleted. quoteContainer
   * is added back once the storage is imported.*/
	const tempContainer = document.querySelector(".quotesContainer");
	if(tempContainer)
		tempContainer.remove();
	//New Quotes Container
	const quotesContainer = document.createElement("DIV");
	quotesContainer.className = "quotesContainer";
	document.getElementById("popUpBody").appendChild(quotesContainer);

	chrome.storage.sync.get("quoteMarkKey", function (object) {
		const storage = object.quoteMarkKey;
		//Reverse order to show most recent quotes
		storage.reverse().forEach((data) => {
			//Quote Container
			const quoteContainer = document.createElement("LI"); // Create a <li> node
			quoteContainer.className = "quoteContainer"
			//Quote Content
			const quoteContent = document.createElement("a");
			quoteContent.textContent = data.quote;
			quoteContent.onclick = onClickHandler;
			quoteContent.className = "quoteContainer__quote";
			//Quote URL
			const quoteURL = document.createElement("a");
			quoteURL.className = "quoteContainer__URL"
			quoteURL.textContent = data.pageURL;

			//Delete Button
			const deleteButton = document.createElement("button");
			deleteButton.className = "quoteContainer__delete";
			deleteButton.textContent = "Delete";
			deleteButton.onclick = deleteButtonOnClickHandler;

			// quoteURL.href= data.pageURL;
			const hr = document.createElement("hr");
			// data.href = dataObject[key].pageUrl;
			
			// data.target = "_blank";
			quoteContent.target = data.pageURL;
			quoteContainer.appendChild(quoteContent);
			quoteContainer.appendChild(deleteButton);
			quoteContainer.appendChild(quoteURL);
			quoteContainer.appendChild(hr);
			document.querySelector(".quotesContainer").appendChild(quoteContainer); ///append Item
		});
	});
}

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

function deleteButtonOnClickHandler(event) {
	// console.log(event);
	const deleteIndex = event.path[1].childNodes[0].tabIndex;
	chrome.storage.sync.get("quoteMarkKey", function (object) {
		const storage = object.quoteMarkKey;
		  //Reverse order to show most recent quotes
		const updatedStorage = storage.reverse().filter((data, index) => 
												index != deleteIndex)
		chrome.storage.sync.set({"quoteMarkKey": updatedStorage}, () => {
			console.log("Quote deleted in storage");
			setPopUp();
		});
	});
}


setPopUp();