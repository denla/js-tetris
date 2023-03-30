const wrapper = document.querySelector('.field');

function start() {
  let matrix = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  function getNewArray(matrix) {
    let matr_copy = [];
    let new_matr = [];
    for (let i = 0; i < matrix.length; i++) {
      matr_copy[i] = matrix[i];
    }

    for (let i = 0; i < matrix.length; i++) {
      let rand_index = Math.floor((Math.random() * 10) % matr_copy.length);
      let rand_item = matr_copy.splice(rand_index, 1);
      new_matr.push(rand_item[0]);
    }
    return new_matr;
  }
  matrix = getNewArray(matrix);

  const wrapper = document.querySelector('.field');
  wrapper.style.gridTemplateColumns = 'auto auto auto auto';

  wrapper.innerHTML = '';
  const sound = document.getElementById('audio');
  let score = 0;

  matrix.forEach((el) => {
    wrapper.insertAdjacentHTML(
      'beforeend',
      `<div class="card">
  <div class="front"></div>
  <div class="bottom">${el}</div>
  </div>`,
    );
  });

  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => card.addEventListener('click', openCard));

  function openCard(e) {
    e.currentTarget.classList.toggle('active');
    sound.play();

    const active_cards = document.querySelectorAll('.active');

    if (active_cards.length == 2) {
      if (active_cards[0].innerText == active_cards[1].innerText) {
        active_cards.forEach((card) => card.classList.add('opened'));
        const score_line = document.querySelector('#score');
        score++;
        score_line.innerText = score * 10;
      }
    }

    if (active_cards.length == 2) {
      setTimeout(() => {
        active_cards.forEach((card) => card.classList.remove('active'));
      }, 700);
    }

    if (score * 10 == 80) {
      wrapper.innerHTML = '';
      wrapper.style.gridTemplateColumns = 'auto';
      wrapper.insertAdjacentHTML(
        'beforeend',
        `<div class="info" style="
  "><h1 style="
  ">You won</h1><br><button class="accent_btn" id="start">New game</button></div>`,
      );

      const start_btn = document.querySelector('#start');
      start_btn.addEventListener('click', start);
    }
  }
}

start();
