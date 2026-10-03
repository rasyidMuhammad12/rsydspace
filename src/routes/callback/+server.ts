import { redirect } from '@sveltejs/kit';

import {
  exchangeCodeForToken
} from '$lib/spotify/spotify.server';


export const GET = async ({ url, cookies }) => {

  const code = url.searchParams.get('code');

  const state = url.searchParams.get('state');

  const error = url.searchParams.get('error');


  if (error) {
    throw new Error(
      `Spotify authorization failed: ${error}`
    );
  }


  if (!code || !state) {
    throw new Error(
      'Missing Spotify authorization code or state'
    );
  }


  const savedState =
    cookies.get('spotify_oauth_state');


  if (!savedState || savedState !== state) {
    throw new Error(
      'Invalid Spotify OAuth state'
    );
  }


  cookies.delete('spotify_oauth_state', {
    path: '/'
  });


  const token =
    await exchangeCodeForToken(code);


  cookies.set(
    'spotify_refresh_token',
    token.refresh_token,
    {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 180
    }
  );


  throw redirect(
    302,
    '/'
  );
};