import React from 'react'

const Home = () => {
  return (
    <div>
      <div className='container my-5'>
        <div className='row text-center flex-column-reverse flex-sm-row'>
          <div className='col-12 col-sm-4 order-sm-1'>
            <img
              src='https://www.hrw.org/sites/default/files/styles/embed_xxl/public/media_2021/11/202111africa_southafrica_gbv.jpg?itok=iX_i2tfm'
              className='img-fluid'
              alt='Image'
            />
          </div>

          <div className='col-12 col-sm-8 order-sm-2'>
            <h1 className='display-1'>Why Cira? </h1>
            <div className='row text-center'>
              <div class='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <p className='card-text'>
                      CIRA, or the Citizen Incident Response Agent, plays a
                      crucial role in bridging the gap between medical services
                      and law enforcement. By fostering collaboration, CIRA
                      ensures that both sectors can respond swiftly and
                      effectively to emergencies, ultimately saving lives and
                      improving outcomes.
                    </p>
                  </div>
                </div>
              </div>
              <div class='col-sm-6'>
                <div className='card'>
                  <div className='card-body'>
                    <p className='card-text'>
                      Moreover, CIRA enhances community safety by promoting a
                      unified approach to incident management. When medical
                      services and police work together, they can address not
                      only the immediate health needs of individuals but also
                      the broader implications of incidents, such as public
                      safety concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container my-5'>
        <div className='text-center mb-4'>
          <h2 className='fw-bold'>Our Emergency Services</h2>
          <p className='text-muted'>
            We are here to assist you during emergencies with these reliable
            services.
          </p>
        </div>
        <div className='row justify-content-center'>
          {/* Card 1 */}
          <div className='col-md-4 mb-4'>
            <div className='card text-center h-100'>
              <div className='card-body'>
                <div className='mb-4'>
                  <i className='fas fa-ambulance fa-3x text-primary'></i>
                </div>
                <h5 className='card-title fw-bold'>Ambulance Services</h5>
                <p className='card-text'>
                  Quick and efficient ambulance services to get you the help you
                  need immediately.
                </p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className='col-md-4 mb-4'>
            <div className='card text-center h-100'>
              <div className='card-body'>
                <div className='mb-4'>
                  <i className='fas fa-clock fa-3x text-danger'></i>
                </div>
                <h5 className='card-title fw-bold'>Urgent Response</h5>
                <p className='card-text'>
                  Fast and timely response to Emergency to minimize damage and
                  ensure safety.
                </p>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className='col-md-4 mb-4'>
            <div className='card text-center h-100'>
              <div className='card-body'>
                <div className='mb-4'>
                  <i className='fas fa-shield-alt fa-3x text-success'></i>
                </div>
                <h5 className='card-title fw-bold'>SAPS Support</h5>
                <p className='card-text'>
                  Direct connection to the South African Police Service (SAPS)
                  for security and safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
