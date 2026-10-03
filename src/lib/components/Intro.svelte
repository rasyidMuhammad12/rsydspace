<script lang="ts">
  import { onMount } from 'svelte';
 import './animations.css';
  const greetings = [
    'Hello',
    'Hola',
    'Hallo',
    'Olá',
    'مرحبا',
    'こんにちは'
  ];

  let currentIndex = $state(0);
  let visible = $state(true);
  let finished = $state(false);

  onMount(() => {
    const interval = setInterval(() => {
      visible = false;

      setTimeout(() => {
        if (currentIndex < greetings.length - 1) {
          currentIndex += 1;
          visible = true;
        } else {
          finished = true;
        }
      }, 250);
    }, 700);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-white transition-transform duration-700"
  class:slide-up={finished}
>
  <h1
    class="text-5xl font-medium tracking-tight transition-opacity duration-250"
    class:opacity-0={!visible}
    class:opacity-100={visible}
  >
    {greetings[currentIndex]}
  </h1>
</div>
