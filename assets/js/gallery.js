// ============================================
// Bento Grid Gallery Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log("Gallery script loaded.");
  const bentoGrid = document.getElementById('bento-grid');

  if (!bentoGrid) {
    console.warn("Bento grid container not found on this page.");
    return;
  }

  if (!window.galleryData) {
    console.error("Gallery data not found! Make sure galleryData.js is loaded before gallery.js.");
    return;
  }

  console.log(`Rendering gallery with ${window.galleryData.length} items.`);

  // Define Bento Grid size patterns (col-span, row-span)
  const bentoPattern = [
    { cols: 6, rows: 2 },  // Large featured
    { cols: 3, rows: 2 },  // Medium
    { cols: 3, rows: 2 },  // Medium
    { cols: 4, rows: 2 },  // Medium-large
    { cols: 4, rows: 1 },  // Wide short
    { cols: 4, rows: 1 },  // Wide short
    { cols: 3, rows: 2 },  // Medium
    { cols: 5, rows: 2 },  // Large
    { cols: 4, rows: 2 },  // Medium-large
    { cols: 3, rows: 1 },  // Small
    { cols: 3, rows: 1 },  // Small
    { cols: 3, rows: 1 }   // Small
  ];

  const photos = window.galleryData.slice(0, 12); // Show 12 photos (adjust if needed for index)

  photos.forEach((photo, index) => {
    const pattern = bentoPattern[index % bentoPattern.length];
    const tile = document.createElement('div');

    // Responsive classes: full width on mobile, half on tablet, Bento on desktop
    tile.className = `col-span-1 md:col-span-${Math.ceil(pattern.cols / 2)} lg:col-span-${pattern.cols} row-span-${pattern.rows} rounded-2xl overflow-hidden group cursor-pointer relative bg-slate-900 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500`;

    tile.innerHTML = `
    <div class="w-full h-full relative overflow-hidden">
      <img src="${photo.url}" alt="${photo.caption}" 
           class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-4 left-4 right-4">
          <span class="text-xs uppercase tracking-widest text-primary font-bold">${photo.category}</span>
        </div>
      </div>
      <div class="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
        <span class="material-icons text-white">zoom_in</span>
      </div>
    </div>
  `;

    tile.onclick = () => {
      window.location.href = 'about-eric-sambu.html#gallery';
    };

    bentoGrid.appendChild(tile);
  });
});

