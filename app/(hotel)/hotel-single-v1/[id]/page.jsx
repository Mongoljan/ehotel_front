'use client';

import dynamic from "next/dynamic";
import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import Header11 from "@/components/header/header-11";
import TopBreadCrumb from "@/components/hotel-single/TopBreadCrumb";
import StickyHeader from "@/components/hotel-single/StickyHeader";
import GalleryOne from "@/components/hotel-single/GalleryOne";
import PropertyHighlights from "@/components/hotel-single/PropertyHighlights";
import Overview from "@/components/hotel-single/Overview";
import PopularFacilities from "@/components/hotel-single/PopularFacilities";
import RatingTag from "@/components/hotel-single/RatingTag";
import SidebarRight from "@/components/hotel-single/SidebarRight";
import AvailableRooms from "@/components/hotel-single/AvailableRooms";
import ReviewProgress from "@/components/hotel-single/guest-reviews/ReviewProgress";
import DetailsReview from "@/components/hotel-single/guest-reviews/DetailsReview";
import ReplyFormReview from "@/components/hotel-single/ReplyFormReview";
import Facilities from "@/components/hotel-single/Facilities";
import Image from "next/image";
import Surroundings from "@/components/hotel-single/Surroundings";
import HelpfulFacts from "@/components/hotel-single/HelpfulFacts";
import Faq from "@/components/faq/Faq";
import Hotels2 from "@/components/hotels/Hotels2";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";

const HotelSingleV1Dynamic = ({ params }) => {
  const id = params.id;
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, combinedRes, roomMetaRes, detailRes] = await Promise.all([
          fetch(`https://dev.kacc.mn/api/roomsInHotels/?hotel=${id}`),
          fetch("https://dev.kacc.mn/api/combined-data/"),
          fetch("https://dev.kacc.mn/api/all-room-data/"),
          fetch(`https://dev.kacc.mn/api/property-details/?property=${id}`),
        ]);

        if (!roomRes.ok || !combinedRes.ok || !roomMetaRes.ok || !detailRes.ok)
          throw new Error("Fetch failed");

        const [roomData, combined, roomMeta, details] = await Promise.all([
          roomRes.json(),
          combinedRes.json(),
          roomMetaRes.json(),
          detailRes.json(),
        ]);

        const getNameById = (list, id, key = "name") => {
          const item = list?.find((el) => el.id === id);
          return item?.[key] || "Unknown";
        };

        const enrichedRooms = roomData.map((room) => ({
          ...room,
          room_type_name: getNameById(roomMeta.room_types, room.room_type),
          bed_type_name: getNameById(roomMeta.bed_types, room.bed_type),
          rate_name: getNameById(roomMeta.room_rates, room.room_category),
          facility_names: room.room_Facilities.map((fid) =>
            getNameById(combined.facilities || [], fid, "name_en")
          ),
        }));

        const matchedDetail = details.find(d => d.property === Number(id));
        if (!matchedDetail) throw new Error("No matching property detail found");

        const {
          propertyBasicInfo,
          confirmAddress,
          propertyPolicies,
          property_photos,
          google_map,
          parking_situation,
          general_facilities,
        } = matchedDetail;

        const [basicInfo, address, policies] = await Promise.all([
          fetch(`https://dev.kacc.mn/api/property-basic-info/${propertyBasicInfo}/`).then(res => res.json()),
          fetch(`https://dev.kacc.mn/api/confirm-address/${confirmAddress}/`).then(res => res.json()),
          fetch(`https://dev.kacc.mn/api/property-policies/${propertyPolicies}/`).then(res => res.json()),
        ]);

        const hotelData = {
          id,
          title: basicInfo.property_name_en,
          location: `${getNameById(combined.province, address.province_city)}, ${getNameById(combined.soum, address.soum)}`,
          price: 100, // Static placeholder price
          images: property_photos,
          star_rating: basicInfo.star_rating,
          basicInfo,
          address,
          policies,
          map: google_map,
          parking: parking_situation,
          facilities: general_facilities.map(f => getNameById(combined.facilities, f, "name_en")),
        };

        setRooms(enrichedRooms);
        setHotel(hotelData);
      } catch (error) {
        console.error("Hotel fetch error:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="header-margin" />
      <Header11 />
      <TopBreadCrumb />
      <StickyHeader hotel={hotel} />
      {hotel && <GalleryOne hotel={hotel} />}

      <section className="pt-30">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-8">
              <div className="row y-gap-40">
                <div className="col-12">
                  <h3 className="text-22 fw-500">Property highlights</h3>
                  <PropertyHighlights />
                </div>
                <div id="overview" className="col-12">
                  <Overview />
                </div>
                <div className="col-12">
                  <h3 className="text-22 fw-500 pt-40 border-top-light">Most Popular Facilities</h3>
                  <div className="row y-gap-10 pt-20">
                    <PopularFacilities />
                  </div>
                </div>
                <div className="col-12">
                  <RatingTag />
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <SidebarRight hotel={hotel} setRooms={setRooms} />
            </div>
          </div>
        </div>
      </section>

      <section id="rooms" className="pt-30">
        <div className="container">
          <div className="row pb-20">
            <div className="col-auto">
              <h3 className="text-22 fw-500">Available Rooms</h3>
            </div>
          </div>
          <AvailableRooms hotel={hotel} rooms={rooms} />
        </div>
      </section>

      <section className="pt-40" id="reviews">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-22 fw-500">Guest reviews</h3>
            </div>
          </div>
          <ReviewProgress />
          <div className="pt-40">
            <DetailsReview />
          </div>
          <div className="row pt-30">
            <div className="col-auto">
              <a href="#" className="button -md -outline-blue-1 text-blue-1">
                Show all 116 reviews
                <div className="icon-arrow-top-right ml-15"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-40">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-10">
              <div className="row">
                <div className="col-auto">
                  <h3 className="text-22 fw-500">Leave a Reply</h3>
                  <p className="text-15 text-dark-1 mt-5">Your email address will not be published.</p>
                </div>
              </div>
              <ReplyFormReview />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-40" id="facilities">
        <div className="container">
          <div className="row x-gap-40 y-gap-40">
            <div className="col-12">
              <h3 className="text-22 fw-500">Facilities of this Hotel</h3>
              <div className="row x-gap-40 y-gap-40 pt-20">
                <Facilities />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-40">
        <div className="container">
          <div className="px-24 py-20 rounded-4 bg-light-2">
            <div className="row x-gap-20 y-gap-20 items-center">
              <div className="col-auto">
                <div className="flex-center size-60 rounded-full bg-white">
                  <Image width={30} height={30} src="/img/icons/health.svg" alt="icon" />
                </div>
              </div>
              <div className="col-auto">
                <h4 className="text-18 lh-15 fw-500">Extra health &amp; safety measures</h4>
                <div className="text-15 lh-15">
                  This property has taken extra health and hygiene measures to ensure that your safety is their
                  priority
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="text-22 fw-500">Hotel surroundings</h3>
            </div>
          </div>
          <div className="row x-gap-50 y-gap-30 pt-20">
            <Surroundings />
          </div>
        </div>
      </section>

      <section className="pt-40">
        <div className="container">
          <div className="pt-40 border-top-light">
            <div className="row">
              <div className="col-12">
                <h3 className="text-22 fw-500">Some helpful facts</h3>
              </div>
            </div>
            <div className="row x-gap-50 y-gap-30 pt-20">
              <HelpfulFacts />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="pt-40 layout-pb-md">
        <div className="container">
          <div className="pt-40 border-top-light">
            <div className="row y-gap-20">
              <div className="col-lg-4">
                <h2 className="text-22 fw-500">
                  FAQs about
                  <br /> The Crown Hotel
                </h2>
              </div>
              <div className="col-lg-8">
                <div className="accordion -simple row y-gap-20 js-accordion">
                  <Faq />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">Popular properties similar to The Crown Hotel</h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  Interdum et malesuada fames ac ante ipsum
                </p>
              </div>
            </div>
          </div>
          <div className="pt-40 sm:pt-20 item_gap-x30">
            <Hotels2 />
          </div>
        </div>
      </section>

      <CallToActions />
      <DefaultFooter />
    </>
  );
};

export default dynamic(() => Promise.resolve(HotelSingleV1Dynamic), {
  ssr: false,
});
