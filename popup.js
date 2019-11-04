function onClickHandler(event) {
  //Maybe wait until page loads somehow
  
  const quote = event.target.text;
  const pageUrl = event.target.href;
  // chrome.tabs.update({url:pageUrl});
  chrome.tabs.onActivated.addListener(function(){
    chrome.tabs.query({url: pageUrl}, function(tabs){
      chrome.extension.getBackgroundPage().console.log(tabs);
    });
  });

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
  window.onload = (event) => {
    chrome.extension.getBackgroundPage().console.log('page is fully loaded');
  }; 
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
	  data.href = dataObject[key].pageUrl;
    data.text = dataObject[key].quote;
    // node.onclick = onClickHandler(dataObject[key].quote);
    data.onclick = onClickHandler;
	  data.target = "_blank";
      node.appendChild(data);
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