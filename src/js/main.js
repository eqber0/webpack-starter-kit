// Imports
import icons from "../icons/icons"

// Functions
var app = {
  load() {
    console.log("load")
  },
  resized() {
    console.log("resized")
  },
  iconSpriteFn() {
    icons.forEach(iconSpriteFn)
    function iconSpriteFn(item, index) {
      const iconSprite = document.querySelector("#iconSprite")
      if (iconSprite) {
        iconSprite.innerHTML +=
          "<div class='icon-sprite__item'>" +
          "<span class='icon-sprite__number'>" +
          (index + 1) +
          "</span>" +
          "<div class='icon-sprite__preview'>" +
          "<span class='icon icon-font'>" +
          item.iconSvg +
          "</span>" +
          "</div>" +
          "<div class='icon-sprite__name'>" +
          item.iconId +
          "</div>" +
          "</div>"
      }

      const icon = document.querySelectorAll(".icon")
      if (icon) {
        Array.prototype.forEach.call(icon, (el) => {
          let dataIconId = el.getAttribute("data-icon-id")
          if (dataIconId == item.iconId) {
            el.innerHTML = item.iconSvg
          }
        })
      }
    }
  },
  testFn() {
    console.log("Other functions works like this.")
  },

  init: function () {
    app.load()
    app.testFn()
    app.iconSpriteFn()
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
