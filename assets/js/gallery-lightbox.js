// ============================================
// Gallery Lightbox Logic with Swipe & Navigation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const aboutBentoGrid = document.getElementById('about-bento-grid');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImg = document.getElementById('gallery-modal-image');
    const galleryModalCaption = document.getElementById('gallery-modal-caption');
    const closeGalleryModalBtn = document.getElementById('close-gallery-modal');
    const prevBtn = document.getElementById('prev-photo');
    const nextBtn = document.getElementById('next-photo');

    let currentPhotoIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    if (aboutBentoGrid && window.galleryData) {
        // Extended Bento pattern for full gallery
        const bentoPattern = [
            { cols: 6, rows: 3 },  // Extra large hero
            { cols: 3, rows: 2 },  // Medium
            { cols: 3, rows: 2 },  // Medium
            { cols: 4, rows: 2 },  // Medium-large
            { cols: 4, rows: 2 },  // Medium-large
            { cols: 4, rows: 2 },  // Medium-large
            { cols: 5, rows: 3 },  // Large featured
            { cols: 4, rows: 2 },  // Medium-large
            { cols: 3, rows: 2 },  // Medium
            { cols: 3, rows: 1 },  // Small
            { cols: 3, rows: 1 },  // Small
            { cols: 3, rows: 1 },  // Small
            { cols: 4, rows: 2 },  // Medium-large
            { cols: 4, rows: 2 },  // Medium-large
            { cols: 4, rows: 2 }   // Medium-large
        ];

        window.galleryData.forEach((photo, index) => {
            const pattern = bentoPattern[index % bentoPattern.length];
            const tile = document.createElement('div');

            tile.className = `col-span-1 md:col-span-${Math.ceil(pattern.cols / 2)} lg:col-span-${pattern.cols} row-span-${pattern.rows} rounded-2xl overflow-hidden group cursor-pointer relative bg-slate-900 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500`;

            tile.innerHTML = `
                <div class="w-full h-full relative overflow-hidden">
                    <img src="${photo.url}" alt="${photo.caption}" 
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute bottom-4 left-4 right-4">
                            <span class="text-xs uppercase tracking-widest text-primary font-bold mb-2 block">${photo.category}</span>
                            <p class="text-white font-serif text-sm line-clamp-2">${photo.caption}</p>
                        </div>
                    </div>
                    <div class="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <span class="material-icons text-white">zoom_in</span>
                    </div>
                </div>
            `;

            tile.onclick = () => openPhoto(index);
            aboutBentoGrid.appendChild(tile);
        });
    }

    function openPhoto(index) {
        currentPhotoIndex = index;
        updateModalContent();
        galleryModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function updateModalContent() {
        const photo = window.galleryData[currentPhotoIndex];
        if (!photo) return;

        // Add a small fade effect
        galleryModalImg.style.opacity = '0';

        setTimeout(() => {
            galleryModalImg.src = photo.url;
            galleryModalCaption.innerText = photo.photoCaption || photo.caption;
            galleryModalImg.style.opacity = '1';
        }, 200);
    }

    function closeGalleryModal() {
        galleryModal.classList.add('hidden');
        galleryModalImg.src = "";
        document.body.classList.remove('overflow-hidden');
    }

    function navigatePhoto(direction) {
        currentPhotoIndex += direction;

        if (currentPhotoIndex >= window.galleryData.length) {
            currentPhotoIndex = 0;
        } else if (currentPhotoIndex < 0) {
            currentPhotoIndex = window.galleryData.length - 1;
        }

        updateModalContent();
    }

    // Event Listeners
    if (closeGalleryModalBtn) closeGalleryModalBtn.addEventListener('click', closeGalleryModal);
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigatePhoto(-1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigatePhoto(1); });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (galleryModal.classList.contains('hidden')) return;

        if (e.key === 'Escape') closeGalleryModal();
        if (e.key === 'ArrowLeft') navigatePhoto(-1);
        if (e.key === 'ArrowRight') navigatePhoto(1);
    });

    // Swipe Detection
    galleryModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swiped left -> next
            navigatePhoto(1);
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swiped right -> prev
            navigatePhoto(-1);
        }
    }

    // Close on backdrop click
    if (galleryModal) {
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) closeGalleryModal();
        });
    }
});
