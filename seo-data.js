// seo-data.js - Pengaturan SEO & Schema Terpisah
const seoSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Diana Beauty Studio",
    "image": "https://dianabeautystudio.com/logo.png",
    "url": "https://dianabeautystudio.com",
    "telephone": "+6281280090680",
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jakarta",
        "addressCountry": "ID"
    },
    "description": "Layanan salon, spa, pijat, dan perawatan kecantikan panggilan ke rumah profesional.",
    "sameAs": [
        "https://www.instagram.com/dianabeautystudio"
    ]
};

// Menyuntikkan skema SEO ke dalam dokumen secara otomatis
const scriptTag = document.createElement('script');
scriptTag.type = 'application/ld+json';
scriptTag.text = JSON.stringify(seoSchema);
document.head.appendChild(scriptTag);