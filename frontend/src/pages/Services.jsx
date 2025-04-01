const Services = () => {
  return (
    <section className="py-16 bg-base-200" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://img.freepik.com/free-vector/web-development-composition_1284-4532.jpg?t=st=1742537013~exp=1742540613~hmac=4125da7d30524e44300b2a315abff6dede31269611941a5e474a1275827d5c88&w=1380"
                alt="Web Development"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl justify-center">
                Web Development
              </h3>
              <p className="text-center">
                Modern and responsive websites for your business.
              </p>
              <button className="btn btn-primary">Explore More</button>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169863.jpg?t=st=1742537049~exp=1742540649~hmac=2ed0a6fb6c7593a35788ba85953f0f8b064e8e298e5739b46dd5d0d532193311&w=1380"
                alt="App Development"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl justify-center">
                Application Development
              </h3>
              <p className="text-center">
                We build custom applications tailored to your business needs.
              </p>
              <button className="btn btn-primary">Explore More</button>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://img.freepik.com/free-vector/cloud-office-isometric-flowchart_1284-22861.jpg?t=st=1742537079~exp=1742540679~hmac=5924aaeed29e3dbb0d8469bcd1c2dfe21c397f3b7addaa076aaa75474b2bd2d6&w=1380"
                alt="Cloud Computing"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl justify-center">
                Cloud Computing
              </h3>
              <p className="text-center">
                Scalable cloud solutions for your business.
              </p>
              <button className="btn btn-primary">Explore More</button>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://img.freepik.com/free-vector/isometric-business-infographic_52683-772.jpg?t=st=1742538066~exp=1742541666~hmac=1c8cc7e1c2cc65e7845193cc1bc780af637629184bf4597bb819848bb5905dcb&w=1380"
                alt="IT Consulting"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-xl justify-center">
                IT Consulting
              </h3>
              <p className="text-center">
                Expert IT consulting to optimize your business processes.
              </p>
              <button className="btn btn-primary">Explore More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
