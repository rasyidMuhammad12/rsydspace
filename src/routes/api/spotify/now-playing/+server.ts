import { json } from '@sveltejs/kit';

import {
  refreshSpotifyAccessToken
} from '$lib/spotify/spotify.server';

const SPOTIFY_API =
  'https://api.spotify.com/v1/me/player/currently-playing';

export const GET = async ({ cookies }) => {
  const refreshToken =
    cookies.get('spotify_refresh_token');

  if (!refreshToken) {
    return json(
      {
        connected: false
      },
      {
        status: 401
      }
    );
  }

  try {
    const token =
      await refreshSpotifyAccessToken(
        refreshToken
      );

    const response = await fetch(
      SPOTIFY_API,
      {
        headers: {
          Authorization:
            `Bearer ${token.access_token}`
        }
      }
    );

    if (response.status === 204) {
      return json({
        connected: true,
        isPlaying: false,
        track: null
      });
    }

    if (!response.ok) {
      return json(
        {
          connected: true,
          isPlaying: false,
          track: null
        },
        {
          status: response.status
        }
      );
    }

    const data = await response.json();

    if (!data.item) {
      return json({
        connected: true,
        isPlaying: false,
        track: null
      });
    }

    return json({
      connected: true,

      isPlaying: data.is_playing,

      progressMs: data.progress_ms ?? 0,

      track: {
        name: data.item.name,

        artists: data.item.artists
          .map(
            (artist: { name: string }) =>
              artist.name
          )
          .join(', '),

        album: data.item.album.name,

        image:
          data.item.album.images?.[0]?.url ?? null,

        spotifyUrl:
          data.item.external_urls?.spotify ?? null,

        durationMs:
          data.item.duration_ms ?? 0
      }
    });
  } catch (error) {
    console.error(
      'Spotify Now Playing Error:',
      error
    );

    return json(
      {
        connected: false,
        isPlaying: false,
        track: null
      },
      {
        status: 500
      }
    );
  }
};