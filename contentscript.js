function highlight(){
    const html = document.body.innerHTML;
    const notHighlightedText = window.getSelection().toString();
    // console.log(window.getSelection());
    // console.log(typeof(window.getSelection().focusNode));
    // let html2 = html.replace(/fox/, "<mark>goat</mark>");
    const highlightedText = "<mark>" + notHighlightedText + "</mark>";
    const newInnerHTML = html.replace(notHighlightedText, highlightedText);
    document.body.innerHTML = newInnerHTML;
}
highlight();
// document.addEventListener("mousedown", function(event){
//     //right click
//     if(event.button == 2) { 
//         clickedElement = event.target;
//         console.log(clickedElement);
//     }
// }, true);