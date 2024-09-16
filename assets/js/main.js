const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
  card.style.transitionDuration = 0.2 + index / 20 + "s";
});

// window load animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// lottieIcon
const lottieIcon = document.querySelectorAll(".lottie-icon");

lottieIcon.forEach((icon) => {
  let src = icon.getAttribute("data-src");

  let animation = bodymovin.loadAnimation({
    container: icon,
    renderer: "svg",
    loop: true,
    autoplay: false,
    path: src,
  });
  icon.addEventListener("mouseenter", function () {
    animation.play();
  });
  icon.addEventListener("mouseleave", function () {
    animation.stop();
  });
});

// Change mode
const themeBtns = document.querySelectorAll(".theme-btns button");

function changeTheme(m) {
  document.documentElement.classList.remove(m == "dark" ? "light" : "dark");
  document.documentElement.classList.add(m);
  document.documentElement.setAttribute("data-bs-theme", m);
  localStorage.setItem("mode", m);

  for (let i = 0; i < themeBtns.length; i++) {
    let btn = themeBtns[i];
    if (btn.classList.contains(`theme-btn-${m}`)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }
}

if (localStorage.getItem("mode") == "light") {
  changeTheme("light");
} else {
  changeTheme("dark");
}

themeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("theme-btn-dark")) {
      changeTheme("dark");
    } else {
      changeTheme("light");
    }
  });
});

// NAV CONTROL INDECATOR
const nav = document.querySelectorAll(".nav");
nav.forEach((wrap) => {
  let btns = wrap.querySelectorAll(".nav-link");
  let indecator = wrap.querySelector(".nav-indecator");
  let w;

  indecator.style.height = btns[0].offsetHeight + "px";

  btns.forEach((btn) => {
    moveIndecator(btn);

    btn.addEventListener("click", () => {
      for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("selected");
      }
      btn.classList.add("selected");
      moveIndecator(btn);
    });
  });

  function moveIndecator(btn) {
    if (btn.classList.contains("selected")) {
      w = btn.offsetWidth;

      indecator.style.width = w + "px";
      indecator.style.left = btn.offsetLeft + "px";
    }
  }
});

// ISOTOP FILTER
// Function to change the custom order of a specific item
function changeItemOrder(itemSelector, newOrder) {
  $(itemSelector).attr("data-order", newOrder);
}

function gridResPos() {
  $(".grid-item").each(function (i) {
    $(this).attr("data-order", i + 1);
  });

  if (
    window.matchMedia("(min-width: 768px) and (max-width: 991.98px)").matches //md
  ) {
    changeItemOrder(".grid-item-6", 11);
    changeItemOrder(".grid-item-7", 11);
  } else if (
    window.matchMedia("(min-width: 992px) and (max-width: 1199.98px)").matches //lg
  ) {
    changeItemOrder(".grid-item-6", 11);
    changeItemOrder(".grid-item-7", 11);
  } else if (window.matchMedia("(max-width: 767.98px)").matches) {
    //sm
    changeItemOrder(".grid-item-8", 4);
    changeItemOrder(".grid-item-9", 4);
    changeItemOrder(".grid-item-10", 4);
  }
}

$(window).on("load", function () {
  gridResPos();

  var $grid = $(".grid").isotope({
    itemSelector: ".grid-item",
    layoutMode: "packery",
    percentPosition: true,

    getSortData: {
      matched: function (itemElem) {
        var filterValue = $(".filters .selected").attr("data-filter");
        var isMatched = $(itemElem).is(filterValue);
        return isMatched ? 1 : 2;
      },
      // Custom order logic: use 'data-order' attribute for custom positioning
      order: "[data-order] parseInt",
    },

    sortBy: ["matched", "order"],

    filter: function () {
      var filterValue = $(".filters .selected").attr("data-filter");
      var isMatched = $(this).is(filterValue);
      $(this).css("opacity", isMatched ? 1 : 0.35);
      return true;
    },
  });

  // filter items on button click
  $(".filters").on("click", "button", function () {
    $(".filters .selected").removeClass("selected");
    $(this).addClass("selected");

    gridResPos();

    $(".grid-item").each(function () {
      $(this).css("width", "");
    });
    $(".grid-item-3 .map").css("height", "");
    $(".grid-item-6 h6").css("padding-top", "");

    if (window.matchMedia("(min-width: 1200px)").matches) {
      //xl
      if ($(this).text() == "About") {
        $(".grid-item-3").css("width", "30%");
        $(".grid-item-9").css("width", "15%");
        $(".grid-item-6").css("width", "60%");
        $(".grid-item-2").css("width", "40%");
        $(".grid-item-4").css("width", "40%");
        $(".grid-item-3 .map").css("height", "20em");
        $(".grid-item-6 h6").css("padding-top", "1.5em");

        // Adjust the position of a specific item
        changeItemOrder(".grid-item-3", 9);
        changeItemOrder(".grid-item-6", 10);
        changeItemOrder(".grid-item-2", 11);
        changeItemOrder(".grid-item-4", 12);
      } else if ($(this).text() == "Work") {
        $(".grid-item-4").css("width", "50%");
        $(".grid-item-1").css("width", "50%");
        $(".grid-item-2").css("width", "50%");
        $(".grid-item-9").css("width", "15%");
        $(".grid-item-6").css("width", "45%");
        $(".grid-item-3").css("width", "25%");

        $(".grid-item-3 .map").css("height", "20em");
        $(".grid-item-6 h6").css("padding-top", "1.2em");

        changeItemOrder(".grid-item-4", 8);
        changeItemOrder(".grid-item-6", 9);
      }
    } else if (
      window.matchMedia("(min-width: 992px) and (max-width: 1199.98px)").matches //lg
    ) {
      if ($(this).text() == "About") {
        changeItemOrder(".grid-item-4", 2);
      }
    } else if (
      window.matchMedia("(min-width: 768px) and (max-width: 991.98px)").matches //md
    ) {
      if ($(this).text() == "About") {
        changeItemOrder(".grid-item-4", 2);
      }
    } else if (
      window.matchMedia("(max-width: 767.98px)").matches //sm
    ) {
      if ($(this).text() == "About") {
        changeItemOrder(".grid-item-4", 2);
      }
    }

    $grid.isotope("updateSortData").isotope();
  });

  let adjustgrid;
  $(window).on("resize", function () {
    clearTimeout(adjustgrid);
    adjustgrid = setTimeout(() => {
      gridResPos();
      $grid.isotope("updateSortData").isotope();
    }, 350);
  });
});

// CURSOR ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  const cursorInner = document.querySelector(".cursor__circle__inner");
  const cursorCircle = document.querySelector(".cursor__circle");
  const cursorWrapper = document.querySelector(".cursor__wrapper");

  const cursorOffsetX = 0;
  const cursorOffsetY = 0;

  document.addEventListener("mousemove", function (e) {
    gsap.set(cursorInner, {
      x: e.clientX + cursorOffsetX,
      y: e.clientY + cursorOffsetY,
    });

    gsap.to(cursorCircle, {
      x: e.clientX + cursorOffsetX,
      y: e.clientY + cursorOffsetY,
      duration: 1.4,
      ease: "power3.out",
    });

    gsap.to(cursorWrapper, {
      x: e.clientX + cursorOffsetX,
      y: e.clientY + cursorOffsetY,
      duration: 1.5,
      ease: "power2.out",
    });
  });
});
