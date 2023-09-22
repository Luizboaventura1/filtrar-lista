import FormatPrice from "./src/modules/FormatPrice.js";
import { produtos } from "./src/modules/db.js";

const PRODUCTS_CONTAINER = document.querySelector('.products-container')
const FILTRO = document.querySelector('#filtro')
const FILTRAR_BUTTON = document.getElementById('filtrarButton')
const REMOVER_FILTROS_BUTTON = document.getElementById('removerFiltrosButton')
const FILTRO_TAGS = document.querySelector('.filtro-tags')

// Criar template
const templateProduct = (product,price) => {
  return `
  <div class="product d-flex p-3 text-white justify-content-between">
    <div>${product}</div>
    <div>${FormatPrice(price)}</div>
  </div>
  `
}

const resetProductsList = () => {
  PRODUCTS_CONTAINER.innerHTML = ''
}

const initProductsList = () => {
  resetProductsList()

  produtos.forEach(item => {
    PRODUCTS_CONTAINER.innerHTML += templateProduct(item.nome,item.preco)
  })
}

// Iniciar lista de produtos
initProductsList()

const renderProducts = (productList) => {
  resetProductsList()
  productList.forEach(item => {
    PRODUCTS_CONTAINER.innerHTML += templateProduct(item.nome, item.preco)
  })
}

const filterProducts = (comparador) => {
  // Ordenar lista com base no filtro escolhido pelo usuario
  const filterResult = [...produtos].sort(comparador)

  renderProducts(filterResult)
}

// Filtrar lista

FILTRAR_BUTTON.addEventListener('click', () => {
  if (FILTRO.value === 'Maior preço') {
    resetProductsList()

    filterProducts((a,b) => b.preco - a.preco)
    tag().add('Maior preço')
  }

  else if (FILTRO.value === 'Menor preço') {
    resetProductsList()
    
    filterProducts((a,b) => a.preco - b.preco)
    tag().add('Menor preço')
  }
})

// Remover filtros

REMOVER_FILTROS_BUTTON.addEventListener('click', () => {
  tag().remove()
  initProductsList()
})

// Tags do filtro

const tag = () => {

  const templateTag = (nameTag) => {
    return `
    <span class="text-white fw-medium me-2">Tags:</span>
    <div class="tag fw-medium px-2 py-1 text-white rounded-pill">${nameTag}</div>`
  }

  function add (nameTag) {
    FILTRO_TAGS.innerHTML = templateTag(nameTag)
  }

  function remove () {
    FILTRO_TAGS.innerHTML = ''
  }

  return {
    add: add,
    remove: remove
  }
}