const getCines = async () => {
    const id = ( new URLSearchParams( window.location.search )).get('id')
    const response = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`);
    const Cines = await response.json();
    return Cines;
  };
 
  const getTarifas = async () => {
    const id = ( new URLSearchParams( window.location.search )).get('id')
    const response = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/tarifas`);
    const Tarifas = await response.json();
  return Tarifas;

  };
  
  const getPeliculas = async () => {
    const id = ( new URLSearchParams( window.location.search )).get('id')
    const response = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/peliculas`);
    const Peliculas = await response.json();
  return Peliculas;

  };
  
  const Peliculas = (Peliculas) => {
    const PeliculaList = Peliculas.map((Pelicula) => {
      return (`
        <li key={Pelicula.id}>
          {Pelicula.title}
          <br />
          {Pelicula.releaseDate}
          <br />
          {Pelicula.genre}
          <br />
          {Pelicula.rating}
        </li>`
      );
    });
  
    return (<ul>{PeliculaList}</ul>);
  };
  
  const Tarifas = (Tarifas) => {
    const TarifaList = Tarifas.map((Tarifa) => {
      return (
        <li key={showtime.id}>
          {Tarifa.movieTitle}
          <br />
          {Tarifa.cinemaName}
          <br />
          {Tarifa.startTime}
          <br />
          {Tarifa.endTime}
        </li>
      );
    });
  
    return ( <ul>{TarifaList}</ul> );
  };
  
  
    const Cines = (Cines) => {
     const CineList = Cines.map((Cine) => {
          return (` 
                    <h2>{Cine.RazonSocial}</h2>
                    <div class="cine-info">
                    <div class="cine-info datos">
                    <p>{Cine.Direccion} - {Cine.Detalle}</p>
			        <p>Teléfono:{Cine.Telefonos}</p>
                    <br/>
                `
        //<li key={Cine.id}>
        //  {Cine.name}
        //  <br />
        //  {Cine.address}
        //  <br />
        //  {Cine.phone}
        //</li>
      );
    });
  
    return (
      <ul>{CineList}</ul>
    );
  };
  
  const getCine = async () => {
    const Cines = await getCines();
    const Tarifas = await getTarifas();
    const Peliculas = await getPeliculas();
  
    Cines(Cines);
    Tarifas(Tarifas);
    Peliculas(Peliculas);
  };
  
  getCine();