chrome.tabs.onCreated.addListener((tab) => {
  // Check if it's a default blank new tab
  if (tab.pendingUrl === "chrome://newtab/" || tab.url === "chrome://newtab/") {
    chrome.tabs.update(tab.id, {
      url: "https://www.google.com"
    });
  }
});