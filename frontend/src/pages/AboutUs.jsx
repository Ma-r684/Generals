import React from "react";

const AboutUs = () => {
  return (
    <div className="pt-10 pb-16 px-4 md:px-20 bg-gray-50 min-h-screen">

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Learn more about Generals’ Arena and our divine mandate
        </p>
      </div>

      {/* About Section */}
      <div className="bg-white shadow-sm border rounded-xl p-6 md:p-10 mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who We Are</h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Generals’ Arena is a dynamic, life transforming, and generational 
          impacting ministry with a vision to transform nations and the entire 
          world by the Word of God. It is a weekly platform where people come 
          to experience the Word, Love, true intimacy with the Holy Spirit and 
          help believers grow to represent Him here on earth.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          We are raising a generation that are solutions in themselves at their 
          workplaces, in their homes, on the streets, and everywhere else — 
          people who walk in power, love, and character.
        </p>

        <p className="text-gray-700 leading-relaxed">
          We believe in the inherent integrity of the Word to work in the lives 
          of men, the immutability of the Counsels of God who wills and purposes 
          in us, and in the manifestation of the divine life of God in and through men.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white shadow-sm border rounded-xl p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>

        <ul className="space-y-4 text-gray-700 leading-relaxed">
          <li className="flex gap-3">
            <span className="text-blue-600 text-xl">•</span>
            Seeking and saving the lost (massive salvation of souls)
          </li>

          <li className="flex gap-3">
            <span className="text-blue-600 text-xl">•</span>
            Equipping and perfecting the saints by the Word of God and the 
            ministry of the Holy Spirit
          </li>

          <li className="flex gap-3">
            <span className="text-blue-600 text-xl">•</span>
            Demonstrating the presence and power of the Holy Spirit in 
            miracles, signs, and wonders to prove that Jesus is Lord 
            and He is alive
          </li>

          <li className="flex gap-3">
            <span className="text-blue-600 text-xl">•</span>
            Revealing the wealth of the Kingdom and being Kingdom financiers — 
            standing in partnership with other ministries to finance God’s 
            end-time agenda
          </li>
        </ul>
      </div>

    </div>
  );
};

export default AboutUs;
