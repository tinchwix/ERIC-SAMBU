// ============================================
// Credentials Gallery and Modal Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Credentials Data
    const credentials = [
        { title: "Certificate of Fellowship (ICPAK)", category: "Honors", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1771249534/Conferred_with_Certificate_of_fellowship_ICPAK.jpg" },
        { title: "ISO 9001-2015 Senior Lead Auditor", category: "ISO Standards", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893553/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/PECB%20Certified%20ISO%209001-2015%20Senior%20Lead%20Auditor%20certificate/PECB%20Certified%20ISO%209001-2015%20Senior%20Lead%20Auditor%20certificate_1.jpg" },
        { title: "ISO 31000 Senior Lead Risk Manager", category: "ISO Standards", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893552/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/PECB%20Certified%20ISO%2031000%20Senior%20Lead%20Risk%20Manager%20-%20Eric%20Sambu/PECB%20Certified%20ISO%2031000%20Senior%20Lead%20Risk%20Manager%20-%20Eric%20Sambu_1.jpg" },
        { title: "ISO 18788 Senior Lead Auditor", category: "ISO Standards", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893538/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/Eric%20Sambu%20ISO%2018788%20Senior%20Lead%20Auditor%20certificate%20%28PECB%29/Eric%20Sambu%20ISO%2018788%20Senior%20Lead%20Auditor%20certificate%20%28PECB%29_1.jpg" },
        { title: "ISO 18788 Senior Lead Implementer", category: "ISO Standards", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893551/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/PECB%20Certified%20ISO%2018788%20Senior%20Lead%20Implementer%20certificate%20-%202023/PECB%20Certified%20ISO%2018788%20Senior%20Lead%20Implementer%20certificate%20-%202023_1.jpg" },
        { title: "ISO 9001 Lead Auditor (SGS)", category: "ISO Standards", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893539/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/Eric%20Sambu%20ISO%209001%20LA%20SGS%20certificate/Eric%20Sambu%20ISO%209001%20LA%20SGS%20certificate_1.jpg" },
        { title: "ISO 9001 LA Course (SGS)", category: "ISO Standards", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893544/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/Eric%20Sambu%20SGS%20ISO%209001%20Lead%20Auditor%20Course%20Attendance/Eric%20Sambu%20SGS%20ISO%209001%20Lead%20Auditor%20Course%20Attendance_1.jpg" },
        { title: "PECB Certified Trainer", category: "Governance", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893553/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/PECB%20Certified%20Trainer%20Certificate%20-%20Eric%20Sambu/PECB%20Certified%20Trainer%20Certificate%20-%20Eric%20Sambu_1.jpg" },
        { title: "CPP Certificate (ASIS)", category: "Security", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893537/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/Eric%20Sambu%20CPP%20Certificate/Eric%20Sambu%20CPP%20Certificate_1.jpg" },
        { title: "ASIS Member Badge 2023", category: "Security", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893532/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/ASIS_Member_Badge20230302-28-ddkdsj%20-%20Eric%20Sambu%202023/ASIS_Member_Badge20230302-28-ddkdsj%20-%20Eric%20Sambu%202023_1.jpg" },
        { title: "IHRM 2025 Membership", category: "Memberships", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893536/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/ERIC%20SAMBU%20-%20IHRM%202025%20Certificate/ERIC%20SAMBU%20-%20IHRM%202025%20Certificate_1.jpg" },
        { title: "KIM Membership 2025", category: "Memberships", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893542/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/Eric%20Sambu%20KIM%20Membership%20Certificate%202025%20M-22010/Eric%20Sambu%20KIM%20Membership%20Certificate%202025%20M-22010_1.jpg" },
        { title: "KeBS NQI Membership 2026", category: "Memberships", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893549/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/KeBS%20NQI%20Membership%20certificate%202026%20-%20Eric%20Sambu/KeBS%20NQI%20Membership%20certificate%202026%20-%20Eric%20Sambu_1.jpg" },
        { title: "ICPAK Award of Commendation", category: "Honors", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893547/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/ICPAK%20Award%20of%20Commendation%20-%20Eric%20Sambu/ICPAK%20Award%20of%20Commendation%20-%20Eric%20Sambu_1.jpg" },
        { title: "NQAT Certificate 2022", category: "Governance", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893543/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/Eric%20Sambu%20NQAT%20Certificate%202022/Eric%20Sambu%20NQAT%20Certificate%202022_1.jpg" },
        { title: "NQI-KeBS Certificate 2023", category: "Memberships", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893545/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/Eric_Sambu_certificate%202023%20%28NQI%20-%20KeBS%29/Eric_Sambu_certificate%202023%20%28NQI%20-%20KeBS%29_1.jpg" },
        { title: "Good Conduct ICPSK 2024", category: "Governance", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893537/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/ERIC%20SAMBU%20-1780-Good-Conduct-Certificate%20ICPSK%202024/ERIC%20SAMBU%20-1780-Good-Conduct-Certificate%20ICPSK%202024_1.jpg" },
        { title: "CMSA Attendance Certificate", category: "Governance", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893533/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/CMSA%20certificate%20of%20attendance%20-%20Eric%20Sambu/CMSA%20certificate%20of%20attendance%20-%20Eric%20Sambu_1.jpg" },
        { title: "ISO 31000 PECB Certificate", category: "ISO Standards", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893554/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/PECB%20ISO%2031000%20-%20Eric%20Sambu/PECB%20ISO%2031000%20-%20Eric%20Sambu_1.jpg" },
        { title: "ICPAK Good Standing", category: "Governance", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893548/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/ICPAK%20Eric%20Sambu%20CertificateOfGoodStanding_201459%20-%20310126/ICPAK%20Eric%20Sambu%20CertificateOfGoodStanding_201459%20-%20310126_1.jpg" },
        { title: "PECB ISO 31000 Risk Profile", category: "ISO Standards", image: "https://res.cloudinary.com/dn4dszfra/image/upload/v1770893532/macha-school/author-portfolio/Docs/PDF%20IN%20IMG/ASIS_Member_Badge20230302-28-ddkdsj%20-%20Eric%20Sambu%202023%20%282%29/ASIS_Member_Badge20230302-28-ddkdsj%20-%20Eric%20Sambu%202023_1.jpg" }
    ];

    const grid = document.getElementById('credentials-grid');
    const modal = document.getElementById('pdf-modal');
    const img = document.getElementById('pdf-image');
    const modalTitle = document.getElementById('modal-title');
    const closeBtnModal = document.getElementById('close-modal');

    // Only populate if grid exists (index page)
    if (grid) {
        credentials.forEach(cred => {
            const card = document.createElement('div');
            card.className = "group cursor-pointer bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:bg-primary/10 hover:border-primary/30 transition-all duration-500 flex flex-col";
            card.innerHTML = `
        <div class="relative aspect-[4/3] overflow-hidden bg-slate-800">
          <img src="${cred.image}" alt="${cred.title}" class="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
          <div class="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all">
            <span class="material-icons text-white text-xs">visibility</span>
          </div>
        </div>
        <div class="p-5 flex-grow flex flex-col">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">${cred.category}</span>
          </div>
          <h5 class="font-serif text-base leading-snug text-slate-200 group-hover:text-white transition-colors line-clamp-2">${cred.title}</h5>
        </div>
      `;
            card.onclick = () => openCredential(cred.image, cred.title);
            grid.appendChild(card);
        });
    }

    function openCredential(imagePath, title) {
        if (modalTitle) modalTitle.innerText = title;
        if (img) img.src = imagePath;
        if (modal) {
            modal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.add('hidden');
            if (img) img.src = "";
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (closeBtnModal) closeBtnModal.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Close on backdrop click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});
