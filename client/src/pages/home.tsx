import Hero from "@/components/home/hero";
import SolutionsTeaser from "@/components/home/solutions-teaser";
import HowWeWork from "@/components/home/how-we-work";
import FeaturedCaseStudy from "@/components/home/featured-case-study";
import WebDesignShowcase from "@/components/home/web-design-showcase";
import TechnicalCredibility from "@/components/home/technical-credibility";
import StatsSection from "@/components/home/stats-section";
import Testimonials from "@/components/home/testimonials";
import BlogPreview from "@/components/home/blog-preview";
import Newsletter from "@/components/home/newsletter";
import HeadTags from "@/components/seo/head-tags";

const Home = () => {
  return (
    <>
      <HeadTags
        title="Haydeen Technologies | Leading Software Solutions in Ghana & West Africa"
        description="Transform your business with innovative software solutions from Ghana's premier technology company. Specializing in AgriConnect agricultural platforms, GhEHR healthcare systems, and custom website design for West African businesses."
        keywords="software development Ghana, AgriConnect platform, GhEHR healthcare, agricultural technology, healthcare technology, website design Ghana, digital transformation West Africa, Ghana software company"
        canonical="https://haydeentechnologies.com"
      />
      <Hero />
      <SolutionsTeaser />
      <HowWeWork />
      <FeaturedCaseStudy />
      <WebDesignShowcase />
      <TechnicalCredibility />
      <StatsSection />
      <Testimonials />
      <BlogPreview />
      <Newsletter />
    </>
  );
};

export default Home;
