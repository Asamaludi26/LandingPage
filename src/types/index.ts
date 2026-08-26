// ============================================================
// TYPE DEFINITIONS — VeloBikers Motor Club
// Semua type/interface untuk data aplikasi
// ============================================================

/**
 * GalleryImage — Data satu foto di galeri perjalanan
 * Muncul di section "Our Journeys" (Gallery)
 * Bisa difilter berdasarkan location
 */
export interface GalleryImage {
  id: number;        // ID unik (naik terus, jangan duplikat)
  src: string;       // URL gambar (bisa picsum/unsplash/hosting sendiri)
  alt: string;       // Deskripsi untuk accessibility (screen reader)
  caption: string;   // Judul singkat muncul di card & modal
  date: string;      // Tanggal pengambilan foto, bebas format
  location: string;  // Lokasi (bisa filter): "Bromo", "Anyer Beach", dll
  details: string;   // Deskripsi lengkap muncul di modal detail
}

/**
 * TourEvent — Data satu event/jadwal touring
 * Muncul di section "Club Agenda"
 * Ada 3 status: Registration Open, Limited Slots, Completed
 * Ada 3 difficulty: Beginner, Intermediate, Advanced
 */
export interface TourEvent {
  id: number;        // ID unik (naik terus, jangan duplikat)
  date: string;      // Format: "DD MMM YYYY" (contoh: "14 NOV 2026")
  title: string;     // Judul event
  description: string; // Deskripsi singkat
  status: 'Registration Open' | 'Limited Slots' | 'Completed';
  imageSrc: string;  // URL gambar hero event
  details: {
    mapUrl: string;     // Google Maps embed URL (bukan share link!)
    meetingPoint: string; // Titik kumpul + jam
    schedule: string[];   // Rundown per jam/hari
    requiredGear: string[]; // Perlengkapan wajib
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  };
}

/**
 * MemberProfile — Data satu anggota "The Core Crew"
 * Muncul di section "The Core Crew" (carousel)
 * Ditampilkan dalam carousel 3D infinite loop
 */
export interface MemberProfile {
    id: number;        // ID unik (naik terus, jangan duplikat)
    name: string;      // Nama lengkap
    role: string;      // Jabatan: "Founder", "Road Captain", dll
    avatarSrc: string; // URL foto profil (square ratio recommended)
    bike: string;      // Tipe motor andalan
    quote: string;     // Filosofi berkendara (muncul di card & modal)
    bio: string;       // Biografi lengkap (muncul di modal)
    socials?: {        // Optional — bisa diisi nanti
        instagram?: string;
        facebook?: string;
    };
}
