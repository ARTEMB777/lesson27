function SwipeCarousel(){
  Carousel.apply(this, arguments)
  this.slidesContainer = this.container.querySelector('#slides-container')
}

SwipeCarousel.prototype = Object.create(Carousel.prototype)
SwipeCarousel.prototype.constructor = SwipeCarousel 

SwipeCarousel.prototype._initListeners = function (){
  Carousel.prototype._initListeners.apply(this)
  this.slidesContainer.addEventListener('touchstart', this.swipeStartHandler.bind(this));
  this.slidesContainer.addEventListener('mousedown', this.swipeStartHandler.bind(this));
  this.slidesContainer.addEventListener('touchend', this.swipeEndHandler.bind(this));
  this.slidesContainer.addEventListener('mouseup', this.swipeEndHandler.bind(this));
}

SwipeCarousel.prototype.swipeStartHandler = function(e) {
  this.startPosX = e instanceof MouseEvent 
  ? e.pageX 
  : e.changedTouches[0].pageX
},

SwipeCarousel.prototype.swipeEndHandler = function(e) {
  this.endPosX = e instanceof MouseEvent 
  ? e.pageX 
  : e.changedTouches[0].pageX
  if(this.endPosX - this.startPosX > 50) this.previous()
  if(this.endPosX - this.startPosX < -50) this.next()
}