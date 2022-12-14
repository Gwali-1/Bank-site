'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");




const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach((btn)=>{
  btn.addEventListener("click",openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




//smooth scroll
btnScrollTo.addEventListener("click",function(e){
  section1.scrollIntoView({behavior: "smooth"})

  //old way
  // const cords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: cords.left + window.pageXOffset,
  //   top: cords.top + window.pageYOffset,
  //   behavior: "smooth",

  // });
});




//navigation
document.querySelector(".nav__links").addEventListener("click",function (e){
  e.preventDefault()
  console.log(e.target);
  if(e.target.classList.contains("nav__link")){
    console.log("yes");
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior:"smooth"
    });

  }
})



//tapped component
tabsContainer.addEventListener("click",function(e){
  // console.log(e.target);
  const clicked = e.target.closest(".operations__tab");

  //Guard clause
  if(!clicked) return;

  //tab

  //remove class
  tabs.forEach(ele => ele.classList.remove("operations__tab--active"));
  //add class
  clicked.classList.add("operations__tab--active");
  

  //content 
  //remove class
  tabsContent.forEach(ele => ele.classList.remove("operations__content--active"));

  //add class
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList
  .add("operations__content--active");

})





//fade animation


const hoverFunc = function (e){

  if(e.target.classList.contains("nav__link")){
    const link = e.target;
    const sibblingLinks = e.target.closest(".nav").querySelectorAll(".nav__link");
    const logo = e.target.closest(".nav").querySelector("img");

    sibblingLinks.forEach(el => {
      if(el !== link){
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }


}


nav.addEventListener("mouseover",hoverFunc.bind(0.5));
nav.addEventListener("mouseout",hoverFunc.bind(1));



//sticky nav

const navHeight = nav.getBoundingClientRect().height

const sticky = function (entries){
  const [entry] = entries;
  if(!entry.isIntersecting){
    nav.classList.add("sticky");
  }else{
    nav.classList.remove("sticky");
  }
}

const options = {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`
}

const header = document.querySelector(".header");

const headerObserver = new IntersectionObserver(sticky,options);

headerObserver.observe(header);



//reveal sections
const allSections = document.querySelectorAll(".section");

const reveal = function(entries,observer){
  const[entry] = entries;
  if(entry.isIntersecting){
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
}

const sectionObserver = new IntersectionObserver(reveal,{
  root: null,
  threshold:0.2,
})


allSections.forEach(s =>{
  sectionObserver.observe(s);
  // s.classList.add("section--hidden");
})



//lazy loading  images

const allImages = document.querySelectorAll(".lazy-img");

const revealImage = function(entries,observer){
  const[entry] = entries;
  if(entry.isIntersecting){
    entry.target.setAttribute("src",entry.target.dataset.src);
    entry.target.addEventListener("load",()=>{
      entry.target.classList.remove("lazy-img");
    });
   
     observer.unobserve(entry.target);
  }

}

const imageObserver = new IntersectionObserver(revealImage,{
  root: null,
  threshold: 0,
  rootMargin: "200px"
})

allImages.forEach(img =>{
  imageObserver.observe(img);
});


//silder 

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let cursorSlide = 0;
const maxSlide = slides.length



function goToSlide (slide){
  slides.forEach((s,i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  })
}



slides.forEach((slide,index) => {
  slide.style.transform = `translateX(${100 * index}%)`;
})



const nextSlide = function (){
  if(cursorSlide === maxSlide - 1){
    cursorSlide = 0;
  }else{
    cursorSlide++;
  }
  console.log(cursorSlide);
  goToSlide(cursorSlide);
 

}

btnRight.addEventListener("click",nextSlide)



const previousSlide = function (){

  if(cursorSlide === 0){
    cursorSlide = maxSlide -1 ;
  }else{
    cursorSlide--;
  }
  console.log(cursorSlide);
  goToSlide(cursorSlide);

}
btnLeft.addEventListener("click", previousSlide);





// window.addEventListener("beforeunload",function (e){
//   e.preventDefault();
//   console.log(e)
//   e.returnValue = ''
// })