const goTo = (quote) => {
    const notHighlightedText = quote;
    const html = document.body.innerHTML;
    // console.log(html);
    const highlightedText = "<mark>" + notHighlightedText + "</mark>";
    const newInnerHTML = html.replace(notHighlightedText, highlightedText);
    document.body.innerHTML = newInnerHTML;
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    // goTo(message);
});
// goTo();