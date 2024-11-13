class Carousel{
  constructor (params){
    const settings = {...{
      containerId: '#carousel',
      slideId: '.slide',
      interval: 2000,
      isPlaying: true,
    },...params }

    this.container = document.querySelector(settings.containerId);
    this.slideItems = document.querySelectorAll(settings.slideId);
    this.INTERVAL = settings.interval; // Інтервал між слайдами в мілісекундах
    this.isPlaying = settings.isPlaying;
  }

  _initProps(){
    this.currentSlide = 0;
    
    this.SLIDES_COUNT = this.slideItems.length
    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_SPACE = 'Space'
  }

  _initControls(){
    const controls = document.createElement('div')
    const PAUSE = `<button class="control" id="pause">
      ${this.isPlaying ? 'Pause' : 'Play'}
    </button>`
    const PREV = '<button class="control" id="previous"></button>'
    const NEXT = '<button class="control" id="next"></button>'
      
    controls.innerHTML = PAUSE + PREV + NEXT

    controls.setAttribute('id', 'controls-container')
    controls.setAttribute('class', 'controls')
    this.container.append(controls)

    this.pauseButton = document.querySelector('#pause');
    this.nextButton = document.querySelector('#next');
    this.prevButton = document.querySelector('#previous');
  }

  _initIndicators(){
    const indicators = document.createElement('div')

    indicators.setAttribute('id', 'indicators-container')
    indicators.setAttribute('class', 'indicators')

   for(let i = 0; i < this.SLIDES_COUNT; i++){
    const indicator = document.createElement('div')
    indicator.setAttribute('class', i ? 'indicator' : 'indicator active')
    indicator.dataset.slideTo = `${i}`
    indicators.append(indicator)
   }
 
    this.container.append(indicators)

    this.indicatorsContainer = document.querySelector('#indicators-container')
    this.indicatorsItems = document.querySelectorAll('.indicator')
  }

  _initListeners(){
    this.pauseButton.addEventListener('click', this.pausePlay.bind(this));
    this.nextButton.addEventListener('click', this.next.bind(this));
    this.prevButton.addEventListener('click', this.previous.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
    this.container.addEventListener('mouseenter', this.pause.bind(this));
    this.container.addEventListener('mouseleave', this.play.bind(this));
  }

// Функція для переходу до конкретного слайду
  _goToSlide(n) {
    this.slideItems[this.currentSlide].classList.remove('active'); // Прибираємо клас 'active' у поточного слайду
    this.indicatorsItems[this.currentSlide].classList.remove('active'); // Прибираємо клас 'active' у поточного слайду
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT; // Вираховуємо новий поточний слайд
    this.slideItems[this.currentSlide].classList.add('active'); // Додаємо клас 'active' новому слайду
    this.indicatorsItems[this.currentSlide].classList.add('active'); // Додаємо клас 'active' новому слайду
  }

  // Функція для переходу до наступного або попереднього слайду
  _nextSlide() {
    this._goToSlide(this.currentSlide + 1); // Переходимо до наступного слайду
  }

  _previousSlide() {
    this._goToSlide(this.currentSlide - 1); // Переходимо до попереднього слайду
  }

  _tick() {
    if (!this.isPlaying || this.slideInterval) return; // Перевіряємо, чи не встановлено значення `false` для isPlaying
    this.slideInterval = setInterval(() => this._nextSlide(), this.INTERVAL);
  }
  
  _indicate(e){
  const {target} = e

  if (target && target.classList.contains('indicator')){
    this.pause()
    this._goToSlide(+target.dataset.slideTo)
    }
  }

  _pressKey(e){
    const { code } = e
    if (code === this.CODE_ARROW_LEFT) this.previous()
    if (code === this.CODE_ARROW_RIGHT) this.next()
    if (code === this.CODE_SPACE){
      e.preventDefault()
      this.pausePlay ()
    } 
  }

  // Функція для паузи автопрогравання слайдера
  pause() {
    this.pauseButton.innerHTML = 'Play'; // Змінюємо текст кнопки на "Play"
    this.isPlaying = false;
    clearInterval(this.slideInterval); // Зупиняємо інтервал автопрогравання
    this.slideInterval = null
  }

  // Функція для відновлення автопрогравання слайдера
  play() {
    if(this.isPlaying) return
    this.pauseButton.innerHTML = 'Pause'; // Змінюємо текст кнопки на "Pause"
    this.isPlaying = true;
    this._tick();
  }

  // Встановлення функції на кнопку паузи, яка перемикає між паузою та відтворенням
  pausePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  // Зупинка автопрогравання та перехід до наступного або попереднього слайду при натисканні кнопок
  next() {
    this.pause();
    this._nextSlide();
  }

  previous() {
   this.pause();
    this._previousSlide();
  }

  init(){
    this. _tick()
    this._initProps()
    this._initControls()
    this._initIndicators()
    this._initListeners()
    
  }
}

export default Carousel


