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
