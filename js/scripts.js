document.addEventListener("DOMContentLoaded", function() {

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})

	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});


	// tiles slider
	const sliders = document.querySelectorAll('.slider-tiles');
	sliders.forEach(slider => {
		const dataCol = slider.getAttribute('data-col') || 1; 
		const swiper = new Swiper(slider.querySelector('.swiper'), {
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: '.slider-tiles-pagination',
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: slider.querySelector('.button-slider-tiles-next'),
				prevEl: slider.querySelector('.button-slider-tiles-prev'),
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				
				},
				1024: {
					slidesPerView: dataCol === 'auto' ? 'auto' : (parseInt(dataCol) > 5 ? 5 : parseInt(dataCol)),
				
				},
				1200: {
					slidesPerView: dataCol === 'auto' ? 'auto' : (parseInt(dataCol) > 6 ? 6 : parseInt(dataCol)),
				},
				1400: {
					slidesPerView: dataCol === 'auto' ? 'auto' : parseInt(dataCol),
				},
			},
		});
	});


	//slider calc
	const swiperSliderCalс = new Swiper('.slider-calc .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		allowTouchMove: false,
		pagination: {
			el: '.slider-calc-pagination',
			clickable: false,
			type: "progressbar",
		},
		autoplay: false,
		navigation: false,
		on: {
			init: function () {
				updateSliderCounter(this);
			},
			slideChange: function () {
				updateSliderCounter(this);
			},
		}
	});
	function updateSliderCounter(swiper) {
		const total = swiper.slides.length - (swiper.loopedSlides ? swiper.loopedSlides * 2 : 0);
		const current = swiper.realIndex + 1;
		document.querySelector('.slider-calc-counter .slider-count').textContent = total.toString().padStart(2, '');
		document.querySelector('.slider-calc-counter .slider-current').textContent = current.toString().padStart(2, '0');
	}
	const btnClaclPrev = document.querySelector('.slider-calc-button-prev');
	const btnCalcNext = document.querySelector('.slider-calc-button-next');
	const formSliderBox = document.querySelector('.form-slider-box');
	btnClaclPrev.addEventListener('click', function(e) {
		e.preventDefault();
		if (swiperSliderCalс.realIndex === 0) {
			formSliderBox.classList.remove('show-form');
		} else {
			swiperSliderCalс.slidePrev();
		}
	});
	btnCalcNext.addEventListener('click', function(e) {
		e.preventDefault();
		const lastIndex = swiperSliderCalс.slides.length - 1;
		if (swiperSliderCalс.realIndex === lastIndex) {
			formSliderBox.classList.remove('show-form');
			formSliderBox.classList.add('show-finish');
		} else {
			swiperSliderCalс.slideNext();
		}
	});


	//slider order
	const swiperSliderOrder = new Swiper('.slider-order .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: {
			el: '.slider-order-pagination',
			clickable: true,
		},
		autoplay: false,
		navigation: {
			nextEl: '.button-slider-order-next',
			prevEl: '.button-slider-order-prev',
		},
	
	});


	//slider photos
	const swiperSliderPhotos = new Swiper('.slider-photos .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: '.button-slider-photos-next',
			prevEl: '.button-slider-photos-prev',
		},
	
	});


	//slider line
	const swiperSliderLine = new Swiper('.slider-galrow .swiper',
	{
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		speed: 10000,
		pagination: false,
		centeredSlides: true,
		allowTouchMove: false,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		navigation: false,
	});


	//slider photos thumbs preview
	document.querySelectorAll('.tiles-thumbs-slider-box').forEach(function(container) {
		const thumbsEl = container.querySelector('.slider-photos-thumbs .swiper');
		const mainEl = container.querySelector('.slider-photos-main .swiper');
		const nextMBtn = container.querySelector('.button-slider-photos-main-next');
		const prevMBtn = container.querySelector('.button-slider-photos-main-prev');
		const nextTBtn = container.querySelector('.button-slider-photos-thumbs-next');
		const prevTBtn = container.querySelector('.button-slider-photos-thumbs-prev');
		const mainPag = container.querySelector('.slider-photos-main-pagination');
	
		const swiperPhotosPreview = new Swiper(thumbsEl, {
			loop: false,
			slidesPerView: 3,
			spaceBetween: 0,
			threshold: 3,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			freeMode: false,
			breakpoints: {
				1024: {
				},
			},
		});
		const swiperPhotosMain = new Swiper(mainEl, {
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 400,
			threshold: 5,
			freeMode: false,
			watchSlidesProgress: true,
			navigation: false,
			pagination: false,
			thumbs: {
				swiper: swiperPhotosPreview,
			},
		});
	});



})