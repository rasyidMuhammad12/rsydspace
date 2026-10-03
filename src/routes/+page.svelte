<script lang="ts">
  import PixelBlast from '$lib/components/PixelBlast.svelte';
  import Intro from '$lib/components/Intro.svelte';
  import ProfileHeader from '$lib/components/profile/ProfileHeader.svelte';
  import ProfileNav from '$lib/components/profile/ProfileNav.svelte';
  import Experience from '$lib/components/profile/Experience.svelte';
  import Projects from '$lib/components/profile/Projects.svelte';
  import Stack from '$lib/components/profile/Stack.svelte';

</script>

<PixelBlast
  variant="circle"
  pixelSize={3.5}
  color="#949494"
  patternScale={10}
  patternDensity={1.5}
  pixelSizeJitter={8}
  speed={0.3}
  edgeFade={0.35}
  transparent
/>

<Intro />

<main class="relative z-10 border-x border-gray-200 ">
  <div class="mx-auto max-w-3xl bg-white">

    <ProfileHeader />

    <ProfileNav />

    <!-- Gap between navigation and content -->
<div
  class="h-10 border-y border-gray-200"
  style="background: repeating-linear-gradient(
    -45deg,
    #ffffff 0px,
    #ffffff 9px,
    #e5e7eb 9px,
    #e5e7eb 10px
  );"
></div>
    <Experience />
<div
  class="h-10 border-y border-gray-200"
  style="background: repeating-linear-gradient(
    -45deg,
    #ffffff 0px,
    #ffffff 9px,
    #e5e7eb 9px,
    #e5e7eb 10px
  );"
></div>
    <Projects />
<div
  class="h-10 border-y border-gray-200"
  style="background: repeating-linear-gradient(
    -45deg,
    #ffffff 0px,
    #ffffff 9px,
    #e5e7eb 9px,
    #e5e7eb 10px
  );"
></div>
    <Stack />
    <div
  class="h-10 border-y border-gray-200"
  style="background: repeating-linear-gradient(
    -45deg,
    #ffffff 0px,
    #ffffff 9px,
    #e5e7eb 9px,
    #e5e7eb 10px
  );"
></div>
  </div>
</main>