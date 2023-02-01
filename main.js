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
    // If there's a timer, cancel it
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

const learnMoreButtons = document.querySelectorAll(".modal-toggle");
const modalMask = document.querySelector(".mask");
const closeModalBtn = document.querySelector(".close-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const teamsReviewButtons = document.querySelectorAll(".leave-review");

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
    modalDesc.textContent = "";
  }, 400);
  modalMask.classList.remove("active");
}

for (let i = 0; i < learnMoreButtons.length; i += 1) {
  learnMoreButtons[i].addEventListener("click", (event) =>
    showModal(event.target.id, "service")
  );
}

modalMask && modalMask.addEventListener("click", closeModal);
closeModalBtn && closeModalBtn.addEventListener("click", closeModal);
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
