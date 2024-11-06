const container = document.querySelector('#carousel')
const slides = document.querySelectorAll('.slide');
const pauseButton = document.querySelector('#pause');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#previous');
const indicatorsItems = document.querySelectorAll('.indicator')
const indicatorsContainer = document.querySelector('#indicators-container')
const SLIDE_INTERVAL = 2000; // Інтервал між слайдами в мілісекундах

const CODE_ARROW_LEFT = 'ArrowLeft'
const CODE_ARROW_RIGHT = 'ArrowRight'
const CODE_SPACE = 'Space'

let currentSlide = 0;
let slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
let playing = true;
let startPosX = null
let endPosX = null

// Функція для паузи автопрогравання слайдера
function pauseSlideShow() {
  pauseButton.innerHTML = 'Play'; // Змінюємо текст кнопки на "Play"
  playing = false;
  clearInterval(slideInterval); // Зупиняємо інтервал автопрогравання
}

// Функція для відновлення автопрогравання слайдера
function playSlideShow() {
  pauseButton.innerHTML = 'Pause'; // Змінюємо текст кнопки на "Pause"
  playing = true;
  slideInterval = setInterval(nextSlide, SLIDE_INTERVAL); // Відновлюємо інтервал автопрогравання
}

// Встановлення функції на кнопку паузи, яка перемикає між паузою та відтворенням
function pausePlaySlideShow () {
  playing ? pauseSlideShow() : playSlideShow();
};

// Функція для переходу до конкретного слайду
function goToSlide(n) {
  slides[currentSlide].classList.remove('active'); // Прибираємо клас 'active' у поточного слайду
  indicatorsItems[currentSlide].classList.remove('active'); // Прибираємо клас 'active' у поточного слайду
  currentSlide = (n + slides.length) % slides.length; // Вираховуємо новий поточний слайд
  slides[currentSlide].classList.add('active'); // Додаємо клас 'active' новому слайду
  indicatorsItems[currentSlide].classList.add('active'); // Додаємо клас 'active' новому слайду
}

// Функція для переходу до наступного або попереднього слайду
function nextSlide() {
  goToSlide(currentSlide + 1); // Переходимо до наступного слайду
}

function previousSlide() {
  goToSlide(currentSlide - 1); // Переходимо до попереднього слайду
}

// Зупинка автопрогравання та перехід до наступного або попереднього слайду при натисканні кнопок
function nextHandler() {
  pauseSlideShow();
  nextSlide();
};

function previousHandler() {
  pauseSlideShow();
  previousSlide();
};

function indicateHandler(e){
const {target} = e

if (target && target.classList.contains('indicator')){
  pauseSlideShow()
  goToSlide(+target.dataset.slide)
  }
}

function pressKeyHandler(e){
  const { code } = e
  if (code === CODE_ARROW_LEFT) previousHandler()
  if (code === CODE_ARROW_RIGHT) nextHandler()
  if (code === CODE_SPACE){
    e.preventDefault()
    pausePlaySlideShow ()
  } 
}

function mouseStartHandler(e){
  startPosX = e.pageX
}

function swipeStartHandler(e){
  startPosX = e instanceof MouseEvent 
  ? e.pageX 
  : e.changedTouches[0].pageX
}

function swipeEndHandler(e){
  endPosX = e instanceof MouseEvent 
  ? e.pageX 
  : e.changedTouches[0].pageX
  if(endPosX - startPosX > 50) previousHandler()
  if(endPosX - startPosX < -50) nextHandler()
}

pauseButton.addEventListener('click', pausePlaySlideShow)
nextButton.addEventListener('click', nextHandler)
prevButton.addEventListener('click', previousHandler)
indicatorsContainer.addEventListener('click', indicateHandler)
container.addEventListener('touchstart', swipeStartHandler)
container.addEventListener('mousedown', swipeStartHandler)
container.addEventListener('touchend', swipeEndHandler)
container.addEventListener('mouseup', swipeEndHandler)
document.addEventListener('keydown', pressKeyHandler)


