import React from "react";

const Characters = ({ characters = [], onEliminar }) => {
  const eliminar = (id) => {
    onEliminar(id);
  };

  return (
    <div className="row">
      {characters.map((item, index) => (
        <div key={index} className="col mb-4">
          <div className="card" style={{ minWidth: "200px" }}>
            <img src={item.image} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
            </div>
            <hr />
            <p>Species: {item.species}</p>
            <p>Gender: {item.gender}</p>
            <p>Estatus: {item.status}</p>

            {item.status == "Alive" ? (
              <button onClick={() => eliminar(item.id)}>Eliminar</button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;
