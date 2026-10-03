<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';

  type Project = {
    number: string;
    title: string;
    description: string;
    role: string;
    year: string;
    type: string;
    technologies: string[];
    href: string;
  };

  const projects: Project[] = [
    {
      number: '01',
      title: 'ASN-BerAKHLAK',
      description:
        'Platform web untuk membantu pengelolaan, pengumpulan, dan verifikasi bukti kegiatan ASN BerAKHLAK pada lingkungan pemerintahan.',
      role: 'Fullstack Developer',
      year: '2026',
      type: 'Government',
      technologies: ['Next.js', 'Laravel', 'MySQL'],
      href: '#'
    },

    {
      number: '02',
      title: 'Agraris Karir',
      description:
        'Platform internal Agraris Indonesia untuk mengelola seluruh proses program magang, mulai dari pendaftaran hingga pengelolaan aktivitas peserta.',
      role: 'Project Lead & Fullstack Developer',
      year: '2026',
      type: 'Internal Platform',
      technologies: ['Next.js', 'TypeScript', 'Tailwind'],
      href: '#'
    },

    {
      number: '03',
      title: 'Sirusun',
      description:
        'Website layanan Pemerintah Provinsi Palembang untuk membantu masyarakat melakukan pemesanan dan pengelolaan hunian rumah susun.',
      role: 'Frontend Developer',
      year: '2025',
      type: 'Government',
      technologies: ['React', 'JavaScript', 'Tailwind'],
      href: '#'
    },

    {
      number: '04',
      title: 'dIdent',
      description:
        'Platform digital identity verification yang menggabungkan OCR, face verification, blockchain, dan Web3 untuk proses verifikasi identitas.',
      role: 'Fullstack Developer',
      year: '2025',
      type: 'Web3 / AI',
      technologies: ['React', 'ICP', 'Motoko'],
      href: '#'
    },

    {
      number: '05',
      title: 'Voltify',
      description:
        'Konsep aplikasi mobile untuk membantu pengguna memantau penggunaan listrik, memprediksi tagihan, dan mendapatkan rekomendasi penghematan energi.',
      role: 'Product Designer & Developer',
      year: '2025',
      type: 'Mobile App',
      technologies: ['Flutter', 'Dart', 'UI/UX'],
      href: '#'
    }
  ];
</script>
<section id="projects" class="bg-white mt-5">
  <!-- SECTION HEADER -->
  <div class="flex px-7 border-b border-gray-300 pb-5">
    <div class="">
      <h2
        class="font-hand text-3xl leading-none text-black"
      >
        Projects
      </h2>
    </div>
    <span class="text-sm text-gray-400 ml-2 font-hand">
      ({projects.length})
    </span>

  </div>
  <!-- PROJECT LIST -->
  <div class="">

    {#each projects as project}
      <a
        href={project.href}
        class="group block px-7 border-b py-7 border-gray-300 transition-colors duration-200 hover:bg-[#f1f1f1]"
      >
        <div
          class="grid grid-cols-[72px_1fr_auto] gap-6"
        >
          <!-- NUMBER -->
          <div>
            <span
              class="text-5xl font-light font-mono leading-none tracking-tight text-gray-300 transition-colors duration-200 group-hover:text-gray-400"
            >
              {project.number}
            </span>
          </div>
          <!-- MAIN CONTENT -->
          <div class="min-w-0">

            <div class="flex items-start gap-3">
              <h3
                class="text-xl font-medium tracking-tight text-black"
              >
                {project.title}
              </h3>
              <ArrowUpRight
                size={18}
                strokeWidth={1.8}
                class="mt-1 shrink-0 text-black opacity-0 duration-500 group-hover:opacity-100 group-hover:rotate-360 transition-transform"
              />
            </div>
            <p
              class="mt-3 max-w-xl text-sm text-justify leading-6 text-gray-500"
            >
              {project.description}
            </p>
            <!-- TAGS -->
            <div class="mt-5 flex flex-wrap gap-2">

              {#each project.technologies as technology}
                <span
                  class="rounded-xl font-mono border border-gray-200 bg-gray-100 px-3 py-1.5 text-xs text-gray-500"
                >
                  {technology}
                </span>
              {/each}
            </div>
          </div>

          <!-- META -->
          <div
            class="hidden w-40 space-y-3 text-right text-xs text-gray-400 sm:block"
          >
            <div>
              <p class="text-gray-400">
                ROLE
              </p>
              <p class="mt-1 text-gray-700">
                {project.role}
              </p>
            </div>
            <div>
              <p class="text-gray-400">
                TYPE
              </p>
              <p class="mt-1 text-gray-700">
                {project.type}
              </p>
            </div>
            <div>
              <p class="text-gray-400">
                YEAR
              </p>
              <p class="mt-1 text-gray-700">
                {project.year}
              </p>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>