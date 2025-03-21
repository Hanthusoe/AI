import { Brain, Target, Lightbulb, Users } from "lucide-react";

const Mission = () => {
  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Shaping the Future with AI
          </h1>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Pioneering innovative AI solutions that transform industries and
            enhance human potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                alt="AI Mission"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Our Mission</h2>
              <p className="text-lg">
                At AI Solution, our mission is to empower businesses and
                individuals through innovative software solutions and
                exceptional services. We are committed to delivering
                cutting-edge technology that drives efficiency, fosters growth,
                and solves real-world challenges. By prioritizing customer
                success, collaboration, and continuous improvement, we strive to
                be a trusted partner in transforming ideas into impactful
                digital experiences.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://plus.unsplash.com/premium_photo-1682689793030-5e9770b75088?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="AI Vision"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Our Vision</h2>
              <p className="text-lg">
                To be a global leader in software innovation and service
                excellence, shaping the future of technology by creating
                solutions that inspire progress, connect communities, and
                redefine possibilities.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body items-center text-center">
                <Brain className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Innovation</h3>
                <p>
                  Pushing boundaries and exploring new possibilities in AI
                  technology
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body items-center text-center">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Excellence</h3>
                <p>
                  Delivering exceptional solutions with precision and quality
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body items-center text-center">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Collaboration</h3>
                <p>Working together to create meaningful impact</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body items-center text-center">
                <Lightbulb className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title">Ethics</h3>
                <p>Developing responsible AI with integrity and transparency</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="badge badge-primary badge-lg">500+</div>
                    <p>Successful AI implementations</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="badge badge-primary badge-lg">50+</div>
                    <p>Countries reached</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="badge badge-primary badge-lg">1M+</div>
                    <p>Users benefiting from our AI solutions</p>
                  </div>
                </div>
              </div>
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                  alt="AI Impact"
                  className="rounded-lg shadow-lg"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
