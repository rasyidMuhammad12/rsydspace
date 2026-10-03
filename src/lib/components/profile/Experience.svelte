<script lang="ts">
  import { ChevronDown, Sparkles } from 'lucide-svelte';
  import Bogo from '../../assets/images/bogo.png'

  type ExperienceItem = {
    company: string;
    role: string;
    type: string;
    period: string;
    duration: string;
    description: string;
    tags: string[];
    logo: string;
  };

  const experiences: ExperienceItem[] = [
    {
      company: 'PT Agraris Indonesia',
      role: 'Web Developer',
      type: 'Padang',
      period: '07.2026 - Present',
      duration: '3m',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8BM5fjrqDLG4A7RKU6sHDstLnFbxjI_DZ79ucR2L-qw&s=10',
      description:
        'Led the development Of Agraris Karir, an internship management portal by Agraris Indonesia, overseeing the participant lifecycle from registration to program completion and developing the frontend for a structured user experience.',
      tags: [
        'Web Development',
        'Frontend Development',
        'Team Leadership',
        'Project Management'
      ]
    },
    {
      company: 'Diskominfo Sumatera Barat',
      role: 'Fullstack Developer Intern',
      type: 'West Sumatra',
      period: '2025',
      duration: '3m',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTP_7hpnymccK7czcq_r2UxK9TUf8flnRWEBt3Y_3YqQ&s=10',
      description:
        'Developed a responsive web application to support the management and implementation Of ASN BerAKHLAK program.',
      tags: [
        'Next.js',
        'Fullstack Development',
      ]
    },
    {
      company: 'Bogo House',
      role: 'Frontend Developer and Ul Designer',
      type: 'Padang',
      period: '2024 - 2025',
      duration: '1y',
      logo: Bogo,
      description:
        'Design and developed a responsive web app for managing publichousing availability and registration.Collaborated with local government stakeholders to streamline admin workflows.',
      tags: [
        'UI/UX Design',
        'Web Development',
        'Frontend Development',
        'Web Design',
      ]
    },
    {
      company: 'Sania Studio',
      role: 'Graphic Designer',
      type: 'Pekanbaru',
      period: '2021 - 2023',
      duration: '2y',
      logo: 'https://i.pinimg.com/1200x/ff/59/4f/ff594f190fa722088ae0817cda43c480.jpg',
      description:
        'Led the development of Agraris Karir, an internal platform designed to manage the internship program lifecycle. Responsible for planning features, coordinating development, and implementing the application from frontend to backend.',
      tags: [
        'Graphic Design',
        'Visual Design',
        'Typography',
      ]
    },

  ];

  let activeIndex = $state<number | null>(null);

  function toggleExperience(index: number) {
    activeIndex = activeIndex === index ? null : index;
  }
</script>

<section class="bg-white">
  <!-- Section Header -->
  <div class="border-y border-gray-300 px-7 py-5">
    <h2 class="font-hand text-3xl leading-none text-black">
      Experience

      <sup class=" align-top font-hand text-sm text-gray-400">
        ({experiences.length})
      </sup>
    </h2>
  </div>

  <!-- Experience List -->
  <div>
    {#each experiences as experience, index}
      <article class="border-b border-gray-300">

        <!-- Company + Role -->
        <div class="px-7 py-7">

          <!-- Company -->
          <div class="flex items-center gap-5">

            <!-- Company Logo -->
          <div
  class="flex h-10 w-10 shrink-0 items-center justify-center"
>
  <img
    src={experience.logo}
    alt={experience.company}
    class="max-h-10 max-w-10 rounded-xl object-cover"
  />
</div>
            <!-- Company Name -->
            <h3
              class="text-xl font-semibold tracking-tight text-black"
            >
              {experience.company}
            </h3>

          </div>

          <!-- Role Timeline -->
          <div class="mt-4 flex">

            <!-- Timeline Icon + Line -->
            <div class="relative flex w-10 shrink-0 justify-center">

              <!-- Icon -->
              <div
                class="relative z-10 flex h-10 w-10 items-center justify-center  text-gray-500"
              >
                <Sparkles
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <!-- Vertical Line -->
              {#if index < experiences.length}
                <div
                  class="absolute left-1/2 top-10 -bottom-7 w-px -translate-x-1/2 bg-gray-200"
                ></div>
              {/if}

            </div>

            <!-- Role Content -->
            <div class="min-w-0 flex-1 pl-5">

              <!-- Clickable Role -->
              <button
                type="button"
                class="flex w-full items-center gap-3 text-left"
                onclick={() => toggleExperience(index)}
                aria-expanded={activeIndex === index}
              >
                <span
                  class="text-lg font-medium text-black"
                >
                  {experience.role}
                </span>

                <ChevronDown
                  size={21}
                  strokeWidth={1.8}
                  class={`ml-auto shrink-0 text-gray-500 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <!-- Metadata -->
              <div
                class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-gray-500"
              >
                <span>
                  {experience.type}
                </span>

                <span class="text-gray-300">
                  |
                </span>

                <span>
                  {experience.period}
                </span>

                <span class="text-gray-300">
                  |
                </span>

                <span>
                  {experience.duration}
                </span>
              </div>

              <!-- Tags -->
              <div class="mt-4 flex flex-wrap gap-2">
                {#each experience.tags as tag}
                  <span
                    class="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 font-mono text-sm text-gray-600"
                  >
                    {tag}
                  </span>
                {/each}
              </div>

              <!-- Description -->
              <div
                class="grid transition-[grid-template-rows] duration-500 ease-in-out"
                class:grid-rows-1={activeIndex === index}
                class:grid-rows-0={activeIndex !== index}
              >
                <div class="overflow-hidden">
                  <div class="pt-5">
                    <p
                      class="max-w-2xl text-base leading-7 text-gray-600"
                    >
                      {experience.description}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .grid-rows-0 {
    grid-template-rows: 0fr;
  }

  .grid-rows-1 {
    grid-template-rows: 1fr;
  }
</style>