<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';

  export type Project = {
    number: string;
    title: string;
    description: string;
    role: string;
    year: string;
    type: string;
    technologies: string[];
    href: string;
    image?: string;
    details?: string;
  };

  let { onSelectProject }: {
    onSelectProject?: (project: Project) => void;
  } = $props();

  const projects: Project[] = [
    {
      number: '01',
      title: 'ASN-BerAKHLAK',
      description: 'Platform web untuk membantu pengelolaan, pengumpulan, dan verifikasi bukti kegiatan ASN BerAKHLAK pada lingkungan pemerintahan.',
      role: 'Fullstack Developer',
      year: '2026',
      type: 'Government',
      technologies: ['Next.js', 'Laravel', 'MySQL'],
      href: '#',
      image: '/projects/asn-berakhlak.png',
      details: 'Platform untuk mendukung proses pengumpulan dan verifikasi bukti kegiatan ASN BerAKHLAK pada lingkungan pemerintahan.'
    },
    {
      number: '02',
      title: 'Agraris Karir',
      description: 'Platform internal Agraris Indonesia untuk mengelola seluruh proses program magang, mulai dari pendaftaran hingga pengelolaan aktivitas peserta.',
      role: 'Project Lead & Fullstack Developer',
      year: '2026',
      type: 'Internal Platform',
      technologies: ['Next.js', 'TypeScript', 'Tailwind'],
      href: '#',
      image: '/projects/agraris-karir.png',
      details: 'Platform internal untuk mengelola siklus program magang, termasuk proses pendaftaran dan aktivitas peserta.'
    },
    {
      number: '03',
      title: 'Sirusun',
      description: 'Website layanan Pemerintah Provinsi Palembang untuk membantu masyarakat melakukan pemesanan dan pengelolaan hunian rumah susun.',
      role: 'Frontend Developer',
      year: '2025',
      type: 'Government',
      technologies: ['React', 'JavaScript', 'Tailwind'],
      href: '#',
      image: '/projects/sirusun.png',
      details: 'Website layanan rumah susun dengan fokus pada pengalaman pengguna dalam melakukan pemesanan dan pengelolaan hunian.'
    },
    {
      number: '04',
      title: 'dIdent',
      description: 'Platform digital identity verification yang menggabungkan OCR, face verification, blockchain, dan Web3 untuk proses verifikasi identitas.',
      role: 'Fullstack Developer',
      year: '2025',
      type: 'Web3 / AI',
      technologies: ['React', 'ICP', 'Motoko'],
      href: '#',
      image: '/projects/dident.png',
      details: 'Platform verifikasi identitas digital yang menggabungkan OCR, verifikasi wajah, dan teknologi blockchain.'
    },
    {
      number: '05',
      title: 'Voltify',
      description: 'Konsep aplikasi mobile untuk membantu pengguna memantau penggunaan listrik, memprediksi tagihan, dan mendapatkan rekomendasi penghematan energi.',
      role: 'Product Designer & Developer',
      year: '2025',
      type: 'Mobile App',
      technologies: ['Flutter', 'Dart', 'UI/UX'],
      href: '#',
      image: '/projects/voltify.png',
      details: 'Konsep aplikasi untuk memantau konsumsi listrik, memperkirakan tagihan, dan memberikan rekomendasi penghematan energi.'
    }
  ];
</script>

<section id="projects" class="mt-5 bg-white">
  <div class="flex border-b border-gray-300 px-7 pb-5">
    <h2 class="font-hand text-3xl leading-none text-black">Projects</h2>
    <span class="ml-2 font-hand text-sm text-gray-400">({projects.length})</span>
  </div>

  <div>
    {#each projects as project}
      <button
        type="button"
        onclick={() => onSelectProject?.(project)}
        class="group block w-full border-b border-gray-300 px-7 py-7 text-left transition-colors duration-200 hover:bg-[#f1f1f1]"
      >
        <div class="grid grid-cols-[44px_minmax(0,1fr)] gap-4 sm:grid-cols-[72px_minmax(0,1fr)_160px] sm:gap-6">
          <div>
            <span class="font-mono text-4xl font-light leading-none tracking-tight text-gray-300 transition-colors group-hover:text-gray-400 sm:text-5xl">
              {project.number}
            </span>
          </div>

          <div class="min-w-0">
            <div class="flex items-start gap-3">
              <h3 class="text-xl font-medium tracking-tight text-black">{project.title}</h3>
              <ArrowUpRight size={18} strokeWidth={1.8} class="mt-1 shrink-0 text-black opacity-0 transition duration-300 group-hover:rotate-45 group-hover:opacity-100" />
            </div>

            <p class="mt-3 max-w-xl text-justify text-sm leading-6 text-gray-500">{project.description}</p>

            <div class="mt-5 flex flex-wrap gap-2">
              {#each project.technologies as technology}
                <span class="rounded-xl border border-gray-200 bg-gray-100 px-3 py-1.5 font-mono text-xs text-gray-500">
                  {technology}
                </span>
              {/each}
            </div>
          </div>

          <div class="hidden space-y-3 text-right text-xs text-gray-400 sm:block">
            <div>
              <p>ROLE</p>
              <p class="mt-1 text-gray-700">{project.role}</p>
            </div>
            <div>
              <p>TYPE</p>
              <p class="mt-1 text-gray-700">{project.type}</p>
            </div>
            <div>
              <p>YEAR</p>
              <p class="mt-1 text-gray-700">{project.year}</p>
            </div>
          </div>
        </div>
      </button>
    {/each}
  </div>
</section>