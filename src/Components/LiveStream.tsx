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
  const [isLoading, setIsLoading] = useState(true);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);
  const channelId = 'UCnnolqv1eRbnz-XJDcGjpuw';
  const [error, setError] = useState<string | null>(null);
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes
  const [lastFetchTime, setLastFetchTime] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      if (!YOUTUBE_API_KEY) {
        setError('La clé API YouTube n\'est pas configurée. Veuillez vérifier le fichier .env');
        setIsLoading(false);
        return;
      }

      const shouldFetch = !lastFetchTime || (Date.now() - lastFetchTime) > CACHE_DURATION;
      if (!shouldFetch) {
        setIsLoading(false);
        return;
      }

      try {
        // Vérifier le statut en direct
        const liveResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
        );
        
        if (!liveResponse.ok) {
          throw new Error(`Erreur API YouTube (${liveResponse.status}): ${liveResponse.statusText}`);
        }
        
        const liveData = await liveResponse.json();
        const isCurrentlyLive = liveData.items && liveData.items.length > 0;
        const currentLiveVideoId = isCurrentlyLive ? liveData.items[0].id.videoId : null;
        setLiveVideoId(currentLiveVideoId);
        setIsLive(isCurrentlyLive);

        // Récupérer les diffusions passées
        const pastResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=completed&type=video&order=date&maxResults=3&key=${YOUTUBE_API_KEY}`
        );

        if (!pastResponse.ok) {
          throw new Error(`Erreur API YouTube (${pastResponse.status}): ${pastResponse.statusText}`);
        }

        const pastData = await pastResponse.json();
        setPastStreams(pastData.items || []);
        setLastFetchTime(Date.now());
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la récupération des données');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [channelId, YOUTUBE_API_KEY, lastFetchTime, CACHE_DURATION]);

  const handleVideoClick = (video: StreamItem) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  if (isLoading) {
    return (
      <div className="live-stream-container" id="transmisiones">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <h3>{t('livestream.loading')}</h3>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="live-stream-container" id="transmisiones">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="text-center">
              <h3 className="text-danger">{error}</h3>
              <p>{t('livestream.tryAgain')}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="live-stream-container" id="transmisiones">
      <Container>
        
        {isLive && (
          <Row className="justify-content-center mb-5">
            <Col xs={12} className="position-relative">
              <div className="live-indicator">
                <span className="live-dot"></span>
                {t('livestream.live')}
              </div>
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Live Stream"
                />
              </div>
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
              <p className="no-streams">{t('livestream.noPastStreams')}</p>
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