const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold">
              Community Newsletter
            </h2>

            <p className="mt-4 text-gray-400">
              Bringing the latest news,
              announcements and community stories
              together in one place.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">

              <li>Home</li>

              <li>About</li>

              <li>Contact</li>

            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">
              Contact
            </h3>

            <p className="text-gray-400">
              info@communitynewsletter.com
            </p>

            <p className="text-gray-400 mt-2">
              Lagos, Nigeria
            </p>
          </div>

        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} Community Newsletter CMS.
          All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;