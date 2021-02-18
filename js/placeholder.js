const inputSearch = document.querySelector('.h-mobile__searcher-input')
/* console.log(placeholder.placeholder) */
window.onresize = () => { window.innerWidth < 550 ? inputSearch.placeholder = 'Введите запрос' : 'Введите запрос, например, Formlabs Form 2' }