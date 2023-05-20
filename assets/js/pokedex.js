//ILOVEXUXA

var pokemonsTypestoProcess;


function handleKeyPress(event) {
    if (event.keyCode === 13) {
        let pokemonName = document.getElementById('pokemonName');
        getonepokemondata(pokemonName.value);
    }
}

var table = $('#myTable').DataTable();



function pokemonSearch(){
    let pokemonName = document.getElementById('pokemonName');
    getonepokemondata(pokemonName.value);
}


var loaderbackground = document.getElementById("preloader-background");

window.addEventListener("load", function(){
    const urlParams = new URLSearchParams(window.location.search);

    if(urlParams.size==0){
        var pokemonName = 'pikachu';
    }
    else{
        var pokemonName = urlParams.get('pokemonName');
    }

    getonepokemondata(pokemonName);
});



//284445

// fetch pokemon data
function getpokemondata(pokemonStart,pokemonEnd)
{
    let RAPIDAPI_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit='+pokemonEnd+'&offset='+pokemonStart;


    if (window.innerWidth <= 768) {
        var splide = new Splide( '.splide', {
            type   : 'loop',
            perPage: 2,
            focus  : 'center',
            arrows: false, 
            pagination: false,
            rewind: true,
            drag   : 'free',
            autoplay: true,
            speed: 100000,
            interval:1000,
        } ).mount();
    }
    else{
        var splide = new Splide( '.splide', {
            type   : 'loop',
            perPage: 10,
            focus  : 'center',
            arrows: false, 
            pagination: false,
            rewind: true,
            drag   : 'free',
            autoplay: true,
            speed: 100000,
            interval:1000,
        } ).mount();
    }

    
    if(splide.Components.Elements.slides.length > 0)
    {

        document.getElementById('splide1').innerHTML='';
        splide.destroy();
        if (window.innerWidth <= 768) {
            var splide = new Splide( '.splide', {
                type   : 'loop',
                perPage: 2,
                focus  : 'center',
                arrows: false, 
                pagination: false,
                rewind: true,
                drag   : 'free',
                autoplay: true,
                speed: 100000,
                interval:1000,
            } ).mount();
        }
        else{
            var splide = new Splide( '.splide', {
                type   : 'loop',
                perPage: 10,
                focus  : 'center',
                arrows: false, 
                pagination: false,
                rewind: true,
                drag   : 'free',
                autoplay: true,
                speed: 100000,
                interval:1000,
            } ).mount();
        }
    }


    axios.get(`${RAPIDAPI_API_URL}`)
    .then(response => {

        // console.log(response.data.results);

        const pokemons = response.data.results;

        // https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/1x/'+pokemons[pokemonsname2d].name+'-s.png

        pokemons.forEach((pokemon) => {

            // let checkerIfsameType = getPokemonType(pokemon.name);


            axios.get(`https://pokeapi.co/api/v2/pokemon/`+pokemon.name)
            .then(response => {

                // console.log(response.data.types)
                // console.log(pokemonsTypestoProcess);

                let array1 =[];
                let array2 =[];

                response.data.types.forEach((type) => {
                
                array1.push(type.type.name)
                })


                pokemonsTypestoProcess.forEach((type) => {
                    array2.push(type.type.name)
                })

                // console.log(array1,array2);


                // console.log(array1.some(item => array2.includes(item)));

                if(array1.some(item => array2.includes(item))){
                     // console.log(pokemon.name);

                    let commonType = array1.filter(item => array2.includes(item));

                    let newImg = document.createElement('img');
                    // newImg.classList.add('col-xs-1'); 
                    newImg.setAttribute('src', 'https://img.pokemondb.net/sprites/brilliant-diamond-shining-pearl/normal/1x/'+pokemon.name+'.png');
                    newImg.setAttribute('onclick', 'getonepokemondata("'+pokemon.name+'")');
                    // newImg.setAttribute('href', '#');
                    // newImg.setAttribute('data-mdb-toggle', 'tooltip');
                    // newImg.setAttribute('title', 'Im '+pokemon.name+', and Im also a '+commonType[0]+' type.');
                    // new mdb.Tooltip(newImg).init();

                    // mdb.Tooltip.getInstance(newImg) || new mdb.Tooltip(newImg).show();

                    let newSlide = document.createElement('li');
                    newSlide.className = 'splide__slide';
                    // newSlide.textContent = 'New Slide';

                    newSlide.appendChild(newImg);

                    splide.add(newSlide);
                }

            })
            .catch(error => console.error('On get one pokemon error', error))
            .then(() => { 

            })
           
        });
        
    })
    .catch(error => console.error('On get pokemon error', error))
    .then(() => { 
      

    })
}

//fetch specific pokemon data
function getonepokemondata(pokemonName)
{
    let pokemonSectionResult = document.getElementById('firstCard');
    let RAPIDAPI_API_URL = 'https://pokeapi.co/api/v2/pokemon/'+pokemonName;
    let pokemontypes = document.getElementById('pokemonTypes');
    let backgroundColor = document.getElementById('backgroundColor');
    let relatedTo = document.getElementById('relatedTo');

    let img = pokemonSectionResult.querySelectorAll('img');
    let title = pokemonSectionResult.querySelectorAll('h5');
    let dexEntry = pokemonSectionResult.querySelectorAll('p');

    // img[0].width = '30%'; 


    pokemontypes.innerHTML='';
    let removeClass = backgroundColor.classList[3];
    if (backgroundColor.classList.contains(removeClass)) {
        backgroundColor.classList.remove(removeClass);
    }

    axios.get(`${RAPIDAPI_API_URL}`)
    .then(response => {
        let pokemonId = response.data.id.toString().padStart(3, '0');
        img[0].src = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/'+pokemonId+'.png';

        pokemonsTypestoProcess = response.data.types;

        getpokemondata(0,151);

        // getPokemonType(1);



        // console.log(response.data);'<img class="animate__animated animate__fadeIn animate__delay-2s" src="" width="20%"/>'
        moveData(response.data.moves);


        let type1 = response.data.types[0].type.name;

        if(type1 == 'grass')
        {
            backgroundColor.classList.add('bg-success');
        }

        if(type1 == 'fire')
        {
            backgroundColor.classList.add('bg-danger');
        }

        if(type1 == 'water')
        {
            backgroundColor.classList.add('bg-primary');
        }

        if(type1 == 'flying')
        {
            backgroundColor.classList.add('bg-primary');
        }

        if(type1 == 'rock')
        {
            backgroundColor.classList.add('bg-secondary');
        }

        if(type1 == 'electric')
        {
            backgroundColor.classList.add('bg-warning');
        }


        response.data.types.forEach(function(type) {

            pokemontypes.innerHTML+='<img class="animate__animated animate__fadeIn animate__delay-2s" src="assets/images/pokemonTypes/'+type.type.name+'text.png" width="20%"/>';

            // console.log(type.type.name);
        });


        // console.log(pokemonId);

        

        let HP = response.data.stats[0].base_stat;
        let ATTACK = response.data.stats[1].base_stat;
        let DEFENSE = response.data.stats[2].base_stat;
        let SPECIAL_ATTACK = response.data.stats[3].base_stat;
        let SPECIAL_DEFENSE = response.data.stats[4].base_stat;
        let SPEED = response.data.stats[5].base_stat;

        const dataRadarChart = {
            labels: [
                'HP',
                'SPECIAL ATTACK',
                'ATTACK',
                'SPEED',
                'DEFENSE',
                'SPECIAL DEFENSE',
            ],
            datasets: [{
                label: 'ATTRIBUTES',
                data: [HP, SPECIAL_ATTACK, ATTACK, SPEED, DEFENSE, SPECIAL_DEFENSE],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                // pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        };

        // Get a reference to the existing chart instance
        let existingChart = Chart.getChart("pokemonStatscanvas");

        // Destroy the existing chart instance
        if (existingChart) {
            existingChart.destroy();
        }

        var options = {
            scale: {
                min:0,
                max:200,
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    stepSize: 20,
                }
            },
            elements: {
                line: {
                    borderWidth: 0
                }
            },
            animation: {
                duration: 2000, 
                delay: 500,
                // tension: {
                //     duration: 1000,
                    // easing: 'linear',
                    // from: -0.2,
                    // to: 0,
                    // loop: true
                // }
            }
        };

        axios.get(response.data.species.url)
        .then(response => {
            // console.log(response.data);
            dexEntry[0].textContent = response.data.flavor_text_entries[0].flavor_text;
        })
        .catch(error => console.error('On get one pokemon error', error))
        .then(() => { 


        })

        var ctx = document.getElementById("pokemonStatscanvas").getContext("2d");
        new Chart(ctx, {
            type: 'bar',
            data: dataRadarChart,
            options: options
        });


        
        // img2[1].src = 'assets/images/pokemonTypes/'+type1+'text.png';
        title[0].textContent = response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1).toLowerCase();
        relatedTo.textContent = 'Pokemon related to '+response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1).toLowerCase();
    })
    .catch(error => console.error('On get one pokemon error', error))
    .then(() => { 
        new Promise((resolve) => {
            loaderbackground.classList.add('animate__animated'); 
            loaderbackground.classList.add('animate__fadeOut');
            setTimeout(() => resolve(), 1000); // Delay execution by 3 seconds
        }).then(() => {
            loaderbackground.style.display = "none";
        });

        // $('#myTable').DataTable({
        //     language: {
        //         searchPlaceholder: 'Search Move'
        //     }
        // });


    })
}


function moveData(datamoves)
{
    // console.log(datamoves);

    table.destroy();

    let myTable = document.getElementById("myTable");
    let tbody = myTable.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    // $(document).ready(function() {
        table = $('#myTable').DataTable( {
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
            responsive: true
        } );
    // } );


    // table = $('#myTable').DataTable({
    //     // scrollY: '300px',
    //     // scrollCollapse: true,
    //     paging:false,
    //     language: {
    //         searchPlaceholder: 'Search Move'
    //     },
    //     rowReorder: {
    //         selector: 'td:nth-child(2)'
    //     },
    //     responsive: true,
    // });

    datamoves.forEach(function(datamove) {

        axios.get('https://pokeapi.co/api/v2/move/'+datamove.move.name)
        .then(response => {

            var newRowData = [response.data.name, response.data.accuracy, response.data.damage_class.name, response.data.power, response.data.pp, response.data.type.name];
           
           
            var newRow = table.row.add(newRowData).draw().node();

            // Add HTML tag or element to specific column
            $(newRow).find('td:eq(0)').html('<a href="'+newRowData[0]+'">' + newRowData[0] + '</a>');
           
           
           
            // table.row.add(newRowData).draw();
            // console.log(response.data);
            // let moveName = document.createElement("td");
            // moveName.textContent = response.data.name;
            // row.appendChild(moveName);


            // let moveAccuracy = document.createElement("td");
            // moveAccuracy.textContent = response.data.accuracy;
            // row.appendChild(moveAccuracy);

            // let damageClass = document.createElement("td");
            // damageClass.textContent = response.data.damage_class;
            // row.appendChild(damageClass);

            // let movePower = document.createElement("td");
            // movePower.textContent = response.data.power;
            // row.appendChild(movePower);

            // let movePp = document.createElement("td");
            // movePp.textContent = response.data.pp;
            // row.appendChild(movePp);

            // let moveType = document.createElement("td");
            // moveType.textContent = response.data.type;
            // row.appendChild(moveType);

        })
        .catch(error => console.error('On get one pokemon error', error))
        .then(() => { 
            // tbody.appendChild(row);
        })
    });

  
}



function pokemonRelatedTo(){


    getpokemondata(0,151);

    // console.log(pokemonsTypestoProcess);

}

function getPokemonType(Pokename){

    axios.get(`https://pokeapi.co/api/v2/pokemon/`+Pokename)
    .then(response => {

        // console.log(response.data.types)
        // console.log(pokemonsTypestoProcess);


        let array1 =[];
        let array2 =[];

        response.data.types.forEach((type) => {
        
        array1.push(type.type.name)
        })


        pokemonsTypestoProcess.forEach((type) => {
            array2.push(type.type.name)
        })

        console.log(array1,array2);


        console.log(array1.some(item => array2.includes(item)));

    })
    .catch(error => console.error('On get one pokemon error', error))
    .then(() => { 

    })
}

