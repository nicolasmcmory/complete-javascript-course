import { emphasizeNavItem, deEmphasizeNavItems } from './nav.js';

const actionRegistry = {
  'emphasize-nav-item': emphasizeNavItem,
  'deemphasize-nav': deEmphasizeNavItems,
};

// Event delegation: we listen for events on the document, and then check if the event target (or its closest ancestor) has a data-action attribute. If it does, we look up the corresponding handler in the actionRegistry and call it with the trigger element as an argument.
const eventListener = function (event) {
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;

  const action = trigger.dataset.action;
  const handler = actionRegistry[action];

  if (handler) handler(trigger);
};

// Event listener assingments
// document.addEventListener('mouseover', eventListener);
// document.addEventListener('mouseout', eventListener);
