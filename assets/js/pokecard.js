var loaderbackground = document.getElementById("preloader-background");
var table = $('#myTable').DataTable();


window.addEventListener("load", function(){
    const urlParams = new URLSearchParams(window.location.search);

    // if(urlParams.size==0){
    //     var pokemonName = 'pikachu';
    // }
    // else{
    //     var pokemonName = urlParams.get('pokemonName');
    // }
    loaderbackground.style.display = "none";

});

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        let pokemonName = document.getElementById('pokemonName');
        getonecard(pokemonName.value);
        pokemonName.value="";
    }
}

getonecard('charizard');


function getonecard(pokemonName){


	table.destroy();

    let myTable = document.getElementById("myTable");
    let tbody = myTable.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    // $(document).ready(function() {
	table = $('#myTable').DataTable( {
		// rowReorder: {
		//     selector: 'td:nth-child(2)'
		// },
		responsive: true
	} );

	axios.get(`https://api.pokemontcg.io/v1/cards?name=`+pokemonName)
    .then(response => {
        // console.log(response.data.cards);

		// console.log(response.data.cards);


        response.data.cards.forEach(function(pokecard){


			console.log(pokecard);

            // let newImg = document.createElement('img');
            // newImg.setAttribute('src', pokecard.imageUrlHiRes);
            // newImg.setAttribute('width', '90%');
            // // newImg.setAttribute('style', 'opacity:0;');
            // newImg.className = 'cardloader';

            // // newImg.setAttribute('id', pokecard.id);
            // // newImg.setAttribute('onclick', 'getonepokemondata("'+response.data.name+'")');
            // newImg.setAttribute('onclick', 'forCards("'+pokecard.imageUrlHiRes+'")');
            // // newImg.className = 'hvr-grow';

            // let newSlide = document.createElement('li');
            // newSlide.className = 'splide__slide';
            // newSlide.className = 'text-center';

            // newSlide.appendChild(newImg);
            // splideCards.add(newSlide);





			var newRowData = [pokecard.id, pokecard.imageUrlHiRes, pokecard.name, pokecard.rarity?pokecard.rarity:"", pokecard.set?pokecard.set:""];
			// var newRowData = [pokecard.id, pokecard.ImageUrlHiRes, pokecard.name, pokecard.set, pokecard.types];
            var newRow = table.row.add(newRowData).draw().node();

            // let moveDescriptiontobeuse = "";

            // response.data.flavor_text_entries.forEach(function(move){
            //     if(move.language.name=='en')
            //     {
            //         moveDescriptiontobeuse = move.flavor_text;
            //     }
            // })


            // $(newRow).find('td:eq(0)').html('<a class="btn" onclick="moveDescription(`'+moveDescriptiontobeuse+'`)" style="width:100%;">' + newRowData[0] + '</a>');
            $(newRow).find('td:eq(1)').html('<img onclick="dipatapos()" src="'+newRowData[1]+'" style="width:20%; cursor:pointer" >');


        })


        // images = document.getElementsByClassName("pokecard");

        


    })
    .catch(error => console.error('On get one pokemon card error', error))
    .then(() => { 

        // console.log(images);
        // Array.from(images).forEach(function(image) {
        //     image.addEventListener("load", function() {
        //       this.style.display = "block";
        //     });
        // });

    })
}

function dipatapos(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Coming Soon!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}