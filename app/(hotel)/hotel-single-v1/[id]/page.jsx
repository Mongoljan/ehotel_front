'use client';
import dynamic from 'next/dynamic';
import 'photoswipe/dist/photoswipe.css';
import { useEffect, useState } from 'react';
import Header11 from '@/components/header/header-11';
import TopBreadCrumb from '@/components/hotel-single/TopBreadCrumb';
import StickyHeader from '@/components/hotel-single/StickyHeader';
import GalleryOne from '@/components/hotel-single/GalleryOne';
import PropertyHighlights from '@/components/hotel-single/PropertyHighlights';
import Overview from '@/components/hotel-single/Overview';
import PopularFacilities from '@/components/hotel-single/PopularFacilities';
import RatingTag from '@/components/hotel-single/RatingTag';
import SidebarRight from '@/components/hotel-single/SidebarRight';
import AvailableRooms from '@/components/hotel-single/AvailableRooms';
import ReviewProgress from '@/components/hotel-single/guest-reviews/ReviewProgress';
import DetailsReview from '@/components/hotel-single/guest-reviews/DetailsReview';
import ReplyFormReview from '@/components/hotel-single/ReplyFormReview';
import Facilities from '@/components/hotel-single/Facilities';
import Image from 'next/image';
import Surroundings from '@/components/hotel-single/Surroundings';
import HelpfulFacts from '@/components/hotel-single/HelpfulFacts';
import Faq from '@/components/faq/Faq';
import Hotels2 from '@/components/hotels/Hotels2';
import CallToActions from '@/components/common/CallToActions';
import DefaultFooter from '@/components/footer/default';

const HotelSingleV1Dynamic = ({ params }) => {
  const id = params.id;
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [dates, setDates] = useState([]);

  const checkIn = dates[0]?.format('YYYY-MM-DD') || '';
  const checkOut = dates[1]?.format('YYYY-MM-DD') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, combinedRes, roomMetaRes, detailRes, priceRes] = await Promise.all([
          fetch(`https://dev.kacc.mn/api/roomsInHotels/?hotel=${id}`),
          fetch('https://dev.kacc.mn/api/combined-data/'),
          fetch('https://dev.kacc.mn/api/all-room-data/'),
          fetch(`https://dev.kacc.mn/api/property-details/?property=${id}`),
          fetch(`https://dev.kacc.mn/api/room-prices/?hotel=${id}`),
        ]);

        if (!roomRes.ok || !combinedRes.ok || !roomMetaRes.ok || !detailRes.ok || !priceRes.ok) {
          throw new Error('Fetch failed');
        }

        const [roomData, combined, roomMeta, detailList, roomPrices] = await Promise.all([
          roomRes.json(),
          combinedRes.json(),
          roomMetaRes.json(),
          detailRes.json(),
          priceRes.json(),
        ]);

        const getNameById = (list, id, key = 'name') => {
          const item = list?.find((el) => el.id === id);
          return item?.[key] || 'Unknown';
        };

        // Build valid room key pairs and price map
        const priceMap = {};
        roomPrices.forEach((p) => {
          const key = `${p.room_type}-${p.room_category}`;
          priceMap[key] = p;
        });

        const enrichedRoomPromises = roomData
          .filter((room) => {
            const key = `${room.room_type}-${room.room_category}`;
            return priceMap[key];
          })
          .map(async (room) => {
            const key = `${room.room_type}-${room.room_category}`;
            const priceInfo = priceMap[key];

            // Fetch final price
            const finalPriceRes = await fetch(`https://dev.kacc.mn/api/final-price/${priceInfo.id}/`);
            const finalPriceData = finalPriceRes.ok ? await finalPriceRes.json() : null;

            return {
              ...room,
              room_type_name: getNameById(roomMeta.room_types, room.room_type),
              bed_type_name: getNameById(roomMeta.bed_types, room.bed_type),
              rate_name: getNameById(roomMeta.room_rates, room.room_category),
              facility_names: room.room_Facilities.map((fid) =>
                getNameById(combined.facilities || [], fid, 'name_en')
              ),
              base_price: priceInfo.base_price,
              final_price: finalPriceData?.final_price ?? priceInfo.base_price,
              price_id: priceInfo.id,
            };
          });

        const enrichedRooms = await Promise.all(enrichedRoomPromises);

        // Extract hotel info
        const matchedDetail = detailList.find((d) => d.property === Number(id));
        if (!matchedDetail) throw new Error('No matching property detail found');

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
          fetch(`https://dev.kacc.mn/api/property-basic-info/${propertyBasicInfo}/`).then((res) => res.json()),
          fetch(`https://dev.kacc.mn/api/confirm-address/${confirmAddress}/`).then((res) => res.json()),
          fetch(`https://dev.kacc.mn/api/property-policies/${propertyPolicies}/`).then((res) => res.json()),
        ]);

        const hotelData = {
          id,
          title: basicInfo.property_name_en,
          location: `${getNameById(combined.province, address.province_city)}, ${getNameById(combined.soum, address.soum)}`,
          price: basicInfo.price || 100,
          images: property_photos,
          star_rating: basicInfo.star_rating,
          basicInfo,
          address,
          policies,
          map: google_map,
          parking: parking_situation,
          facilities: general_facilities.map((f) => getNameById(combined.facilities, f, 'name_en')),
          highlights: [
            { id: 1, icon: 'icon-city', text: getNameById(combined.province, address.province_city) },
            { id: 2, icon: 'icon-airplane', text: 'Airport transfer' },
            { id: 3, icon: 'icon-bell-ring', text: 'Front desk [24-hour]' },
            { id: 4, icon: 'icon-tv', text: 'Premium TV channels' },
          ],
          overview: basicInfo.description || 'No overview available.',
        };

        setRooms(enrichedRooms);
        setHotel(hotelData);
      } catch (error) {
        console.error('Hotel fetch error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleShowMore = () => {
    console.log('Show more clicked');
  };

  return (
    <>
      <div className="header-margin" />
      <Header11 />
      <TopBreadCrumb />
      <StickyHeader hotel={hotel} />
      {hotel && <GalleryOne hotel={hotel} />}
      {hotel && <PropertyHighlights hotel={hotel} />}
      {hotel && (
        <section className="pt-30">
          <div className="container">
            <div className="row y-gap-30">
              <div className="col-xl-8">
                <Overview overviewText={hotel.overview} onShowMore={handleShowMore} />
                <PopularFacilities hotel={hotel} />
                <RatingTag />
              </div>
              <div className="col-xl-4">
                <SidebarRight hotel={hotel} setRooms={setRooms} dates={dates} setDates={setDates} />
              </div>
            </div>
          </div>
        </section>
      )}
      <section id="rooms" className="pt-30">
        <div className="container">
          <div className="row pb-20">
            <div className="col-auto">
              <h3 className="text-22 fw-500">Available Rooms</h3>
            </div>
          </div>
          <AvailableRooms hotel={hotel} rooms={rooms} checkIn={checkIn} checkOut={checkOut} />
        </div>
      </section>
      {/* Remaining sections remain unchanged */}
      <section className="pt-40" id="reviews"><div className="container"><h3 className="text-22 fw-500">Guest reviews</h3><ReviewProgress /><DetailsReview /></div></section>
      <section className="mt-40" id="facilities"><div className="container"><h3 className="text-22 fw-500">Facilities of this Hotel</h3><Facilities /></div></section>
      <section className="pt-40"><div className="container"><HelpfulFacts /></div></section>
      <section id="faq" className="pt-40 layout-pb-md"><div className="container"><Faq /></div></section>
      <section className="layout-pt-md layout-pb-lg"><div className="container text-center"><Hotels2 /></div></section>
      <CallToActions />
      <DefaultFooter />
    </>
  );
};

export default dynamic(() => Promise.resolve(HotelSingleV1Dynamic), { ssr: false });
