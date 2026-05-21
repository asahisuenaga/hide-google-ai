const pathname = window.location.pathname;
const searchParams = new URLSearchParams(window.location.search);

// --- /search logic ---
if (pathname === "/search") {
  const observer = new MutationObserver(() => {
    // Hide AI Mode tab
    document.querySelectorAll('.olrp5b').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.Wm5I1e').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.related-question-pair:has(.XTvndd)').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[jscontroller=Elkdbc]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('button.plR5qb').forEach(el => el.style.display = 'none');
    
    // Hide AI Overviews
    const ai_overviews = document.querySelectorAll('.hdzaWe');
    ai_overviews.forEach(ai_overviews => {
        ai_overviews.style.display = 'none';
        ai_overviews.style.visibility = 'hidden';
        ai_overviews.style.height = '0';
    });
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

// --- Homepage logic (/ or /?zx=...) ---
if (
  (pathname === "/" || pathname === "/webhp") &&
  (!searchParams.has("q") || searchParams.has("zx"))
) {
  const hideHomepageStuff = () => {
    const btn = document.querySelector('.plR5qb');
    if (btn) btn.style.display = "none";
    const containerElement = document.querySelector('.dRYYxd');
    if (containerElement) {
      containerElement.style.setProperty('background', 'none');
    };

    document.querySelectorAll('.UbbAWe').forEach(el => {
      el.removeAttribute('aria-label');     // remove aria-label
      el.style.pointerEvents = 'none';      // disable clicking
      el.style.cursor = 'default';          // remove pointer cursor

      // remove hover background
      ['mouseenter', 'mouseover', 'mousemove'].forEach(evt => el.addEventListener(evt, () => el.style.background = 'transparent'));
    });

    // change "+" icon to search icon
    const path = document.querySelector('.UbbAWe svg path');
    if (path) {
      path.setAttribute('d', 'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56Z M380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z');
    }
  };

  hideHomepageStuff();
  const homeObserver = new MutationObserver(hideHomepageStuff);
  homeObserver.observe(document, { childList: true, subtree: true });
}