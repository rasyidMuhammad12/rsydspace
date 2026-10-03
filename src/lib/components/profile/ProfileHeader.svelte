<script lang="ts">
  import {
    MapPin,
    Globe,
    Ghost,
    Link,
    Mail
  } from 'lucide-svelte';

  import ProfilePict from '../../assets/images/image1.jpg';
  import ProfileMascot from './ProfileMascot.svelte';
  import SpotifyNowPlaying from './SpotifyNowPlaying.svelte';
</script>

<section class="bg-white px-7 pb-7">

  <!-- COVER -->
  <div class="relative -mx-7 h-56">

    <img
      src="https://i.pinimg.com/1200x/3b/dc/25/3bdc25457c8a6672089254ba770d6685.jpg"
      alt="Profile cover"
      class="relative z-0 h-full w-full object-cover"
    />

    <!-- FOX MASCOT -->
    <div class="relative z-30">
      <ProfileMascot />
    </div>

  </div>


  <!-- PROFILE CONTENT -->
  <div class="relative">

    <!-- PROFILE PHOTO -->
    <div class="absolute -top-16 left-0 z-40">

      <!-- SPOTIFY NOTE -->
      <div class="absolute bottom-30 left-20 z-50 mb-3 -translate-x-1/2">
        <SpotifyNowPlaying />
      </div>

      <!-- PHOTO -->
      <div class="h-32 w-32 overflow-hidden rounded-3xl border-6 border-white bg-gray-200">

        <img
          src={ProfilePict}
          alt="Muhammad Rasyid Al Ridho Lubis"
          class="h-full w-full object-cover"
        />

      </div>

    </div>


    <!-- GITHUB COUNT -->
    <div class="flex justify-end pt-5">

      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        class="z-40 flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
      >
        <Ghost
          size={20}
          strokeWidth={1.8}
        />

        <span>4</span>
      </a>

    </div>


    <!-- NAME -->
    <div class="mt-10">

      <h1 class="text-3xl font-semibold tracking-tight text-black">
        Muhammad Rasyid Al Ridho
      </h1>

      <p class="text-base text-gray-500">
        @rsyd.mhmmd
      </p>

    </div>


    <!-- BIO -->
    <p class="mt-6 max-w-2xl text-justify text-[17px] leading-tight text-gray-800">
      Fullstack Developer & UI/UX Designer based in Indonesia.
      I like designing things. I like coding them too. Instead of
      picking one, I ended up doing both. Who enjoys turning random
      ideas, experiments, and a bit of curiosity into websites that
      look good and actually work.
    </p>


    <!-- METADATA -->
    <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">

      <!-- ROLE -->
      <div class="flex items-center gap-2">
        <Globe
          size={18}
          strokeWidth={1.8}
        />

        <span>Fullstack Developer</span>
      </div>


      <!-- LOCATION -->
      <div class="flex items-center gap-2">
        <MapPin
          size={18}
          strokeWidth={1.8}
        />

        <span>Indonesia</span>
      </div>


      <!-- WEBSITE -->
      <a
        href="/"
        class="flex items-center gap-2 transition hover:text-black"
      >
        <Globe
          size={18}
          strokeWidth={1.8}
        />

        <span>rasyid.dev</span>
      </a>

    </div>


    <!-- DIVIDER -->
    <div class="my-6 h-px bg-gray-200"></div>


    <!-- SOCIAL BUTTONS -->
    <div class="flex min-w-0 items-center gap-3">

      <!-- GITHUB -->
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:text-black"
      >
        <Ghost size={19} />
      </a>


      <!-- LINKEDIN -->
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:text-black"
      >
        <Link size={19} />
      </a>


      <!-- EMAIL -->
      <a
        href="mailto:hello@rasyid.dev"
        aria-label="Email"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:text-black"
      >
        <Mail size={19} />
      </a>

    </div>

  </div>

</section>