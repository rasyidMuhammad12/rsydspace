<script lang="ts">
  import { onMount } from 'svelte';

  let x = $state(0);
  let y = $state(0);
  let isVisible = $state(false);
  let isHovering = $state(false);

  onMount(() => {
    function handleMouseMove(event: MouseEvent) {
      x = event.clientX;
      y = event.clientY;

      isVisible = true;

      const element = document.elementFromPoint(
        event.clientX,
        event.clientY
      );

      if (!(element instanceof HTMLElement)) {
        isHovering = false;
        return;
      }

      const interactive = element.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"]'
      );

      isHovering = interactive !== null;
    }

    function handleMouseLeave() {
      isVisible = false;
    }

    function handleMouseEnter() {
      isVisible = true;
    }

    window.addEventListener('mousemove', handleMouseMove);

    document.documentElement.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    document.documentElement.addEventListener(
      'mouseenter',
      handleMouseEnter
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );

      document.documentElement.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );
    };
  });
</script>


{#if isVisible}

  <div
    class:filled={isHovering}
    class="custom-cursor"
    style={`
      left: ${x}px;
      top: ${y}px;
    `}
    aria-hidden="true"
  >

    {#if isHovering}

      <!-- FILLED -->
      <div class="cursor-filled"></div>

    {:else}

      <!-- OUTLINE -->
      <div class="cursor-outline"></div>

    {/if}

  </div>

{/if}
<style>
  .custom-cursor {
    position: fixed;
    left: 0;
    top: 0;
    width: 25px;
    height: 25px;
    z-index: 99999;
    pointer-events: none;
    user-select: none;
  }
  .cursor-outline {
    width: 25px;
    height: 25px;
    background-image: url('/cursors/mouse-cursor.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .cursor-filled {
    width: 25px;
    height: 25px;
    background-image: url('/cursors/mouse-cursor.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;

    filter: brightness(0);
  }

  @media (hover: none) and (pointer: coarse) {
    .custom-cursor {
      display: none;
    }
  }

</style>