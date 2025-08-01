import { useEffect } from 'react';

interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

export const OrganizationSchema = ({
  name,
  description,
  url,
  logo,
  address,
  contactPoint,
  sameAs = [],
}: OrganizationSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name,
      description,
      url,
      ...(logo && { logo }),
      ...(address && { address: { "@type": "PostalAddress", ...address } }),
      ...(contactPoint && { contactPoint: { "@type": "ContactPoint", ...contactPoint } }),
      ...(sameAs.length > 0 && { sameAs }),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [name, description, url, logo, address, contactPoint, sameAs]);

  return null;
};

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  serviceType: string;
  offers?: {
    name: string;
    description: string;
    price?: string;
    priceCurrency?: string;
  }[];
}

export const ServiceSchema = ({
  name,
  description,
  provider,
  areaServed,
  serviceType,
  offers = [],
}: ServiceSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      description,
      provider: {
        "@type": "Organization",
        name: provider,
      },
      areaServed,
      serviceType,
      ...(offers.length > 0 && {
        offers: offers.map(offer => ({
          "@type": "Offer",
          ...offer,
        })),
      }),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [name, description, provider, areaServed, serviceType, offers]);

  return null;
};

interface WebsiteSchemaProps {
  name: string;
  url: string;
  description: string;
  publisher: string;
  inLanguage?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

export const WebsiteSchema = ({
  name,
  url,
  description,
  publisher,
  inLanguage = 'en',
  potentialAction,
}: WebsiteSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name,
      url,
      description,
      publisher: {
        "@type": "Organization",
        name: publisher,
      },
      inLanguage,
      ...(potentialAction && {
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: potentialAction.target,
          },
          "query-input": `required name=${potentialAction.queryInput}`,
        },
      }),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [name, url, description, publisher, inLanguage, potentialAction]);

  return null;
};