/* Nav item focus hover is better implemented using css, this pattern can be repeated by using a generalized class */

// Global selectors
const NAV_ITEM_SELECTOR = "[data-action='emphasize-nav-item']";

export function emphasizeNavItem(trigger) {
  const navItems = trigger.parentElement.querySelectorAll(NAV_ITEM_SELECTOR);

  if (!navItems) return;

  navItems.forEach(link => {
    if (link !== trigger) link.classList.toggle('nav__item--occluded');
  });
}

export function deEmphasizeNavItems(trigger) {
  const navItems = trigger.querySelectorAll(NAV_ITEM_SELECTOR);
  if (!navItems) return;

  navItems.forEach(link => {
    link.classList.remove('nav__item--occluded');
  });
}

// After scrolling past the header, the nav becomes sticky
export function InitStickyNav(navBar) {
  const navHeight = navBar.getBoundingClientRect().height;
  let thresholdHeight = 500; // Fallback value in case section1 is not found
  let header = navBar; // Fallback to navBar if section1 is not found

  try {
    header = navBar.parentElement; // Assuming the header is the parent of the navBar
    if (!header) {
      console.warn('Header not found. Using fallback threshold height.');
    } else {
      thresholdHeight = header.getBoundingClientRect().top - navHeight;
    }
  } catch (error) {
    console.error('Error selecting header:', error);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        console.log(entry);
        if (!entry.isIntersecting) {
          navBar.classList.add('sticky');
        } else {
          navBar.classList.remove('sticky');
        }
      });
    },
    {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    },
  );

  observer.observe(header);
}
