var divRoot = $("#affdex_elements")[0];
var width = 640;
var height = 480;
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

detector.detectAllExpressions();

detector.addEventListener("onInitializeSuccess", function () {
    $("#face_video_canvas").css("display", "block");
    $("#face_video").css("display", "none");
});

function onStart() {
    if (detector && !detector.isRunning) {
        detector.start();
    }
};

function onStop() {
    if (detector && detector.isRunning) {
        detector.stop();
    }
};

detector.addEventListener("onWebcamConnectFailure", function () {
    alert("Webcam access denied");
});

scrollspeed = 10;
detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {
    if (faces.length > 0 && (Number(faces[0].expressions.browRaise)).toFixed(0) >= 80) {
        window.scrollBy(0, scrollspeed);
    }
});
