import $ from "jquery"
import toastr from "toastr"
// import "toastr/build/toastr.min.css"
import tippy from "tippy.js"
// import "tippy.js/dist/tippy.css"
// import "tippy.js/animations/scale.css"
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import { CountUp } from "countup.js"

export default function components() {
  // Filter Tab
  const filterTab = document.querySelectorAll(".filter-tab")
  if (filterTab) {
    filterTab.forEach((filterTabEl) => {
      const tabItem = filterTabEl.querySelectorAll(".tab-item")
      const tabContent = filterTabEl.querySelectorAll(".tab-content")
      const tabContentParent = filterTabEl.querySelector(".filter-tab-content")
      let filterTabAnimation = filterTabEl.getAttribute("data-filter-animation")
      filterTabEl.classList.add(`filter-tab--${filterTabAnimation}`)

      tabItem.forEach((tabItemEl) => {
        tabItemEl.addEventListener("click", () => {
          if (!tabItemEl.classList.contains("active")) {
            //tab item
            let tabItemDataFilter = tabItemEl.getAttribute("data-filter")
            let tabItemActive = filterTabEl.querySelectorAll(".tab-item.active")
            tabItemActive.forEach((tabItemActiveEl) => {
              tabItemActiveEl.classList.remove("active")
            })
            tabItemEl.classList.add("active")

            //tab content
            tabContent.forEach((tabContentEl) => {
              tabContentEl.classList.add("filtering")
              setTimeout(() => {
                tabContentEl.classList.remove("filtering")
                tabContentEl.classList.add("filtered")
              }, 250)
            })
            tabContentParent
              .querySelectorAll(`.${tabItemDataFilter}`)
              .forEach((tabItemDataFilterEl) => {
                setTimeout(() => {
                  tabItemDataFilterEl.classList.remove("filtered")
                }, 250)
              })
          }
        })
      })
    })
  }
  // #Filter Tab

  // Accordion
  $("body").on("click", ".js-accordion-trigger", function () {
    $(this).toggleClass("active")
    const accordionGroup = $(this).closest(".accordion-wrapper")
    const item = $(this).closest(".accordion-item")
    let multipleShow = false

    if (accordionGroup.data("multiple-show") == true) {
      multipleShow = true
    } else {
      $(".js-accordion-trigger").not(this).removeClass("active")
    }
    let content = item.find(".accordion-calc")
    let contentHeight = content.outerHeight(true)
    console.log(contentHeight)
    if (item.hasClass("active") && !$(this).hasClass("force-open")) {
      item.find(".accordion-content").css("height", 0 + "px")
      item.removeClass("active")
    } else {
      if (!multipleShow) {
        accordionGroup.children(".accordion-item").removeClass("active")
        accordionGroup
          .children(".accordion-item")
          .find(".accordion-content")
          .css("height", 0 + "px")
      }
      item.addClass("active")
      item.find(".accordion-content").css("height", contentHeight)
    }
  })
  $(".accordion-item.opened .js-accordion-trigger").trigger("click")
  // #Accordion

  // Alert Toastr
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "4000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  }
  function alertToastr(type, message) {
    toastr[type](message)
  }
  window.alertToastr = alertToastr
  // #Alert Toastr

  // Tippy.js
  tippy("[data-tippy-content]", {
    animation: "scale",
  })
  // #Tippy.js

  // Fancybox
  Fancybox.bind("[data-fancybox]", {
    infinite: false,
    Escape: "close",
    Delete: "close",
    Backspace: "close",
    PageUp: "next",
    PageDown: "prev",
    ArrowUp: "next",
    ArrowDown: "prev",
    ArrowRight: "next",
    ArrowLeft: "prev",
  })
  // #Fancybox

  // Counter
  var countTupVal = $(".js-counter-item")
  countTupVal.each(function (index) {
    var value = $(countTupVal[index]).html()
    var countUpV = new CountUp(countTupVal[index], value, {
      enableScrollSpy: true,
      scrollSpyDelay: 100,
      scrollSpyOnce: true,
      duration: 5,
      useEasing: true,
      suffix: countTupVal[index].getAttribute("data-suffix"),
    })
    countUpV.handleScroll()
  })
  // #Counter

  // Input Function
  const inputItem = document.querySelectorAll(
    ".input-item input, .input-item textarea"
  )
  const selectInput = document.querySelectorAll(".input-item select")
  selectInput.forEach((select) => {
    select.addEventListener("change", () => {
      if (select.value === "") {
        select.parentNode.classList.remove("input-item--valued")
      } else {
        select.parentNode.classList.add("input-item--valued")
      }
    })
  })
  inputItem.forEach((e) => {
    // Autofill Class
    e.addEventListener("change", function (el) {
      if (el.target.value != "") {
        e.parentNode.classList.add("input-item--valued")
      } else {
        e.parentNode.classList.remove("input-item--valued")
      }
    })

    e.addEventListener("focusin", () => {
      e.parentNode.classList.add("input-item--focused")
    })
    e.addEventListener("focusout", () => {
      e.parentNode.classList.remove("input-item--focused")
      if (e.value === "") {
        e.parentNode.classList.remove("input-item--valued")
      } else {
        e.parentNode.classList.add("input-item--valued")
      }
    })
  })
  // #Input Function

  // File Upload
  const fileInput = document.querySelectorAll(".js-file-upload")
  fileInput.forEach((fileInputEl) => {
    let fileSelect = fileInputEl.parentNode
    fileSelect.onclick = function () {
      fileInputEl.click()
    }
    fileInputEl.addEventListener("change", () => {
      let selectField = fileSelect.querySelector(".js-file-upload-field")
      for (let i = 0; i < fileInputEl.files.length; i++) {
        const element = fileInputEl.files[i]
        if (fileInputEl.files.length > 0) {
          fileInputEl
            .closest(".input-item--file")
            .classList.add("input-item--valued")
          selectField.innerHTML += `<div class="input-item__file-item">
                    <span>${element.name}</span>
                    </div>`
        } else {
          fileInputEl
            .closest(".input-item--file")
            .classList.remove("input-item--valued")
        }
      }
    })
  })
  // #File Upload

  // Modal
  const modal = document.querySelectorAll(".main-modal")
  if (modal) {
    const openModalBtn = document.querySelectorAll(".js-open-modal")
    const closeModalBtn = document.querySelectorAll(".js-close-modal")
    openModalBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const id = button.getAttribute("data-modal-id")
        const currentModal = document.querySelector(
          `.js-modal[data-modal-id="modal-${id}"]`
        )
        currentModal.classList.add("active")
      })
    })
    closeModalBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        modal.forEach((item) => {
          item.classList.remove("active")
        })
      })
    })
  }
  // #Modal

  // Uikit Buttons
  const pagesDropdownBtn = document.querySelector(".js-uikit-pages-dropdown")
  if (pagesDropdownBtn) {
    pagesDropdownBtn.addEventListener("click", () => {
      document.querySelector(".front-ui-dropdown").classList.toggle("active")
    })
  }
  // #Uikit Buttons
}
