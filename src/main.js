import './style.css'
import Swal from 'sweetalert2'

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
        if (data.base === "EUR" && moeda !== "EUR"){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Moeda não existente!',
            background: '#282c33',
            color: 'white'
          })
        }else{
        Object.entries(data.rates).forEach((cambio) => {
        const cambioElement = document.querySelector('.cambio-container');
        const clone = cambioElement.cloneNode(true);
        clone.style.display = 'block';
        clone.querySelector('.nome-moeda').innerHTML = cambio[0];
        clone.querySelector('.valor-moeda').innerHTML = cambio[1].toFixed(3);
        document.querySelector('.moedas-container').appendChild(clone);
      });
    }   
    });
}

const btnSearch = document.querySelector('#btn-pesquisar');

btnSearch.addEventListener('click', () => {
  document.querySelector('.moedas-container').innerHTML = '';
  const moeda = document.querySelector('#input-moeda').value;
  if(moeda === ''){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Você precisa passar uma moeda!',
      background: '#282c33',
      color: 'white'
    })
  } else {
    const span = document.createElement('span');
    span.innerHTML = `Valores referentes a 1 ${moeda}`
    document.querySelector('.moedas-container').appendChild(span);
    apiFetch(moeda);
  }
});