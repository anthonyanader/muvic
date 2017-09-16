$(document).ready(function () {
  $(".button-collapse").sideNav();

    var previewNode = document.querySelector("#zdrop-template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

      var zdrop = new Dropzone("#zdrop", {
            url: '/Home/UploadFile',
            maxFilesize:20,
            previewTemplate: previewTemplate,
            autoQueue: false,
            previewsContainer: "#previews",
            clickable: "#zdrop"
    });

      zdrop.on("totaluploadprogress", function (progress) {
        var progr = document.querySelector(".progress .determinate");
        if (progr === undefined || progr === null)
            return;

        progr.style.width = progress + "%";
    });

    zdrop.on('dragenter', function () {
        // $('#zdrop').css({ background: '#41ab6b', color: '#fff' });
        $('#zdrop').addClass('green lighten-1 white-text');
    });

    zdrop.on('dragleave', function () {
        // $('#zdrop').css({ background: '#fff', color: '#000' });
        $('#zdrop').addClass('white black-text').removeClass('green lighten-1 white-text');
    });

    zdrop.on('drop', function () {
        //  $('#zdrop').css({ background: '#fff', color: '#333' });
        $('#zdrop').addClass('white black-text').removeClass('green lighten-1 white-text');
    });
});
