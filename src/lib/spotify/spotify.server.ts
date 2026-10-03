import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI
} from '$env/static/private';


const TOKEN_URL =
  'https://accounts.spotify.com/api/token';

const AUTH_URL =
  'https://accounts.spotify.com/authorize';

const SCOPE =
  'user-read-currently-playing';


function createBasicAuth(): string {
  const credentials =
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;

  return `Basic ${btoa(credentials)}`;
}


export function getSpotifyAuthorizationUrl(
  state: string
): string {

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: SCOPE,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state
  });

  return `${AUTH_URL}?${params.toString()}`;
}


export async function exchangeCodeForToken(
  code: string
) {

  const response = await fetch(TOKEN_URL, {
    method: 'POST',

    headers: {
      Authorization: createBasicAuth(),
      'Content-Type':
        'application/x-www-form-urlencoded'
    },

    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI
    })
  });


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.error_description ??
      'Failed to exchange Spotify code'
    );
  }


  return data;
}


export async function refreshSpotifyAccessToken(
  refreshToken: string
) {

  const response = await fetch(TOKEN_URL, {
    method: 'POST',

    headers: {
      Authorization: createBasicAuth(),
      'Content-Type':
        'application/x-www-form-urlencoded'
    },

    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });


  const data = await response.json();


  if (!response.ok) {
    throw new Error(
      data.error_description ??
      'Failed to refresh Spotify access token'
    );
  }


  return data;
}