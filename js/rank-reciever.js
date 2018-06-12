function getPopupHtml(){
	var menifest = chrome.runtime.getManifest(),
		html = '<div class="pleaseRate" style="position:absolute; left: 15%;top:100px;font-size:40px;padding:10px;background-color:white;border:1px solid gray;border-radius:3px">';
	html += 	chrome.i18n.getMessage("do_you_like_ext", [menifest.name]);
	html += '<hr>';
	//Please rate us!
	html += '<div style=font-size:22px;text-align:center>' + chrome.i18n.getMessage("please_rate_a") + "<br>" + chrome.i18n.getMessage("please_rate_b") + '</div>';
	html += '<br><br>'
	html += '<button><a target=_blank href="https://chrome.google.com/webstore/details/' + chrome.runtime.id +'/reviews" style="padding:20px;font-size:20px;font-weight:bolder">' + chrome.i18n.getMessage("rate_now") + '</a>&nbsp;';
	html += '<button class="no-thanks">' + chrome.i18n.getMessage("rate_no_thanks") + '</button><br>';
	html += '<a href="' +  localStorage.getItem('githubUrl') + '">' + chrome.i18n.getMessage("fork_on_github") + '</a>'
	html += '</div>'
	return html;
}


function checkIfRankNeededAndAndAddRank(){
	checkIfRankNeeded(function(){
		var html = getPopupHtml(),
			div = document.createElement('div');
		div.innerHTML = html;
		document.body.append(div);
		document.getElementsByClassName('no-thanks')[0].addEventListener('click', removeRateRequest);
		chrome.runtime.sendMessage({
	    	action: 'rankRequested'
	  	})
	})
}
function checkIfRankNeeded(callback){
	chrome.runtime.sendMessage({
	    action: 'checkIfNeedRating',
	  }, function(ratingNeeded){   
	  	if(ratingNeeded){
	  		callback();
	  	}
	  });
}

function removeRateRequest(){
	var popup = document.getElementsByClassName('pleaseRate')[0];
	if(popup){
		popup.parentElement.removeChild(popup);
	}
}
//console.log(typeof openRankPopupWhenPossible );

if('undefined' != typeof openRankPopupWhenPossible && openRankPopupWhenPossible){
	//console.log('this');
	checkIfRankNeededAndAndAddRank();
}