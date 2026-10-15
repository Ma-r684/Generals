import React from "react";

const Biography = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white text-gray-800">

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Generals Arena
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Raising a generation shaped by the{" "}
            <span className="text-indigo-600 font-semibold">
              transforming power of God’s Word
            </span>
          </p>
        </div>

        {/* Hero Image */}
        <div className="h-72 md:h-96 bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition">
          <span className="text-gray-500">Hero Image</span>
        </div>
      </div>

      {/* INTRODUCTION */}
      <div className="max-w-5xl mx-auto px-6 text-center py-12">
        <p className="text-lg leading-relaxed">
          In a time when society is searching for{" "}
          <span className="font-semibold">meaning</span>,{" "}
          <span className="font-semibold">direction</span>, and{" "}
          <span className="font-semibold">purpose</span>,{" "}
          <span className="text-indigo-600 font-bold">Generals Arena</span> stands
          as a growing spiritual movement committed to shaping lives through the
          transforming power of the Word of God.
        </p>
      </div>

      {/* FOUNDATION SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Foundation</h2>
          <p className="mb-6">
            Founded in <span className="font-semibold">2018</span>, Generals Arena
            has emerged as a center of spiritual growth and leadership.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="text-indigo-600 text-xl">1. </span>
              <span className="font-medium">Spiritual Awakening</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-indigo-600 text-xl">2. </span>
              <span className="font-medium">Intentional Discipleship</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-indigo-600 text-xl">3. </span>
              <span className="font-medium">Leadership Development</span>
            </li>
          </ul>

          <p className="mt-6 text-gray-600">
            We are anchored on the conviction that{" "}
            <span className="font-semibold text-gray-900">
              God’s Word produces men and women who positively influence the
              world.
            </span>
          </p>
        </div>

        {/* Foundation Image */}
        <div className="h-80 bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition">
          <span className="text-gray-500">Ministry Image</span>
        </div>
      </div>

      {/* FOUNDER SECTION */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          
          {/* Founder Image */}
          <div className="h-80 bg-gray-300 rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 transition">
            <span className="text-gray-600">Founder Image</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2">Our Founder</h2>
            <h3 className="text-xl text-indigo-600 font-semibold mb-6">
              Pastor Roy Obiero
            </h3>

            <p className="mb-4">
              Generals Arena was founded by{" "}
              <span className="font-semibold">Pastor Roy Obiero</span>, an IT
              expert at <span className="font-semibold">Rongo University </span>
              and a devoted man of God.
            </p>

            <p className="mb-4">
              His leadership reflects a powerful balance between{" "}
              <span className="font-semibold">intellectual excellence</span> and{" "}
              <span className="font-semibold">deep spiritual insight</span>.
            </p>

            <p className="text-gray-600">
              This balance makes the ministry relevant to both spiritual and
              professional spaces.
            </p>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">What Defines Us</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">
              Word-Centered
            </h4>
            <p>
              Everything we do is grounded in the truth and power of God’s Word.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">
              Life Transformation
            </h4>
            <p>
              We believe genuine encounters with God lead to visible change.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3 text-indigo-600">
              Leadership & Influence
            </h4>
            <p>
              We raise leaders who impact society with faith and integrity.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Join the Ministry</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Generals Arena is more than a ministry — it is a calling to become all
          that God has designed you to be.
        </p>
        <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>

    </section>
  );
};

export default Biography;
