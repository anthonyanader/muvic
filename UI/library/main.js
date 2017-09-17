var data = {
  sheets: [
  ]
};

// Add auth later
uuid = 0;

function loadSheets(){
  var ref = firebase.database().ref('users/' + uuid + '/files/');
  ref.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      data.sheets.push(child.val());
    });

    var templateScript = $("#sheets-template").html();
    var template = Handlebars.compile (templateScript);
    $(document.body).append(template(data));
  });
}
loadSheets();

// Handle file upload
$('#addsheet').click(function() {
    $('#fileupload').trigger('click');
});
function upload(list){
  if(list.length != 1){
    return;
  }

  fileid = (Math.random()*0xFFFFFF<<0).toString(36) + (Math.random()*0xFFFFFF<<0).toString(36);
  filename = fileid + '.xml';

  firebase.database().ref('users/' + uuid + '/files/' + fileid).set({
    name: "Naming of files to be added later",
    xmlpath: filename
  });

  ref = firebase.storage().ref('users/' + uuid + '/files/').child(filename);
  ref.put(list[0]).then(function(snapshot) {
    // Reload the files
    $(".sheetcarditem").remove();
    data = {sheets:[]};
    loadSheets();
    console.log("Refreshing...");
  });
}

// Show the popup hint on the add button if first time here
document.body.onload = function(){
  if (typeof(Storage) !== "undefined") {
      if(localStorage.getItem("seen_collection") != "true"){
        $('#addsheettarget').tapTarget('open');
        localStorage.setItem("seen_collection", "true");
      }
  }
}
