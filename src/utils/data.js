export const categories = [
  "All",
  "Social Media",
  "Branding",
  "Presentation",
  "Poster",
  "Invitation",
  "CV",
  "Illustration"
];


export const formats = ["All", "Canva", "Figma", "PSD", "AI", "PDF"];


export const priceRanges = [
  { label: "All", value: "all" },
  { label: "Under Rp25.000", value: "under25" },
  { label: "Rp25.000 - Rp50.000", value: "25to50" },
  { label: "Above Rp50.000", value: "above50" }
];


export const catalogData = [
  {
    id: "p1",
    name: "Instagram Template Pack",
    slug: "instagram-template-pack",
    type: "product",
    category: "Social Media",
    targetUser: "Content Creator / UMKM",
    price: 25000,
    rating: 4.9,
    sales: 128,
    format: "Canva",
    img: "/images/canva.png",
    desc: "Template Instagram aesthetic & fully editable untuk feeds promosi produk atau personal branding.",
    includes: ["12 Instagram Templates", "Fully Editable", "Free Font Used", "Instant Access"]
  },
  {
    id: "p2",
    name: "Minimalist CV Template",
    slug: "minimalist-cv-template",
    type: "product",
    category: "CV",
    targetUser: "Mahasiswa",
    price: 15000,
    rating: 4.8,
    sales: 95,
    format: "PDF",
    img: "/images/cv.png",
    desc: "Template Curriculum Vitae modern dan ATS-friendly untuk pendaftaran magang atau lamaran kerja.",
    includes: ["A4 ATS Resume Layout", "Cover Letter Template", "Fully Customizable in Word & Canva"]
  },
  {
    id: "p3",
    name: "Presentation Template Professional",
    slug: "presentation-template-pro",
    type: "product",
    category: "Presentation",
    targetUser: "Mahasiswa / Business",
    price: 30000,
    rating: 5.0,
    sales: 210,
    format: "Figma",
    img: "/images/figma.png",
    desc: "20+ slide presentasi elegan untuk seminar tugas akhir, pitch deck bisnis, maupun laporan sidang.",
    includes: ["20 Unique Slides", "Infographic Vector Icons", "16:9 HD Ratio"]
  },
  {
    id: "p4",
    name: "Aesthetic Academic Poster Template",
    slug: "academic-poster-template",
    type: "product",
    category: "Poster",
    targetUser: "Mahasiswa",
    price: 20000,
    rating: 4.9,
    sales: 154,
    format: "PSD",
    img: "/images/psd.png",
    desc: "Template poster ilmiah & kegiatan seminar kampus dengan struktur tata letak informasi yang rapi.",
    includes: ["High-Res Print Ready (300 DPI)", "CMYK Color Mode", "Customizable Graphics"]
  },
  {
    id: "p5",
    name: "Social Media Kit UMKM",
    slug: "social-media-kit-umkm",
    type: "product",
    category: "Social Media",
    targetUser: "UMKM",
    price: 45000,
    rating: 4.7,
    sales: 82,
    format: "Canva",
    img: "/images/sosmed.png",
    desc: "Paket promosi toko online: mencakup 15 Instagram Story, 15 Feed, Banner WhatsApp Business, & Stiker Thank You Card.",
    includes: ["30+ Assets Bundle", "Canva Pro & Free Compatibility", "Color Palette Palette Guide"]
  },
  {
    id: "p6",
    name: "Digital Student Planner 2026",
    slug: "digital-student-planner",
    type: "product",
    category: "Illustration",
    targetUser: "Mahasiswa",
    price: 18000,
    rating: 4.9,
    sales: 320,
    format: "PDF",
    img: "/images/pdf.png",
    desc: "Planner interaktif untuk mencatat jadwal kuliah, rencana/planning tertentu, budget mingguan, & habit tracker.",
    includes: ["Hyperlinked Tabs", "GoodNotes & Notability Ready", "Printable Version"]
  },

  {
    id: "s1",
    name: "Custom Logo Design",
    slug: "custom-logo-design",
    type: "service",
    category: "Branding",
    targetUser: "UMKM / Business",
    startingPrice: 150000,
    rating: 5.0,
    img: "/images/customlogo.png",
    desc: "Layanan perancangan logo identitas kustom untuk brand, toko online, maupun organisasi.",
    deliverables: "Vector Files (AI, SVG, PNG transparent), Brand Guideline PDF, 3x Revisions"
  },
  {
    id: "s2",
    name: "Custom Poster Event & Seminar",
    slug: "custom-poster-design",
    type: "service",
    category: "Poster",
    targetUser: "Mahasiswa / Organisasi",
    startingPrice: 50000,
    rating: 4.8,
    img: "/images/posterevent.png",
    desc: "Jasa desain poster kustom sesuai brief acara kepanitiaan kampus, konser, dan seminar nasional.",
    deliverables: "High-Res PDF Print & PNG Digital, Source File PSD/AI, 2x Revisions"
  },
  {
    id: "s3",
    name: "Social Media Content Design Package",
    slug: "custom-social-media-design",
    type: "service",
    category: "Social Media",
    targetUser: "Content Creator / UMKM",
    startingPrice: 100000,
    rating: 4.9,
    img: "/images/igpackage.png",
    desc: "Pembuatan konten visual eksklusif bulanan untuk feed Instagram, thumbnail YouTube, & cover Reels.",
    deliverables: "6-12 Designed Posts, Original Source Files, Free Copywriting Advisory"
  },
  {
    id: "s4",
    name: "Branding Identity Package",
    slug: "branding-identity-package",
    type: "service",
    category: "Branding",
    targetUser: "UMKM / Bisnis Baru",
    startingPrice: 300000,
    rating: 5.0,
    img: "/images/branding.png",
    desc: "Paket lengkap identitas visual: logo utama, kartu nama, desain kemasan (packaging), & panduan warna brand.",
    deliverables: "Full Brand Book, Master Vector Files, Packaging 3D Mockup"
  }
];


export const initialOrders = [
  {
    id: "ORD-8821",
    title: "Instagram Template Pack",
    type: "product",
    price: 25000,
    status: "Paid",
    downloadUrl: "#"
  },
  {
    id: "ORD-9104",
    title: "Custom Logo Design",
    type: "service",
    price: 150000,
    status: "In Progress",
    step: 2, 
    timelineStatus: "Designer is working on your project"
  }
];