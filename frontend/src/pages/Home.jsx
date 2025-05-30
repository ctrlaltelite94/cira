import React from 'react';
import Hero from '../components/Home/Hero';

const Home = () => {
  return (
    <div>
      <Hero />

      {/* Why CIRA Section */}
      <section className='py-5 bg-light'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6 mb-4 mb-lg-0'>
              <img
                src='https://www.hrw.org/sites/default/files/styles/embed_xxl/public/media_2021/11/202111africa_southafrica_gbv.jpg?itok=iX_i2tfm'
                className='img-fluid rounded shadow-sm'
                alt='Why CIRA'
              />
            </div>
            <div className='col-lg-6'>
              <h2 className='fw-bold mb-4'>Why CIRA?</h2>
              <div className='row g-4'>
                <div className='col-md-6'>
                  <div className='bg-white p-4 shadow-sm rounded h-100'>
                    <p className='mb-0'>
                      CIRA bridges the gap between medical services and law
                      enforcement. It ensures swift, collaborative emergency
                      responses — saving lives and improving outcomes.
                    </p>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='bg-white p-4 shadow-sm rounded h-100'>
                    <p className='mb-0'>
                      By uniting police and health services, CIRA promotes
                      community safety and coordinated incident response.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services Section */}
      <section className='py-5'>
        <div className='container'>
          <div className='text-center mb-5'>
            <h2 className='fw-bold'>Our Emergency Services</h2>
            <p className='text-muted'>
              We're here to support you during urgent moments with these trusted services.
            </p>
          </div>

          <div className='row g-4'>
            <div className='col-md-4'>
              <div className='card border-0 shadow-sm text-center h-100'>
                <div className='card-body'>
                  <i className='fas fa-ambulance fa-3x text-primary mb-3'></i>
                  <h5 className='card-title fw-bold'>Ambulance Services</h5>
                  <p className='card-text'>
                    Rapid ambulance dispatch for immediate medical assistance.
                  </p>
                </div>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='card border-0 shadow-sm text-center h-100'>
                <div className='card-body'>
                  <i className='fas fa-clock fa-3x text-danger mb-3'></i>
                  <h5 className='card-title fw-bold'>Urgent Response</h5>
                  <p className='card-text'>
                    Quick on-the-scene help to ensure timely action and safety.
                  </p>
                </div>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='card border-0 shadow-sm text-center h-100'>
                <div className='card-body'>
                  <i className='fas fa-shield-alt fa-3x text-success mb-3'></i>
                  <h5 className='card-title fw-bold'>SAPS Support</h5>
                  <p className='card-text'>
                    Direct coordination with SAPS for public security and law enforcement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h2 className="fw-bold mb-3">View Real-Time Insights</h2>
          <a
            href="https://app.powerbi.com/links/-4ENGhCBel?ctid=a3f14f21-237f-4028-b978-425eb768a716&pbi_source=linkShare"
            className="btn btn-outline-primary btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
          >
            View Dashboard
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
