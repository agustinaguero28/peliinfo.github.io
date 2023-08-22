let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarSeries();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarSeries();
	}
});

const verDetalles = (id) => {
	const url = `https://www.themoviedb.org/tv/${id}`;
	window.location.href = url;
}

const cargarSeries = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
            console.log(datos)

			let series = '';
            datos.results.forEach(serie => {
                series += `
                    <div onclick="verDetalles(${serie.id})" class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${serie.poster_path}">
                        <h3 class="titulo">${serie.name}</h3>
                    </div>
                `;
            });



			document.getElementById('contenedor').innerHTML = series;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}



}

cargarSeries();