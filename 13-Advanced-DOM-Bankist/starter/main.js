import { emphasizeNavItem, deEmphasizeNavItems, InitStickyNav } from './nav.js';

const dataSelector = 'data-action';

const eventRegistry = {
  elementBased: {
    events: ['mouseover', 'mouseout'],
    actions: {
      'emphasize-nav-item': emphasizeNavItem,
      'deemphasize-nav': deEmphasizeNavItems,
    },
  },
  nonElementBased: {
    events: ['scroll'],
    actions: { 'sticky-nav': InitStickyNav },
  },
};

// Initialize non-element-based events
const initializeNonElementBasedEvents = function () {
  for (const [key, value] of Object.entries(
    eventRegistry.nonElementBased.actions,
  )) {
    const element = document.querySelectorAll(`[${dataSelector}="${key}"]`);

    // Guard clause, if no element is found, we skip the initialization of the event listener for that action
    if (element) {
      const initializer = value;

      element.forEach(element => {
        initializer(element);
      });
    }
  }
};

// We use event delegation to handle events on elements that may not exist at the time of the event listener assignment, and to avoid having to assign event listeners to each individual element. This allows us to have a more flexible HTML structure without having to worry about event delegation for each individual element.
const eventListener = function (event) {
  // Handle element-based events
  if (eventRegistry.elementBased.events.includes(event.type)) {
    const trigger = event.target.closest(dataSelector);

    // Guard clause
    if (!trigger) return;

    // We get the action from the data attribute of the trigger element, and we use it to find the corresponding handler in the event registry. This allows us to have a more flexible HTML structure without having to worry about event delegation for each individual element, and it also allows us to easily add new actions and handlers without having to modify the event listener code.
    const action = trigger.dataset.action;
    const handler = eventRegistry.elementBased.actions[action];

    if (handler) handler(trigger);
  }
};

// Initialization of non-element-based events and event delegation for element-based events
initializeNonElementBasedEvents();
// document.addEventListener('mouseover', eventListener);
// document.addEventListener('mouseout', eventListener);
