<script lang="ts">
  import { ArrowLeft, ArrowUpRight } from 'lucide-svelte';
  import type { Project } from './Projects.svelte';

  let { project, onBack }: {
    project: Project;
    onBack: () => void;
  } = $props();
</script>

<section class="bg-white">
  <!-- DETAIL NAVIGATION -->
  <div class="flex items-center justify-between border-b border-gray-200 px-7 py-4">
    <button type="button" onclick={onBack} class="flex items-center gap-2 text-sm text-gray-500 transition hover:text-black">
      <ArrowLeft size={18} />
      Projects
    </button>
    <span class="font-hand text-sm text-gray-400">{project.type}</span>
  </div>

  <!-- PROJECT INTRO -->
  <div class="px-7 py-8 sm:px-10 sm:py-10">
    <span class="font-mono text-sm text-gray-400">{project.number} / {project.year}</span>

    <h1 class="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-black sm:text-5xl">
      {project.title}
    </h1>

    <p class="mt-6 max-w-2xl text-base leading-7 text-gray-500">
      {project.details ?? project.description}
    </p>

    <div class="mt-5 flex flex-wrap gap-2">
      {#each project.technologies as technology}
        <span class="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 font-mono text-xs text-gray-500">{technology}</span>
      {/each}
    </div>

    {#if project.href !== '#'}
      <a href={project.href} target="_blank" rel="noreferrer" class="mt-7 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
        Live Demo
        <ArrowUpRight size={16} />
      </a>
    {/if}

    <!-- PROJECT IMAGE -->
    {#if project.image}
      <div class="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        <img src={project.image} alt={`${project.title} preview`} class="h-auto w-full object-cover" />
      </div>
    {/if}

    <!-- PROJECT INFORMATION -->
    <div class="mt-8 grid grid-cols-2 gap-6 border-t border-gray-200 pt-6 sm:grid-cols-3">
      <div>
        <p class="text-xs text-gray-400">ROLE</p>
        <p class="mt-2 text-sm text-gray-800">{project.role}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400">TYPE</p>
        <p class="mt-2 text-sm text-gray-800">{project.type}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400">YEAR</p>
        <p class="mt-2 text-sm text-gray-800">{project.year}</p>
      </div>
    </div>
  </div>
</section>