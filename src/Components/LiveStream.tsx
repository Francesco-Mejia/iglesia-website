import React, { useState, useEffect } from 'react';

export function LiveStream() 
{
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const apiKey = 'AIzaSyD-9Wz2_OhuI_ACvFWYICgbswflivanOmE';
    const channelId = 'ID_DE_TU_CANAL_DE_YOUTUBE'; // Reemplaza con el ID de tu canal

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;

    setIsLoading(true); 
    setError(null);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) 
        {
          throw new Error(`HTTP error! status: ${response.status}`); 
        }
        return response.json();
      })
      .then(data => {
        if (data.items && data.items.length > 0) 
        {
          const liveStreamId = data.items[0].id.videoId;
          setLiveStreamUrl(`https://www.youtube.com/embed/${liveStreamId}`);
        } 
        else 
        {
          setError("No se encontró ninguna transmisión en vivo.");
        }
      })
      .catch(error => {
        console.error('Error al obtener la URL del live stream:', error);
        setError("Error al obtener la transmisión en vivo.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div id='transmisiones'>
      <h2>Transmisión en vivo</h2>
      {isLoading ? (
        <p>Cargando transmisión en vivo...</p>
      ) : error ? (
        <p>{error}</p>
      ) : liveStreamUrl ? (
        <iframe
          width="560"
          height="315"
          src={liveStreamUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No hay transmisión en vivo en este momento.</p>
      )}
    </div>
  );
}