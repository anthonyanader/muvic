var data = { sheets: [] };

// Add auth later
uuid = 0;

function loadSheets() {
    var ref = firebase.database().ref('users/' + uuid + '/files/');
    ref.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
            data.sheets.push(child.val());
            data.sheets[data.sheets.length - 1].id = child.key;
        });

        var templateScript = $("#sheets-template").html();
        var template = Handlebars.compile(templateScript);
        $(".sheetcarditem").remove();
        $(document.body).append(template(data));
    });
}
loadSheets();

// Handle file upload
$('#addsheet').click(function () {
    $('#modal1').modal('open');
});
$("#selectfile").click(function () {
    $("#fileupload").trigger("click");
});

selectedFile = null;
function selectFile(list) {
    if (list.length != 1) {
        return;
    }
    file = list[0];
    $("#filename").text(file.name);
    selectedFile = file;

    if ($("#songname").val() == '') {
        name = selectedFile.name;
        $("#songname").val(name.substring(0, name.length - 4));
    }
}
$("#confirmUpload").click(function () {
    $("#uploadText").hide();
    $("#uploadLoader").show();
    upload();
});
function upload() {

    if (!selectedFile) {
        return;
    }

    fileid = (Math.random() * 0xFFFFFF << 0).toString(36) + (Math.random() * 0xFFFFFF << 0).toString(36);
    filename = fileid + '.xml';

    firebase.database().ref('users/' + uuid + '/files/' + fileid).set({
        name: $("#songname").val(),
        xmlpath: filename
    });

    ref = firebase.storage().ref('users/' + uuid + '/files/').child(filename);
    ref.put(selectedFile).then(function (snapshot) {
        // Reload the files
        data = { sheets: [] };
        loadSheets();
        $("#uploadText").show();
        $("#uploadLoader").hide();
        $("#modal1").modal('close');
        clearCurrentUpload();
    });
}

$("#deletebtn").click(function () {
    $(".deleteicon").toggle('fast');
});

function deleteSheet(id) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    refFile = firebase.storage().ref('users/' + uuid + '/files/').child(id + '.xml');
    refFile.delete();
    refData = firebase.database().ref('users/' + uuid + '/files/').child(id);
    refData.remove();
    $("#" + id).hide();
}
   
// Show the popup hint on the add button if first time here
document.body.onload = function () {
    $('.modal').modal();
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("seen_collection") != "true") {
            $('#addsheettarget').tapTarget('open');
            localStorage.setItem("seen_collection", "true");
        }
    }
}

function clearCurrentUpload() {
    //selectedFile = null;
    $("#songname").val("");
    $("#filename").text("");
}

function goTo(xml) {
    location.href = '/viewer#' + xml;
}