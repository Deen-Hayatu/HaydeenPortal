import Hero from "@/components/home/hero";
import SolutionsTeaser from "@/components/home/solutions-teaser";
import HowWeWork from "@/components/home/how-we-work";
import FeaturedCaseStudy from "@/components/home/featured-case-study";
import BlogPreview from "@/components/home/blog-preview";
import Newsletter from "@/components/home/newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <SolutionsTeaser />
      <HowWeWork />
      <FeaturedCaseStudy />
      <BlogPreview />
      <Newsletter />
    </>
  );
};

export default Home;
