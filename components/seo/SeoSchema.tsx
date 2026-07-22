'use client';

import React from 'react';
import { THINKCODE_DATA } from '@/lib/data';

export default function SeoSchema() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: THINKCODE_DATA.name,
    jobTitle: THINKCODE_DATA.role,
    description: THINKCODE_DATA.bio,
    address: {
      '@type': 'PostalAddress',
      addressCountry: THINKCODE_DATA.location
    },
    sameAs: [
      THINKCODE_DATA.socials.github,
      THINKCODE_DATA.socials.linkedin,
      THINKCODE_DATA.socials.twitter
    ],
    knowsAbout: THINKCODE_DATA.skills.flatMap(c => c.skills.map(s => s.name))
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${THINKCODE_DATA.name} | ${THINKCODE_DATA.role}`,
    url: 'https://thinkcode.dev',
    description: THINKCODE_DATA.tagline,
    author: {
      '@type': 'Person',
      name: THINKCODE_DATA.name
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: THINKCODE_DATA.geoAeoFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
