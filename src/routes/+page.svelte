
<script lang="ts">
  import PixelBlast from '$lib/components/PixelBlast.svelte';
  import Intro from '$lib/components/Intro.svelte';
  import ProfileHeader from '$lib/components/profile/ProfileHeader.svelte';
  import ProfileNav from '$lib/components/profile/ProfileNav.svelte';
  import Experience from '$lib/components/profile/Experience.svelte';
  import Projects from '$lib/components/profile/Projects.svelte';
  import Stack from '$lib/components/profile/Stack.svelte';
  import ProjectDetail from '$lib/components/profile/ProjectDetail.svelte';
  import type { Project } from '$lib/components/profile/Projects.svelte';

  type MenuName = 'Home' | 'Projects' | 'Blog' | 'Galery' | 'Settings';

  let activeMenu = $state<MenuName>('Home');
  let selectedProject = $state<Project | null>(null);

  function changeMenu(menu: MenuName) {
    activeMenu = menu;
    selectedProject = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openProject(project: Project) {
    selectedProject = project;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToProjects() {
    selectedProject = null;
    activeMenu = 'Projects';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
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

<main class="relative z-10 border-x border-gray-200">
  <div class="mx-auto max-w-3xl bg-white">
    <ProfileHeader />

    <ProfileNav
      activeMenu={activeMenu}
      onMenuChange={changeMenu}
    />

    {#if selectedProject}
      <ProjectDetail
        project={selectedProject}
        onBack={backToProjects}
      />

    {:else if activeMenu === 'Home'}
      <div class="h-10 border-y border-gray-200" style="background: repeating-linear-gradient(-45deg, #ffffff 0px, #ffffff 9px, #e5e7eb 9px, #e5e7eb 10px);"></div>

      <Experience />

      <div class="h-10 border-y border-gray-200" style="background: repeating-linear-gradient(-45deg, #ffffff 0px, #ffffff 9px, #e5e7eb 9px, #e5e7eb 10px);"></div>

      <Projects onSelectProject={openProject} />

      <div class="h-10 border-y border-gray-200" style="background: repeating-linear-gradient(-45deg, #ffffff 0px, #ffffff 9px, #e5e7eb 9px, #e5e7eb 10px);"></div>

      <Stack />

      <div class="h-10 border-y border-gray-200" style="background: repeating-linear-gradient(-45deg, #ffffff 0px, #ffffff 9px, #e5e7eb 9px, #e5e7eb 10px);"></div>

    {:else if activeMenu === 'Projects'}
      <Projects onSelectProject={openProject} />

    {:else if activeMenu === 'Blog'}
      <section class="min-h-96 border-b border-gray-200 px-7 py-8">
        <h2 class="font-hand text-3xl text-black">Blog</h2>
        <p class="mt-3 text-sm text-gray-500">
          Tulisan dan artikel akan ditampilkan di sini.
        </p>
      </section>

    {:else if activeMenu === 'Galery'}
      <section class="min-h-96 border-b border-gray-200 px-7 py-8">
        <h2 class="font-hand text-3xl text-black">Gallery</h2>
        <p class="mt-3 text-sm text-gray-500">
          Desain dan karya visual akan ditampilkan di sini.
        </p>
      </section>

    {:else if activeMenu === 'Settings'}
      <section class="min-h-96 border-b border-gray-200 px-7 py-8">
        <h2 class="font-hand text-3xl text-black">Settings</h2>
        <p class="mt-3 text-sm text-gray-500">
          Pengaturan portfolio akan ditampilkan di sini.
        </p>
      </section>
    {/if}
  </div>
</main>