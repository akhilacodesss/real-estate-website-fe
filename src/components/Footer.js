function Footer() {
    return (
        <footer className="bg-white border-t border-[#e5ddd5] mt-16">

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* BRAND */}
                <div>
                    <h2 className="text-3xl font-bold text-[#3b2a1f]">
                        Brickly
                    </h2>

                    <p className="text-sm text-[#806248] mt-4 leading-relaxed">
                        Find your perfect property with ease.
                        Explore verified listings, connect with agents,
                        and discover your dream home.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="text-lg font-semibold text-[#3b2a1f] mb-4">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3 text-sm text-[#806248]">
                        <a href="/">Home</a>
                        <a href="/property">Properties</a>
                        <a href="/wishlist">Wishlist</a>
                        <a href="/messages">Messages</a>
                    </div>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="text-lg font-semibold text-[#3b2a1f] mb-4">
                        Contact
                    </h3>

                    <div className="space-y-3 text-sm text-[#806248]">
                        <p>
                            <i className="fa-solid fa-location-dot mr-2"></i>
                            Hyderabad, India
                        </p>

                        <p>
                            <i className="fa-solid fa-envelope mr-2"></i>
                            support@brickly.com
                        </p>

                        <p>
                            <i className="fa-solid fa-phone mr-2"></i>
                            +91 98765 43210
                        </p>
                    </div>
                </div>

                {/* SOCIALS */}
                <div>
                    <h3 className="text-lg font-semibold text-[#3b2a1f] mb-4">
                        Follow Us
                    </h3>

                    <div className="flex gap-4 text-xl text-[#806248]">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#3b2a1f] transition"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </a>

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#3b2a1f] transition"
                        >
                            <i className="fa-brands fa-facebook"></i>
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-[#3b2a1f] transition"
                        >
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                </div>

            </div>

            {/* BOTTOM */}
            <div className="border-t border-[#e5ddd5] py-5 px-6 text-center text-sm text-[#806248]">
                © 2026 Brickly. All rights reserved.
            </div>

        </footer>
    );
}

export default Footer;
