import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Our Company</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Empowering businesses with cutting-edge IT solutions tailored to
            drive innovation and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/data-network-businessman_24908-57816.jpg?ga=GA1.1.280721821.1739720411&semt=ais_keywords_boost"
              alt="About Us"
              className="rounded-2xl shadow-lg w-full max-w-md"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We are a team of passionate developers, designers, and strategists
              dedicated to delivering top-notch IT solutions. Our services range
              from software development, cloud solutions, to digital
              transformation strategies. We believe in creating lasting
              partnerships and providing unmatched support to help businesses
              thrive in the digital era.
            </p>
            <div className="flex gap-4">
              <a href="#services" className="btn btn-primary">
                Learn More
              </a>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
