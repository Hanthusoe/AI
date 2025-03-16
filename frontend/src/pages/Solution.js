import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { Star } from "lucide-react";
import "./style/Solution.css";

// Service Data (Editable)
const servicesData = [
  {
    id: 1,
    image: "/assets/application.jpg", // Replace with your image path
    title: "Application Development",
    description: "We design and build custom software applications tailored to your business needs. From mobile apps to desktop solutions, our team delivers scalable, user-friendly, and high-performance applications that streamline operations and enhance productivity..",
  },
  {
    id: 2,
    image: "/assets/cloudcomputing.png", // Replace with your image path
    title: "Cloud Computing",
    description: "We provide end-to-end cloud solutions, including migration, management, and optimization. Leveraging leading cloud platforms, we help businesses achieve scalability, cost-efficiency, and enhanced security for their data and applications.",
  },
  {
    id: 3,
    image: "/assets/webdevelopment.jpg", // Replace with your image path
    title: "Web Development",
    description: "Our web development services focus on creating responsive, visually appealing, and functional websites. Whether you need a simple landing page or a complex e-commerce platform, we ensure seamless user experiences and robust backend systems to support your online presence.",
  },
  {
    id: 4,
    image: "/assets/consulting.jpg", // Replace with your image path
    title: "IT Consulting",
    description: "Our IT consulting services offer strategic guidance to align technology with your business goals. From infrastructure planning to digital transformation, we provide expert advice and solutions to optimize your IT environment and drive innovation.",
  },
];

const SolutionPage = () => {
  return (
    <div className="container">
      {/* Centered Text Section */}
      <section className="centered-text-section">
        <h2>Welcome to Our Solutions</h2>
        <p>We provide innovative solutions to help your business grow.</p>
      </section>

      {/* Customer Company Section */}
      <section className="section">
        <h2 className="section-title">Customer Company</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {["/assets/apple.png", "/assets/huawei.png", "/assets/uber.png", "/assets/nvidia.png", "/assets/ebay.png"].map((logo, index) => (
            <SwiperSlide key={index}>
              <img src={logo} alt="Company Logo" className="company-logo" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Our Services Section */}
      <section className="section">
  <h2 className="section-title">Our Services</h2>
  <div className="service-grid">
    {servicesData.map((service) => (
      <div
        key={service.id}
        className="service-card"
        style={{ backgroundImage: `url(${service.image})` }} // Set background image dynamically
      >
        <img src={service.image} alt={service.title} className="service-image" />
        <div className="service-content">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <button
            className="explore-btn"
            onClick={() => (window.location.href = `/solution-detail/${service.id}`)}
          >
            Explore
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Customer Review Section */}
      <section className="section">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="review-container">
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[1, 2, 3, 4, 5].map((review) => (
              <SwiperSlide key={review}>
                <div className="review-card">
                  <div className="review-header">
                    <img src="profile.png" alt="Customer" className="customer-img" />
                    <p className="customer-name">Customer {review}</p>
                  </div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="star-icon" />
                    ))}
                  </div>
                  <p className="review-text">"This is an amazing service! Highly recommended."</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default SolutionPage;