

// class Navigation {
//     constructor(page, menuWrapper, sidebar, sidebarBody, sidebarOverlay, backButton, hamburgerMenu, menuToggleres, menuElements, nestedElements, inputSearch) {
//         this.page = page,
//             this.menuWrapper = menuWrapper,
//             this.sidebar = sidebar,
//             this.sidebarBody = sidebarBody,
//             this.sidebarOverlay = sidebarOverlay,
//             this.backButton = backButton,
//             this.hamburgerMenu = hamburgerMenu,
//             this.menuToggleres = menuToggleres,
//             this.menuElements = menuElements,
//             this.nestedElements = nestedElements,
//             this.activeWrapper = null,
//             this.navigationTransform = 0,
//             this.backButtonModificators = ['mobile-menu__back--show', 'mobile-menu__back--transition'],
//             this.inputSearch = inputSearch
//     }

//     init() {
//         this.menuElements.map((toggler, i) => {
//             toggler.onclick = (e) => this.slickRight(e, i)
//         })
//         this.toggleSearchPlaceholder()
//         window.onresize = () => {
//             (window.innerWidth > 1080 && this.sidebar.classList.contains('page__sidebar--active')) ? this.removeSidebar() : slider.changeTranslation();
//             this.toggleSearchPlaceholder()
//         }
//         this.sidebarOverlay.onclick = () => this.removeSidebar();
//         this.backButton.onclick = (e) => this.slickLeft(e);
//         this.hamburgerMenu.onclick = (e) => this.toggleSidebar()
//     }

//     toggleSearchPlaceholder = () => {
//         window.innerWidth < 550 ? this.inputSearch.placeholder = 'Введите запрос' : this.inputSearch.placeholder = 'Введите запрос, например, Formlabs Form 2'
//     }

//     toggleSidebar = () => {
//         this.sidebar.classList.toggle('page__sidebar--active');
//         this.page.classList.toggle('page__noScroll');
//         this.sidebarBody.classList.toggle('sidebar__body--active');
//         this.sidebarOverlay.classList.toggle('sidebar__overlay--show');
//         this.hamburgerMenu.classList.toggle('hamburger-menu__content--active');
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth"
//         })
//     }

//     removeSidebar = () => {
//         this.sidebar.classList.remove('page__sidebar--active');
//         this.page.classList.remove('page__noScroll');
//         this.sidebarBody.classList.remove('sidebar__body--active');
//         this.sidebarOverlay.classList.remove('sidebar__overlay--show');
//         this.hamburgerMenu.classList.remove('hamburger-menu__content--active');
//     }

//     slickLeft = (e) => {
//         this.navigationTransform += 100;
//         this.navigationTransform === 0 && this.backButton.classList.remove('mobile-menu__back--show');
//         this.transformSidebar()
//         this.changeActiveWrapper(this.activeWrapper.parentElement.parentElement)
//         this.activeWrapper.parentElement.parentElement.classList.add('mobile-menu__active')
//         const unActiveElements = [...this.activeWrapper.parentElement.parentElement.children]
//         this.enableUnActiveMenuEts(unActiveElements)
//         this.disableActiveMenuEts(null, e)
//         this.menuWrapper.classList.contains('mobile-menu__active') ? (this.menuWrapper.style.height = 'auto') : (this.menuWrapper.style.height = this.activeWrapper.parentElement.parentElement.offsetHeight + this.backButton.offsetHeight + 'px')
//     }

//     slickRight = (e, i) => {
//         e.stopPropagation()
//         this.menuElements[i].children[1] && (this.navigationTransform -= 100);
//         this.navigationTransform === -100 && this.backButton.classList.add(...this.backButtonModificators);
//         const nestedMenuElements = [...this.menuElements[i].children[1].children];
//         this.transformSidebar()
//         this.enableUnActiveMenuEts(nestedMenuElements);
//         this.menuWrapper.style.height = this.menuElements[i].children[1].offsetHeight + this.backButton.offsetHeight + 'px';
//         this.changeActiveWrapper(this.menuElements[i].children[1])
//         this.disableActiveMenuEts(this.menuElements[i], e);
//         this.menuElements[i].children[1].classList.add('mobile-menu__active');
//     }

//     transformSidebar = () => {
//         this.menuWrapper.style.transform = `translateX(${this.navigationTransform}%)`;
//     }

//     changeActiveWrapper = () => {
//         this.activeWrapper = document.querySelector('.mobile-menu__active');
//         this.activeWrapper.classList.remove('mobile-menu__active');
//     }

//     disableActiveMenuEts = (exceptElement, e) => {
//         const activeElements = [...this.activeWrapper.children];
//         setTimeout(() => {
//             activeElements.map((item, z) => (item.children[0].textContent !== exceptElement?.children[0].textContent || e.target.classList.contains('mobile-menu__back')) && item.classList.remove('mobile-menu__item--active'))
//         }, 500)
//     }

//     enableUnActiveMenuEts = (nestedMenuElements) => {
//         nestedMenuElements.map(item => item.classList.add('mobile-menu__item--active'))
//     }

// }

// document.addEventListener('DOMContentLoaded', () => {
//     const page = document.querySelector('.page');
//     const menuWrapper = document.querySelector('.mobile-menu__wrapper');
//     const sidebar = document.querySelector('.page__sidebar');
//     const sidebarBody = document.querySelector('.sidebar__body');
//     const sidebarOverlay = document.querySelector('.sidebar__overlay');
//     const backButton = document.querySelector('.back-button');
//     const hamburgerMenu = document.querySelector('.hamburger-menu__content');
//     const menuToggleres = [...document.querySelectorAll('.mobile-menu__toggler')];
//     const menuElements = [...document.querySelectorAll('.mobile-menu__item')];
//     const nestedElements = [...document.querySelectorAll('.nested')];
//     const inputSearch = document.querySelector('.h-mobile__searcher-input');
//     const navigation = new Navigation(page, menuWrapper, sidebar, sidebarBody, sidebarOverlay, backButton, hamburgerMenu, menuToggleres, menuElements, nestedElements, inputSearch)
//     navigation.init()

// })