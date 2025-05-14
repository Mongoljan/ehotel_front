'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import DateSearch from './DateSearch';
import GuestSearch from './GuestSearch';

const FilterBox = ({ hotelId, setRooms }) => {
  const [dates, setDates] = useState([]);
  const [guestCounts, setGuestCounts] = useState({ Adults: 2, Children: 1, Rooms: 1 });

  const handleAvailabilityCheck = async () => {
    if (dates.length !== 2) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const check_in = dates[0].format("YYYY-MM-DD");
    const check_out = dates[1].format("YYYY-MM-DD");

    try {
      const [roomsRes, metaRes, combinedRes, pricesRes] = await Promise.all([
        fetch(`https://dev.kacc.mn/api/roomsInHotels/?hotel=${hotelId}`),
        fetch('https://dev.kacc.mn/api/all-room-data/'),
        fetch('https://dev.kacc.mn/api/combined-data/'),
        fetch(`https://dev.kacc.mn/api/room-prices/?hotel=${hotelId}`)
      ]);

      const [roomsData, meta, combined, prices] = await Promise.all([
        roomsRes.json(),
        metaRes.json(),
        combinedRes.json(),
        pricesRes.json()
      ]);

      const getName = (list, id, key = 'name') => list.find(el => el.id === id)?.[key] || 'Unknown';

      const groupedMap = new Map();

      for (const room of roomsData) {
        const key = `${room.room_type}-${room.room_category}`;
        const existing = groupedMap.get(key);
        if (!existing) {
          groupedMap.set(key, {
            room_type: room.room_type,
            room_category: room.room_category,
            room_type_name: getName(meta.room_types, room.room_type),
            rate_name: getName(meta.room_rates, room.room_category),
            room_Description: room.room_Description,
            room_size: room.room_size,
            bed_type_name: getName(meta.bed_types, room.bed_type),
            images: room.images,
            smoking_allowed: room.smoking_allowed,
            facility_names: room.room_Facilities.map(id => getName(combined.facilities, id, 'name_en')),
            number_of_rooms_to_sell: room.number_of_rooms_to_sell,
            base_price: null,
            final_price: null,
          });
        } else {
          existing.number_of_rooms_to_sell += room.number_of_rooms_to_sell;
        }
      }

      // Now fetch availability + final_price for each unique combo
      const enrichedRooms = await Promise.all(
        Array.from(groupedMap.values()).map(async room => {
          const priceObj = prices.find(p => p.room_type === room.room_type && p.room_category === room.room_category);
          if (!priceObj) return null;

          const availableRes = await fetch(
            `https://dev.kacc.mn/api/bookings/available_rooms/?hotel_id=${hotelId}&check_in=${check_in}&check_out=${check_out}&room_type_id=${room.room_type}&room_category_id=${room.room_category}`
          );
          const availableJson = await availableRes.json();
          if (!availableJson.available_rooms || availableJson.available_rooms < 1) return null;

          const finalPriceRes = await fetch(`https://dev.kacc.mn/api/final-price/${priceObj.id}/`);
          const finalJson = await finalPriceRes.json();

          return {
            ...room,
            base_price: priceObj.base_price,
            final_price: finalJson.final_price,
            number_of_rooms_to_sell: availableJson.available_rooms
          };
        })
      );

      const validRooms = enrichedRooms.filter(Boolean);
      setRooms(validRooms);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  return (
    <>
      <div className="col-12">
        <div className="searchMenu-date px-20 py-10 border-light rounded-4 -right js-form-dd js-calendar">
          <div>
            <h4 className="text-15 fw-500 ls-2 lh-16">Check in - Check out</h4>
            <DateSearch dates={dates} setDates={setDates} />
          </div>
        </div>
      </div>

      <div className="col-12">
        <GuestSearch guestCounts={guestCounts} setGuestCounts={setGuestCounts} />
      </div>

      <div className="col-12">
        <div className="button-item h-full">
          <button onClick={handleAvailabilityCheck} className="button -dark-1 px-35 h-60 col-12 bg-blue-1 text-white">
            Check availability
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterBox;