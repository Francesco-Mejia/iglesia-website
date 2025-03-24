import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';

interface StreamSnippet {
  title: string;
  thumbnails: {
    high: {
      url: string;
    };
  };
  publishedAt: string;
}

interface StreamItem {
  id: {
    videoId: string;
  };
  snippet: StreamSnippet;
}

export function LiveStream() {
  const { t } = useTranslation();
  const [isLive, setIsLive] = useState(false);
  const [pastStreams, setPastStreams] = useState<StreamItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<StreamItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const channelId = 'UCnnolqv1eRbnz-XJDcGjpuw';

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=AIzaSyD-9Wz2_OhuI_ACvFWYICgbswflivanOmE`);
        const data = await response.json();
        setIsLive(data.items && data.items.length > 0);
      } catch (error) {
        console.error('Erreur lors de la vérification du statut en direct:', error);
      }
    };

    const fetchPastStreams = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=completed&type=video&order=date&maxResults=5&key=AIzaSyD-9Wz2_OhuI_ACvFWYICgbswflivanOmE`);
        const data = await response.json();
        setPastStreams(data.items || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des diffusions passées:', error);
      }
    };

    checkLiveStatus();
    fetchPastStreams();
  }, [channelId]);

  const handleVideoClick = (video: StreamItem) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="live-stream-container" id="transmisiones">
      <h2>{t('livestream.title')}</h2>
      
      {isLive ? (
        <div className="live-stream-active">
          <div className="live-indicator">
            <span className="live-dot"></span>
            {t('livestream.live')}
          </div>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/live/${channelId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Live Stream"
          />
        </div>
      ) : (
        <div className="live-stream-offline">
          <p>{t('livestream.offline')}</p>
        </div>
      )}

      <div className="past-streams">
        <h3>{t('livestream.pastStreams')}</h3>
        <div className="past-streams-grid">
          {pastStreams.length > 0 ? (
            pastStreams.map((stream, index) => (
              <div key={index} className="past-stream-card" onClick={() => handleVideoClick(stream)}>
                <img 
                  src={stream.snippet.thumbnails.high.url} 
                  alt={stream.snippet.title}
                  className="past-stream-thumbnail"
                />
                <div className="past-stream-info">
                  <h4>{stream.snippet.title}</h4>
                  <p>{new Date(stream.snippet.publishedAt).toLocaleDateString()}</p>
                  <button className="watch-button">
                    {t('livestream.watchNow')}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-streams">{t('livestream.noPastStreams')}</p>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedVideo?.snippet.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVideo && (
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={selectedVideo.snippet.title}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}