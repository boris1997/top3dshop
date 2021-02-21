

class Navigation {
    constructor(page, menuWrapper, sidebar, sidebarBody, sidebarOverlay, backButton, hamburgerMenu, menuToggleres, menuElements, nestedElements, inputSearch) {
        this.page = page,
            this.menuWrapper = menuWrapper,
            this.sidebar = sidebar,
            this.sidebarBody = sidebarBody,
            this.sidebarOverlay = sidebarOverlay,
            this.backButton = backButton,
            this.hamburgerMenu = hamburgerMenu,
            this.menuToggleres = menuToggleres,
            this.menuElements = menuElements,
            this.nestedElements = nestedElements,
            this.activeWrapper = null,
            this.navigationTransform = 0,
            this.backButtonModificators = ['mobile-menu__back--show', 'mobile-menu__back--transition'],
            this.inputSearch = inputSearch
    }

    init() {
        this.menuElements.map((toggler, i) => {
            toggler.onclick = (e) => this.slickRight(e, i)
        })
        this.toggleSearchPlaceholder()
        window.onresize = () => {
            (window.innerWidth > 1080 && this.sidebar.classList.contains('page__sidebar--active')) ? this.removeSidebar() : slider.changeTranslation();
            this.toggleSearchPlaceholder()
        }
        this.sidebarOverlay.onclick = () => this.removeSidebar();
        this.backButton.onclick = (e) => this.slickLeft(e);
        this.hamburgerMenu.onclick = (e) => this.toggleSidebar()
    }

    toggleSearchPlaceholder = () => {
        window.innerWidth < 550 ? this.inputSearch.placeholder = 'Введите запрос' : this.inputSearch.placeholder = 'Введите запрос, например, Formlabs Form 2'
    }

    toggleSidebar = () => {
        this.sidebar.classList.toggle('page__sidebar--active');
        this.page.classList.toggle('page__noScroll');
        this.sidebarBody.classList.toggle('sidebar__body--active');
        this.sidebarOverlay.classList.toggle('sidebar__overlay--show');
        this.hamburgerMenu.classList.toggle('hamburger-menu__content--active');
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    removeSidebar = () => {
        this.sidebar.classList.remove('page__sidebar--active');
        this.page.classList.remove('page__noScroll');
        this.sidebarBody.classList.remove('sidebar__body--active');
        this.sidebarOverlay.classList.remove('sidebar__overlay--show');
        this.hamburgerMenu.classList.remove('hamburger-menu__content--active');
    }

    slickLeft = (e) => {
        this.navigationTransform += 100;
        this.navigationTransform === 0 && this.backButton.classList.remove('mobile-menu__back--show');
        this.transformSidebar()
        this.changeActiveWrapper(this.activeWrapper.parentElement.parentElement)
        this.activeWrapper.parentElement.parentElement.classList.add('mobile-menu__active')
        const unActiveElements = [...this.activeWrapper.parentElement.parentElement.children]
        this.enableUnActiveMenuEts(unActiveElements)
        this.disableActiveMenuEts(null, e)
        this.menuWrapper.classList.contains('mobile-menu__active') ? (this.menuWrapper.style.height = 'auto') : (this.menuWrapper.style.height = this.activeWrapper.parentElement.parentElement.offsetHeight + this.backButton.offsetHeight + 'px')
    }

    slickRight = (e, i) => {
        e.stopPropagation()
        this.menuElements[i].children[1] && (this.navigationTransform -= 100);
        this.navigationTransform === -100 && this.backButton.classList.add(...this.backButtonModificators);
        const nestedMenuElements = [...this.menuElements[i].children[1].children];
        this.transformSidebar()
        this.enableUnActiveMenuEts(nestedMenuElements);
        this.menuWrapper.style.height = this.menuElements[i].children[1].offsetHeight + this.backButton.offsetHeight + 'px';
        this.changeActiveWrapper(this.menuElements[i].children[1])
        this.disableActiveMenuEts(this.menuElements[i], e);
        this.menuElements[i].children[1].classList.add('mobile-menu__active');
    }

    transformSidebar = () => {
        this.menuWrapper.style.transform = `translateX(${this.navigationTransform}%)`;
    }

    changeActiveWrapper = () => {
        this.activeWrapper = document.querySelector('.mobile-menu__active');
        this.activeWrapper.classList.remove('mobile-menu__active');
    }

    disableActiveMenuEts = (exceptElement, e) => {
        const activeElements = [...this.activeWrapper.children];
        setTimeout(() => {
            activeElements.map((item, z) => (item.children[0].textContent !== exceptElement?.children[0].textContent || e.target.classList.contains('mobile-menu__back')) && item.classList.remove('mobile-menu__item--active'))
        }, 500)
    }

    enableUnActiveMenuEts = (nestedMenuElements) => {
        nestedMenuElements.map(item => item.classList.add('mobile-menu__item--active'))
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.page');
    const menuWrapper = document.querySelector('.mobile-menu__wrapper');
    const sidebar = document.querySelector('.page__sidebar');
    const sidebarBody = document.querySelector('.sidebar__body');
    const sidebarOverlay = document.querySelector('.sidebar__overlay');
    const backButton = document.querySelector('.back-button');
    const hamburgerMenu = document.querySelector('.hamburger-menu__content');
    const menuToggleres = [...document.querySelectorAll('.mobile-menu__toggler')];
    const menuElements = [...document.querySelectorAll('.mobile-menu__item')];
    const nestedElements = [...document.querySelectorAll('.nested')];
    const inputSearch = document.querySelector('.h-mobile__searcher-input');
    const navigation = new Navigation(page, menuWrapper, sidebar, sidebarBody, sidebarOverlay, backButton, hamburgerMenu, menuToggleres, menuElements, nestedElements, inputSearch)
    navigation.init()

})
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
const slider = new Slider(sliderContent, sliderItem, navigationItem);

slider.toggleMobDesktopSlider(activeItem);
slider.slick();
