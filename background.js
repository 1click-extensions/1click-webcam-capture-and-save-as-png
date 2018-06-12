chrome.runtime.setUninstallURL("https://1ce.org");
localStorage.setItem('githubUrl','https://github.com/1click-extensions/1click-save-screenshot-as-png');
if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}
//console.log(chrome.browserAction.onClicked);
chrome.browserAction.onClicked.addListener(function(tab){
  
  chrome.tabs.create({"url" : chrome.runtime.getURL('pages/capture.html')});  
 });
