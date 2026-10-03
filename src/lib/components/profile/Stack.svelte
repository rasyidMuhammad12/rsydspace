<script lang="ts">
  import ps from '../../assets/ps.svg';
  import ai from '../../assets/ai.svg';

  import {
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiSvelte,
    SiTailwindcss,
    SiNodedotjs,
    SiExpress,
    SiPhp,
    SiLaravel,
    SiPython,
    SiMysql,
    SiPostgresql,
    SiFigma
  } from '@icons-pack/svelte-simple-icons';


  type StackItem = {
    name: string;
    icon?: any;
    image?: string;
    type: 'brand' | 'image';
  };


  type StackCategory = {
    title: string;
    items: StackItem[];
  };


  const stacks: StackCategory[] = [
    {
      title: 'Frontend',

      items: [
        {
          name: 'JavaScript',
          icon: SiJavascript,
          type: 'brand'
        },
        {
          name: 'TypeScript',
          icon: SiTypescript,
          type: 'brand'
        },
        {
          name: 'React',
          icon: SiReact,
          type: 'brand'
        },
        {
          name: 'Next.js',
          icon: SiNextdotjs,
          type: 'brand'
        },
        {
          name: 'Svelte',
          icon: SiSvelte,
          type: 'brand'
        },
        {
          name: 'Tailwind CSS',
          icon: SiTailwindcss,
          type: 'brand'
        }
      ]
    },

    {
      title: 'Backend',

      items: [
        {
          name: 'Node.js',
          icon: SiNodedotjs,
          type: 'brand'
        },
        {
          name: 'Express.js',
          icon: SiExpress,
          type: 'brand'
        },
        {
          name: 'PHP',
          icon: SiPhp,
          type: 'brand'
        },
        {
          name: 'Laravel',
          icon: SiLaravel,
          type: 'brand'
        },
        {
          name: 'Python',
          icon: SiPython,
          type: 'brand'
        },
        {
          name: 'MySQL',
          icon: SiMysql,
          type: 'brand'
        },
        {
          name: 'PostgreSQL',
          icon: SiPostgresql,
          type: 'brand'
        }
      ]
    },

    {
      title: 'Design',

      items: [
        {
          name: 'Figma',
          icon: SiFigma,
          type: 'brand'
        },
        {
          name: 'Adobe Photoshop',
          image: ps,
          type: 'image'
        },
        {
          name: 'Adobe Illustrator',
          image: ai,
          type: 'image'
        }
      ]
    }
  ];
</script>
<section
  id="stack"
  class="bg-white"
>
  <!-- SECTION TITLE -->
  <h2
    class="border-b border-gray-300 px-7 py-5 font-hand text-3xl leading-none text-black"
  >
    Tech Stack
  </h2>
  <!-- STACK COLUMNS -->
  <div class="grid grid-cols-1 sm:grid-cols-3">

    {#each stacks as stack, index}
      <div
        class:border-r={index !== stacks.length - 1}
        class="border-gray-300"
      >
        <!-- CATEGORY TITLE -->
        <div
          class="border-b border-gray-300 px-6 py-3"
        >
          <h3
            class="text-center text-base font-semibold tracking-tight text-black"
          >
            {stack.title}
          </h3>
        </div>
        <!-- STACK ITEMS -->
        <div
          class="items-start gap-2 px-8 py-6"
        >
          {#each stack.items as item}
            <div
              class="inline-flex w-fit items-center m-1 gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600"
            >
              {#if item.type === 'brand'}
                {@const Icon = item.icon}
                <Icon size={15} />
              {:else if item.type === 'image'}
                <img
                  src={item.image}
                  alt={item.name}
                  class="h-3.75 w-3.75 object-contain"
                />
              {/if}
              <span class="font-mono text-black">
                {item.name}
              </span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>