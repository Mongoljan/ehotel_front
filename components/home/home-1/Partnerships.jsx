"use client";

import Slider from "react-slick";

const partners = [
  { name: "Microsoft", logo: "/img/partners/microsoft.svg" },
  { name: "Google", logo: "/img/partners/google.svg" },
  { name: "Amazon", logo: "/img/partners/amazon.svg" },
  { name: "Booking.com", logo: "/img/partners/booking.svg" },
  { name: "Expedia", logo: "/img/partners/expedia.svg" },
  { name: "Airbnb", logo: "/img/partners/airbnb.svg" },
  { name: "TripAdvisor", logo: "/img/partners/tripadvisor.svg" },
  { name: "Agoda", logo: "/img/partners/agoda.svg" },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 900, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } },
  ],
};

export default function Partnerships() {
  return (
    <section className="layout-pt-md layout-pb-md bg-light-2">
      <div className="container">
        <div className="row justify-center text-center mb-30">
          <div className="col-auto">
            <h2 className="sectionTitle__title mb-10">Our Partnerships</h2>
            <p className="sectionTitle__text">Trusted by leading companies worldwide</p>
          </div>
        </div>
        <Slider {...settings} className="partnerships-slider">
          {partners.map((partner, idx) => (
            <div key={idx} className="d-flex align-items-center justify-center px-20">
              <img
                src={partner.logo}
                alt={partner.name}
                style={{ maxHeight: 60, maxWidth: 140, filter: "grayscale(1)", opacity: 0.7 }}
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
