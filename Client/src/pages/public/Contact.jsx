const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6">

      <h1 className="text-4xl font-bold mb-6">
        Contact Us
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        We'd love to hear from you.
      </p>

      <form className="space-y-6">

        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          rows="6"
          placeholder="Message"
          className="w-full border rounded-lg p-3"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>

      </form>

    </div>
  );
};

export default Contact;