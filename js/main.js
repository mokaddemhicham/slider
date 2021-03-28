// variables ...
let slider = document.querySelector(".slider");
let nextBtn = document.querySelector(".fa-chevron-right");
let prevBtn = document.querySelector(".fa-chevron-left");
let slide = document.querySelector(".slides");
let slides = document.querySelectorAll(".slide");
let interval = 3000;
let index = 1;
let currentBtn = 0;
let animate;
let dotsNav = document.querySelectorAll(".dot");
dotsNav[currentBtn].classList.toggle("active");
// Get The Width Of Each SLide

let slideWidth = slides[index].clientWidth;

// Function return Slides

let getSlides = ()=> document.querySelectorAll(".slide");

// clone The First and The Last Slides

let firstClone = slides[0].cloneNode(true);
let lastClone = slides[slides.length - 1].cloneNode(true);

// Give the clones slides an id

firstClone.id = "firstClone";
lastClone.id = "lastClone";

// Append The Two Clones Slide to The slides Parent

slide.append(firstClone);
slide.prepend(lastClone);

// Translate The Slides 

slide.style.transform = `translateX(${- slideWidth * index}px)`;

// Create Function That Move To The Next Slide

let moveToNextSlide = ()=>{
  let slides = getSlides();
  if(index >= slides.length - 1) return;
  index++;
  slide.style.transition = ".7s";
  slide.style.transform = `translateX(${- slideWidth * index}px)`;
  let dotsNav = document.querySelectorAll(".dot");
  if(currentBtn >= 3) {
    currentBtn = 0;
    dotsNav[3].classList.remove("active");
    dotsNav[currentBtn].classList.add("active");
  }else{
    currentBtn++;
    dotsNav[currentBtn - 1].classList.remove("active");
    dotsNav[currentBtn].classList.add("active");
  }
}

// Create Function That Move To The Previews Slide

let moveToPrevSlide = ()=>{
  let slides = getSlides();
  if(index <= 0) return;
  index--;
  slide.style.transition = ".7s";
  slide.style.transform = `translateX(${- slideWidth * index}px)`;
  let dotsNav = document.querySelectorAll(".dot");

  if(currentBtn <= 0){
    currentBtn = 3;
    dotsNav[0].classList.remove("active");
    dotsNav[currentBtn].classList.add("active")
  }else{
    currentBtn--;
    dotsNav[currentBtn + 1].classList.remove("active");
    dotsNav[currentBtn].classList.add("active")
  }
}

// Create An EventListener for listen to the end of transition in the slide

slide.addEventListener("transitionend",()=>{
  let slides = getSlides();
  if(slides[index].id === firstClone.id){
    index = 1;
    slide.style.transition = "none";
    slide.style.transform = `translateX(${- slideWidth * index}px)`;
  }
  if(slides[index].id === lastClone.id){
    index = slides.length - 2;
    slide.style.transition = "none";
    slide.style.transform = `translateX(${- slideWidth * index}px)`;
  }
});



// Create An EventListener to Next & Previews Btn

nextBtn.addEventListener("click",()=>{
  moveToNextSlide();
});

prevBtn.addEventListener("click",()=>{
  moveToPrevSlide();
});



// Create Function That make Slider Move Every 5 secondes

let animateSlider = ()=>{
  animate = setInterval(()=>{
    moveToNextSlide();
  }, interval);
}

animateSlider();

slider.addEventListener("mouseenter",()=>{
  clearInterval(animate);
  nextBtn.style.opacity = 1;
  prevBtn.style.opacity = 1;
});
slider.addEventListener("mouseleave",()=>{
  animateSlider();
  nextBtn.style.opacity = 0;
  prevBtn.style.opacity = 0;
});
