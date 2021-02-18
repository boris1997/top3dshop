class Slider {
    constructor(sliderContent, sliderItem, navigationItem) {
        this.sliderContent = sliderContent,
            this.sliderItem = sliderItem,
            this.navigationItem = navigationItem,
            this.sliderTransform = 0;
        this.sliderItemMargin = 0;
        this.activeSliderClass = 'slider__video--active'

    }

    slick = () => {
        this.navigationItem[0].onclick = this.slickLeft;
        this.navigationItem[1].onclick = this.slickRight.bind('nextElementSibling');
    }

    getItemsMargin = (item) => +window.getComputedStyle(item, null).getPropertyValue("margin-left").split('px').splice(0, 1).join('')


    changeTranslation = () => {

        const activeItem = document.querySelector(`.${this.activeSliderClass}`)
        this.toggleMobDesktopSlider(activeItem)
        const id = sliderItem.indexOf(activeItem)
        if ((id > 1 && this.activeSliderClass === 'slider__video--active') || (id > 0 && this.activeSliderClass === 'slider__video--active-mobile')) {
            this.sliderItem.map((item, i) => {
                if (i < id) {
                    let factor = (this.activeSliderClass === 'slider__video--active-mobile' ? i + 1 : i);
                    this.sliderTransform = item.offsetWidth * factor + this.getItemsMargin(this.sliderItem[1]) * factor
                }
            })
        } else {
            this.sliderTransform = 0
        }
        this.sliderContent.style.transform = `translate(${-this.sliderTransform}px)`
    }

    toggleMobDesktopSlider = (activeItem) => {

        if (window.innerWidth < 650) {
            (activeItem.previousElementSibling && !activeItem.classList.contains('slider__video--active-mobile')) && (activeItem.previousElementSibling.classList.add('slider__video--active-mobile'),
                activeItem.classList.remove('slider__video--active'),
                this.activeSliderClass = 'slider__video--active-mobile'
            )
        }
        else {
            if (activeItem.nextElementSibling && activeItem.classList.contains('slider__video--active-mobile')) {
                activeItem.nextElementSibling.classList.add('slider__video--active');
                activeItem.classList.remove('slider__video--active-mobile');
                this.activeSliderClass = 'slider__video--active'
            } else {
                activeItem.classList.add('slider__video--active');
                activeItem.classList.remove('slider__video--active-mobile');
                this.activeSliderClass = 'slider__video--active'
            }
        }
    }

    slickLeft = () => {
        const activeItem = document.querySelector(`.${this.activeSliderClass}`)
        console.log(activeItem)
        console.log(this.activeSliderClass === 'slider__video--active-mobile')
        if (this.activeSliderClass === 'slider__video--active-mobile' && activeItem.previousElementSibling || activeItem.previousElementSibling?.previousElementSibling) {
            activeItem.classList.remove(this.activeSliderClass);
            activeItem.previousElementSibling.classList.add(this.activeSliderClass);
            this.changeTranslation()
        } else {
            this.sliderItem[this.sliderItem.length - 1].classList.add(this.activeSliderClass);
            activeItem.classList.remove(this.activeSliderClass);
            this.changeTranslation();
        };

    }
    slickRight = () => {
        const activeItem = document.querySelector(`.${this.activeSliderClass}`)
        if (activeItem.nextElementSibling) {
            activeItem.classList.remove(this.activeSliderClass);
            activeItem.nextElementSibling.classList.add(this.activeSliderClass);
            this.changeTranslation();
        } else {
            this.sliderItem[this.activeSliderClass === 'slider__video--active-mobile' ? 0 : 1].classList.add(this.activeSliderClass);
            this.sliderItem[this.sliderItem.length - 1].classList.remove(this.activeSliderClass);
            this.changeTranslation();
        }
    }
}


const sliderContent = document.querySelector('.slider__wrapper');
const sliderItem = [...document.querySelectorAll('.slider__video')];
const navigationItem = [...document.querySelectorAll('.navigation__item')];
const activeItem = document.querySelector('.slider__video--active')
export const slider = new Slider(sliderContent, sliderItem, navigationItem);

slider.toggleMobDesktopSlider(activeItem);
slider.slick();
