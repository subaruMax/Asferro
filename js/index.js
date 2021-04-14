"use strict";

const servicesApp = {
  scrollTimeout: "",
  throttle: 500,
  currentElement: 0,
  imgIndexToLoad: 0,
  serviceImages: [
    ["./img/livingrm_b.png", "./img/livingrm_m.png", "./img/livingrm_s.png"],
    ["./img/kitchen_b.png", "./img/kitchen_m.png", "./img/kitchen_s.png"],
    ["./img/bathroom_b.png", "./img/bathroom_m.png", "./img/bathroom_s.png"],
    ["./img/terrace_b.png", "./img/terrace_m.png", "./img/terrace_s.png"],
  ],
  serviceDescription: [
    "Get these gorgeous modern living room. Refresh your own space today.",
    "Get the modern luxury kitchen look. Explore chef driven interiors and decor.",
    "If there's a room that deserves a little luxury, it's the bathroom.",
    "Wish to lounge for a drink or a dish, while enjoying an amazing panorama?",
  ],
  serviceElements: [
    $("#livingRoom"),
    $("#kitchen"),
    $("#bathroom"),
    $("#terrace"),
  ],
  closeBurgerMenuOnResolutionChange() {
    const winWith = window.screen.width;
    if (winWith > 834) $("#burger-menu").removeClass("show-menu");
  },
  setImgIndexToLoad() {
    const winWith = window.screen.width;
    if (winWith <= 375) this.imgIndexToLoad = 2;
    else if (winWith <= 834) this.imgIndexToLoad = 1;
    else if (winWith > 834) this.imgIndexToLoad = 0;
  },
  setImage() {
    $("#mainIMG").css(
      "background",
      `url(${this.serviceImages[this.currentElement][this.imgIndexToLoad]})`
    );
  },
  setServiceData() {
    this.setImgIndexToLoad();
    this.serviceElements[this.currentElement].addClass("service-picker-active");
    $("#mainIMGdescription").text(this.serviceDescription[this.currentElement]);
    this.setImage();
  },
  updateServiceDataOnScroll(e) {
    if (e.originalEvent.wheelDelta >= 0) {
      if (this.currentElement > 0) {
        this.serviceElements[this.currentElement].removeClass(
          "service-picker-active"
        );
        --this.currentElement;
        this.setServiceData();
      }
    } else {
      if (this.currentElement < this.serviceElements.length - 1) {
        this.serviceElements[this.currentElement].removeClass(
          "service-picker-active"
        );
        ++this.currentElement;
        this.setServiceData();
      }
    }
  },
  updateServiceDataOnClick(e) {
    if (e.target.tagName === "A") {
      $("#servicePicker>.service-picker-active").removeClass(
        "service-picker-active"
      );
      const indexOfTarget = this.serviceElements.findIndex(
        (val) => val[0] == $(e.target)[0]
      );
      this.currentElement = indexOfTarget;
      this.setServiceData();
    }
  },
};

servicesApp.setServiceData();

$(window).resize(() => {
  servicesApp.setImgIndexToLoad();
  servicesApp.setImage();
  servicesApp.closeBurgerMenuOnResolutionChange();
});

$("#servicePicker").click(
  servicesApp.updateServiceDataOnClick.bind(servicesApp)
);
$("main").on("mousewheel", (e) => {
  let event = e;
  if (!servicesApp.scrollTimeout) {
    servicesApp.scrollTimeout = setTimeout(() => {
      servicesApp.updateServiceDataOnScroll(event);
      servicesApp.scrollTimeout = null;
    }, servicesApp.throttle);
  }
});

$("#nav-menu,#burger-menu").click((e) => {
  if (e.target.tagName === "A") {
    $("#nav-menu>li>.menu-active").removeClass("menu-active");
    $("#burger-menu>.menu-active").removeClass("menu-active");
    $(e.target).addClass("menu-active");
  }
});

$("#language-sel").click((e) => {
  if (e.target.tagName === "A") {
    $("#language-sel>.lang-active").removeClass("lang-active");
    $(e.target).addClass("lang-active");
  }
});

$("#hamburger").click(() => {
  $("#burger-menu").toggleClass("show-menu");
});
