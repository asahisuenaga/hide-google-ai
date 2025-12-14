const pathname = window.location.pathname;
const searchParams = new URLSearchParams(window.location.search);

// --- /search logic ---
if (pathname === "/search") {
  const observer = new MutationObserver(() => {
    // Adds margin-top to right-hand side
    const altMain = document.querySelector('#rhs');
    if (altMain) altMain.style.marginTop = "24px";

    // Hide AI Mode tab
    document.querySelectorAll('.olrp5b').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.Wm5I1e').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.related-question-pair:has(.XTvndd)').forEach(el => el.style.display = 'none');
    document.querySelectorAll('[jscontroller=Elkdbc]').forEach(el => el.style.display = 'none');
    document.querySelectorAll('button.plR5qb').forEach(el => el.style.display = 'none');
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

// --- Homepage logic (/ or /?zx=...) ---
if (
  pathname === "/" &&
  (!searchParams.has("q") || searchParams.has("zx"))
) {
  const hideHomepageStuff = () => {
    const btn = document.querySelector('.plR5qb');
    if (btn) btn.style.display = "none";
    const containerElement = document.querySelector('.dRYYxd');
    if (containerElement) {
      containerElement.style.setProperty('background', 'none');
    };
  };

  hideHomepageStuff();
  const homeObserver = new MutationObserver(hideHomepageStuff);
  homeObserver.observe(document, { childList: true, subtree: true });
}