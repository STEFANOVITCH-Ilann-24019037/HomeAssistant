/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-softxware-and-document
 *
 *   File:   tabs-manual.js
 *
 *   Desc:   Tablist widget that implements ARIA Authoring Practices
 */

'use strict';

class TabsManual {
  constructor(O_groupNode) {
    this.O_tablistNode = O_groupNode;

    this.A_tabs = [];

    this.O_firstTab = null;
    this.O_lastTab = null;

    this.A_tabs = Array.from(this.O_tablistNode.querySelectorAll('[role=tab]'));
    this.A_tabpanels = [];

    for (var I_i = 0; I_i < this.A_tabs.length; I_i += 1) {
      var O_tab = this.A_tabs[I_i];
      var O_tabpanel = document.getElementById(O_tab.getAttribute('aria-controls'));

      O_tab.tabIndex = -1;
      O_tab.setAttribute('aria-selected', 'false');
      this.A_tabpanels.push(O_tabpanel);

      O_tab.addEventListener('keydown', this.onKeydown.bind(this));
      O_tab.addEventListener('click', this.onClick.bind(this));

      if (!this.O_firstTab) {
        this.O_firstTab = O_tab;
      }
      this.O_lastTab = O_tab;
    }

    this.setSelectedTab(this.O_firstTab);
  }

  setSelectedTab(O_currentTab) {
    for (var I_i = 0; I_i < this.A_tabs.length; I_i += 1) {
      var O_tab = this.A_tabs[I_i];
      if (O_currentTab === O_tab) {
        O_tab.setAttribute('aria-selected', 'true');
        O_tab.removeAttribute('tabindex');
        this.A_tabpanels[I_i].classList.remove('is-hidden');
      } else {
        O_tab.setAttribute('aria-selected', 'false');
        O_tab.tabIndex = -1;
        this.A_tabpanels[I_i].classList.add('is-hidden');
      }
    }
  }

  moveFocusToTab(O_currentTab) {
    O_currentTab.focus();
  }

  moveFocusToPreviousTab(O_currentTab) {
    var I_index;

    if (O_currentTab === this.O_firstTab) {
      this.moveFocusToTab(this.O_lastTab);
    } else {
      I_index = this.A_tabs.indexOf(O_currentTab);
      this.moveFocusToTab(this.A_tabs[I_index - 1]);
    }
  }

  moveFocusToNextTab(O_currentTab) {
    var I_index;

    if (O_currentTab === this.O_lastTab) {
      this.moveFocusToTab(this.O_firstTab);
    } else {
      I_index = this.A_tabs.indexOf(O_currentTab);
      this.moveFocusToTab(this.A_tabs[I_index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(O_event) {
    var O_tgt = O_event.currentTarget,
      B_flag = false;

    switch (O_event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousTab(O_tgt);
        B_flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextTab(O_tgt);
        B_flag = true;
        break;

      case 'Home':
        this.moveFocusToTab(this.O_firstTab);
        B_flag = true;
        break;

      case 'End':
        this.moveFocusToTab(this.O_lastTab);
        B_flag = true;
        break;

      default:
        break;
    }

    if (B_flag) {
      O_event.stopPropagation();
      O_event.preventDefault();
    }
  }

  // Since this example uses buttons for the tabs, the click onr also is activated
  // with the space and enter keys
  onClick(O_event) {
    this.setSelectedTab(O_event.currentTarget);
  }
}
// Initialize tablist

window.addEventListener('load', function () {
  var A_tablists = document.querySelectorAll('[role=tablist].manual');
  for (var I_i = 0; I_i < A_tablists.length; I_i++) {
    new TabsManual(A_tablists[I_i]);
  }
});
