const aiModeKey = 'hideAiMode';
const aiOverviewsKey = 'hideAiOverviews';

const toggleAiMode = document.getElementById('toggleAiMode');
const toggleAiOverviews = document.getElementById('toggleAiOverviews');
const aiModeLabel = document.getElementById('aiModeLabel');
const aiOverviewsLabel = document.getElementById('aiOverviewsLabel');

const setLocalizedText = () => {
  aiModeLabel.textContent = chrome.i18n.getMessage('aiModeLabel');
  aiOverviewsLabel.textContent = chrome.i18n.getMessage('aiOverviewsLabel');
};

const saveOptions = async () => {
  await chrome.storage.sync.set({
    [aiModeKey]: toggleAiMode.checked,
    [aiOverviewsKey]: toggleAiOverviews.checked,
  });
};

const restoreOptions = async () => {
  const result = await chrome.storage.sync.get({
    [aiModeKey]: true,
    [aiOverviewsKey]: true,
  });

  toggleAiMode.checked = result[aiModeKey];
  toggleAiOverviews.checked = result[aiOverviewsKey];
};

setLocalizedText();

toggleAiMode.addEventListener('change', saveOptions);
toggleAiOverviews.addEventListener('change', saveOptions);

restoreOptions();
