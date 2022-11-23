//массив изображений для слайдера
//и соответствующая им информация
let images = [{
    path: "images/pictures/Kaliningrad_Blue.png",
    title: "Kaliningrad Blue",
	info: {
		city: "Kalinigrad Blue",
		area: "81 m2",
		time: "3.5 months",
		cost: "Upon request"
	}
  }, {
    path: "images/pictures/Kaliningrad_Spa.png",
    title: "Kaliningrad Spa",
	  info: {
		city: "Kaliningrad Spa",
		area: "105 m2",
		time: "4 months",
		cost: "Upon request"
	}
  }, {
    path: "images/pictures/Kaliningrad_Sky.png",
    title: "Kaliningrad Sky",
	  info: {
		city: "Kaliningrad Sky",
		area: "93 m2",
		time: "3 months",
		cost: "Upon request"
	}
  }];
  

//опции слайдера
let sliderOptions = {
	dots: true,				//наличие точек
	titles: {				//заголовки
		display: true,		//их наличие
		number: 3			//количество отображаемых одновременно заголовков
	},
	autoplay: true,			//автовоспроизведение слайдера
	autoplayInterval: 5000	//интервал автовоспроизведения
};

//инициализируем слайдер, когда браузер полностью загрузил HTML 
//и построил DOM-дерево
document.addEventListener("DOMContentLoaded", function() {
	initSlider(sliderOptions);
});
  

//функция инициализации слайдера
function initSlider(options) {
	//если массив не инициализирован 
	//или в нём нет изображений - выходим
	if (!images || !images.length) {
		return;
	}

	//если опции не заданы, применяем опции по умолчанию
	options = options || {
		titles: {
			display: true,
			number: 3
		},
		dots: true,
		autoplay: false
	};
	
	const numOfTitles = options.titles.number;


	let sliderImages = document.querySelector(".slider__images"); 			//div с изображениями
	let sliderImageInfo = document.querySelector(".slider__image-info");	//контейнер с инфомацией об изображении
	let sliderArrows = document.querySelectorAll(".slider__arrow");			//стрелки
	let sliderDots = document.querySelector(".slider__dots-ul");			//точки
	let sliderTitles = document.querySelector(".slider__titles");			//загловки над изображениями
	
	//инициализируем изображения и стрелки
	initImages();
	initArrows();

	//при необходимости инициализируем
	//и другие элементы и функции слайдера
	if (options.dots) {
		initDots();
	}

	
	if (options.titles.display) {
		initTitles(options.titles.number);
	}

	if (options.autoplay) {
		initAutoplay();
	}

	//загружаем в контейнер для изображений
	//div-ы, у которых изображение задано фоном
	function initImages() {
		images.forEach((image, index) => {
			//генерируем разметку
			let imageDiv = `<div class="slider__image-div n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].path});" data-index="${index}"></div>`;
			//добавляем элемент
			sliderImages.innerHTML += imageDiv;
			//загружаем информацию об изображении
			initImageInfo(index);
		});
	}

	//функция загружает данные об изображении в контейнер слева
	function initImageInfo(index) {
		let cityInfo = sliderImageInfo.querySelector(".city .slider__info-container");
		let areaInfo = sliderImageInfo.querySelector(".area .slider__info-container");
		let timeInfo = sliderImageInfo.querySelector(".time .slider__info-container");
		let costInfo = sliderImageInfo.querySelector(".cost .slider__info-container");
		
		cityInfo.innerHTML += `<p class="p n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].info.city}</p>`;
		areaInfo.innerHTML += `<p class="p n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].info.area}</p>`;
		timeInfo.innerHTML += `<p class="p n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].info.time}</p>`;
		costInfo.innerHTML += `<p class="p n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].info.cost}</p>`;
	}
	
	//инициализация стрелок
	//добавляем обработчик события на клик мыши
	function initArrows() {
		sliderArrows.forEach(arrow => {
			arrow.addEventListener("click", function() {
				//находим номер текущего изображения
				let curNumber = +sliderImages.querySelector(".active").dataset.index;
				//вычисляем номер нужного для отображения
				//в зависимости от вида стрелки
				let nextNumber;
				if (arrow.classList.contains("left")) {
					nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
				} else {
					nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
				}
				//перелистываем слайдер
				moveSlider(nextNumber);
			});
		});
	}

	//инифиализация точек
	function initDots() {
		//для каждого изображения
		images.forEach((image, index) => {
			//генерируем точку
			let dot = `<li class="slider__dots n${index} ${index === 0? "active" : ""}" data-index="${index}"><img src="images/point-image.svg" alt="point"></li>`;
			//добавляем в список
			sliderDots.innerHTML += dot;
		});
		//добавляем обрабочик событий для точки
		sliderDots.querySelectorAll(".slider__dots").forEach(dot => {
			dot.addEventListener("click", function() {
				moveSlider(this.dataset.index);
			})
		})
	}

	//перелистывание слайдера
	//на вход приходит номер нужного изображения
	function moveSlider(num) {
		sliderImages.querySelector(".active").classList.remove("active");
		sliderImages.querySelector(".n" + num).classList.add("active");
		if (options.dots) {
			sliderDots.querySelector(".active").classList.remove("active");
			sliderDots.querySelector(".n" + num).classList.add("active");
		}
		if (options.titles) {
			changeTitle(numOfTitles,num);
		}
		changeImageInfo(num);
	}

	//функция изменяет информацию об изображении
	//при перелистывании слайдера
	//на вход приходит номер изображения
	function changeImageInfo(num) {
		
		sliderImageInfo.querySelectorAll(".active").forEach((item) => {
			item.classList.remove("active");
		});
		
		sliderImageInfo.querySelectorAll(".n" + num).forEach((item) => {
			item.classList.add("active");
		});
	}
	
	
	//инициализация заголовков
	function initTitles(numOfTitles) {
		let sliderTitles = document.querySelector(".slider__titles");
		
		let n = (images.length < numOfTitles) ? images.length :  numOfTitles;	
		
		//генерируем и вставляем разметку
		images.forEach((image, index) => {
			let title = `<li class="horizontal-list_item n${index}" data-index="${index}" style="display: ${(index < n) ? "" : "none"}; opacity: ${(index < n) ? "1" : "0"};">
							<p class="p  ${index === 0? "active" : ""}">${cropTitle(images[index].title, 50)}</p>
						</li>`;
			sliderTitles.innerHTML += title;		

		});
		
		//добавляем обработчики событий для каждого заголовка
		sliderTitles.querySelectorAll(".p").forEach((item,index) => {
			item.addEventListener("click", function() {
				moveSlider(index);
			});
		});
	}

	//обрезка заголовков
	function cropTitle(title, size) {
		if (title.length <= size) {
		  return title;
		} else {
		  return title.substr(0, size) + "...";
		}
	}
	
	//смена активного заголовка
	function changeTitle(numOfTitles,num) {
		
		//если количество изображений меньше или равно числу отображаемых заголовков,
		//то просто меняем класс
		if (images.length <= numOfTitles) {
			sliderTitles.querySelector(".active").classList.remove("active");
			sliderTitles.querySelector(`.n${num} .p`).classList.add("active");
			return;
		}
		
		//иначе скрываем все заголовки, кроме активного,
		//а также предыдущего и следующего после него
		let titlesList = sliderTitles.querySelectorAll(".horizontal-list_item");
		
		titlesList.forEach((item) => {
			item.style.display = "none";
			item.style.opacity = "0";
		});
		
		let prev = (num == 0) ? images.length-1 : +num-1;
		let next = (num == images.length-1) ? 0 : +num+1;
		
		sliderTitles.querySelector(".active").classList.remove("active");
		sliderTitles.querySelector(`.n${num} .p`).classList.add("active");
		sliderTitles.querySelector(`.n${prev}`).style.display = "";
		sliderTitles.querySelector(`.n${num}`).style.display = "";
		sliderTitles.querySelector(`.n${next}`).style.display = "";
		
		sliderTitles.querySelector(`.n${prev}`).style.opacity = "1";
		sliderTitles.querySelector(`.n${num}`).style.opacity  = "1";
		sliderTitles.querySelector(`.n${next}`).style.opacity  = "1";
	}

	
	//инициализация автовоспроизвдения
	//задаем интервал, по истечению которого изображение должно поменяться
	function initAutoplay() {
		setInterval(() => {
			let curNumber = +sliderImages.querySelector(".active").dataset.index;
			let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
			moveSlider(nextNumber);
		}, options.autoplayInterval);
	}

}


