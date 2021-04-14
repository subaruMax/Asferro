"use strict";

const serviceImages = [
  ["./img/livingrm_b.png", "./img/livingrm_m.png", "./img/livingrm_s.png"],
  ["./img/kitchen_b.png", "./img/kitchen_m.png", "./img/kitchen_s.png"],
  ["./img/bathroom_b.png", "./img/bathroom_m.png", "./img/bathroom_s.png"],
  ["./img/terrace.png"],
];
const serviceDescription = [
  "Get these gorgeous modern living room. Refresh your own space today.",
  "Get the modern luxury kitchen look. Explore chef driven interiors and decor.",
  "If there's a room that deserves a little luxury, it's the bathroom.",
  "Wish to lounge for a drink or a dish, while enjoying an amazing panorama?",
];

const serviceElements = [
  $("#livingRoom"),
  $("#kitchen"),
  $("#bathroom"),
  $("#terrace"),
];

const initialElement = 0;
let currentElement = 0;

$("#mainIMGdescription").text(serviceDescription[currentElement]);
$("#mainIMG").css("background", `url(${serviceImages[currentElement][0]})`);
serviceElements[initialElement].addClass("service-picker-active");

$("main").bind("mousewheel", function (event) {
  if (event.originalEvent.wheelDelta >= 0) {
    if (currentElement > 0) {
      serviceElements[currentElement].removeClass("service-picker-active");
      --currentElement;
      serviceElements[currentElement].addClass("service-picker-active");
      $("#mainIMG").css(
        "background",
        `url(${serviceImages[currentElement][0]})`
      );
      $("#mainIMGdescription").text(serviceDescription[currentElement]);
    }
  } else {
    if (currentElement < serviceElements.length - 1) {
      serviceElements[currentElement].removeClass("service-picker-active");
      ++currentElement;
      serviceElements[currentElement].addClass("service-picker-active");
      $("#mainIMG").css(
        "background",
        `url(${serviceImages[currentElement][0]})`
      );
      $("#mainIMGdescription").text(serviceDescription[currentElement]);
    }
  }
});

$("#servicePicker").click((e) => {
  if (e.target.tagName === "A") {
    $("#servicePicker>.service-picker-active").removeClass(
      "service-picker-active"
    );
    const indexOfTarget = serviceElements.findIndex(
      (val) => val[0] == $(e.target)[0]
    );
    $(e.target).addClass("service-picker-active");
    currentElement = indexOfTarget;
    $("#mainIMGdescription").text(serviceDescription[currentElement]);
    $("#mainIMG").css("background", `url(${serviceImages[currentElement][0]})`);
  }
});

$("#nav-menu").click((e) => {
  if (e.target.tagName === "A") {
    $("#nav-menu>li>.menu-active").removeClass("menu-active");
    $(e.target).addClass("menu-active");
  }
});

$("#language-sel").click((e) => {
  if (e.target.tagName === "A") {
    $("#language-sel>.lang-active").removeClass("lang-active");
    $(e.target).addClass("lang-active");
  }
});
