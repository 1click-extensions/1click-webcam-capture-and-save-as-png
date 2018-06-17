localstream = null;
captureButton = document.getElementById('capture');
player = null;
canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
h2 = document.getElementById('h2');
h2.innerText = chrome.i18n.getMessage("h2_title");
captureButton.innerText = chrome.i18n.getMessage("save_picture");

function saveBase64AsFile(base64, fileName) {

    var link = document.createElement("a");
  
    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
    setTimeout(checkIfRankNeededAndAndAddRank, 2500);
}

/*if (navigator.webkitGetUserMedia!=null) {

    var options = { 
        video:true, 
        audio:false 
    };  
    navigator.webkitGetUserMedia(options, 
        function(stream) { 
            vid.src = window.webkitURL.createObjectURL(stream);
            localstream = stream;
            vid.play();
            console.log("streaming");
        }, 
        function(e) { 
        console.log("background error : " + e);
        }); 
} */
GumHelper.startVideoStreaming(function callback(err, stream, videoElement, width, height) {
    if(err) {
      errorDiv = document.getElementById('error');
      errorDiv.classList.add('visible');
    } else {
       
        player = videoElement;
        videoElement.id = 'vid';
        document.getElementsByClassName('video-wrp-inner')[0].appendChild(videoElement);
        canvas.width = width;
        canvas.height = height;
        // (or you could just keep a reference and use it later)
    }
  }, { timeout: 20000 });
 captureButton.addEventListener('click', () => {
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(function(blob){
            url = URL.createObjectURL(blob);
            saveBase64AsFile(url,getfilenameByExtention());

    },'image/png');

  });

  function getfilenameByExtention(){
    var now = new Date(),
        month = now.getMonth() + 1,
        day = now.getDate(),
        year = now.getFullYear(),
        seconds = now.getSeconds(),
        minutes = now.getMinutes(),
        hour = now.getHours(),
        filename = chrome.runtime.getManifest().name + '--' + [day,month,year].join('-') + '--' +[hour,minutes,seconds].join('-');
        filename = filename.replace(/(\s|\t)+/g,'-').toLocaleLowerCase() + '.png';
    return filename;
  }