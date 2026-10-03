<script lang="ts">
  import './layout.css';
  import icon from '$lib/assets/icon.png';
  import CustomCursor from '$lib/components/CustomCursor.svelte';
  let { children } = $props();
</script>

<svelte:head>
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap" rel="stylesheet">

  <link
    rel="icon"
    href={icon}
  />
</svelte:head>
<CustomCursor />
{@render children()}