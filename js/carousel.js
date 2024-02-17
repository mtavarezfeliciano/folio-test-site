const slides = document.querySelectorAll('.review-item');
const buttons = document.querySelectorAll('.slide-ctrl-container button');

let current = Math.floor(Math.random() * slides.length); // random number multiplied by length of array // global scope
let next = current < slides.length - 1 ? current + 1 : 0; 
let prev = current > 0 ? current - 1 : slides.length - 1;

//keep track of current, next, and previous slides

/* create event listener for previous and next buttons 
goToNext()
goToPrev()
updatesIndexes(param)
updatesCSS()


--decide how to call previous or next 
--call a function or run logic for previous state
--update variables
--[current] = newIndex 
--[next] = current + 1 or 0
--[prev] = current -1 : length - 1
update the css classes (active, prev, next) */

const update = () => {
    slides.forEach((slide) => {
        //want to do a reset on css index so we can take index and update to correct element
        slide.classList.remove('active', 'prev', 'next') //reset slides // no classes. now update the new slides with the indexes we have
    })
    slides[current].classList.add('active'); // current slide is active slide. now add two more classes
    slides[prev].classList.add('prev');
    slides[next].classList.add('next');
}

const goToNum = (number) => { // new current index
    current = number;
    next = current < slides.length - 1 ? current + 1 : 0; 
    prev = current > 0 ? current - 1 : slides.length - 1;
    update();
};



const goToNext = () => current < slides.length - 1 ? goToNum(current + 1) : goToNum(0);
const goToPrev = () => current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1);


for (let i = 0 ; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', () => i === 0 ? goToPrev() : goToNext())
}

update();