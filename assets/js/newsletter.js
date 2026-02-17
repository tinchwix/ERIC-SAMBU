// ============================================
// Newsletter Subscription (Supabase)
// ============================================

// Initialize Supabase (Global Scope for reuse across pages)
const supabaseUrl = 'https://uilyvqyeabdukuboqout.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbHl2cXllYWJkdWt1Ym9xb3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NTI1MTYsImV4cCI6MjA4NjUyODUxNn0.1nlUr57xSyb_nz0nzIwiHqL6ilmR_i24m4KgDJH0_EE';

// Check if supabase is loaded (defensive)
if (typeof supabase !== 'undefined') {
    window._supabase = supabase.createClient(supabaseUrl, supabaseKey);
    console.log("Supabase client initialized globaly.");
} else {
    console.error("Supabase script not loaded! Newsletter and reviews will not work.");
}

document.addEventListener('DOMContentLoaded', () => {
    const _supabase = window._supabase;


    // Newsletter Logic
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const email = emailInput ? emailInput.value : '';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';
            }

            const { data, error } = await _supabase
                .from('subscribers')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') { // Unique constraint violation
                    alert('You are already subscribed!');
                } else {
                    alert('Error subscribing. Please try again.');
                    console.error(error);
                }
            } else {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            }

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }
        });
    }
});
