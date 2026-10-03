<script lang="ts">
  import {
    House,
    BriefcaseBusiness,
    FolderOpen,
    Palette,
    UserRound
  } from 'lucide-svelte';

  const menus = [
    {
      label: 'Home',
      icon: House
    },
    {
      label: 'Work',
      icon: BriefcaseBusiness
    },
    {
      label: 'Projects',
      icon: FolderOpen
    },
    {
      label: 'Design',
      icon: Palette
    },
    {
      label: 'About',
      icon: UserRound
    }
  ];

  // svelte-ignore non_reactive_update
  let activeMenu = 'Home';
</script>

<nav
  class="sticky top-0 z-40 border-y border-gray-300 bg-white/50 backdrop-blur-md"
>
  <div class="flex h-16 items-center justify-between px-5">
    {#each menus as menu}
      <button
        type="button"
        onclick={() => (activeMenu = menu.label)}
        class="group relative flex h-full flex-1 items-center justify-center"
      >
        <div
          class:active={activeMenu === menu.label}
          class="flex items-center gap-2 text-gray-400 transition-colors group-hover:text-black"
        >
          <menu.icon size={20} strokeWidth={1.8} />

          <span class="hidden text-sm font-medium sm:block">
            {menu.label}
          </span>
        </div>

        {#if activeMenu === menu.label}
          <span
            class="absolute bottom-0 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-black"
          ></span>
        {/if}
      </button>
    {/each}
  </div>
</nav>

<style>
  .active {
    color: black;
  }
</style>