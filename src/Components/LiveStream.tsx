import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

const channelId = 'UCnnolqv1eRbnz-XJDcGjpuw';
const uploadsPlaylist = 'UUnnolqv1eRbnz-XJDcGjpuw';
const channelUrl = `https://www.youtube.com/channel/${channelId}`;

interface PastStream {
  id: string;
  title: string;
}

interface YTPlayer {
  destroy: () => void;
  getPlaylist: () => string[] | null;
  getVideoData: () => { video_id?: string; title?: string };
  loadVideoById: (video: { videoId: string }) => void;
}

interface YTApi {
  Player: new (element: HTMLElement, options: unknown) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    if (!document.getElementById('youtube-iframe-api')) {
      const script = document.createElement('script');
      script.id = 'youtube-iframe-api';
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }
  });
}

function laterIds(player: YTPlayer): { ids: string[]; title: string } {
  const ids = (player.getPlaylist() || []).filter(Boolean);
  const data = player.getVideoData() || {};
  const current = data.video_id;
  const title = (data.title || '').replace(/\s+/g, ' ').trim();
  let start = current ? ids.indexOf(current) : -1;
  if (start < 0) start = 0;
  return { ids: ids.slice(start + 1, start + 21), title };
}

export function LiveStream() {
  const { t } = useTranslation();
  const playerBoxRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const liveTitleRef = useRef(t('livestream.live'));
  liveTitleRef.current = t('livestream.live');
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [past, setPast] = useState<PastStream[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const box = playerBoxRef.current;
    if (!box) return undefined;
    let cancelled = false;
    let player: YTPlayer | null = null;
    let listed = false;
    let timer = 0;
    const host = document.createElement('div');
    box.appendChild(host);

    const publish = (ready: YTPlayer, force: boolean) => {
      if (listed || cancelled) return;
      const { ids, title } = laterIds(ready);
      if (!ids.length) return;
      if ((!title || ids.length < 12) && !force) return;
      listed = true;
      window.clearInterval(timer);
      Promise.all(ids.map(async (id) => {
        let cardTitle = '';
        try {
          const url = `https://www.youtube.com/watch?v=${id}`;
          const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
          if (res.ok) {
            const data = await res.json();
            cardTitle = typeof data.title === 'string' ? data.title : '';
          }
        } catch {
          cardTitle = '';
        }
        return { id, title: cardTitle };
      })).then((cards) => {
        if (cancelled) return;
        let from = 0;
        if (title) {
          while (from < cards.length && cards[from].title.replace(/\s+/g, ' ').trim() === title) from += 1;
        }
        setPast(cards.slice(from, from + 12));
      });
    };

    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT?.Player) return;
      player = new window.YT.Player(host, {
        playerVars: {
          listType: 'playlist',
          list: uploadsPlaylist,
          autoplay: 0,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: { target: YTPlayer }) => {
            if (cancelled) return;
            playerRef.current = event.target;
            const frame = box.querySelector('iframe');
            if (frame) frame.title = liveTitleRef.current;
            publish(event.target, false);
            let tries = 0;
            timer = window.setInterval(() => {
              tries += 1;
              publish(event.target, tries >= 8);
              if (listed || tries >= 8) window.clearInterval(timer);
            }, 400);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      playerRef.current = null;
      try {
        player?.destroy();
      } catch {
        host.remove();
      }
    };
  }, []);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [past]);

  const scrollStreams = (direction: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  };

  const play = (id: string) => {
    playerRef.current?.loadVideoById({ videoId: id });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    playerBoxRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <Reveal id="transmisiones" className="is-band">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('livestream.title')}</h2>
        <p>
          <a className="text-link" href={channelUrl} target="_blank" rel="noopener noreferrer">
            {t('livestream.channel')}
          </a>
        </p>
        <div className="player" ref={playerBoxRef} />
        {past.length > 0 && (
          <>
            <h3 className="subhead t-stagger-line t-stagger-line--2">{t('livestream.pastStreams')}</h3>
            <div className="stream-rail">
              <button
                type="button"
                className="stream-arrow"
                aria-label={t('livestream.prev')}
                disabled={!canPrev}
                onClick={() => scrollStreams(-1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="stream-scroller" ref={scrollerRef}>
                {past.map((stream) => (
                  <button
                    key={stream.id}
                    type="button"
                    className="stream-card lift"
                    onClick={() => play(stream.id)}
                  >
                    <span className="frame">
                      <img src={`https://i.ytimg.com/vi/${stream.id}/hqdefault.jpg`} alt="" />
                    </span>
                    <span className="stream-title">{stream.title}</span>
                    <span className="text-link">{t('livestream.watchNow')}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="stream-arrow"
                aria-label={t('livestream.next')}
                disabled={!canNext}
                onClick={() => scrollStreams(1)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.5 5.5 16 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </Reveal>
  );
}
