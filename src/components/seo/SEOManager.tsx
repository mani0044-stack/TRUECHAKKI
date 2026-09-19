import React, { useEffect } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';

const SITE_URL = 'https://www.truechakki.com';
const BRAND_NAME = 'True Chakki';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo.png`;

export const SEOManager: React.FC = () => {
  const currentPage = useUIStore((state) => state.currentPage);
  const activeProductSlug = useUIStore((state) => state.activeProductSlug);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    let title = `${BRAND_NAME} | 100% Organic Stone-Ground Atta & Cold-Pressed Oils`;
    let description = 'True Chakki brings you 100% natural, stone-ground Sharbati atta, cold-pressed Kachi Ghani mustard oil, and traditional sun-cured pickles milled fresh on order.';
    let keywords = 'stone ground atta, organic wheat flour, Sharbati wheat flour, cold pressed mustard oil, traditional pickles, chakki fresh atta online, buy pure atta online, True Chakki';
    let canonicalUrl = `${SITE_URL}/`;
    let ogType = 'website';
    let ogImage = DEFAULT_OG_IMAGE;
    let robotsDirective = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    let activeProduct = null;

    switch (currentPage) {
      case 'home':
        title = `Buy 100% Pure Stone-Ground Atta & Cold-Pressed Oils Online | ${BRAND_NAME}`;
        description = 'Order 100% organic, farm-fresh Sharbati atta, cold-pressed mustard & groundnut oils, and traditional sun-cured pickles delivered straight from our farm to your home.';
        keywords = 'true chakki, stone ground atta, cold pressed oil, organic sharbati wheat, kachi ghani mustard oil, buy atta online amritsar punjab';
        canonicalUrl = `${SITE_URL}/`;
        break;

      case 'shop':
        title = `Shop Pure Organic Staples, Atta & Oils | ${BRAND_NAME} Catalog`;
        description = 'Explore True Chakki’s complete catalog of stone-milled wheat flours, wooden-pressed cooking oils, and digestive sun-cured pickles. 100% unadulterated purity guaranteed.';
        keywords = 'buy stone ground flours online, organic cooking oil shop, homemade achar online, chana sattu, multigrain flour';
        canonicalUrl = `${SITE_URL}/shop`;
        break;

      case 'pdp':
        activeProduct = products.find((p) => p.slug === activeProductSlug) || products[0];
        if (activeProduct) {
          title = `${activeProduct.name} - 100% Natural & Fresh Milled | ${BRAND_NAME}`;
          description = `${activeProduct.shortDescription || activeProduct.description}. Buy authentic ${activeProduct.name} online with nationwide fast delivery from True Chakki.`;
          keywords = `${activeProduct.name.toLowerCase()}, buy ${activeProduct.name.toLowerCase()} online, ${activeProduct.categoryName.toLowerCase()}, organic ${activeProduct.name.toLowerCase()}`;
          canonicalUrl = `${SITE_URL}/product/${activeProduct.slug}`;
          ogType = 'product';
          if (activeProduct.image) ogImage = activeProduct.image.startsWith('http') ? activeProduct.image : `${SITE_URL}${activeProduct.image}`;
        }
        break;

      case 'about':
        title = `Our Heritage & Stone Grinding Story | ${BRAND_NAME}`;
        description = 'Learn how True Chakki revives ancient Indian granite stone milling and wooden Kolhu cold pressing to deliver unheated, nutrient-dense natural food staples.';
        keywords = 'stone chakki vs roller mill, traditional milling process, organic wheat farming punjab, true chakki story';
        canonicalUrl = `${SITE_URL}/about`;
        break;

      case 'blogs':
        title = `Health & Nutrition Journal | ${BRAND_NAME} Blogs`;
        description = 'Read expert insights on traditional Indian nutrition, stone-ground flour health benefits, cold-pressed oil advantages, and authentic heritage recipes.';
        keywords = 'stone ground flour health benefits, cold pressed oil vs refined oil, traditional mango pickle recipe, organic food blogs';
        canonicalUrl = `${SITE_URL}/blogs`;
        break;

      case 'contact':
        title = `Contact Us & Store Location | ${BRAND_NAME} Amritsar`;
        description = 'Get in touch with True Chakki customer care or visit our store at Airport Rd, Defence Colony, Ranjit Avenue, Amritsar, Punjab. Phone: 1800-TRUE-CHAKKI.';
        keywords = 'true chakki contact, true chakki amritsar location, organic store amritsar, true chakki phone number';
        canonicalUrl = `${SITE_URL}/contact`;
        break;

      case 'checkout':
        title = `Secure Checkout | ${BRAND_NAME}`;
        description = 'Complete your order for farm-fresh stone-ground products securely with True Chakki.';
        robotsDirective = 'noindex, nofollow';
        canonicalUrl = `${SITE_URL}/checkout`;
        break;

      case 'account':
      case 'login':
      case 'register':
      case 'admin':
        title = `Customer Portal & Orders | ${BRAND_NAME}`;
        description = 'Manage your True Chakki account, track orders, and view order history.';
        robotsDirective = 'noindex, nofollow';
        canonicalUrl = `${SITE_URL}/${currentPage}`;
        break;

      default:
        break;
    }

    // Update Title
    document.title = title;

    // Helper to update meta tag content
    const setMeta = (selector: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attribute}="${selector}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, selector);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Update Core Meta Tags
    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', robotsDirective);
    setMeta('author', 'True Chakki Natural Organics Ltd.');

    // Update OpenGraph Social Tags
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:site_name', BRAND_NAME, 'property');
    setMeta('og:locale', 'en_IN', 'property');

    // Update Twitter Cards
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', title, 'name');
    setMeta('twitter:description', description, 'name');
    setMeta('twitter:image', ogImage, 'name');

    // Update Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Dynamic JSON-LD Injection
    const injectJSONLD = (id: string, schemaObj: object) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaObj);
    };

    // 1. Organization & LocalBusiness Schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'LocalBusiness', 'GroceryStore'],
      '@id': `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/logo.png`,
      description: 'True Chakki produces 100% natural, traditional stone-ground wheat flour, cold-pressed oils, and sun-cured pickles.',
      telephone: '+91-9876543210',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Airport Rd, Defence Colony, D-Block, Ranjit Avenue',
        addressLocality: 'Amritsar',
        addressRegion: 'Punjab',
        postalCode: '143001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '31.6591504',
        longitude: '74.8572704',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      sameAs: [
        'https://instagram.com/truechakki',
        'https://facebook.com/truechakki',
        'https://wa.me/919876543210',
      ],
    };
    injectJSONLD('schema-org', orgSchema);

    // 2. WebSite & Sitelinks SearchBox Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND_NAME,
      description: '100% Natural Stone-Ground Atta & Cold-Pressed Oils',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/shop?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
    injectJSONLD('schema-website', websiteSchema);

    // 3. Breadcrumb Schema
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
    ];

    if (currentPage === 'shop') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Shop Catalog',
        item: `${SITE_URL}/shop`,
      });
    } else if (currentPage === 'pdp' && activeProduct) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Shop Catalog',
        item: `${SITE_URL}/shop`,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: activeProduct.name,
        item: `${SITE_URL}/product/${activeProduct.slug}`,
      });
    } else if (currentPage !== 'home') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: currentPage.charAt(0).toUpperCase() + currentPage.slice(1),
        item: `${SITE_URL}/${currentPage}`,
      });
    }

    injectJSONLD('schema-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    });

    // 4. Product Schema (when viewing PDP)
    if (currentPage === 'pdp' && activeProduct) {
      const defaultVariant = activeProduct.variants[0] || { price: activeProduct.basePrice, sku: activeProduct.id };
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: activeProduct.name,
        image: activeProduct.image.startsWith('http') ? activeProduct.image : `${SITE_URL}${activeProduct.image}`,
        description: activeProduct.description,
        sku: defaultVariant.sku || activeProduct.id,
        brand: {
          '@type': 'Brand',
          name: BRAND_NAME,
        },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/product/${activeProduct.slug}`,
          priceCurrency: 'INR',
          price: defaultVariant.price || activeProduct.basePrice,
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: BRAND_NAME,
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: activeProduct.rating || 4.9,
          reviewCount: activeProduct.reviewCount || 120,
          bestRating: '5',
          worstRating: '1',
        },
      };
      injectJSONLD('schema-product', productSchema);
    } else {
      const el = document.getElementById('schema-product');
      if (el) el.remove();
    }

    // 5. FAQ Schema (Home, About, Contact)
    if (currentPage === 'home' || currentPage === 'about' || currentPage === 'contact') {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why is traditional stone-ground chakki flour better than commercial flour?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Commercial roller mills run at high heat (90°C+) destroying bran and vitamins. Stone ground chakki mills operate slowly at cool temperatures, preserving 100% of the fiber, wheat germ oil, and natural aroma.',
            },
          },
          {
            '@type': 'Question',
            name: 'What makes cold-pressed Kachi Ghani oils healthier?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'True Chakki cold-pressed oils are extracted using traditional wooden Kolhus without heat or chemical solvent refining, locking in natural MUFA, antioxidants, and pure flavor.',
            },
          },
          {
            '@type': 'Question',
            name: 'How fresh is True Chakki flour?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Our flours are stone-milled fresh in small batches upon order to ensure maximum nutritional potency and freshness delivered to your door.',
            },
          },
        ],
      };
      injectJSONLD('schema-faq', faqSchema);
    } else {
      const el = document.getElementById('schema-faq');
      if (el) el.remove();
    }

  }, [currentPage, activeProductSlug, products]);

  return null;
};
