import { ServiceItem, PathwayRecommendation, PathwayState } from '../types';

import clinicExteriorImg from '../assets/images/homsi_clinic_exterior_1788345844735.jpg';
import drHomsiImg from '../assets/images/dr_homsi_portrait_1788345865454.jpg';

export { clinicExteriorImg, drHomsiImg };

export const CLINIC_INFO = {
  name: "Homsi Clinic",
  doctor: "Dr. Abdulaziz Homsi",
  doctorTitle: "Dermatologist & Medical Aesthetics Lead",
  address: "56 The Mall, London W5 3TA, UK",
  phone: "+44 7777 285999",
  phoneTel: "tel:+447777285999",
  whatsappUrl: "https://wa.me/447777285999",
  instagramUrl: "https://www.instagram.com/homsi.clinic",
  instagramHandle: "@homsi.clinic",
  mapsUrl: "https://maps.google.com/?cid=12714973516294483036&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQQAhgEIAA",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2798606404986!2d-0.306079!3d51.512613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760de2be702e6d%3A0xb08573ef8a546d1c!2s56%20The%20Mall%2C%20London%20W5%203TA%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
};

export const HIGHLIGHTS = [
  { id: '1', title: 'Dermatologist Led', desc: 'Direct consultation & treatment under Dr. Abdulaziz Homsi' },
  { id: '2', title: 'Follow-up Care', desc: 'Comprehensive post-treatment review included with every procedure' },
  { id: '3', title: 'W5 Location', desc: 'Convenient Ealing location at 56 The Mall, London W5 3TA' }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'consultation',
    title: 'Dermatologist Consultation',
    tags: ['Medical', 'Expert'],
    description: 'In-depth clinical assessment of your skin health, medical diagnosis, and a customized treatment pathway explained step-by-step.',
    details: [
      'Comprehensive digital skin condition review',
      'Direct diagnosis by Dr. Abdulaziz Homsi',
      'Transparent discussion of options, outcomes, and expectations',
      'Personalized care schedule with included follow-up'
    ],
    duration: '30 - 45 Mins',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'laser',
    title: 'Full Body Laser',
    tags: ['Precision', 'Safe'],
    description: 'Advanced medical laser technology delivering precise, long-lasting hair removal and skin rejuvenation safely across all skin types.',
    details: [
      'Medical-grade cooling technology for optimal comfort',
      'Patch test and skin reactivity trial prior to full session',
      'Safe for light to dark skin phototypes with calibrated wavelengths',
      'Customized multi-session packages with progress monitoring'
    ],
    duration: '45 - 90 Mins',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'aesthetic',
    title: 'Aesthetic Treatments',
    tags: ['Personalised', 'Clinical'],
    description: 'Subtle, clinically guided aesthetic enhancements designed to restore natural facial contours and subtle harmony.',
    details: [
      'Precise anatomical evaluation and facial symmetry planning',
      'High-purity medical aesthetic formulations',
      'Gentle technique prioritizing subtle, natural-looking results',
      'Detailed post-care protocol and complimentary 2-week review'
    ],
    duration: '30 - 60 Mins',
    image: 'https://images.unsplash.com/photo-1512290900673-0498b36873ca?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'skin',
    title: 'Skin Treatments',
    tags: ['Restorative', 'Clear'],
    description: 'Targeted medical skin therapies addressing persistent acne, pigmentation, scarring, rosacea, and texture irregularites.',
    details: [
      'Clinical peels, microneedling, and barrier repair therapies',
      'Tailored formulation concentrations based on diagnostic analysis',
      'Reduces inflammation, balances lipid production, and accelerates cell renewal',
      'Home prescription skincare guidance provided by Dr. Homsi'
    ],
    duration: '45 - 60 Mins',
    image: 'https://images.unsplash.com/photo-1512290900673-0498b36873ca?auto=format&fit=crop&q=80&w=800'
  }
];

export const PATIENT_JOURNEY = [
  {
    step: '01',
    title: 'Initial Consultation',
    tagline: 'Clear diagnosis & honest evaluation',
    description: 'Meet Dr. Abdulaziz Homsi at our W5 clinic. We examine your skin condition, answer every question, and explain every procedure option in plain language.'
  },
  {
    step: '02',
    title: 'Tailored Treatment',
    tagline: 'Clinical precision with comfort',
    description: 'Your procedure is conducted using calibrated medical-grade laser or aesthetic equipment in a quiet, immaculate treatment room.'
  },
  {
    step: '03',
    title: 'Post-Care & Recovery',
    tagline: 'Clear instructions & home support',
    description: 'You receive written post-care protocols, recommended topical care, and direct access to our team for any post-treatment questions.'
  },
  {
    step: '04',
    title: 'Follow-up Care',
    tagline: 'Always included',
    description: 'We check in to evaluate your recovery and long-term skin progression. Follow-up care is standard with every medical service we offer.'
  }
];

export function getPathwayRecommendation(state: PathwayState): PathwayRecommendation {
  const key = `${state.concern}-${state.goal}-${state.preference}`;

  if (state.concern === 'Acne') {
    if (state.goal === 'Treat') {
      return {
        title: 'Targeted Medical Acne Resolution',
        summary: 'A combination of diagnostic dermatologist consultation and specialized clinical skin peels to clear active breakouts and calm redness.',
        suitableFor: 'Active acne breakouts, congestion, and post-inflammatory pigmentation.',
        recommendedServices: ['Dermatologist Consultation', 'Skin Treatments'],
        expectedTime: 'Initial consultation + 3-4 treatment sessions spaced 2 weeks apart.'
      };
    } else if (state.goal === 'Maintain') {
      return {
        title: 'Skin Barrier Maintenance & Clarifying Care',
        summary: 'Gentle exfoliation and deeply restorative medical skin therapy to keep pore channels clear and prevent future flare-ups.',
        suitableFor: 'Mild breakouts, uneven skin texture, and post-acne maintenance.',
        recommendedServices: ['Skin Treatments'],
        expectedTime: 'Monthly maintenance sessions.'
      };
    } else {
      return {
        title: 'Preventative Skin Health & Scar Defense',
        summary: 'Early intervention protocol combining gentle clinical peels with prescribed barrier strengthening products.',
        suitableFor: 'Acne-prone skin showing early signs of texture change or minor congestion.',
        recommendedServices: ['Dermatologist Consultation', 'Skin Treatments'],
        expectedTime: 'Bi-monthly consultation & preventive review.'
      };
    }
  } else if (state.concern === 'Aging') {
    if (state.goal === 'Treat') {
      return {
        title: 'Clinical Collagen Renewal & Fine Line Reduction',
        summary: 'Personalized aesthetic treatment or microneedling to stimulate natural collagen architecture and smooth fine lines.',
        suitableFor: 'Loss of firmness, fine lines around eyes/mouth, and subtle volume loss.',
        recommendedServices: ['Aesthetic Treatments', 'Skin Treatments'],
        expectedTime: '30-45 minute procedure with 2-week follow-up review.'
      };
    } else if (state.goal === 'Maintain') {
      return {
        title: 'Subtle Contour & Hydration Maintenance',
        summary: 'Low-downtime skin booster and restorative treatment maintaining natural elasticity and smooth texture.',
        suitableFor: 'Maintaining youthful skin texture and targeted hydration boost.',
        recommendedServices: ['Aesthetic Treatments', 'Skin Treatments'],
        expectedTime: 'Single session every 4 to 6 months.'
      };
    } else {
      return {
        title: 'Preventative Collagen Shield',
        summary: 'Early anti-aging consultation focusing on UV damage defense, antioxidant therapy, and light clinical peels.',
        suitableFor: 'Early fine lines and preventive collagen care for 25-40 year olds.',
        recommendedServices: ['Dermatologist Consultation', 'Skin Treatments'],
        expectedTime: 'Seasonal skin review & customized skincare prescription.'
      };
    }
  } else {
    // Hair concern
    if (state.preference === 'Quick') {
      return {
        title: 'Targeted Precision Medical Laser Hair Removal',
        summary: 'Fast, comfortable laser sessions using calibrated wavelength technology for smooth, hair-free skin without irritation.',
        suitableFor: 'Unwanted hair on face, underarms, bikini, or specific body areas.',
        recommendedServices: ['Full Body Laser'],
        expectedTime: '15-30 minute session per targeted area.'
      };
    } else {
      return {
        title: 'Comprehensive Full Body Laser Course',
        summary: 'Complete laser hair removal program with patch testing, custom energy calibration, and complimentary follow-up check-ins.',
        suitableFor: 'Full body smooth hair reduction across all skin tones.',
        recommendedServices: ['Full Body Laser', 'Dermatologist Consultation'],
        expectedTime: '6-8 sessions spaced 4-6 weeks apart.'
      };
    }
  }
}
