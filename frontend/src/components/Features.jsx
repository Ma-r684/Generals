import React from 'react';
import Card1 from '../assets/Card4.jpg'
import Card2 from '../assets/Card1.jpg'
import Card3 from '../assets/Card3.jpg'

const Features = () => {
  const features = [
    {
      title: "The Transforming World by the Word of God",
      description: "The Word of God carries the power to renew minds, heal hearts and transform lives. It is living and active, shaping us into the likeness of Christ and guiding us toward eternal glory.",
      imgAlt: "Word of God",
      imgSrc: Card1, 
    },
    {
      title: "The Ministry Of the Holy Spirit",
      description: "The Holy Spirit is our divine helper, teacher, and comforter. He empowers us to walk in truth, gives clarity in times of confusion, and strengthens us to live victoriously in Christ.",
      imgAlt: "Holy Spirit",
      imgSrc: Card2,
    },
    {
      title: "The Life of a New Believer",
      description: "A new believer experiences the joy of salvation and the victory of faith. Through Christ, we are made new, walking in freedom and overcoming the world by the power of His Spirit.",
      imgAlt: "New Believer",
      imgSrc: Card3,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 px-6 py-12 bg-gray-50">
      {features.map((feature, index) => (
        <div key={index} className="bg-white shadow-lg border border-gray-200">
          {/* Image */}
          <img 
            src={feature.imgSrc} 
            alt={feature.imgAlt} 
            className="w-full h-75 object-cover"
          />

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#000080] mb-4">{feature.title}</h3>
            <p className="text-gray-700 mb-6 font-roboto">{feature.description}</p>

            {/* Learn More Button */}
            <button className="bg-[#FFD700] text-black px-6 py-2 font-semibold border-none hover:bg-yellow-500 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
