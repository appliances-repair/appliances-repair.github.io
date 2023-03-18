window.initMap = function () {
  // The location of Uluru
  const uluru = { lat: 37.4634, lng: -122.2257 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll("#carousel");
  carousels.forEach(function (carousel) {
    const ele = carousel.querySelector("ul");
    const amountvisible = Math.round(
      ele.offsetWidth / ele.querySelector("li:nth-child(1)").offsetWidth
    );
    const bullets = carousel.querySelectorAll("ol li");
    const slides = carousel.querySelectorAll("ul li");
    const nextarrow = carousel.querySelector(".next");
    const prevarrow = carousel.querySelector(".prev");

    // Initialize the carousel
    nextarrow.style.display = "block";
    prevarrow.style.display = "block";
    ele.scrollLeft = 0;
    bullets[0].classList.add("selected");
    slides[0].classList.add("selected");
    if (amountvisible > 1) {
      var removeels = carousel.querySelectorAll(
        "ol li:nth-last-child(-n + " + (amountvisible - 1) + ")"
      );
      removeels.forEach(function (removeel) {
        removeel.remove();
      });
    }

    const setSelected = function () {
      bullets.forEach(function (bullet) {
        bullet.classList.remove("selected");
      });
      slides.forEach(function (slide) {
        slide.classList.remove("selected");
      });
      const scrolllength =
        carousel.querySelector("ul li:nth-child(2)").offsetLeft -
        carousel.querySelector("ul li:nth-child(1)").offsetLeft;
      const nthchild = Math.round(ele.scrollLeft / scrolllength + 1);
      carousel
        .querySelector("ol li:nth-child(" + nthchild + ")")
        .classList.add("selected");
      carousel
        .querySelector("ul li:nth-child(" + nthchild + ")")
        .classList.add("selected");
      if (carousel.parentElement.parentElement.querySelector(".dynamictitle")) {
        const title = carousel
          .querySelector("ul li:nth-child(" + nthchild + ") img")
          .getAttribute("title");
        if (title)
          carousel.parentElement.parentElement.querySelector(
            ".dynamictitle"
          ).innerHTML = title;
      }
    };

    const scrollTo = function (event) {
      event.preventDefault();
      ele.scrollLeft = ele.querySelector(this.getAttribute("href")).offsetLeft;
    };

    const nextSlide = function () {
      if (
        !carousel
          .querySelector("ol li:last-child")
          .classList.contains("selected")
      ) {
        carousel
          .querySelector("ol li.selected")
          .nextElementSibling.querySelector("a")
          .click();
      } else {
        carousel.querySelector("ol li:first-child a").click();
      }
    };

    const prevSlide = function () {
      if (
        !carousel
          .querySelector("ol li:first-child")
          .classList.contains("selected")
      ) {
        carousel
          .querySelector("ol li.selected")
          .previousElementSibling.querySelector("a")
          .click();
      } else {
        carousel.querySelector("ol li:last-child a").click();
      }
    };

    const setInteracted = function () {
      ele.classList.add("interacted");
    };

    // Attach the handlers
    ele.addEventListener("scroll", debounce(setSelected));
    ele.addEventListener("touchstart", setInteracted);
    ele.addEventListener("keydown", function (e) {
      if (e.key == "ArrowLeft") ele.classList.add("interacted");
      if (e.key == "ArrowRight") ele.classList.add("interacted");
    });

    nextarrow.addEventListener("click", nextSlide);
    prevarrow.addEventListener("click", prevSlide);
    bullets.forEach((bullet) => {
      bullet.querySelector("a").addEventListener("click", scrollTo);
    });

    //setInterval for autoplay
    if (carousel.getAttribute("duration")) {
      setInterval(function () {
        if (
          ele != document.querySelector("#carousel:hover ul") &&
          ele.classList.contains("interacted") == false
        ) {
          nextarrow.click();
        }
      }, carousel.getAttribute("duration"));
    }
  }); //end foreach
}); //end onload

/**
 * Debounce functions for better performance
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} fn The function to debounce
 */
function debounce(fn) {
  // Setup a timer
  let timeout;
  // Return a function to run debounced
  return function () {
    // Setup the arguments
    let context = this;
    let args = arguments;
    // If there"s a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }
    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
      fn.apply(context, args);
    });
  };
}

const servicesData = {
  ovens: {
    title: "Ovens / Microwaves Repair Service",
    description:
      "There are plenty of microwave types manufacturedby various brands. We can repair at home any of them. No matter what specific type of microwaves you use.In case of microwave malfunctioning, contact Master Appliance to repair your oven. With our vast experience in microwave repairing, you will get the best service and quality repair.",
  },
  garbages: {
    title: "Garbage Disposal Repair Service",
    description:
      "Our company has a long-term experience in garbage disposals services. Trained and licensed technicians will reach you the same day in San Jose, professionally fix your garbage disposals, and provide advice on how to prevent a breakdown in the future.",
  },
  ranges: {
    title: "Ranges / Cooktops Repair Service",
    description:
      "Ranges / Cooktops can be a smart machine with an electronic control board or a usual one, a freestanding or built-in appliance. But each of them is a complex appliance requiring expert assistance in case of breakdown. Master Appliance repairs all types and major brands of ranges. A stove is like a range, and we can repair it too.",
  },
  refrigerators: {
    title: "Refrigerator Repair Service",
    description:
      "We repair all major brands of refrigerators, from old models to modern smart ones. All fridges require anti-bacteria treatment from time to time. Refrigerator ozone cleaning service is the best solution to wipe out harmful problem-cause bacteria from your fridge and keep your food fresh. The standard price for this service is $249, but you can get it for $179 if order any appliance repair.",
  },
  vents: {
    title: "Range Hood Repair Service",
    description: "",
  },
  dishwashers: {
    title: "Dishwasher Repair Service",
    description:
      "Any brands and types. Regardless of your dishwasher’s version, we provide the best quality repair service. Master Appliance uses only high-quality appliance parts delivered by trusted official suppliers and gives up to 1-year parts and labor warranty for your appliance. Regardless of the type of your home dishwasher, remember that smart technologies make them advanced appliances. Only highly skilled technicians are allowed to appliance repair San Jose such dishwashers at home.",
  },
  washers: {
    title: "Washer Repair Service",
    description:
      "Stackable Washer, Top/Front Load Machine or Washer/DryerCombo - all types listed can be semi or full-automatic washers and all can be repaired. Order appliance repair San Jose CA right now!",
  },
  stackables: {
    title: "Stackable Repair Service",
    description:
      "Stackable Washer, Top/Front Load Machine or Washer/Dryer/Combo - all types listed can be semi or full-automatic washers and all can be repaired. Order appliance repair San Jose CA right now!",
  },
  dryers: {
    title: "Dryers Repair Service",
    description:
      "Washer/Dryer/Combo, Stackable Washer, or Top/Front Load Machine - all types listed can be semi or full-automatic washers and all can be repaired. Order appliance repair San Jose CA right now!",
  },
};

const teamNames = {
  teamMember1: "Denis",
  teamMember2: "George",
  teamMember3: "Nick",
  teamMember4: "Will",
  teamMember5: "Jake",
  teamMember6: "Eli",
  teamMember7: "Anthony",
  teamMember8: "Adam",
};

const brandNames = {
  A: ["AGA", "ALFRESCO", "AMERICAN RANGE", "ASKO"],
  B: ["BERTAZZONI", "BLOMBERG", "BLUESTAR", "BOSCH"],
  C: ["CAFE", "CAPITAL", "COVE", "COYOTE"],
  D: ["DACOR", "DCS"],
  E: ["ELECTROLUX", "ELICA"],
  F: ["FISHER & PAYKEL", "FRIGIDAIRE"],
  G: ["GAGGENAU"],
  L: ["LA CORNUE", "LG", "LIEBHERR", "LINX"],
  M: ["MARVEL", "MAYTAG", "MIELE", "MONOGRAM"],
  P: ["PERLICK"],
  R: ["RCS"],
  S: ["SAMSUNG", "SIGNATURE", "SMEG", "SPEED QUEEN", "SUB-ZERO", "SUPERIORE"],
  T: ["THOR", "THERMADOR"],
  V: ["VENTAHOOD", "VERONA", "VIKING"],
  W: ["WHIRLPOOL", "WOLF"],
  Z: ["ZEPHYR", "ZLINE"],
};

const zipCodes = {
  94022: { lat: 37.36, lng: -122.15 },
  94024: { lat: 37.36, lng: -122.09 },
  94025: { lat: 37.46, lng: -122.18 },
  94026: { lat: 37.455, lng: -122.178 },
  94027: { lat: 37.45, lng: -122.2 },
  94028: { lat: 37.37, lng: -122.21 },
  94039: { lat: 37.389, lng: -122.082 },
  94040: { lat: 37.38, lng: -122.09 },
  94041: { lat: 37.39, lng: -122.07 },
  94042: { lat: 37.389, lng: -122.082 },
  94043: { lat: 37.41, lng: -122.09 },
  94061: { lat: 37.4634, lng: -122.2257 },
  94062: { lat: 37.4109, lng: -122.2881 },
  94085: { lat: 37.39, lng: -122.02 },
  94086: { lat: 37.37, lng: -122.02 },
  94087: { lat: 37.35, lng: -122.03 },
  94088: { lat: 37.37, lng: -122.02 },
  94089: { lat: 37.4, lng: -122 },
  94303: { lat: 37.45, lng: -122.12 },
  94304: { lat: 37.42, lng: -122.16 },
  94306: { lat: 37.41, lng: -122.13 },
  95002: { lat: 37.425, lng: -121.976 },
  95008: { lat: 37.277, lng: -121.953 },
  95009: { lat: 37.29, lng: -121.95 },
  95011: { lat: 37.29, lng: -121.96 },
  95014: { lat: 37.3, lng: -122.07 },
  95015: { lat: 37.29, lng: -122.09 },
  95030: { lat: 37.2282, lng: -121.9871 },
  95032: { lat: 37.2261, lng: -121.9302 },
  95050: { lat: 37.354, lng: -121.953 },
  95051: { lat: 37.35, lng: -121.98 },
  95052: { lat: 37.35, lng: -121.95 },
  95053: { lat: 37.3487, lng: 121.9366 },
  95054: { lat: 37.4, lng: -121.96 },
  95055: { lat: 37.35, lng: -121.98 },
  95056: { lat: 37.4, lng: -121.96 },
  95101: { lat: 37.3905, lng: -121.8854 },
  95106: { lat: 37.34, lng: 121.89 },
  95108: { lat: 37.34, lng: 121.89 },
  95109: { lat: 37.34, lng: 121.89 },
  95110: { lat: 37.3546, lng: 121.9189 },
  95111: { lat: 37.2857, lng: -121.8278 },
  95112: { lat: 37.3456, lng: -121.8847 },
  95113: { lat: 37.3327, lng: -121.8918 },
  95115: { lat: 37.3355, lng: -121.8938 },
  95116: { lat: 37.3559, lng: -121.8506 },
  95117: { lat: 37.31, lng: -121.97 },
  95118: { lat: 37.259, lng: -121.8847 },
  95119: { lat: 37.2318, lng: -121.7822 },
  95120: { lat: 37.1697, lng: -121.8449 },
  95121: { lat: 37.3021, lng: -121.805 },
  95122: { lat: 37.3304, lng: -121.8392 },
  95123: { lat: 37.2375, lng: -121.8278 },
  95124: { lat: 37.2584, lng: 121.9189 },
  95125: { lat: 37.291, lng: 121.8904 },
  95126: { lat: 37.329, lng: 121.916 },
  95127: { lat: 37.3735, lng: -121.7594 },
  95128: { lat: 37.3189, lng: -121.9416 },
  95129: { lat: 37.31, lng: -122 },
  95130: { lat: 37.29, lng: -121.98 },
  95131: { lat: 37.3903, lng: 121.8961 },
  95132: { lat: 37.4011, lng: -121.8644 },
  95133: { lat: 37.3717, lng: -121.862 },
  95134: { lat: 37.4309, lng: 121.953 },
  95135: { lat: 37.2752, lng: 121.6853 },
  95136: { lat: 37.2692, lng: -121.8506 },
  95138: { lat: 37.2423, lng: -121.7309 },
  95148: { lat: 37.3316, lng: -121.7708 },
  95150: { lat: 37.39, lng: -121.9 },
  95151: { lat: 37.3223, lng: -121.8259 },
  95152: { lat: 37.4, lng: -121.85 },
  95153: { lat: 37.25, lng: -121.85 },
  95154: { lat: 37.26, lng: -121.91 },
  95155: { lat: 37.31, lng: -121.9 },
  95156: { lat: 37.36, lng: -121.84 },
  95157: { lat: 37.2999, lng: -121.9799 },
  95158: { lat: 37.26, lng: -121.88 },
  95160: { lat: 37.22, lng: -121.86 },
  95161: { lat: 37.39, lng: -121.89 },
  95164: { lat: 37.39, lng: -121.92 },
  95170: { lat: 37.3099, lng: -122.0099 },
  95172: { lat: 37.33, lng: -121.88 },
  95173: { lat: 37.34, lng: -121.89 },
  95190: { lat: 49.053, lng: -2.4513 },
  95191: { lat: 37.3339, lng: -121.9228 },
  95192: { lat: 37.34, lng: -121.88 },
  95193: { lat: 37.24, lng: -121.83 },
  95196: { lat: 37.3318, lng: -121.8979 },
  95194: { lat: 37.34, lng: -121.91 },
  94560: { lat: 37.52, lng: -122.05 },
  95013: { lat: 37.213, lng: -121.735 },
  95037: { lat: 37.1, lng: -121.7 },
  95139: { lat: 37.22, lng: -121.75 },
  95141: { lat: 37.18, lng: -121.76 },
};

const learnMoreButtons = document.querySelectorAll(".modal-toggle");
const modalMask = document.querySelector(".mask");
const closeModalBtns = document.querySelectorAll(".close-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const teamsReviewButtons = document.querySelectorAll(".leave-review");
const zipCodeSearchInput = document.getElementById("zipcode");
// const zipcodeOptions = document.getElementById("zipcode-options");
const zipCodeSearchButton = document.getElementById("zip-search-button");
const zipInfo = document.getElementById("no-zipcode-served");

zipCodeSearchButton &&
  zipCodeSearchButton.addEventListener(
    "click",
    () => zipCodeSearchInput.value && populateMap(zipCodeSearchInput.value)
  );

zipCodeSearchInput &&
  zipCodeSearchInput.addEventListener("input", () => {
    zipInfo.style.display = "none";
  });

// function renderResults(results) {
//   if (results.length > 0) {
//     zipcodeOptions.classList.remove("hidden");
//   } else {
//     zipcodeOptions.classList.add("hidden");
//   }
//   while (zipcodeOptions.children.length) {
//     zipcodeOptions.remove(
//       zipcodeOptions.children[zipcodeOptions.children.length - 1]
//     );
//   }

//   results.forEach((zip) => {
//     const optionEl = document.createElement("option");
//     optionEl.setAttribute("value", zip);
//     optionEl.textContent = zip;
//     optionEl.classList.add("zipcode-option");
//     optionEl.addEventListener("click", () => populateMap(zip));
//     zipcodeOptions.appendChild(optionEl);
//   });

//   if (results.length !== 0) {
//     zipcodeOptions.size = 4;
//   }
// }

function populateMap() {
  // zipcodeOptions.classList.add("hidden");
  zipInfo.style.display = "none";
  const zipCode = zipCodeSearchInput.value;
  const selectedLocation = zipCodes[zipCode];
  if (selectedLocation) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: selectedLocation,
    });
    // The marker, positioned at selectedLocation
    const marker = new google.maps.Marker({
      position: selectedLocation,
      map: map,
    });
  } else {
    zipInfo.style.display = "block";
  }
}

function showModal(itemId, type) {
  if (type === "service") {
    modalTitle.textContent = servicesData[itemId].title;
    modalDesc.textContent = servicesData[itemId].description;
  } else {
    if (teamNames[itemId]) {
      modalTitle.textContent = `Leave your review to ${teamNames[itemId]}`;
    } else {
      modalTitle.textContent = "Leave your review";
    }
  }
  modalMask.classList.add("active");
}

function closeModal() {
  setTimeout(() => {
    modalTitle.textContent = "";
    if (modalDesc) {
      modalDesc.textContent = "";
    }
  }, 400);
  modalMask.classList.remove("active");
}

for (let i = 0; i < learnMoreButtons.length; i += 1) {
  learnMoreButtons[i].addEventListener("click", (event) =>
    showModal(event.target.id, "service")
  );
}

closeModalBtns &&
  Array.from(closeModalBtns).forEach((btn) =>
    btn.addEventListener("click", closeModal)
  );
document.addEventListener(
  "keydown",
  (event) => event.key === "Escape" && closeModal()
);

let stars = Array.from(document.querySelectorAll(".review-stars svg"));

stars.forEach((element) => {
  element.addEventListener("click", (e) => {
    rate(element);
  });

  /********** */
  element.addEventListener("mouseover", (e) => {
    rate(element);
  });
});

function rate(element) {
  stars.forEach((el) => {
    el.classList.remove("selected");
  });
  selectedRating = stars.indexOf(element);
  for (let i = 0; i <= selectedRating; i++) {
    stars[i].classList.add("selected");
  }
}

for (let i = 0; i < teamsReviewButtons.length; i += 1) {
  teamsReviewButtons[i].addEventListener("click", (event) => {
    event.preventDefault();
    return showModal(event.target.id);
  });
}

// BRANDS
const brandsSection = document.getElementById("brands-alphabet");
const letters = document.querySelectorAll(".letters-row .letter");
function populateBrands() {
  for (let key in brandNames) {
    const brandsArr = brandNames[key].sort();

    const brandBlock = document.createElement("div");
    brandBlock.setAttribute("class", "brand-block");
    brandBlock.classList.add(`brand-${key.toLowerCase()}`);
    const brands = document.createElement("div");
    const brandLetter = document.createElement("h3");
    brandLetter.setAttribute("class", "brand-letter");
    brandBlock.appendChild(brandLetter);
    brandBlock.appendChild(brands);

    brandLetter.textContent = key;

    for (let i = 0; i < brandsArr.length; i += 1) {
      const brandParagraph = document.createElement("p");
      brandParagraph.textContent = brandsArr[i];
      brands.appendChild(brandParagraph);
    }

    brandsSection.appendChild(brandBlock);
  }
}

function showBrands(letterToShow) {
  const brandBlocks = document.querySelectorAll(".brand-block");
  for (let i = 0; i < brandBlocks.length; i += 1) {
    if (
      brandBlocks[i].classList.contains(`brand-${letterToShow.toLowerCase()}`)
    ) {
      brandBlocks[i].style.display = "block";
    } else {
      brandBlocks[i].style.display = "none";
    }
  }
}

function selectLetters() {
  for (let i = 0; i < letters.length; i += 1) {
    const letter = letters[i];

    if (!brandNames[letter.textContent]) {
      letter.classList.add("empty");
    } else {
      letter.addEventListener("click", (event) =>
        showBrands(event.target.textContent)
      );
    }
  }
}

brandsSection && populateBrands();
letters && selectLetters();
