// Imports
import components from "./component.js"
components()

// Functions
var app = {
  load() {
    console.log("load")
  },
  resized() {
    console.log("resized")
  },
  // Base Functions
  uikitFn() {
    const uiContent = document.querySelectorAll(
      ".js-uikit-content .uikit__item"
    )
    const uiSide = document.querySelector(".js-uikit-side")
    uiContent.forEach((uiContent, i) => {
      let uiContentName = uiContent.getAttribute("id")
      const uiLinkItem = document.createElement("li")
      const uiLinkItemA = document.createElement("a")
      uiLinkItemA.setAttribute("href", `#${uiContentName}`)
      uiLinkItem.classList.add("uikit__side-item")
      uiLinkItem.appendChild(uiLinkItemA)
      uiLinkItemA.innerHTML = uiContentName.replace(/-/g, " ")

      let uiContentParent = uiContent.getAttribute("data-ui-parent")

      uiSide.querySelectorAll(".uikit__side-field").forEach((element) => {
        var title = element.querySelector(".uikit__side-title")
        if (title.innerHTML === uiContentParent) {
          element.querySelector(".uikit__side-list").appendChild(uiLinkItem)
        }
      })
    })
  },

  init: function () {
    app.load()
    app.uikitFn()
  },
}

function docReadied(fn) {
  window.addEventListener("DOMContentLoaded", fn)
}
function docResized(fn) {
  window.addEventListener("resize", fn)
}
docReadied(() => {
  app.init()
})

docResized(() => {
  app.resized()
})

export default { docResized, docReadied }
