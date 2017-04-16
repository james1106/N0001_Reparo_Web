;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-home_G" viewBox="0 0 1046 1024">' +
    '' +
    '<path d="M995.328 443.392L606.72 39.424c-24.064-25.088-56.32-38.912-91.136-38.912-34.304 0.512-66.56 13.824-90.624 38.912L36.352 443.392c-39.936 41.472-34.816 77.824-28.16 92.672 4.608 10.752 20.48 39.936 66.56 39.936h56.832v310.784c0 70.656 50.688 136.704 122.88 136.704H419.84v-329.216c0-35.328-5.12-54.784 30.72-54.784h131.072c35.84 0 30.72 19.456 30.72 54.784V1024h165.376c72.192 0 122.88-66.56 122.88-136.704v-310.784H957.44c46.08 0 61.952-29.184 66.56-39.936 6.144-15.36 11.264-51.2-28.672-93.184z" fill="#39CAA6" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yszk_B" viewBox="0 0 1106 1024">' +
    '' +
    '<path d="M376.32 307.712l119.296 177.152H415.232v31.232h102.4l0.512 44.032H415.232v31.232h102.912v76.8H588.8v-76.8h103.424v-31.232H588.8v-43.52l103.424-0.512v-31.232h-81.408l119.296-177.152h-80.896L552.96 462.848 457.216 307.712H376.32z m231.936 631.296s432.128-376.32 432.128-374.784c0 2.048-121.344 4.096-121.344 4.096h-66.56V104.448c0-20.992-16.896-37.888-37.888-37.888h-522.24c-20.992 0-37.888 16.896-37.888 37.888V568.32H67.584c-2.56 0 432.64 371.2 432.64 371.2s33.28 17.92 53.76 17.92c20.48-0.512 54.272-18.432 54.272-18.432zM187.904 501.248v-66.56-330.24C187.904 46.592 234.496 0 292.352 0h522.24c57.856 0 104.448 46.592 104.448 104.448v396.8h123.904c34.816-0.512 63.488 27.136 64 61.44v1.024c0 15.36-5.632 29.184-14.848 39.936l-439.808 385.024c-28.16 22.528-62.976 34.304-98.816 34.816-35.328 0-69.632-11.776-97.28-34.304l-434.688-378.88-3.072-3.072-3.072-1.536c-9.728-11.776-15.36-25.6-15.36-41.472 0-28.672 19.456-52.736 46.08-59.904l15.36-2.56h59.904l66.56-0.512z" fill="#0096D7" ></path>' +
    '' +
    '<path d="M228.352 51.2h629.76l12.8 465.92 163.84 20.48 17.92 33.28-499.2 422.4L28.672 573.44l194.56-30.72z" fill="#0096D7" ></path>' +
    '' +
    '<path d="M456.192 222.208l97.28 190.464 97.28-190.464h81.92L611.84 440.32h82.432v38.4h-104.448l-0.512 0.512V532.48h104.96v38.4h-104.96V665.6H517.12v-94.208H413.184V532.48h104.448V479.232l-0.512-0.512H413.184V440.32h81.92L374.272 222.208h81.92z" fill="#FFFFFF" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-yszk_G" viewBox="0 0 1106 1024">' +
    '' +
    '<path d="M376.32 307.712l119.296 177.152H415.232v31.232h102.4l0.512 44.032H415.232v31.232h102.912v76.8H588.8v-76.8h103.424v-31.232H588.8v-43.52l103.424-0.512v-31.232h-81.408l119.296-177.152h-80.896L552.96 462.848 457.216 307.712H376.32z m231.936 631.296s432.128-376.32 432.128-374.784c0 2.048-121.344 4.096-121.344 4.096h-66.56V104.448c0-20.992-16.896-37.888-37.888-37.888h-522.24c-20.992 0-37.888 16.896-37.888 37.888V568.32H67.584c-2.56 0 432.64 371.2 432.64 371.2s33.28 17.92 53.76 17.92c20.48-0.512 54.272-18.432 54.272-18.432zM187.904 501.248v-66.56-330.24C187.904 46.592 234.496 0 292.352 0h522.24c57.856 0 104.448 46.592 104.448 104.448v396.8h123.904c34.816-0.512 63.488 27.136 64 61.44v1.024c0 15.36-5.632 29.184-14.848 39.936l-439.808 385.024c-28.16 22.528-62.976 34.304-98.816 34.816-35.328 0-69.632-11.776-97.28-34.304l-434.688-378.88-3.072-3.072-3.072-1.536c-9.728-11.776-15.36-25.6-15.36-41.472 0-28.672 19.456-52.736 46.08-59.904l15.36-2.56h59.904l66.56-0.512z" fill="#39CAA6" ></path>' +
    '' +
    '<path d="M228.352 51.2h629.76l12.8 465.92 163.84 20.48 17.92 33.28-499.2 422.4L28.672 573.44l194.56-30.72z" fill="#39CAA6" ></path>' +
    '' +
    '<path d="M456.192 222.208l97.28 190.464 97.28-190.464h81.92L611.84 440.32h82.432v38.4h-104.448l-0.512 0.512V532.48h104.96v38.4h-104.96V665.6H517.12v-94.208H413.184V532.48h104.448V479.232l-0.512-0.512H413.184V440.32h81.92L374.272 222.208h81.92z" fill="#FFFFFF" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)