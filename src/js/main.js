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

  languageDropdownFn() {
    const headerLanguage = document.querySelector(".header__language")
    if (headerLanguage) {
      const selected = headerLanguage.querySelector(
        ".header__language-selected"
      )
      const dropdown = headerLanguage.querySelector(
        ".header__language-dropdown"
      )
      selected.addEventListener("click", () => {
        const dropdownH = dropdown.scrollHeight
        if (headerLanguage.classList.contains("dropdown-opened")) {
          dropdown.style.height = "0px"
          headerLanguage.classList.remove("dropdown-opened")
        } else {
          dropdown.style.height = dropdownH + 60 + "px"
          headerLanguage.classList.add("dropdown-opened")
        }
      })
    }
  },
  mobileMenuFn() {
    const mobileMenu = document.querySelector(".mobile-menu")
    if (mobileMenu) {
      const header = document.querySelector(".header")
      const body = document.querySelector("body")
      const toggleBtn = document.querySelector(".header__menu-btn")
      let isOpen
      toggleBtn.addEventListener("click", () => {
        if (isOpen) {
          header.classList.remove("menu-opened")
          mobileMenu.classList.remove("opened")
          body.style.overflow = ""
          isOpen = false
        } else {
          header.classList.add("menu-opened")
          mobileMenu.classList.add("opened")
          body.style.overflow = "hidden"
          isOpen = true
        }
      })

      // Mobile Menu Dropdown
      const dropdownItem = document.querySelectorAll(
        ".mobile-menu__nav-item--dropdown"
      )
      dropdownItem.forEach((item) => {
        const itemLink = item.querySelector(".mobile-menu__nav-item__link ")
        itemLink.addEventListener("click", () => {
          const dropdown = item.querySelector(
            ".mobile-menu__nav-item__dropdown"
          )
          const dropdownH = dropdown.scrollHeight

          if (item.classList.contains("dropdown-opened")) {
            item.classList.remove("dropdown-opened")
            dropdown.style.height = "0px"
          } else {
            dropdownItem.forEach((e) => {
              e.classList.remove("dropdown-opened")
              e.querySelector(".mobile-menu__nav-item__dropdown").style.height =
                "0px"
            })

            item.classList.add("dropdown-opened")
            dropdown.style.height = dropdownH + "px"
          }
        })
      })
    }
  },

  init: function () {
    app.load()
    app.languageDropdownFn()
    app.mobileMenuFn()
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
