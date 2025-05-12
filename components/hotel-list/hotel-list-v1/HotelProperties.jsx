'use client'

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";

const HotelProperties = () => {
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelsWithDetails = async () => {
      try {
        const res = await fetch("https://dev.kacc.mn/api/properties/approved");
        if (!res.ok) throw new Error("Failed to fetch hotels");

        const properties = await res.json();
        const sliced = properties.slice(0, 7);

        const detailedData = await Promise.all(
          sliced.map(async (prop) => {
            try {
              const detailRes = await fetch(
                `https://dev.kacc.mn/api/property-details/?property=${prop.pk}`
              );
              if (!detailRes.ok) throw new Error("Failed to fetch details");

              const detailJson = await detailRes.json();
              const detail = detailJson[0];

              return { ...prop, photos: detail?.property_photos || [] };
            } catch {
              return { ...prop, photos: [] };
            }
          })
        );

        setHotelsData(detailedData);
      } catch (error) {
        console.error("Error loading hotel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsWithDetails();
  }, []);

  if (loading) return <div className="text-center">Loading hotels...</div>;

  return (
    <>
      {hotelsData.map((item) => (
        <div className="col-12" key={item.pk}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4 custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{ clickable: true }}
                        navigation
                      >
                        {item.photos.length > 0 ? (
                          item.photos.map((photo, i) => (
                            <SwiperSlide key={i}>
                              <Image
                                width={250}
                                height={250}
                                className="rounded-4 col-12"
                                src={photo.image}
                                alt={photo.description || "Hotel Image"}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          <SwiperSlide>
                            <div className="text-center py-5 text-sm text-gray-500">
                              No images
                            </div>
                          </SwiperSlide>
                        )}
                      </Swiper>
                    </div>
                  </div>
                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500">
                  {item.PropertyName}
                  <br className="lg:d-none" /> {item.location}
                  <div className="d-inline-block ml-10">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="icon-star text-10 text-yellow-2"></i>
                    ))}
                  </div>
                </h3>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-14">{item.location}</p>
                  </div>
                  <div className="col-auto">
                    <button className="d-block text-14 text-blue-1 underline">
                      Show on map
                    </button>
                  </div>
                </div>

                <div className="text-14 text-green-2 lh-15 mt-10">
                  <div className="fw-500">Free cancellation</div>
                  <div>You can cancel later, so lock in this great price today.</div>
                </div>

                <div className="row x-gap-10 y-gap-10 pt-20">
                  <div className="col-auto">
                    <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                      Breakfast
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                      WiFi
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">Exceptional</div>
                    <div className="text-14 lh-14 text-light-1">Reviews</div>
                  </div>
                  <div className="col-auto">
                    <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                      {item.ratings || "N/A"}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-14 text-light-1 mt-50 md:mt-20">
                    8 nights, 2 adults
                  </div>
                  <div className="text-22 lh-12 fw-600 mt-5">
                    US${item.price || "TBD"}
                  </div>
                  <Link
                    href={`/hotel-single-v1/${item.pk}`}
                    className="button -md -dark-1 bg-blue-1 text-white mt-24"
                  >
                    See Availability <div className="icon-arrow-top-right ml-15"></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelProperties;
