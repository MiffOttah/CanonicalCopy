"use strict";

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.getCanonicalUrl){
		const link = document.querySelector("link[rel='canonical']");
		const curl = link && link.href ? link.href : ""+window.location;
  	sendResponse({canonicalUrl: curl});
	}
});
