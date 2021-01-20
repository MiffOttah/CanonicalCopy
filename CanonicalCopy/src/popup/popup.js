"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const urlField = document.getElementById("urlField");
  let canCopy = false;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (!tabs[0] || !/^https?:/.test(tabs[0].url)){
      document.querySelector("form").classList.add("unavailable");
      urlField.value = "(Could not get URL)";
    } else {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: '(function(){ const link = document.querySelector("link[rel=\'canonical\']"); return link && link.href ? link.href : ""+window.location; })()'
        }, function(result) {
          urlField.value = result;
          urlField.focus();
          urlField.select();
        }
      );
      canCopy = true;
    }
  });

  document.querySelector("form").addEventListener("submit", e => {
    if (canCopy){
      urlField.focus();
      urlField.select();
      document.execCommand("copy");
    }
    e.preventDefault();
  });
});
