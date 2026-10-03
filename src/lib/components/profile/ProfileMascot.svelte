<script lang="ts">
  import { onMount } from 'svelte';

  const directions = '/mascots/fox-pixel-directions.webp';
  const reactions = '/mascots/fox-pixel-reactions.webp';

  let mascotElement = $state<HTMLDivElement | null>(null);

  let directionRow = $state(1);
  let directionCol = $state(1);
  let isReacting = $state(false);
  let reactionIndex = $state(0);
  let reactionTimer: ReturnType<typeof setTimeout> | null = null;


  const reactionRow = $derived(
    Math.floor(reactionIndex / 3)
  );
  const reactionCol = $derived(
    reactionIndex % 3
  );
  function updateDirection(event: MouseEvent) {
    if (!mascotElement) return;

    if (isReacting) return;
    const rect = mascotElement.getBoundingClientRect();
    const mascotCenterX =
      rect.left + rect.width / 2;
    const mascotCenterY =
      rect.top + rect.height / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const dx = mouseX - mascotCenterX;
    const dy = mouseY - mascotCenterY;

    const cursorInside =
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom;

    if (cursorInside) {
      directionRow = 1;
      directionCol = 1;

      return;
    }

    const angle =
      Math.atan2(dy, dx) *
      (180 / Math.PI);

    if (angle >= -22.5 && angle < 22.5) {
      // →
      directionRow = 1;
      directionCol = 2;

    } else if (
      angle >= 22.5 &&
      angle < 67.5
    ) {
      // ↘
      directionRow = 2;
      directionCol = 2;

    } else if (
      angle >= 67.5 &&
      angle < 112.5
    ) {
      // ↓
      directionRow = 2;
      directionCol = 1;

    } else if (
      angle >= 112.5 &&
      angle < 157.5
    ) {
      // ↙
      directionRow = 2;
      directionCol = 0;

    } else if (
      angle >= 157.5 ||
      angle < -157.5
    ) {
      // ←
      directionRow = 1;
      directionCol = 0;

    } else if (
      angle >= -157.5 &&
      angle < -112.5
    ) {
      // ↖
      directionRow = 0;
      directionCol = 0;

    } else if (
      angle >= -112.5 &&
      angle < -67.5
    ) {
      // ↑
      directionRow = 0;
      directionCol = 1;

    } else {
      // ↗
      directionRow = 0;
      directionCol = 2;
    }
  }

  function handleClick() {
    isReacting = true;
    if (reactionTimer) {
      clearTimeout(reactionTimer);
    }
    reactionIndex =
      (reactionIndex + 1) % 9;

    reactionTimer = setTimeout(() => {
      isReacting = false;
      if (mascotElement) {
        const rect =
          mascotElement.getBoundingClientRect();

        const mouseX = lastMouseX;
        const mouseY = lastMouseY;

        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          directionRow = 1;
          directionCol = 1;
        }
      }
    }, 900);
  }
  let lastMouseX = 0;
  let lastMouseY = 0;
  onMount(() => {
    function handleMouseMove(event: MouseEvent) {
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;

      updateDirection(event);
    }

    window.addEventListener(
      'mousemove',
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      if (reactionTimer) {
        clearTimeout(reactionTimer);
      }
    };
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  bind:this={mascotElement}
  class="profile-mascot"
  onclick={handleClick}
  role="button"
  tabindex="0"
  aria-label="Interactive mascot"
>

  {#if isReacting}
    <div
      class="sprite reaction-sprite"
      style={`
        background-image: url("${reactions}");
        background-position:
          ${reactionCol * 50}%
          ${reactionRow * 50}%;
      `}
    ></div>

  {:else}
    <div
      class="sprite direction-sprite"
      style={`
        background-image: url("${directions}");
        background-position:
          ${directionCol * 50}%
          ${directionRow * 50}%;
      `}
    ></div>

  {/if}

</div>
<style>
  .profile-mascot {
    position: absolute  ;
    right: 30px;
    bottom: -40px;
    width: 180px;
    height: 180px;
    z-index: 20;
    user-select: none;
    cursor: pointer;

  }
  .sprite {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 300% 300%;
    image-rendering: pixelated;

  }
  .direction-sprite {
    background-size: 300% 300%;
  }
  .reaction-sprite {
    background-size: 300% 300%;
  }
</style>