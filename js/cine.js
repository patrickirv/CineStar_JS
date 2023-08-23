const getCine = async () => {
    const idd = ( new URLSearchParams( window.location.search )).get('idd')
    const data  = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${idd}`);
    const data2 = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${idd}/tarifas`);
    const data3 = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${idd}/peliculas`);

    if ( data.status == 200 && data2.status == 200 && data3.status == 200 ) {
        
        const cine = await data.json();
        const tarifa = await data2.json();
        const pelicula = await data3.json();
        
        /* CINE */
        let html =  `
                        <h2>${cine.RazonSocial}</h2>
                        <div class="cine-info">
                            <div class="cine-info datos">
                                <p>${cine.Direccion} - ${cine.Detalle}</p>
                                <p>Teléfono: ${cine.Telefonos}</p>
                                <br/>
                    `
        /* TARIFAS */
    for (let i = 0; i < tarifa.length; i += 2) {
        const tarifa1 = tarifa[i];
        const tarifa2 = tarifa[i + 1];
                    
        html +=     `
                        <div class="fila">
                            <div class="celda-titulo">${tarifa1.DiasSemana}</div>
                            <div class="celda">${tarifa1.Precio}</div>
                        </div>
                        <div class="fila impar">
                            <div class="celda-titulo">${tarifa2.DiasSemana}</div>
                            <div class="celda">${tarifa2.Precio}</div>
                        </div>
                    `
        }
                                        
        html +=     `
                        <div class="aviso">
                            <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
                        </div>
                        </div>
                        <img src="img/cine/${cine.id}.2.jpg"/>
                        <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
                    `
                           
        /* PELICULAS */
        html +=     `
                        <div class="cine-info peliculas">
                            <div class="tabla">
                                <div class="fila">
                                    <div class="celda-cabecera">Películas</div>
                                    <div class="celda-cabecera">Horarios</div>
                                </div>
                    `
        for (let i = 0; i < pelicula.length; i += 2) {
            const pelicula1 = pelicula[i];
            const pelicula2 = pelicula[i + 1];
        html +=     `
                        <div class="fila impar">
                            <div class="celda-titulo">${pelicula1.Titulo}</div>
                            <div class="celda">${pelicula1.Horarios}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">${pelicula2.Titulo}</div>
                            <div class="celda">${pelicula2.Horarios}</div>
                        </div>                    
                    `
        }                
        html +=     `
                        </div>
                        </div>
                        </div>
                        <div>
                            <img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
                            <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
                            Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
                            <br/><br/>
                            Visitános y diviértete con nosotros. 
                            <br/><br/>
                            <b>CINESTAR</b>, siempre pensando en tí. 
                            </span>
                        </div>
                    `           
        document.getElementById('contenido-interno').innerHTML = html;
        }                                    
    }
getCine()