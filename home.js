document.querySelectorAll(".toggle").forEach((item) => {
  item.addEventListener("click", function (event) {
      let nestedList = this.nextElementSibling;

      if (nestedList && nestedList.classList.contains("nested")) {
          let parentLi = this.parentElement;
          let parentUl = parentLi.closest("ul");

          // 1. Collapse Siblings (at the same level):
          collapseSiblings(nestedList, parentUl);

          // 2. Collapse Ancestor's Siblings (up to level 5):
          collapseAncestorSiblings(parentLi, 5);

          // 3. Toggle the clicked item's submenu:
          nestedList.style.display =
              nestedList.style.display === "block" ? "none" : "block";
          parentLi.classList.toggle("open");

          event.stopPropagation();
      }
  });
});

function collapseSiblings(nestedList, parentUl) {
  if (parentUl) {
      parentUl.querySelectorAll(":scope > li > ul.nested").forEach((sibling) => {
          if (sibling !== nestedList) {
              sibling.style.display = "none";
              sibling.parentElement.classList.remove("open");
          }
      });
  }
}

function collapseAncestorSiblings(currentLi, levels) {
  let currentLevel = 1;
  let parentLi = currentLi.parentElement;

  while (parentLi && currentLevel < levels) {
      let parentUl = parentLi.parentElement;
      if (parentUl) {
          collapseSiblings(null, parentUl); // Collapse siblings of the ancestor
      }
      parentLi = parentUl?.parentElement;
      currentLevel++;
  }
}


// Add this function to expand all top-level items on load
function expandTopLevel() {
  document.querySelectorAll(".nav > li > .toggle").forEach(toggle => {
      let nestedList = toggle.nextElementSibling;
      if (nestedList && nestedList.classList.contains("nested")) {
          nestedList.style.display = "block";  // Show the nested list
          toggle.parentElement.classList.add("open"); // Add the "open" class
      }
  });
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', expandTopLevel);

document.querySelectorAll(".nested").forEach(nested => {
  nested.style.display = "block";
});
