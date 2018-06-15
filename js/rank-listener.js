chrome.runtime.onMessage.addListener(function (data, sender, callback) {
	switch(data.action){
		//needs permission to do it
		case 'injectJs':
			//console.log('clicke',tab.id, chrome.runtime.getURL('js/rank-reciever.js'));
 			
			chrome.tabs.executeScript(sender.tab.id,{file:'js/extention-data.js'});
			chrome.tabs.executeScript(sender.tab.id,{file:'js/show-popup.js'}, function(){
				chrome.tabs.executeScript(sender.tab.id,{code:"checkIfRankNeededAndAndAddRank()"})
			});
			//console.log(sender.tab, sender.tab.id);
			break;
		case 'checkIfNeedRating':
		console.log(localStorage.getItem('rankRequested'));
			callback(!localStorage.getItem('rankRequested'));
			break;
		case 'rankRequested':
			localStorage.setItem('rankRequested', 1);
			break;
	}
});