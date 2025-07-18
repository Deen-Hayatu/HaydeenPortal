import { Link } from "wouter";
import { Play, ExternalLink, CheckCircle, Users, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeadTags from "@/components/seo/head-tags";
import ghehrLogo from "@assets/GhEHR logo_1752832735160.png";

const Products = () => {
  const products = [
    {
      id: "agriconnect",
      name: "AgriConnect",
      tagline: "Connecting Ghana's Agricultural Ecosystem",
      description: "A comprehensive digital platform that connects farmers, buyers, suppliers, and logistics providers across Ghana and West Africa.",
      status: "In Development",
      statusColor: "bg-blue-500",
      features: [
        "Farmer-to-buyer marketplace",
        "Supply chain logistics coordination",
        "Crop data analytics and insights",
        "Mobile Money payment integration",
        "Multi-language support (English, Twi, Ga)"
      ],
      demoVideo: "#", // Will be updated when demo is ready
      liveDemo: "/solutions/agriconnect",
      targetUsers: "Farmers, Agricultural Buyers, Suppliers",
      techStack: ["React", "Node.js", "PostgreSQL", "Mobile Money API"],
      image: "https://images.unsplash.com/photo-1544698310-e5848922d1f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ghehr",
      name: "GhEHR",
      tagline: "Ghana's Electronic Health Record System",
      description: "A comprehensive EHR system designed specifically for Ghana's healthcare ecosystem, featuring NHIS integration and local compliance.",
      status: "Beta Testing",
      statusColor: "bg-orange-500",
      features: [
        "Patient record management",
        "NHIS integration and billing",
        "Healthcare analytics dashboard",
        "Multi-facility data sharing",
        "Ghana Health Service compliance"
      ],
      demoVideo: "#", // Will be updated when demo is ready
      liveDemo: "/solutions/ghehr",
      targetUsers: "Hospitals, Clinics, Healthcare Providers",
      techStack: ["React", "Node.js", "PostgreSQL", "NHIS API"],
      logo: ghehrLogo
    },
    {
      id: "ecovendghana",
      name: "EcoVend Ghana",
      tagline: "Sustainable E-commerce for Ghana",
      description: "An e-commerce platform focused on eco-friendly products and sustainable business practices in Ghana.",
      status: "Coming Soon",
      statusColor: "bg-green-500",
      features: [
        "Eco-friendly product marketplace",
        "Carbon footprint tracking",
        "Local vendor prioritization",
        "Mobile Money payments",
        "Delivery optimization"
      ],
      demoVideo: "#",
      liveDemo: "#",
      targetUsers: "Eco-conscious Consumers, Local Vendors",
      techStack: ["Next.js", "Stripe", "MongoDB", "Mobile Money"],
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <>
      <HeadTags
        title="Products | Haydeen Technologies - AgriConnect & GhEHR Solutions"
        description="Explore our innovative software products: AgriConnect agricultural platform and GhEHR healthcare system. Built specifically for Ghana and West Africa markets with local integrations."
        keywords="AgriConnect demo, GhEHR healthcare, software products Ghana, agricultural technology, healthcare technology, product demos, Ghana software solutions"
        canonical="https://haydeentechnologies.com/products"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A3D62] to-[#3C6382] text-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Products
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Innovative software solutions designed specifically for Ghana and West Africa
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[#27AE60] hover:bg-[#229954] text-white">
                <Link href="#products">View Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#0A3D62]">
                <Link href="/contact">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each product is built with Ghana's specific needs in mind, featuring local integrations and user-friendly interfaces.
            </p>
          </div>

          <div className="grid gap-8">
            {products.map((product, index) => (
              <Card key={product.id} className="overflow-hidden">
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                  {/* Product Image/Logo */}
                  <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    {product.logo ? (
                      <img 
                        src={product.logo} 
                        alt={`${product.name} logo`}
                        className="max-h-32 w-auto object-contain"
                      />
                    ) : product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-[#0A3D62] to-[#3C6382] rounded-lg flex items-center justify-center">
                        <Database className="h-16 w-16 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <CardTitle className="text-2xl">{product.name}</CardTitle>
                      <Badge className={`${product.statusColor} text-white`}>
                        {product.status}
                      </Badge>
                    </div>
                    
                    <CardDescription className="text-lg mb-4 font-medium text-[#0A3D62]">
                      {product.tagline}
                    </CardDescription>
                    
                    <p className="text-muted-foreground mb-6">
                      {product.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {product.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-[#27AE60]" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target Users & Tech Stack */}
                    <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-semibold text-sm">Target Users: </span>
                        <span className="text-sm text-muted-foreground">{product.targetUsers}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">Tech Stack: </span>
                        <span className="text-sm text-muted-foreground">{product.techStack.join(", ")}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="bg-[#0A3D62] hover:bg-[#082E4A]">
                        <Link href={product.liveDemo}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      
                      <Button variant="outline" className="border-[#27AE60] text-[#27AE60] hover:bg-[#27AE60] hover:text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Demo
                      </Button>
                      
                      <Button asChild variant="ghost">
                        <Link href="/contact">Request Access</Link>
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Request Section */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to See Our Products in Action?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a personalized demo to see how our solutions can transform your business operations in Ghana.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-[#27AE60] hover:bg-[#229954]">
                <Link href="/contact">Schedule Demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/solutions">Explore All Solutions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;