var data = {
    title: "test"
};
uuid = 0;
data.url = window.location.hash.substr(1);

var ref = firebase.database().ref('users/' + uuid + '/files/').child(data.url.substring(0, data.url.length - 4));
ref.once("value", function (snapshot) {
    var sheetname = snapshot.val().name;
    $("#sheettitle").text(sheetname);
});

var storage = firebase.storage();
storage.ref('/users/' + uuid + '/files/' + data.url).getDownloadURL().then(function(url) {
  VexDocument = null;
  VexFormatter = null;
  $.ajax({
    url: url,
    success: function(data) {
      var start = new Date().getTime(); // time execution
      VexDocument = new Vex.Flow.Document(data);
      var content = $("#sheet")[0];
      if (VexDocument) {
        VexFormatter = VexDocument.getFormatter();
        VexFormatter.draw(content);
      }
      var elapsed = (new Date().getTime() - start)/1000;
      var debouncedResize = null;
      $(window).resize(function() {
        if (! debouncedResize)
          debouncedResize = setTimeout(function() {
            VexFormatter.draw(content);
            debouncedResize = null;
          }, 500);
      });
    }
  });

}).catch(function(error) {
  // Handle any errors
});


doingFacialRecog = false;
function facialRecog() {
    if (doingFacialRecog) {
        onStop();
        $("#toolbar-facial-recog").text("Enable Facial Recognition");
    } else {
        onStart();
        $("#toolbar-facial-recog").text("Disable Facial Recognition");
    }
    doingFacialRecog = !doingFacialRecog;
}

metronomeEh = false;
bpm = 80;
var audio = new Audio('tick.mp3');
function doMetronome() {
    if (metronomeEh) {
        $("#toolbar-metronome").text("Enable Metronome");
        clearInterval(tickInterval);
    } else {
        tickInterval = setInterval(function () {
            audio.play();
        }, 60000/bpm);
        $("#toolbar-metronome").text("Disable Metronome");
    }
    metronomeEh = !metronomeEh;
    $("#metronome").toggle('fast');
}

function updateBPM(event) {
    bpm = $("#bpmRange").val();
    clearInterval(tickInterval);
    tickInterval = setInterval(function () {
        audio.play();
    }, 60000 / bpm);
}

function highlightMeasure() {

}