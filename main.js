let pool = [];
const colors = ["red", "blue", "yellow", "green"];
const operators = ["+", "x"];
initPool();

log = console.log

const cardBase = document.getElementById("cardBase").cloneNode(true);
cardBase.removeAttribute("id");

const dist = document.getElementById("distForm");
dist.addEventListener("submit", distributeCards);

const addButton = document.getElementById("addPlayer");
addButton.addEventListener("click", addPlayer)

const playerPanel = document.getElementById("playerBase");
playerPanel.removeAttribute("id");
playerPanel.children[0].children[1].addEventListener("click", addCards);
const playerBase = playerPanel.cloneNode(true);

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", function(){
  let players = document.getElementsByClassName("player");
  players = [...players];
  while(p=players[0].children[1].firstChild) p.remove();
  players.shift();
  players.forEach((player)=>{
    player.remove();
  });
  initPool();
})
function getRandomCards (count){
  let cards = []
  for (let i = 0; i < count; i++) {
      let cardData = pool.pop();
      let card = cardBase.cloneNode(true);
      card.classList.add(cardData.color);
      card.children[0].innerHTML = cardData.operator;
      card.children[1].innerHTML = cardData.number;
      card.addEventListener("click", function() {
        cls = this.classList;
        cls.contains("picked")?cls.remove("picked"):cls.add("picked");
      })
      cards.push(card);
  }
  return cards;
}

function addPlayer() {
  const p = playerBase.cloneNode(true);
  p.children[0].children[1].addEventListener("click", addCards);
  document.body.append(p);
}

function distributeCards(ev){
  ev.preventDefault();
  let count = ev.target.firstElementChild.valueAsNumber ?? 1;
  let players = document.getElementsByClassName("player");
  players = [...players];
  players.forEach((player)=>{
    let cards = getRandomCards(count);
    cards.forEach((card)=>{
      player.children[1].append(card);
    })
  })
}

function addCards(ev){
  const cardContainer = ev.target.parentElement.parentElement.children[1];
  let card = getRandomCards(1)[0];
  cardContainer.append(card);
}

function initPool(){
  pool = [];

  colors.forEach((color)=>{
    operators.forEach((op)=>{
      for(let i=1; i<=10; i++){
        let card = {
          color: color,
          operator: op,
          number: i,
        };
        pool.push(card);
      }
    })
  });

  pool.sort(()=>Math.random()-0.7);
  pool.sort(()=>Math.random()-0.3);
  pool.sort(()=>Math.random()-0.5);
}

