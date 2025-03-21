import { apple, ebay, nvidia, uber } from "../assets/index";

const Solutions = () => {
  const companies = [
    { name: "Uber", logo: uber },
    { name: "Nvidia", logo: nvidia },
    { name: "Ebay", logo: ebay },
    { name: "Apple", logo: apple },
  ];

  const services = [
    {
      title: "Application Development",
      description:
        "We design and build custom software applications tailored to your business needs. From mobile apps to desktop solutions, our team delivers scalable, user-friendly, and high-performance applications that streamline operations and enhance productivity.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
    },
    {
      title: "Cloud Computing",
      description:
        "We provide end-to-end cloud solutions, including migration, management, and optimization. Leveraging leading cloud platforms, we help businesses achieve scalability, cost-efficiency, and enhanced security for their data and applications.",
      image:
        "https://plus.unsplash.com/premium_photo-1688678097910-706dbce46fa4",
    },
    {
      title: "Web Development",
      description:
        "Transform your data into actionable insights with our advanced analytics solutions. We help you make data-driven decisions and identify growth opportunities through comprehensive data analysis and visualization.",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
    },
    {
      title: "IT Consulting",
      description:
        "Build a robust and scalable IT foundation with our infrastructure solutions. We design, implement, and maintain secure and efficient systems that support your business operations.",
      image: "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Tech Solutions Inc.",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      review:
        "The AI solutions provided by this team have transformed our business operations. Highly recommended for their expertise and professional service.",
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Digital Innovations",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      review:
        "Outstanding cloud computing solutions that helped us scale our operations efficiently. Their team's technical knowledge is impressive.",
    },
    {
      id: 3,
      name: "Emma Davis",
      company: "Global Systems",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      review:
        "Exceptional web development services. They delivered a modern, user-friendly platform that exceeded our expectations.",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Solutions</h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          We provide innovative solutions to help your business grow.
        </p>
      </div>

      <div className="bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {companies.map((company) => (
              <div key={company.name} className="flex justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-24 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Our Services
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="card bg-base-200 shadow-xl group"
            >
              <figure className="relative h-64">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-white transform group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title">{service.title}</h3>
                <p className="text-base-content/70">{service.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-12">
            Customer Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src={review.image} alt={review.name} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-base-content/70">
                        {review.company}
                      </p>
                    </div>
                  </div>
                  <div className="rating mb-4">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`rating-${review.id}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked={i < review.rating}
                        readOnly
                      />
                    ))}
                  </div>
                  <p className="text-base-content/80 italic">
                    "{review.review}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
