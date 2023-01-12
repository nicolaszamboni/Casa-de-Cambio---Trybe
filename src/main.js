import './style.css'

// data.rates = [ [usd, 5] , [brl, 1] ]
// el = [usd, 5]

// if data.base === EUR {
//  if moeda !== EUR {
//   ERRO
//  }
// }

function apiFetch(moeda) {
  fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
    .then(response => response.json())
    .then(data => {
      
        Object.entries(data.rates).forEach((cambio) => {
        const cambioElement = document.querySelector('.cambio-container');
        const clone = cambioElement.cloneNode(true);
        clone.style.display = 'block';
        clone.querySelector('.nome-moeda').innerHTML = cambio[0];
        clone.querySelector('.valor-moeda').innerHTML = cambio[1];
        document.querySelector('.moedas-container').appendChild(clone);
      });   
    });
}

const btnSearch = document.querySelector('#btn-pesquisar');

btnSearch.addEventListener('click', () => {
  document.querySelector('.moedas-container').innerHTML = '';
  const moeda = document.querySelector('#input-moeda').value;
  apiFetch(moeda);
});