import { CheckCircle, Star, Users, Clock, Shield, Headphones } from "lucide-react";

export default function Service() {
  const services = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Premium Security",
      description: "Advanced security measures to protect your data and ensure complete privacy.",
      features: ["24/7 Monitoring", "Data Encryption", "Secure Backups"]
    },
    {
      icon: <Headphones className="w-8 h-8 text-green-600" />,
      title: "Expert Support",
      description: "Round-the-clock support from our team of experienced professionals.",
      features: ["Live Chat", "Phone Support", "Email Assistance"]
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality or attention to detail.",
      features: ["Same-day Service", "Priority Queue", "Express Options"]
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Team Collaboration",
      description: "Seamless collaboration tools to keep your team connected and productive.",
      features: ["Real-time Sync", "Team Dashboard", "Project Management"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Exceptional service that exceeded our expectations. The team was professional and delivered outstanding results.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "Fast, reliable, and cost-effective. This service has become an essential part of our workflow.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      content: "The support team is incredibly helpful and responsive. Highly recommend their services.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      features: ["5 Projects", "10GB Storage", "Email Support", "Basic Analytics"],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      features: ["25 Projects", "100GB Storage", "Priority Support", "Advanced Analytics", "Team Collaboration"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      features: ["Unlimited Projects", "1TB Storage", "24/7 Phone Support", "Custom Analytics", "Advanced Security"],
      popular: false
    }
  ];

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8f9fa'}}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(to right, #2563eb, #7c3aed)',
        color: 'white',
        padding: '80px 0'
      }}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comprehensive solutions designed to help your business grow and succeed in today's competitive market
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container py-5">
        <h2 className="display-5 fw-bold text-center text-dark mb-5">What We Offer</h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    {service.icon}
                  </div>
                  <h3 className="card-title h5 fw-semibold">{service.title}</h3>
                  <p className="card-text text-muted">{service.description}</p>
                  <ul className="list-unstyled">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="d-flex align-items-center small text-muted mb-2">
                        <CheckCircle className="me-2 text-success" style={{width: '16px', height: '16px'}} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`rounded-lg p-6 ${plan.popular ? 'bg-blue-50 border-2 border-blue-500 relative' : 'bg-gray-50 border border-gray-200'}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers who trust our services</p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}