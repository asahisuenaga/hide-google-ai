const pathname = window.location.pathname;
const searchParams = new URLSearchParams(window.location.search);
const DEFAULT_SETTINGS = {
  hideAiMode: true,
  hideAiOverviews: true,
};

const STYLE_ID = 'hide-google-ai-style';
const AI_MODE_SELECTORS = ['.olrp5b', '[jscontroller=Elkdbc]', 'button.plR5qb'];
const AI_OVERVIEW_SELECTORS = ['.Wm5I1e', '.related-question-pair:has(.XTvndd)'];
const AI_OVERVIEW_BOX_SELECTOR = '.hdzaWe';

const createHideStyle = () => {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    (document.head || document.documentElement).appendChild(style);
  }
  return style;
};

const updateHideStyle = (settings) => {
  const rules = [];
  if (settings.hideAiMode) {
    rules.push(`${AI_MODE_SELECTORS.join(', ')} { display: none !important; }`);
  }
  if (settings.hideAiOverviews) {
    rules.push(`${[...AI_OVERVIEW_SELECTORS, AI_OVERVIEW_BOX_SELECTOR].join(', ')} { display: none !important; }`);
    rules.push(`${AI_OVERVIEW_BOX_SELECTOR} { visibility: hidden !important; height: 0 !important; }`);
  }
  createHideStyle().textContent = rules.join('\n');
};

const setDisplayNone = (selectors) => {
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
  });
};

const restoreDisplay = (selectors) => {
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.style.removeProperty('display'));
  });
};

const hideAiModeElements = () => setDisplayNone(AI_MODE_SELECTORS);
const restoreAiModeElements = () => restoreDisplay(AI_MODE_SELECTORS);

const hideAiOverviewElements = () => {
  setDisplayNone([...AI_OVERVIEW_SELECTORS, AI_OVERVIEW_BOX_SELECTOR]);
  document.querySelectorAll(AI_OVERVIEW_BOX_SELECTOR).forEach(el => {
    el.style.visibility = 'hidden';
    el.style.height = '0';
  });
};

const restoreAiOverviewElements = () => {
  restoreDisplay([...AI_OVERVIEW_SELECTORS, AI_OVERVIEW_BOX_SELECTOR]);
  document.querySelectorAll(AI_OVERVIEW_BOX_SELECTOR).forEach(el => {
    el.style.removeProperty('visibility');
    el.style.removeProperty('height');
  });
};

const applySearchPageHides = (settings) => {
  if (settings.hideAiMode) {
    hideAiModeElements();
  } else {
    restoreAiModeElements();
  }

  if (settings.hideAiOverviews) {
    hideAiOverviewElements();
  } else {
    restoreAiOverviewElements();
  }
};

const applyHomepageHides = () => {
  const btn = document.querySelector('.plR5qb');
  if (btn) btn.style.display = 'none';
  const containerElement = document.querySelector('.dRYYxd');
  if (containerElement) {
    containerElement.style.setProperty('background', 'none');
  }

  document.querySelectorAll('.UbbAWe').forEach(el => {
    el.removeAttribute('aria-label');
    el.style.pointerEvents = 'none';
    el.style.cursor = 'default';
    ['mouseenter', 'mouseover', 'mousemove'].forEach(evt => el.addEventListener(evt, () => el.style.background = 'transparent'));
  });

  const path = document.querySelector('.UbbAWe svg path');
  if (path) {
    path.setAttribute('d', 'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56Z M380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z');
  }
};

const restoreHomepageElements = () => {
  const btn = document.querySelector('.plR5qb');
  if (btn) btn.style.removeProperty('display');
  const containerElement = document.querySelector('.dRYYxd');
  if (containerElement) {
    containerElement.style.removeProperty('background');
  }

  document.querySelectorAll('.UbbAWe').forEach(el => {
    el.style.removeProperty('pointer-events');
    el.style.removeProperty('cursor');
    el.style.removeProperty('background');
  });

  const path = document.querySelector('.UbbAWe svg path');
  if (path) {
    path.setAttribute('d', 'M434.5-434.5H191.87v-91H434.5v-242.63h91v242.63h242.63v91H525.5v242.63h-91V-434.5Z');
  }
};

const observe = (callback) => {
  const observer = new MutationObserver(callback);
  observer.observe(document, { childList: true, subtree: true });
  return observer;
};

let searchObserver = null;
let homepageObserver = null;
let currentSettings = DEFAULT_SETTINGS;

const initialize = (settings) => {
  currentSettings = settings;
  updateHideStyle(settings);

  if (pathname === '/search') {
    applySearchPageHides(settings);
    if (!searchObserver) {
      searchObserver = observe(() => applySearchPageHides(currentSettings));
    }
  }

  if ((pathname === '/' || pathname === '/webhp') && (!searchParams.has('q') || searchParams.has('zx'))) {
    if (settings.hideAiMode) {
      applyHomepageHides();
    } else {
      restoreHomepageElements();
    }
    if (!homepageObserver) {
      homepageObserver = observe(() => {
        if (currentSettings.hideAiMode) {
          applyHomepageHides();
        } else {
          restoreHomepageElements();
        }
      });
    }
  }
};

const storageKeyChangeHandler = (changes, area) => {
  if (area !== 'sync') return;
  const settings = {
    hideAiMode: changes.hideAiMode ? changes.hideAiMode.newValue : currentSettings.hideAiMode,
    hideAiOverviews: changes.hideAiOverviews ? changes.hideAiOverviews.newValue : currentSettings.hideAiOverviews,
  };
  initialize(settings);
};

chrome.storage.onChanged.addListener(storageKeyChangeHandler);
chrome.storage.sync.get(DEFAULT_SETTINGS, initialize);
