localstream = null;
captureButton = document.getElementById('capture');
h2 = document.getElementById('h2');
player = document.getElementById('vid');
canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
h2.innerText = chrome.i18n.getMessage("h2_title");
captureButton.innerText = chrome.i18n.getMessage("save_picture");
if (navigator.webkitGetUserMedia!=null) {

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
} 
 captureButton.addEventListener('click', () => {
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    var now = new Date(),
        month = now.getMonth() + 1,
        day = now.getDate(),
        year = now.getFullYear(),
        seconds = now.getSeconds(),
        minutes = now.getMinutes(),
        hour = now.getHours(),
        filename = chrome.runtime.getManifest().name + '--' + [day,month,year].join('-') + '--' +[hour,minutes,seconds].join('-');
    filename = filename.replace(/(\s|\t)+/g,'-').toLocaleLowerCase();
    canvas.toBlob(function(blob){
            url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: url,
          filename : filename
        });

    },'image/png');

  });