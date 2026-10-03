<script lang="ts">
  import { onMount } from 'svelte';
    import { SiSpotify } from '@icons-pack/svelte-simple-icons';

  type Track = {
    name: string;
    artists: string;
    album: string;
    image: string | null;
    spotifyUrl: string | null;
    durationMs: number;
  };

  type SpotifyResponse = {
    connected: boolean;
    isPlaying?: boolean;
    progressMs?: number;
    track: Track | null;
  };

  let data = $state<SpotifyResponse>({
    connected: false,
    isPlaying: false,
    track: null
  });

  let loading = $state(true);

  async function fetchNowPlaying() {
    try {
      const response = await fetch('/api/spotify/now-playing', {
        cache: 'no-store'
      });

      if (!response.ok) {
        data = {
          connected: false,
          isPlaying: false,
          track: null
        };
        return;
      }

      data = (await response.json()) as SpotifyResponse;
    } catch (error) {
      console.error('Failed to fetch Spotify:', error);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchNowPlaying();

    const interval = setInterval(fetchNowPlaying, 10000);

    return () => {
      clearInterval(interval);
    };
  });
</script>

{#if !loading && data.connected && data.track}
  <a
    href={data.track.spotifyUrl ?? '#'}
    target="_blank"
    rel="noreferrer"
    aria-label="Currently listening to Spotify"
    class="group relative flex w-47.5 flex-col rounded-2xl bg-white px-2 py-2.5 no-underline"
  >

    <!-- CONTENT -->
    <div class="flex items-center gap-2">

      <!-- MUSIC EQUALIZER -->
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-200">
        <div class="flex h-3.5 items-end gap-0.5">

          <span
            class:paused={!data.isPlaying}
            class="music-bar music-bar-1"
          ></span>

          <span
            class:paused={!data.isPlaying}
            class="music-bar music-bar-2"
          ></span>

          <span
            class:paused={!data.isPlaying}
            class="music-bar music-bar-3"
          ></span>

        </div>
      </div>


      <!-- TEXT -->
      <div class="min-w-0 flex-1">

        <!-- LISTENING NOW -->
        <div class="font-sans text-[9px] font-medium flex gap-1  text-gray-400">
          Listening Now
        <SiSpotify
          size={9}
          class=" text-gray-400"
        />
        </div>

        <!-- SONG -->
        <div class="mt-0.5 truncate font-sans text-xs font-medium leading-tight text-black group-hover:opacity-60">
          {data.track.name}
        </div>

        <!-- ARTIST -->
        <div class="truncate font-sans text-[10px] leading-tight text-gray-400">
          {data.track.artists}
        </div>

      </div>

    </div>


    <!-- BUBBLE TAIL -->
    <div class="absolute -bottom-1.5 left-8 h-3 w-3 rotate-45 rounded-sm bg-white"></div>

  </a>
{/if}


<style>
  .music-bar {
    display: block;
    width: 2px;
    border-radius: 999px;
    background: #6b7280;
    transform-origin: bottom;
  }

  .music-bar-1 {
    height: 8px;
    animation: music-bar-1 0.7s ease-in-out infinite;
  }

  .music-bar-2 {
    height: 12px;
    animation: music-bar-2 0.55s ease-in-out infinite;
  }

  .music-bar-3 {
    height: 9px;
    animation: music-bar-3 0.8s ease-in-out infinite;
  }

  .music-bar.paused {
    animation-play-state: paused;
    transform: scaleY(0.45);
  }

  @keyframes music-bar-1 {
    0%,
    100% {
      transform: scaleY(0.35);
    }

    50% {
      transform: scaleY(1);
    }
  }

  @keyframes music-bar-2 {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(0.3);
    }
  }

  @keyframes music-bar-3 {
    0%,
    100% {
      transform: scaleY(0.4);
    }

    50% {
      transform: scaleY(1);
    }
  }
</style>