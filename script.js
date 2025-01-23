const input = document.querySelector("#search-input");
const btn = document.getElementById("search-button");
const pListUrl="https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const pDataUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const types = document.getElementById("types");



const search = async () => {
  const res = await fetch(pListUrl);
  const data = await res.json();
  const pList = data.results;
  const poke = input.value.toLowerCase();
  const obj = getObj(pList,poke);
  getData(obj.url)
}

const getObj = (list,p) =>{
  if(isNaN(p)){
    const obj = list.find(a=>a.name===p);
    return obj||noPoke()}
  else{
    const obj = list.find(a=>a.id==p);
    return obj||noPoke()
  }}

const getData = async (url) => {
   const res = await fetch(url);
   const data = await res.json();
   updateDisplay(data);
}

const updateDisplay = (data) =>{
  const {name,id,weight,height,sprites} = data;
  document.getElementById("pokemon-name").innerText=`${name.toUpperCase()}`;
  document.getElementById("pokemon-id").innerText=`#${id}`
  document.getElementById("weight").innerText=`Weight: ${weight}`
  document.getElementById("height").innerText=`Height: ${height}`
  document.getElementById("sprite-content").innerHTML=`
  <img src="${sprites.front_default}" id="sprite">`;
console.log(data.types)

types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`)
      .join(' ');
getStats(data);


}

const getStats = (data) => {
  for(let i=0;i<7;i++){
  document.getElementById(`${data.stats[i].stat.name}`).innerText=`${data.stats[i].base_stat}`};
  return data
}

const noPoke = () => {
  alert ("Pokemon not found")
}


btn.addEventListener ("click", e=>{
  e.preventDefault();
  search();
});
document.addEventListener('keypress', e=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      search();
    }});
