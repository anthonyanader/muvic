var data = {
  sheets: [
    {title: "Payphone"},
    {title: "Shape of You"},
    {title: "I Want It That Way"},
    {title: "Apologize"},
    {title: "Back to December"},
    {title: "Secrets"}
  ]
};

var theTemplateScript = $("#sheets-template").html();
var theTemplate = Handlebars.compile (theTemplateScript);
$(document.body).append (theTemplate (data));

document.body.onload = function(){
  if (typeof(Storage) !== "undefined") {
      if(localStorage.getItem("seen_collection") != "true"){
        $('#addsheettarget').tapTarget('open');
        localStorage.setItem("seen_collection", "true");
      }
  }
}
