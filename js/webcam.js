localstream = null;
captureButton = document.getElementById('capture');
player = document.getElementById('vid');
canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
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
    canvas.toBlob(function(blob){
            url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: url 
        });

    },'image/png');

  });