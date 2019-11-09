function onClickHandler(event) {
  //Maybe wait until page loads somehow
  
  const quote = event.target.text;
  // const pageUrl = event.target.href;
  const pageUrl = event.target.target;
  // mostRecent = quote;
  
  const request = {quote:event.target.text, 
                  pageURL: event.target.target, 
                  action:"createTab"}
  //Send message to backgroundpage
  chrome.runtime.sendMessage(request, () => {
    //Message sent to background script
  });

  //Moving logic to background page
  // chrome.tabs.create({url: pageUrl, active: false } , function(tab){
  //  // chrome.extension.getBackgroundPage().console.log(tab);
  //  // console.log(tab.id);
  //   chrome.tabs.sendMessage(tab.id, {quote: quote});
  //   chrome.tabs.update({url:pageUrl, active:true}, )
  //   chrome.tabs.executeScript(tab.id, {file:"goToQuote.js"});
  // });

  // chrome.tabs.onActivated.addListener(function(object){
  //   chrome.extension.getBackgroundPage().console.log(object);
  //   chrome.tabs.query({url: pageUrl}, function(tabs){
  //     tabs.forEach((tab) => {
  //       console.log(tab);
  //       chrome.extension.getBackgroundPage().console.log(tab.id);
  //       chrome.tabs.sendMessage(tab.id, {quote: quote});
  //       chrome.tabs.executeScript(tab.id, {file:"goToQuote.js"});
  //     });     
  //   });
  // });
  // chrome.tabs.update({url:pageUrl});

  //Waits until the new tab is loaded

  // chrome.tabs.query({url: pageUrl}, function(tabs){
  //   chrome.extension.getBackgroundPage().console.log(tabs);
  // });
  
  //BUG One of the tabs isn't queried
  // window.setTimeout(()=>{},5000);
  // window.addEventListener("load", function() {chrome.tabs.query({url: pageUrl}, function(tabs){
  //   tabs.forEach((tab) => {
  //     chrome.extension.getBackgroundPage().console.log(tab);
  //     // chrome.tabs.sendMessage(tab.id, {quote: quote}, function(response) {
  //     //   chrome.extension.getBackgroundPage().console.log("sent message");
  //     // });
  //     // chrome.tabs.executeScript(tab.id, {file:"goToQuote.js"});
  //     // chrome.tabs.sendMessage(tab.id, {quote: quote}, function(response) {
  //     //   chrome.extension.getBackgroundPage().console.log("sent message");
  //     // });     
  //   })
  // });})
}
// function onClickHandler(event) {
//   const quote = event.target.text;
//   // alert("in click handler");

//   // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   //   chrome.tabs.sendMessage(tabs[0].id, {quote: quote}, function(response) {
//   //     // console.log(response.farewell);
//   //   });
//   // });
//   // alert(event.target.value);
//   // chrome.tabs.executeScript({file:"goToQuote.js"}, function(){
//   //   alert(tab.id);
//   //   chrome.tabs.sendMessage(tab.id,quote);
//   // })
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.extension.getBackgroundPage().console.log(tabs);
//     chrome.tabs.sendMessage(tabs[0].id, {quote: quote}, function(response) {
//       alert(response);
//     });
//   });
//   chrome.tabs.executeScript({file:"goToQuote.js"});
// }



chrome.storage.sync.get(null, function(items) {
  var allKeys = Object.keys(items);
  console.log(allKeys);
  allKeys.forEach(key => {
    console.log("key: ", key);
    chrome.storage.sync.get([key], dataObject => {
      console.log("dataObject:", dataObject[key].pageUrl);
	  var node = document.createElement("LI"); // Create a <li> node
    var data = document.createElement("a");
    const hr = document.createElement("hr");
	  // data.href = dataObject[key].pageUrl;
    data.text = dataObject[key].quote;
    // node.onclick = onClickHandler(dataObject[key].quote);
    data.onclick = onClickHandler;
    data.className = "quoteContainer__quote";
    // data.target = "_blank";
    data.target = dataObject[key].pageUrl;
      node.appendChild(data);
      node.appendChild(hr);
      document.getElementById("items").appendChild(node); ///append Item
    });
  });
});


// function onClickHandler() {
//   alert(quote);
// }

// const onClickHandler = (quote) => {
//    alert(quote);
//     // chrome.tabs.executeScript({code: "var notHighlighted = " + quote}, function(){
//     //     file: 'goToQuote.js'
//     // });
//   }

// const onClickHandler = (quote) => {
// //  alert(quote);

//   chrome.tabs.executeScript({code: "var notHighlighted = " + quote}, function(){
//       file: 'goToQuote.js'
//   });
// }