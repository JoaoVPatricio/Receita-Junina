const minus = document.querySelector('#minusButton')
const plus = document.querySelector('#plusButton')
const number = document.querySelector('#incrementNumber')
const body = document.querySelector('body')
let count = 1

minus.addEventListener('click', () => {
  count--

  if (count < 0) {
    count = 0
  }

  if (number.innerHTML > 8) {
    number.innerHTML = count
  } else {
    number.innerHTML = '0' + count
  }

  // number.innerHTML > 8 ? number.innerHTML = count : number.innerHTML = '0' + count
})

plus.addEventListener('click', () => {
  count++

  number.innerHTML > 8 ? number.innerHTML = count : number.innerHTML = '0' + count
})

async function fetchJson() {
  try {
    const response = await fetch('./data/comidas.json')
    const data = await response.json()

    console.log(data)

    let currentIndex = 0

    const previewButton = document.querySelector('#prev')
    const nextButton = document.querySelector('#next')
    const foodName = document.querySelector('#foodName')
    const foodImage = document.querySelector('#image')
    const foodDesc = document.querySelector('#foodDescription')
    const foodIngredients = document.querySelector('#foodIngredients')
    const foodPreparation = document.querySelector('#foodPreparation')

    function updateFood() {
      const foodContainer = document.querySelector('.food-info')
      const imageContainer = document.querySelector('.image')

      foodContainer.classList.add('hidden')
      imageContainer.classList.add('hidden')

      setTimeout(() => {
        if (data.receitas.length > 0) {
          const receita = data.receitas[currentIndex]
          foodName.innerHTML = receita.nome
          foodImage.src = receita.imagem
          foodImage.alt = receita.nome
          foodDesc.innerHTML = receita.descricao
  
          foodIngredients.innerHTML = ''
          foodPreparation.innerHTML = ''
  
          for (let i = 0; i < receita.ingredientes.length; i++) {
            const ingredientList = document.createElement('li')
            ingredientList.textContent = receita.ingredientes[i]
            foodIngredients.appendChild(ingredientList)
            
            const preparationList = document.createElement('li')
            preparationList.textContent = receita.modo_de_preparo[i]
            foodPreparation.appendChild(preparationList)
          }
        }

        foodContainer.classList.remove('hidden')
        imageContainer.classList.remove('hidden')

        // foodContainer.classList.add('visible')
        // imageContainer.classList.add('visible')
      }, 500)

    }

    updateFood()

    previewButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--
        updateFood()
      } else if (currentIndex <= 0) {
        currentIndex = data.receitas.length - 1
        updateFood()
      }
    })

    nextButton.addEventListener('click', () => {
      if (currentIndex < data.receitas.length - 1) {
        currentIndex++
        updateFood()
      } else {
        currentIndex = 0
        updateFood()
      }
    })
  }
  catch (error) {
    console.log(error)
  }
}

fetchJson()