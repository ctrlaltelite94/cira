import React from 'react';
import Hero from '../components/Home/Hero';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      <Hero />

      {/* Why CIRA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <img
            src="https://www.hrw.org/sites/default/files/styles/embed_xxl/public/media_2021/11/202111africa_southafrica_gbv.jpg?itok=iX_i2tfm"
            alt="Why CIRA"
            className="rounded-xl shadow-lg w-full object-cover h-[400px]"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">Why CIRA?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow">
                <p>
                  CIRA bridges the gap between medical services and law enforcement. It ensures swift, collaborative emergency responses — saving lives and improving outcomes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <p>
                  By uniting police and health services, CIRA promotes community safety and coordinated incident response.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Our Emergency Services</h2>
          <p className="text-gray-600 mb-12">
            We're here to support you during urgent moments with these trusted services.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Ambulance */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4 text-blue-600">🚑</div>
              <h3 className="text-xl font-semibold mb-2">Ambulance Services</h3>
              <p>Rapid ambulance dispatch for immediate medical assistance.</p>
            </div>

            {/* Urgent Response */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4 text-red-600">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Urgent Response</h3>
              <p>Quick on-the-scene help to ensure timely action and safety.</p>
            </div>

            {/* SAPS Support */}
            <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4 text-green-600">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">SAPS Support</h3>
              <p>Direct coordination with SAPS for public security and law enforcement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="bi" className="py-20 bg-gray-100 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">View Real-Time Insights</h2>
          <a
            href="https://app.powerbi.com/links/-4ENGhCBel?ctid=a3f14f21-237f-4028-b978-425eb768a716&pbi_source=linkShare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            View Dashboard
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
