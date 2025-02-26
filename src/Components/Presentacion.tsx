import React from 'react';

export function Presentacion()
{
  const mensaje = "Encuentra la paz y el amor incondicional que solo Cristo puede dar.";
  const pasajeBiblico = "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna. - Juan 3:16";

  return (
    <div className="presentacion-container">
      <div className="presentacion-content">
        <p className="mensaje">{mensaje}</p>
        <p className="pasaje">{pasajeBiblico}</p>
        <p className="invitacion">¿Quieres conocer más sobre Jesús? ¡Te invitamos a visitarnos!</p>
      </div>
    </div>
  );
};