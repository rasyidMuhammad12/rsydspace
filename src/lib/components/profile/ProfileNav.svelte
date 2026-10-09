
<script lang="ts">
  import {
    House,
    FolderOpen,
    NotebookText,
    Image,
    Settings
  } from 'lucide-svelte';

  type MenuName = 'Home' | 'Projects' | 'Blog' | 'Galery' | 'Settings';

  let {
    activeMenu,
    onMenuChange
  }: {
    activeMenu: MenuName;
    onMenuChange: (menu: MenuName) => void;
  } = $props();

  const menus = [
    { label: 'Home', icon: House },
    { label: 'Projects', icon: FolderOpen },
    { label: 'Blog', icon: NotebookText },
    { label: 'Galery', icon: Image },
    { label: 'Settings', icon: Settings }
  ] as const;
</script>

<nav class="sticky top-0 z-40 border-y border-gray-300 bg-white/90 backdrop-blur-md">
  <div class="flex h-16 items-center justify-between px-3 sm:px-5">
    {#each menus as menu}
      {@const Icon = menu.icon}

      <button
        type="button"
        onclick={() => onMenuChange(menu.label)}
        aria-current={activeMenu === menu.label ? 'page' : undefined}
        class="group relative flex h-full flex-1 items-center justify-center"
      >
        <div class={`flex items-center gap-2 transition-colors ${activeMenu === menu.label ? 'text-black' : 'text-gray-400 group-hover:text-black'}`}>
          <Icon size={20} strokeWidth={1.8} />

          <span class="hidden text-sm font-medium sm:block">
            {menu.label}
          </span>
        </div>

        {#if activeMenu === menu.label}
          <span class="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 bg-black sm:w-16"></span>
        {/if}
      </button>
    {/each}
  </div>
</nav>
