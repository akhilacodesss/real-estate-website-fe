import aboutImg from "../assets/about.png";

function AboutSection() {

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={aboutImg}
          alt="about"
          className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* CONTENT */}
      <div>

        <span className="text-sm text-[#c27b57] font-semibold uppercase">
          About Us
        </span>

        <h2 className="text-4xl font-bold text-[#2f2219] mt-2">
          Find Your Perfect Home with Ease
        </h2>

        <p className="text-[#6b5c4f] mt-4">
          Brickly helps you discover, explore, and connect with properties effortlessly.
          We keep everything simple so you can focus on finding the right home.
        </p>

        {/* FEATURES */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-house text-[#c27b57]"></i>
            Smart Search
          </div>

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-[#c27b57]"></i>
            Verified Listings
          </div>

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-user text-[#c27b57]"></i>
            Direct Contact
          </div>

          <div className="flex items-center gap-2">
            <i className="fa-solid fa-shield text-[#c27b57]"></i>
            Secure Platform
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;