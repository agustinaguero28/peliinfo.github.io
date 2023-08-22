let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const tipo = document.getElementById('contenedor');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarContenido();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarContenido();
	}
});

const verDetalles = (id, tipoContenido) => {
    let url;
    if (tipoContenido === 'peliculas') {
        url = `https://www.themoviedb.org/movie/${id}`;
    } else {
        url = `https://www.themoviedb.org/tv/${id}`;
    }
    window.location.href = url;
}
  

tipo.addEventListener('change', () => {
	cargarContenido();
});

const cargarContenido = async() => {
	try {
		let url;
		if(tipo.value === 'peliculas'){
			url = `https://api.themoviedb.org/3/trending/movie/day?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`;
		} else {
			url = `https://api.themoviedb.org/3/trending/tv/day?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`;
		}

		const respuesta = await fetch(url);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let contenido = '';
			datos.results.forEach(item => {
				let imagen;
				if(item.poster_path){
					imagen = `<img class="poster" src="https://image.tmdb.org/t/p/w500/${item.poster_path}">`;
				} else if(item.backdrop_path){
					imagen = `<img class="poster" src="https://image.tmdb.org/t/p/w500/${item.backdrop_path}">`;
				} else {
					imagen = '<div class="no-imagen">No hay imagen disponible</div>';
				}



				let titulo;
				if(tipo.value === 'peliculas'){
					titulo = `<h3 class="titulo">${item.title}</h3>`;
				} else {
					titulo = `<h3 class="titulo">${item.name}</h3>`;
				}

				contenido += `
					<div onclick="verDetalles(${item.id}, '${tipo.value}')">
						${imagen}
						${titulo}
					</div>
				`;
			});

            

			document.getElementById('contenedor').innerHTML = contenido;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('El contenido que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarContenido();
