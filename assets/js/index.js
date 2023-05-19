//ILOVEXUXA

// initiate splide
if (window.innerWidth <= 768) {
    // Your script code here
    var splide = new Splide( '.splide', {
        type   : 'loop',
        perPage: 3,
        autoplay: true,
        focus  : 'center',
        interval: 900,
        speed: 100000,
        arrows: false, // Remove navigation buttons
        pagination: false,
        rewind: true,
    } ).mount();
    // ...
}
else{
    var splide = new Splide( '.splide', {
        type   : 'loop',
        perPage: 10,
        autoplay: true,
        focus  : 'center',
        interval: 900,
        speed: 100000,
        arrows: false, // Remove navigation buttons
        pagination: false,
        rewind: true,
    } ).mount();
}



// function checkScreenSize() {
//     if (window.innerWidth <= 768) {
//         var splide = new Splide( '.splide', {
//             type   : 'loop',
//             perPage: 3,
//             focus  : 'center',
//         } ).mount();
//     }
//     else{
//         var splide = new Splide( '.splide', {
//             type   : 'loop',
//             perPage: 10,
//             focus  : 'center',
//             interval: 3000,
//             speed: 1000,
//         } ).mount();
//     }
// }

// checkScreenSize();
// window.addEventListener('resize', checkScreenSize);

// $(document).ready(function(){
//     splide.mount();
// })


// fetch pokemon data
function getpokemon(pokemonEnd,pokemonStart)
{
    let RAPIDAPI_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit='+pokemonEnd+'&offset='+pokemonStart;

    axios.get(`${RAPIDAPI_API_URL}`)
    .then(response => {

        console.log(response.data.results);

        const pokemons = response.data.results;

        // https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/1x/'+pokemons[pokemonsname2d].name+'-s.png

     

        pokemons.forEach((pokemon) => {

            console.log(pokemon.name);

            let newImg = document.createElement('img');
            // newImg.classList.add('col-xs-1'); 
            newImg.setAttribute('src', 'https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/1x/'+pokemon.name+'.png');

            let newSlide = document.createElement('li');
            newSlide.className = 'splide__slide';
            // newSlide.textContent = 'New Slide';

            newSlide.appendChild(newImg);

            splide.add(newSlide);
        });



        

    })
    .catch(error => console.error('On get pokemon error', error))
    .then(() => { 
        // $(document).ready(function(){
           
        // });
    }) 
}


getpokemon(20,0)