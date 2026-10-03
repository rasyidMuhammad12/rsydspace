import { redirect } from '@sveltejs/kit';
import { getSpotifyAuthorizationUrl } from '$lib/spotify/spotify.server';

export const GET = ({ cookies }) => {
  const state = crypto.randomUUID();

  cookies.set('spotify_oauth_state', state, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10
  });

  throw redirect(
    302,
    getSpotifyAuthorizationUrl(state)
  );
};