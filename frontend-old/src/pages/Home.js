import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/Home.css";

const Home = () => {
  const carouselImages = ["/assets/homeslide1.jfif", "/assets/homeslide2.jpg", "/assets/homeslide3.jpg"];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Data for Our Services Section
  const servicesData = [
    {
      id: 1,
      img: "application.jpg",
      name: "Application Development",
      description: "We build custom applications tailored to your business needs.",
      link: "/solution-detail/1",
    },
    {
      id: 2,
      img: "cloudcomputing.png",
      name: "Cloud Computing",
      description: "Scalable cloud solutions for your business.",
      link: "/solution-detail/2",
    },
    {
      id: 3,
      img: "webdevelopment.jpg",
      name: "Web Development",
      description: "Modern and responsive websites for your business.",
      link: "/solution-detail/3",
    },
    {
      id: 4,
      img: "consulting.jpg",
      name: "IT Consulting",
      description: "Expert IT consulting to optimize your business processes.",
      link: "/solution-detail/4",
    },
  ];

  // Data for Content Section
  const contentData = [
    {
      id: 1,
      img: "/assets/blog1.jpg",
      title: "Blog 1",
      description: "This is the description for Blog 1.",
      link: "/blog-detail/1",
    },
    {
      id: 2,
      img: "/assets/blog2.jpg",
      title: "Blog 2",
      description: "This is the description for Blog 2.",
      link: "/blog-detail/2",
    },
  ];

  return (
    <div className="home-container">
      <header className="hero">
        <Slider {...settings}>
          {carouselImages.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="carousel-img" />
            </div>
          ))}
        </Slider>
      </header>

      <section className="company-info">
        <h2>Brief About Company</h2>
      </section>

      {/* Our Services Section */}
      <section className="services">
        <h1>Our Services</h1>
        <div className="service-cards">
          {servicesData.map((service) => (
            <div className="service-card" key={service.id}>
              <img src={`/assets/${service.img}`} alt={service.name} className="service-img" />
              <div className="service-content">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <a href={service.link} className="explore-btn">
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="mission-vision">
        <div className="mission">
          <div className="text">
            <h4>Our Mission</h4>
            <p>
              "At AI Solution, our mission is to empower businesses and individuals through innovative software solutions and exceptional services. We are committed to delivering cutting-edge technology that drives efficiency, fosters growth, and solves real-world challenges. By prioritizing customer success, collaboration, and continuous improvement, we strive to be a trusted partner in transforming ideas into impactful digital experiences."
            </p>
          </div>
          <img src="/assets/tech1.jpg" alt="Mission" className="mv-img" />
        </div>

        <div className="vision">
          <img src="/assets/vision.jpg" alt="Vision" className="mv-img" />
          <div className="text">
            <h4>Our Vision</h4>
            <p>
              "To be a global leader in software innovation and service excellence, shaping the future of technology by creating solutions that inspire progress, connect communities, and redefine possibilities."
            </p>
          </div>
        </div>

        <div className="values">
          <div className="text">
            <h4>Our Statement</h4>
            <p>
              "At our company, we believe in the power of technology to transform lives and businesses. Our vision is to lead the way in delivering innovative software solutions and unparalleled services that address the evolving needs of our clients. By combining technical expertise with a customer-centric approach, we aim to drive meaningful change, foster collaboration, and build a future where technology empowers everyone to achieve their full potential. Together, we are committed to creating a world where innovation knows no bounds."
            </p>
          </div>
          <img src="/assets/statement.jpg" alt="Values" className="mv-img" />
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        {contentData.map((content) => (
          <div className="content-box" key={content.id}>
            <img src={content.img} alt={content.title} className="content-img" />
            <div className="content-text">
              <h3>{content.title}</h3>
              <p>{content.description}</p>
              <a href={content.link} className="read-more">
                Read More
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;