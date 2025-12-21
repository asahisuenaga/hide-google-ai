chrome.tabs.onCreated.addListener((tab) => {
  const isNewTab = 
    tab.pendingUrl === "chrome://newtab/" || 
    tab.url === "chrome://newtab/" ||
    tab.url === "about:newtab" ||
    tab.url === "about:home" |
    tab.url === "about:blank"; 

  if (isNewTab) {
    chrome.tabs.update(tab.id, { url: "https://www.google.com"
    });
  }
});