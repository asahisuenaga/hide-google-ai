const pathname = window.location.pathname;
const searchParams = new URLSearchParams(window.location.search);

// --- /search logic ---
if (pathname === "/search") {
  const patterns = [
    /übersicht mit ki/i,
    /ai overview/i,
    /prezentare generală generată de ai/i,
    /AI による概要/,
    /Обзор от ИИ/,
    /AI 摘要/,
    /AI-overzicht/i,
    /Vista creada con IA/i,
    /Přehled od AI/i,
  ];

  const observer = new MutationObserver(() => {
    const mainBody = document.querySelector('div#rcnt');
    const aiText = mainBody
      ? [...mainBody.querySelectorAll('h1, h2')].find(e =>
          patterns.some(pattern => pattern.test(e.innerText))
        )
      : null;

    let aiOverview = aiText?.closest('div#rso > div');
    if (!aiOverview) aiOverview = aiText?.closest('div#rcnt > div');

    if (aiOverview) aiOverview.style.display = "none";

    const headerTabs = document.querySelector('div#hdtb-sc > div');
    if (headerTabs) headerTabs.style.paddingBottom = "12px";

    const mainElement = document.querySelector('[role="main"]');
    const altMain = document.querySelector('#rhs');

    if (mainElement) mainElement.style.marginTop = "24px";
    if (altMain) altMain.style.marginTop = "24px";

    document.querySelectorAll('.olrp5b').forEach(el => el.style.display = 'none');
    
    const aiCards = document.querySelectorAll('div.h7W2Pb.Ww4FFb.vt6azd');
        aiCards.forEach(el => {
            const parent = el.parentElement;
            if (parent) parent.style.display = 'none';
    });

    const peopleAlsoAskAiOverviews = [
      ...document.querySelectorAll("div.related-question-pair"),
    ].filter((el) => patterns.some((pattern) => pattern.test(el.innerHTML)));

    peopleAlsoAskAiOverviews.forEach((el) => {
      el.parentElement.parentElement.style.display = "none";
    });
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