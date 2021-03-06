isInpopup = null
function oneClickGetPopupHtml(extension) {
  if (!extension && "undefined" != typeof _extension) {
    extension = _extension
  }

  //   mail = `1click-webcam-capture-and-save-as-png@1ce.org`,
  //   	rateLink = `https://chrome.google.com/webstore/detail/cppldildcdnknnlhamcokaigkpaopdbe/reviews`,
  // 	  githubLink = `https://github.com/1click-extensions/1click-webcam-capture-and-save-as-png`;
  // 	console.log(extension);
  return (str = `
  <style>
  .pleaseRate {
	text-align: center;
    position: fixed;
    left: 15%;
    top: 100px;
    font-size: 40px;
    padding: 10px 20px;
    background-color: white;
    border-radius: 3px;
   /* background: linear-gradient(to right, #8bca6b, #0db702);*/
    border: 7px solid #fff;
    background: linear-gradient(to right, #f5a826, #faca42);
	overflow: hidden;
	
	box-shadow: 0 0 0 2px hsl(0, 0%, 80%);
  box-sizing:border-box;
  z-index:9999;
}
.pleaseRate a,
.pleaseRate a:hover,
.pleaseRate a:visited{
	color:#000;
	text-decoration:underline;
}
.please-rate-text {
  padding-top: 15px;
    margin: 0 auto;
	width: 566px;
	max-width:100%;
	font-size:22px;
}
  .btn-popup {
	text-decoration: none;
	color: #fff;
	background-color: #26a69a;
	text-align: center;
	letter-spacing: .5px;
	-webkit-transition: background-color .2s ease-out;
	transition: background-color .2s ease-out;
	cursor: pointer;
	font-size: 14px;
	outline: 0;
	border: none;
	border-radius: 2px;
	display: inline-block;
	height: 36px;
	line-height: 36px;
	padding: 0 16px;
	vertical-align: middle;
	-webkit-tap-highlight-color: transparent;
} 
a.please-rate-github {
    font-family: 'Acme', sans-serif;
    position: absolute;
    bottom: 42px;
    left: -57px;
    background: red;
    color: #fdffc0;
    padding: 3px 10px;
    transform: rotate(45deg);
    width: 232px;
    text-align: center;
    font-size: 23px;
}
button.btn-popup.no-thanks {
    margin-left: 156px;
    font-size: 14px;
    height: 21px;
    box-sizing: border-box;
    padding: 3px 10px;
    line-height: normal;
	float: right;
	opacity:0.7;
	background:transparent;
	color:#000;
}
.btn-popup a {
    color: #fff;
    text-decoration: none;
}
.skip-wrp{
	padding-top:14px;
}
.addition {
    padding-top: 15px;
}
.please-rate-buttons {
	padding-top: 50px;
}
.please-rate-rate-link{
	padding:20px;font-size:20px;
	font-weight:bolder
}
.please-rate-title{
	padding 10px 2px;
}
  </style>
	<div class="pleaseRate">
		<div class="please-rate-text">
			If you like 1Click Webcam to Picture <a target=_blank href="https://chrome.google.com/webstore/detail/cppldildcdnknnlhamcokaigkpaopdbe/reviews" >please give us 5-stars</a>
			<br/>
			<div class="addition">To report a bug please <a href="https://github.com/1click-extensions/1click-webcam-capture-and-save-as-png/issues/new">submit issue</a> 
			</div>
			<div class="skip-wrp"><button type="button" class="btn-popup no-thanks ">Skip</button></div>
		</div>
	</div>
	`)
}

function checkIfRankNeededAndAndAddRank(callbackIfNot) {
  checkIfRankNeeded(function() {
    oneClickPopupHtmlToBody(null)

    chrome.runtime.sendMessage({
      action: "rankRequested",
    })
  },callbackIfNot)
}
function checkIfRankNeeded(callback, callbackIfNot) {
  chrome.runtime.sendMessage(
    {
      action: "checkIfNeedRating",
    },
    function(ratingNeeded) {
      if (ratingNeeded) {
        callback()
      }
      else if('function' == typeof callbackIfNot){
        callbackIfNot();
      }
    }
  )
}

function removeRateRequest() {
  var popup = document.getElementsByClassName("pleaseRate")[0]
  if (popup) {
    popup.parentElement.removeChild(popup)
  }
  if('function' == typeof afterRemoveRateRequest){
    afterRemoveRateRequest();
  }
}
//console.log(typeof openRankPopupWhenPossible );

if (
  "undefined" != typeof openRankPopupWhenPossible &&
  openRankPopupWhenPossible
) {
  //console.log('this');
  checkIfRankNeededAndAndAddRank()
}
function oneClickPopupHtmlToBody(extension) {
  var html = oneClickGetPopupHtml(extension)
  var div = document.createElement("div")
  div.innerHTML = html
  document.body.appendChild(div)
  div.addEventListener("click", function(e) {
    e.stopPropagation()
  })
  document.body.addEventListener("click", removeRateRequest)
  document
    .getElementsByClassName("no-thanks")[0]
    .addEventListener("click", removeRateRequest)
  if (isInpopup) {
    fixForPopup()
  }
}

function fixForPopup() {
  var pop = document.getElementsByClassName("pleaseRate")[0]
  pop.style.position = "static"

  document.body.style["min-width"] = "520px"
}
