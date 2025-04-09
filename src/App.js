import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/Navbar.js";
import Characters from "./components/Characters.js";
import Pagination from "./components/Pagination.js";
import React, { useEffect, useState } from "react";

function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [search, setSearch] = useState('');

  const url = "https://rickandmortyapi.com/api/character";

  const consultaPersonajes = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);

        console.log(data.results);
        console.log(data.info);
      })
      .catch((error) => console.log(error));
  };

  const onAnterior = () => {
    consultaPersonajes(info.prev);

    console.log(info.prev);
  };
  const onSiguiente = () => {
    consultaPersonajes(info.next);
    console.log(info.next);
  };

  // Filtro de búsqueda
  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Actualiza el estado 'search' con el valor del input
  };
  
  
  const filtrarPersonajes = characters.filter((character) => {
   return(
    character.name.toLowerCase().includes(search.toLowerCase()) ||
    character.species.toLowerCase().includes(search.toLowerCase()) ||
    character.gender.toLowerCase().includes(search.toLowerCase()) ||
    character.status.toLowerCase().includes(search.toLowerCase()) 
   );
  });


    // Nueva función para cambiar el estatus a 'Dead'
    const onEliminar = (id) => {

      console.log('eliminaa: ' + id )
      const updatedCharacters = characters.map((character) => {
        if (character.id === id) {
          // Cambiar el estatus del personaje con ese id
          return { ...character, status: 'Dead' };
        }
        return character;
      });
      setCharacters(updatedCharacters); // Actualizar el estado de los personajes
    };

  useEffect(() => {
    consultaPersonajes(url);
  }, []);

  return (
    <>
      <NavBar titulo=" Rick y Morty" />

 
      <div className="container mt-7">

      <div className="mb-4">
      <input
            type="text"
            placeholder="Busqueda"
            value={search} // El valor del input está vinculado al estado 'search'
            onChange={handleSearchChange} // Se pasa la función 'handleSearchChange' que actualiza el estado 'search'
            className="form-control"
          />
        </div>
        <Pagination
          ant={info.prev}
          sig={info.next}
          onAnterior={onAnterior}
          onSiguiente={onSiguiente}
        />
        <Characters characters={filtrarPersonajes}  onEliminar={onEliminar} />
        <Pagination
          ant={info.prev}
          sig={info.next}
          onAnterior={onAnterior}
          onSiguiente={onSiguiente}
        />
      </div>
    </>
  );
}

export default App;
