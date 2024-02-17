//dark and light mode
const theme = 'theme'; //store theme light or dark in browser
const dataTheme = 'data-theme';
const themeTab = '.theme-tab'; // when selecting element, need css symbol
const switcherBtn =  '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open'; //css class that is applied to theme panel
const active = 'active'; //css class that is applied to theme panel



//need access to root of html elem

const root = document.documentElement; //targets html element of DOC object

/* theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn); //finds things with ".switcher-btn" and iterate through array
const currentTheme = localStorage.getItem(theme);

//--------------------

//need a way to select modals
const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';


const dataFilter = '[data-filter]';
const dataCard = '[data-item]'


//find every button or element that triggers the modals
const openModal = document.querySelectorAll(modalOpen); //grabs html elem.
const closeModal = document.querySelectorAll(modalClose); //grabs html elem.

//--------------------

const setActive = (elm, selector) => {
    if (document.querySelector(`${selector}.${active}`) !== null) {
        document.querySelector(`${selector}.${active}`).classList.remove(active);
    }
}




//portfolio thingies.
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(dataCard);

const searchBox = document.querySelector('#search'); //use css selector




//for dark and light mode theme clicks
toggleTheme.addEventListener('click', function() {
    const tab = this.parentElement.parentElement;
    //toggle open class and check if theme panel has class
    if (!tab.className.includes(open)) {
        tab.classList.add(open);
    } else {
        tab.classList.remove(open);
    }
});


//light and dark BUTTONS

for (const elem of switcher) {
    elem.addEventListener('click', function() {
        //add data attribute to capture when we click a button
        const toggle = this.dataset.toggle;
        //set active state
        setActive(elem, switcherBtn);
        setTheme(toggle);
    })
}

//(val) is capturing result of above function
const setTheme = (val) => {
    if (val === dark) {
        root.setAttribute(dataTheme, dark);
        localStorage.setItem(theme, dark);
    } else {
        root.setAttribute(dataTheme, light);
        localStorage.setItem(theme, light);
    }
};
//checking for current theme and if there is then we go and set current them
    //then remove active class

if (currentTheme){ 
    root.setAttribute(dataTheme, currentTheme)
    switcher.forEach((btn) => {
        btn.classList.remove(active);
    })
    //then check what theme and set the button to active
    if (currentTheme === dark) {
        switcher[1].classList.add(active);
    } else {
        switcher[0].classList.add(active);
    }
}

//--------------------
//modals

//need data open for About me and Contact
//full site modal 'open buttons'
for (const elem of openModal) {
    elem.addEventListener('click', function() {
        const modalId = this.dataset.open;
        document.getElementById(modalId).classList.add(isVisible);
    })
}

//using a regular function() allows the use of ".this"
//this access the parent object which is the "elem"
//the data set is the data attribute "data-open"

//getElementById looks for id's that matches that we pluck from data value
//.classList grabs the class list

for (const elem of closeModal) {
    elem.addEventListener('click', function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    })
}





document.addEventListener('click', (e) => {
    if (e.target === document.querySelector('.modal.isVisible')) {
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
        document.querySelector('.modal.is-visible').classList.remove(isVisible);
    }
})


//.parentElement climbs html tree || i > header > div
//.this represents the i tag


//want things to happen immediately when user types
searchBox.addEventListener('keyup', (e) => {
    //store user input
    const searchInput = e.target.value.toLowerCase().trim();

    portfolioItems.forEach((card) => {
        //if search matches data value then display, else hide items
        if (card.dataset.item.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    })
});



//--------
//portfolio stuff

for (const link of filterLink) {
    link.addEventListener('click', function() {
        setActive(link, '.filter-link')
        const filter = this.dataset.filter;
        //click link and show relevant cards and hide items
        portfolioItems.forEach((card) => {
            if (filter === 'all') {
                card.style.display = 'block'; //.style is a css style attribute
            } else if (card.dataset.item === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        })
    })
}



//scrolling animation script

//get number of elms displayed
//nodelist.length = assign to --marquee-elms

//tap into root css
const elmsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elms-displayed'); //returns css style declaration object
const marqueeContent = document.querySelector('ul.marquee-content');

root.style.setProperty('--marquee-elms', marqueeContent.children.length);

//clone each child nodes
//loop through displayed elms

for (let i = 0; i < elmsDisplayed; i += 1) {
    //clone child node
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true))
}