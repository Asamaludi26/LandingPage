// ============================================================
// STATIC DATA — Landing Page
// Edit file ini untuk mengubah konten website.
// Semua data di sini bersifat statis (hardcode).
// Save file → browser otomatis update (hot reload).
// ============================================================

import type { GalleryImage, TourEvent, MemberProfile } from '@/types';
import { HiOutlineHome, HiOutlineInformationCircle, HiOutlinePhotograph, HiOutlineUsers, HiOutlineCalendar, HiOutlineMail } from 'react-icons/hi';

// ============================================================
// 📸 GALLERY IMAGES — Foto Perjalanan
// Muncul di section "Our Journeys"
// Filter otomatis berdasarkan field "location"
// ============================================================
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: "https://picsum.photos/seed/moto1/800/600",
    alt: "Motorcycle on a mountain road",
    caption: "Sunrise Ride at Bromo",
    date: "15 Oktober 2023",
    location: "Bromo Tengger Semeru, East Java",
    details: "An unforgettable journey to witness the majestic sunrise over the sea of sand."
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/moto2/800/600",
    alt: "Group of bikers on a coastal highway",
    caption: "Coastal Run to Anyer",
    date: "12 Agustus 2023",
    location: "Anyer Beach, Banten",
    details: "Feeling the ocean breeze as we cruised along the beautiful coastline of Anyer."
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/moto3/800/600",
    alt: "A classic motorcycle parked with a lake view",
    caption: "Lake Toba Exploration",
    date: "20 Juni 2023",
    location: "Lake Toba, North Sumatra",
    details: "Exploring the largest volcanic lake in the world and its stunning landscapes."
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/moto4/800/600",
    alt: "Biker gang resting in a forest",
    caption: "Bandung Forest Trail",
    date: "05 April 2023",
    location: "Cikole, Bandung",
    details: "A refreshing ride through the pine forests of Lembang, enjoying the cool mountain air."
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/moto5/800/600",
    alt: "Close-up of a motorcycle engine",
    caption: "Engine Maintenance Day",
    date: "10 Maret 2023",
    location: "HQ Meeting Point",
    details: "Sharing knowledge and getting our hands dirty to keep our rides in top condition."
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/moto6/800/600",
    alt: "Riding through a vibrant city at night",
    caption: "Jakarta Night Ride",
    date: "28 Januari 2023",
    location: "Jakarta, DKI Jakarta",
    details: "Experiencing the capital's vibrant energy under the city lights."
  },
  // ➕ TAMBAH FOTO BARU: Copy salah satu objek di atas, ubah id + datanya
];

// ============================================================
// 🏍️ TOUR EVENTS — Jadwal & Arsip Touring
// Muncul di section "Club Agenda"
// Status: "Registration Open" | "Limited Slots" | "Completed"
// Difficulty: "Beginner" | "Intermediate" | "Advanced"
// Date format: "DD MMM YYYY" (contoh: "14 NOV 2026")
// ============================================================
export const TOUR_EVENTS: TourEvent[] = [
  {
    id: 1,
    date: "25 DEC 2023",
    title: "Year-End Charity Ride 2023",
    description: "Join us for our annual year-end ride to donate to local orphanages and share the joy of the season.",
    status: "Completed",
    imageSrc: "https://picsum.photos/seed/event1/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.017892749715!2d106.8271520147693!3d-6.26297499546853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f2327c5f4f69%3A0x5d4e135a5a5d2a6a!2sJakarta!5e0!3m2!1sen!2sid!4v1628887654321!5m2!1sen!2sid",
      meetingPoint: "HQ Meeting Point, 8:00 AM",
      schedule: ["08:00 - Briefing", "09:00 - Ride Starts", "12:00 - Lunch & Donation", "15:00 - Return"],
      requiredGear: ["Full-face helmet", "Riding jacket", "Gloves", "Donations (optional)"],
      difficulty: "Beginner",
    }
  },
  {
    id: 2,
    date: "15 JAN 2024",
    title: "New Year Mountain Rally 2024",
    description: "Kick off the new year by conquering the winding roads of the Puncak highlands. All skill levels welcome.",
    status: "Completed",
    imageSrc: "https://picsum.photos/seed/event2/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.29292852109!2d106.9946223147714!3d-6.611100995221989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b9a5a4a5a5a5%3A0x5a5a5a5a5a5a5a5a!2sPuncak%20Pass!5e0!3m2!1sen!2sid!4v1628887754321!5m2!1sen!2sid",
      meetingPoint: "Gadog Intersection, 7:00 AM",
      schedule: ["07:00 - Briefing", "07:30 - Ride to Puncak Pass", "10:00 - Coffee Break", "13:00 - Lunch", "16:00 - Return"],
      requiredGear: ["Riding gear suitable for cool weather", "Raincoat", "Valid papers"],
      difficulty: "Intermediate",
    }
  },
  {
    id: 3,
    date: "18 JUL 2024",
    title: "Dieng Plateau Highland Adventure",
    description: "Conquering foggy high-altitude twisties, sunrise over Sikunir hill, and volcanic hot springs exploration.",
    status: "Completed",
    imageSrc: "https://picsum.photos/seed/eventdieng/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5!2d109.9!3d-7.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTInMDAuMCJTIDEwOcKwNTQnMDAuMCJF!5e0!3m2!1sen!2sid!4v1628887754322!5m2!1sen!2sid",
      meetingPoint: "Wonosobo Rest Point, 6:00 AM",
      schedule: ["06:00 - Meet & Safety Check", "07:00 - Ascent to Dieng", "11:30 - Sikidang Crater", "14:00 - Local Culinary Feast"],
      requiredGear: ["Thermal inner lining", "Fog-proof visor", "Winter gloves"],
      difficulty: "Advanced",
    }
  },
  {
    id: 4,
    date: "25 OCT 2025",
    title: "Beachside BBQ & Coastal Camp 2025",
    description: "A relaxed weekend getaway. We ride to the coast, enjoy a sunset BBQ, and camp under the stars.",
    status: "Completed",
    imageSrc: "https://picsum.photos/seed/event3/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.860166687293!2d105.9969183147688!3d-6.1628199955476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4210a4a4a4a4a5%3A0x5a5a5a5a5a5a5a5a!2sAnyer%20Beach!5e0!3m2!1sen!2sid!4v1628887854321!5m2!1sen!2sid",
      meetingPoint: "Serang City Center, 9:00 AM",
      schedule: ["Day 1: Ride to Anyer, Camp Setup, Sunset BBQ", "Day 2: Morning Swim, Breakfast, Ride Home"],
      requiredGear: ["Camping equipment", "Swimwear", "Personal supplies"],
      difficulty: "Beginner",
    }
  },
  {
    id: 5,
    date: "30 MAR 2026",
    title: "Heritage Temple Trail 2026",
    description: "A ride through history, visiting ancient temples and historical landmarks around Central Java.",
    status: "Completed",
    imageSrc: "https://picsum.photos/seed/event4/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.056024982186!2d110.20387331477815!3d-7.78393099438968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a43cc1f72c0c1%3A0x2d3e38c6e2b2a8b!2sBorobudur%20Temple!5e0!3m2!1sen!2sid!4v1628887954321!5m2!1sen!2sid",
      meetingPoint: "Yogyakarta City Center, 6:00 AM",
      schedule: ["06:00 - Briefing", "07:00 - Ride to Borobudur", "12:00 - Lunch", "14:00 - Explore Prambanan", "17:00 - Return"],
      requiredGear: ["Comfortable riding gear", "Camera", "Sunscreen"],
      difficulty: "Intermediate",
    }
  },
  {
    id: 6,
    date: "14 NOV 2026",
    title: "Bromo Golden Hour Expedition",
    description: "Conquer the legendary sea of sand and mountain ridge paths on an iconic two-day club tour to Mount Bromo.",
    status: "Limited Slots",
    imageSrc: "https://picsum.photos/seed/eventbromo/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.111!2d112.95!3d-7.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTYnMjQuMCJTIDExMsKwNTcnMDAuMCJF!5e0!3m2!1sen!2sid!4v1628887954330!5m2!1sen!2sid",
      meetingPoint: "Malang Rest Area KM 84, 5:30 AM",
      schedule: ["Day 1: Malang to Bromo Ridge, Sunset Gathering", "Day 2: Sunrise Sea of Sand Ride, Return Trip"],
      requiredGear: ["Dust mask/bandana", "Off-road / Dual-purpose tires", "High-visibility jacket"],
      difficulty: "Advanced",
    }
  },
  {
    id: 7,
    date: "20 DEC 2026",
    title: "Year-End Night City Cruise & Charity",
    description: "Cruising the metropolis skyline illuminated under holiday lights, capped with a community fundraising dinner.",
    status: "Registration Open",
    imageSrc: "https://picsum.photos/seed/eventnight/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1628887954331!5m2!1sen!2sid",
      meetingPoint: "Senayan Parking Lot, 7:30 PM",
      schedule: ["19:30 - Registration & Line-up", "20:30 - Convoy Ride Through Sudirman-Thamrin", "22:30 - Charity Dinner"],
      requiredGear: ["Clear visor", "Reflective vest", "Club patch jacket"],
      difficulty: "Beginner",
    }
  },
  {
    id: 8,
    date: "18 FEB 2027",
    title: "Flores Trans-Island Grand Tour 2027",
    description: "The ultimate 7-day multi-island expedition spanning from Labuan Bajo to Maumere through breathtaking volcanic landscapes.",
    status: "Registration Open",
    imageSrc: "https://picsum.photos/seed/eventflores/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.0!2d119.88!3d-8.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzAnMDAuMCJTIDExOcKwNTInNDguMCJF!5e0!3m2!1sen!2sid!4v1628887954332!5m2!1sen!2sid",
      meetingPoint: "Labuan Bajo Harbor, 08:00 AM",
      schedule: ["Day 1-2: Labuan Bajo to Ruteng", "Day 3-4: Bajawa & Kelimutu Tri-color Crater", "Day 5-7: Maumere Coastal Finale"],
      requiredGear: ["Panniers/Saddlebags", "Tool kit", "Rain gear", "Action camera"],
      difficulty: "Advanced",
    }
  },
  {
    id: 9,
    date: "25 MAY 2027",
    title: "West Sumatra Ring of Volcanoes",
    description: "Tackling the famous Kelok 44 curves and exploring Lake Maninjau & Bukittinggi highlands.",
    status: "Registration Open",
    imageSrc: "https://picsum.photos/seed/eventsumatra/800/500",
    details: {
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3!2d100.3!3d-0.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTgnMDAuMCJTIDEwMMKwMTgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1628887954333!5m2!1sen!2sid",
      meetingPoint: "Padang International Airport Hub, 07:00 AM",
      schedule: ["Day 1: Padang to Bukittinggi via Lembah Anai", "Day 2: Kelok 44 & Lake Maninjau Ride", "Day 3: Harau Valley Cruise"],
      requiredGear: ["Touring boots", "Waterproof jacket", "Cardo/Intercom unit"],
      difficulty: "Intermediate",
    }
  }
  // ➕ TAMBAH EVENT BARU: Copy salah satu objek di atas, ubah id + datanya
  // 💡 Tips: Status "Registration Open" muncul tombol "Register"
  // 💡 Tips: Status "Completed" tidak ada tombol register
];

// ============================================================
// 👥 MEMBER PROFILES — Anggota "The Core Crew"
// Muncul di section "The Core Crew" (carousel 3D)
// Ditampilkan sebagai carousel infinite loop
// ============================================================
export const MEMBER_PROFILES: MemberProfile[] = [
    {
        id: 1,
        name: "Andi 'Rider' Wijaya",
        role: "Founder & Road Captain",
        avatarSrc: "https://picsum.photos/seed/member1/800/800",
        bike: "Kawasaki Z900",
        quote: "The road is my canvas, and my bike is the brush. Every turn is a new stroke of freedom.",
        bio: "With over 15 years on two wheels, Andi has explored every corner of the archipelago. For him, the community is about the shared passion and the silent understanding between riders on an open road.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 2,
        name: "Budi Santoso",
        role: "Co-Founder & Chief Mechanic",
        avatarSrc: "https://picsum.photos/seed/member2/800/800",
        bike: "Custom Harley Davidson",
        quote: "A well-oiled machine is like a loyal friend. Take care of your bike, and it will take care of you.",
        bio: "Budi can diagnose an engine by its sound alone. His favorite part of the community is the 'Garage Day,' where members share maintenance tips and help each other keep their rides in peak condition.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 3,
        name: "Citra Lestari",
        role: "Community Manager",
        avatarSrc: "https://picsum.photos/seed/member3/800/800",
        bike: "Vespa Primavera",
        quote: "It's not about how fast you go, but how much you enjoy the journey and the company.",
        bio: "Citra ensures every member feels welcome. She loves organizing the social events, believing that the bonds forged off the bike are just as important as those forged on the road.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 4,
        name: "Dewi Anggraini",
        role: "Treasurer & Event Planner",
        avatarSrc: "https://picsum.photos/seed/member4/800/800",
        bike: "Ducati Scrambler",
        quote: "Life is a beautiful ride. Let's make every moment and every kilometer count.",
        bio: "A meticulous planner, Dewi maps out the club's most epic journeys. Her favorite moments are seeing the members' faces light up when they reach a stunning, previously unknown viewpoint she discovered.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 5,
        name: "Eko Prasetyo",
        role: "Safety Officer",
        avatarSrc: "https://picsum.photos/seed/member5/800/800",
        bike: "BMW R1250GS",
        quote: "Ride safe, ride smart. The best ride is the one where everyone gets home.",
        bio: "An ex-paramedic, Eko is dedicated to rider safety. He runs regular safety briefing sessions and loves that the community prioritizes a culture of responsibility and looking out for one another.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 6,
        name: "Rina Hartono",
        role: "Social Media Manager",
        avatarSrc: "https://picsum.photos/seed/member6/800/800",
        bike: "Royal Enfield Classic 350",
        quote: "Capturing our adventures one photo at a time. Follow our journey!",
        bio: "Rina is the visual storyteller of the community. With her camera always at the ready, she loves capturing the candid moments of friendship and adventure that define the community spirit.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 7,
        name: "Agus Salim",
        role: "Veteran Rider",
        avatarSrc: "https://picsum.photos/seed/member7/800/800",
        bike: "Honda Gold Wing",
        quote: "I've got more miles on my bike than most people have in their cars. And I'm just getting started.",
        bio: "Agus is the club's seasoned sage, with countless stories from the road. He enjoys mentoring new riders and passing down the wisdom he's gained over decades of riding.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 8,
        name: "Sari Putri",
        role: "New Member Ambassador",
        avatarSrc: "https://picsum.photos/seed/member8/800/800",
        bike: "Yamaha MT-25",
        quote: "Welcoming new faces to the family is the best part of our community. Let's ride!",
        bio: "Sari's infectious enthusiasm makes every newcomer feel right at home. Her favorite thing about the community is seeing a timid first-timer blossom into a confident road explorer.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 9,
        name: "Iwan Kusuma",
        role: "Lead Scout",
        avatarSrc: "https://picsum.photos/seed/member9/800/800",
        bike: "Triumph Tiger 900",
        quote: "The best roads are the ones yet to be discovered. I'll find them for us.",
        bio: "An adventurer at heart, Iwan is always seeking out new routes and hidden gems. He loves the thrill of exploration and sharing the excitement of a new trail with the club.",
        socials: { instagram: "#", facebook: "#" }
    },
    {
        id: 10,
        name: "Maya Sari",
        role: "Logistics Coordinator",
        avatarSrc: "https://picsum.photos/seed/member10/800/800",
        bike: "Suzuki V-Strom 250",
        quote: "Every successful tour has a plan. I make sure we're always prepared for the road ahead.",
        bio: "Maya is the organizational backbone of every major tour. She finds satisfaction in ensuring every detail is covered so that everyone else can focus purely on the joy of the ride.",
        socials: { instagram: "#", facebook: "#" }
    },
    // ➕ TAMBAH ANGGOTA BARU: Copy salah satu objek di atas, ubah id + datanya
];

// ============================================================
// 🧭 NAVIGATION LINKS — Header & Mobile Menu
// ============================================================
export const NAV_LINKS = [
    { name: "Home", id: "home", icon: HiOutlineHome },
    { name: "About", id: "about", icon: HiOutlineInformationCircle },
    { name: "Gallery", id: "gallery", icon: HiOutlinePhotograph },
    { name: "Members", id: "members", icon: HiOutlineUsers },
    { name: "Events", id: "events", icon: HiOutlineCalendar },
    { name: "Contact", id: "contact", icon: HiOutlineMail }
];
