// Imports
import Headroom from "headroom.js"
import components from "./component.js"
import "iconify-icon"
// Functions
var app = {
  load() {
    components()
    console.log("load")
  },
  resized() {
    console.log("resized")
  },
  preloaderFn() {
    const preloader = document.querySelector(".preloader")
    if (preloader) {
      preloader.classList.add("hidden")
      setTimeout(() => {
        preloader.remove()
      }, 400)
    }
  },
  cookieAlertFn() {
    const cookieAlert = document.querySelector(".js-cookie-alert")
    if (cookieAlert) {
      const acceptBtn = document.querySelector(".js-cookie-accept")
      const declineBtn = document.querySelector(".js-cookie-decline")

      function getCookie(name) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(";").shift()
        return null
      }

      function setCookie(name, value, days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // Set expiration time in milliseconds
        const expires = `expires=${date.toUTCString()}`
        document.cookie = `${name}=${value}; ${expires}; path=/`
      }

      if (getCookie("cookieConsent") !== "true") {
        setTimeout(() => {
          cookieAlert.classList.remove("hidden")
        }, 1500)
      } else {
        cookieAlert.remove()
      }

      function acceptCookies() {
        setCookie("cookieConsent", "true", 30)
        cookieAlert.classList.add("hidden")
        setTimeout(() => {
          cookieAlert.remove()
        }, 350)
      }
      function declineCookies() {
        cookieAlert.classList.add("hidden")
        setTimeout(() => {
          cookieAlert.remove()
        }, 350)
      }
      acceptBtn.addEventListener("click", acceptCookies)
      declineBtn.addEventListener("click", declineCookies)
    }
  },
  headroomFn() {
    const header = document.querySelector("header")
    const options = {
      offset: {
        up: 100,
        down: 50,
      },
      tolerance: {
        up: 5,
        down: 0,
      },
      classes: {
        initial: "header",
        pinned: "header--pinned",
        unpinned: "header--unpinned",
        top: "header--top",
        notTop: "header--not-top",
        bottom: "header--bottom",
        notBottom: "header--not-bottom",
        frozen: "header--frozen",
      },
    }
    const headroom = new Headroom(header, options)
    headroom.init()
  },
  languageDropdownFn() {
    const headerLanguage = document.querySelector(".header__language")
    if (headerLanguage) {
      const selected = headerLanguage.querySelector(".header__language-selected")
      const dropdown = headerLanguage.querySelector(".header__language-dropdown")
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
      const dropdownItem = document.querySelectorAll(".mobile-menu__nav-item--dropdown")
      dropdownItem.forEach((item) => {
        const itemLink = item.querySelector(".mobile-menu__nav-item__link ")
        itemLink.addEventListener("click", () => {
          const dropdown = item.querySelector(".mobile-menu__nav-item__dropdown")
          const dropdownH = dropdown.scrollHeight

          if (item.classList.contains("dropdown-opened")) {
            item.classList.remove("dropdown-opened")
            dropdown.style.height = "0px"
          } else {
            dropdownItem.forEach((e) => {
              e.classList.remove("dropdown-opened")
              e.querySelector(".mobile-menu__nav-item__dropdown").style.height = "0px"
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
    app.preloaderFn()
    app.cookieAlertFn()
    app.headroomFn()
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
