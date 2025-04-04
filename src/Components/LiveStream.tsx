import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Container, Row, Col } from 'react-bootstrap';

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
  const [error, setError] = useState<string | null>(null);
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  useEffect(() => {
    if (!YOUTUBE_API_KEY) {
      setError('La clé API YouTube n\'est pas configurée');
      return;
    }

    const shouldFetch = !lastFetchTime || (Date.now() - lastFetchTime) > CACHE_DURATION;

    const checkLiveStatus = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erreur API YouTube: ${errorData.error?.message || response.statusText}`);
        }
        const data = await response.json();
        setIsLive(data.items && data.items.length > 0);
      } catch (error) {
        console.error('Erreur lors de la vérification du statut en direct:', error);
      }
    };

    const fetchPastStreams = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=completed&type=video&order=date&maxResults=3&key=${YOUTUBE_API_KEY}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erreur API YouTube: ${errorData.error?.message || response.statusText}`);
        }
        const data = await response.json();
        setPastStreams(data.items || []);
        setError(null);
        setLastFetchTime(Date.now());
      } catch (error) {
        console.error('Erreur lors de la récupération des diffusions passées:', error);
        setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la récupération des diffusions passées');
      }
    };

    if (shouldFetch) {
      checkLiveStatus();
      fetchPastStreams();
    }
  }, [channelId, YOUTUBE_API_KEY, lastFetchTime, CACHE_DURATION]);

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
      <Container>
        <Row className="justify-content-center mb-5">
          <Col xs={12} className="text-center">
          </Col>
        </Row>
        
        {isLive ? (
          <Row className="justify-content-center mb-5">
            <Col xs={12} className="position-relative">
              <div className="live-indicator">
                <span className="live-dot"></span>
                {t('livestream.live')}
              </div>
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/live/${channelId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Live Stream"
                />
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center mb-5">
            <Col xs={12} className="text-center">
              
            </Col>
          </Row>
        )}

        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-4">
            <h3>{t('livestream.pastStreams')}</h3>
          </Col>
          {pastStreams.length > 0 ? (
            pastStreams.map((stream, index) => (
              <Col key={index} xs={12} sm={6} md={4} className="mb-4">
                <div className="past-stream-card h-100" onClick={() => handleVideoClick(stream)}>
                  <img 
                    src={stream.snippet.thumbnails.high.url} 
                    alt={stream.snippet.title}
                    className="past-stream-thumbnail img-fluid"
                  />
                  <div className="past-stream-info">
                    <h4>{stream.snippet.title}</h4>
                    <p>{new Date(stream.snippet.publishedAt).toLocaleDateString()}</p>
                    <button className="watch-button">
                      {t('livestream.watchNow')}
                    </button>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p className="no-streams">
                {error ? (
                  <span className="text-danger">
                    {t('livestream.error')}: {error}
                  </span>
                ) : (
                  t('livestream.noPastStreams')
                )}
              </p>
            </Col>
          )}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedVideo?.snippet.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVideo && (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.snippet.title}
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}