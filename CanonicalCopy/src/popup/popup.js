"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const urlField = document.getElementById("urlField");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {getCanonicalUrl: true}, function(response) {
      if (response && response.canonicalUrl){
        urlField.value = response.canonicalUrl;
        urlField.focus();
        urlField.select();
      }
    });
  });

  document.querySelector("form").addEventListener("submit", e => {
    urlField.focus();
    urlField.select();
    document.execCommand("copy");

    e.preventDefault();
  });
});
