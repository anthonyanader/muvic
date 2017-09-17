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
        currentMeasure = 0;
        mCount = 0;
        tracking = false;
        $("#bluebox").fadeOut("fast");
    } else {
        tickInterval = setInterval(function () {
            tick();
        }, 60000/bpm);
        $("#toolbar-metronome").text("Disable Metronome");
    }
    metronomeEh = !metronomeEh;
    $("#metronome").toggle('fast');
    $("#toolbar-tick").fadeToggle('fast');
}

currentMeasure = 0;
mCount = 0;
tracking = false;
function doTrack() {
    $("#bluebox").toggle("fast");
    tracking = !tracking;
    canScroll = true;
}

function tick() {
    audio.play();
    if (tracking) {
        mCount += 1;
        if (mCount == 4) {
            currentMeasure += 1;
            mCount = 0;
            highlightMeasure(currentMeasure);
        }
    }
}

function updateBPM(event) {
    bpm = $("#bpmRange").val();
    clearInterval(tickInterval);
    tickInterval = setInterval(function () {
        tick();
    }, 60000 / bpm);
}

function highlightMeasure(m) {
    var height = 110;

    var offset = 0;

    if (m == 0) {
        r = 0;
    } else {
        var rows = VexFormatter.measuresInBlock;
        found = false;
        for (var r = 0; r < rows.length; r++) {
            offset = 0;
            for (var j = 0; j < rows[r].length; j++) {
                if (rows[r][j] == m) {
                    found = true;
                    break;
                } else {
                    offset += VexFormatter.measureWidth[rows[r][j]] - 82;
                }
            }
            if (found) {
                break;
            }
        };
    }

    var sheetOffset = $("#sheet_canvas" + r).offset();
    var startx = sheetOffset.left;
    var starty = sheetOffset.top;

    width = VexFormatter.measureWidth[m] - 82;

    var top = starty + 35;
    var left = startx + offset;

    $("#bluebox").css({ top: top + "px", left: left + "px", width: width + "px", height: height + "px" });

    if (canScroll) {
        $('html, body').animate({
            scrollTop: $("#bluebox").offset().top - 100
        }, 2000);
    }
}

$(window).scroll(function () {
    canScroll = false;
});