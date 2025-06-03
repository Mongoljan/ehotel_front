'use client';

import Image from 'next/image';
import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const BookingDetails = () => {
  const params = useSearchParams();
  const { hotelId, room_category, room_type } = useParams();

  const checkIn = params.get("check_in");
  const checkOut = params.get("check_out");
  const qty = params.get("qty") || 1;

  const [hotelInfo, setHotelInfo] = useState(null);
  const [roomMeta, setRoomMeta] = useState({ roomTypeName: "", roomCategoryName: "" });
const [roomImage, setRoomImage] = useState(null);


useEffect(() => {
  const fetchDetails = async () => {
    try {
      if (!hotelId) return;

      const [detailsRes, metaRes, combinedRes] = await Promise.all([
        fetch(`https://dev.kacc.mn/api/property-details/?property=${hotelId}`),
        fetch("https://dev.kacc.mn/api/all-room-data/"),
        fetch("https://dev.kacc.mn/api/combined-data/")
      ]);

      const [details, meta, combinedData] = await Promise.all([
        detailsRes.json(),
        metaRes.json(),
        combinedRes.json()
      ]);

      const matched = details.find((d) => d.property === Number(hotelId));
      if (!matched) return;

      const [basicRes, addressRes] = await Promise.all([
        fetch(`https://dev.kacc.mn/api/property-basic-info/${hotelId}/`),
        fetch(`https://dev.kacc.mn/api/confirm-address/${hotelId}/`)
      ]);

      const [basic, address] = await Promise.all([
        basicRes.json(),
        addressRes.json()
      ]);

      // Find province and soum names
      const provinceName = combinedData.province.find(p => p.id === address.province_city)?.name || '';
      const soumName = combinedData.soum.find(s => s.id === address.soum)?.name || '';

      setHotelInfo({
        name: basic.property_name_en,
        image: matched.property_photos?.[0]?.image,
        location: `${provinceName}${soumName ? ', ' + soumName : ''}`,
      });

      const roomTypeName = meta.room_types.find(r => r.id === Number(room_type))?.name || room_type;
      const roomCategoryName = meta.room_rates.find(r => r.id === Number(room_category))?.name || room_category;
      setRoomMeta({ roomTypeName, roomCategoryName });

      const roomsRes = await fetch(`https://dev.kacc.mn/api/roomsInHotels/?hotel=${hotelId}`);
      const rooms = await roomsRes.json();

      const matchedRoom = rooms.find(r =>
        r.room_type === Number(room_type) && r.room_category === Number(room_category)
      );

      if (matchedRoom?.images?.length) {
        setRoomImage(matchedRoom.images[0].image);
      }

    } catch (err) {
      console.error("Failed to fetch booking details:", err);
    }
  };

  fetchDetails();
}, [hotelId, room_category, room_type]);


  const nights = checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), "day") : 1;

  return (
    <div style={{borderRadius:"10px"}} className="px-20 py-30 border-light">
      <div className="text-20 fw-500 mb-30">Таны захиалгын мэдээлэл</div>

      <div className="row x-gap-15 y-gap-20">
        өрөөний зураг:
        <div className="col-auto">
          {roomImage ? (
            <Image
              width={140}
              height={140}
              src={`https://dev.kacc.mn${roomImage}`}
              alt="Room"
              className="size-140 rounded-4 object-cover"
            />
          ) : (
            <div className="size-140 bg-light-2 rounded-4 d-flex align-items-center justify-center text-muted">
              No image
            </div>
          )}
        </div>
        <div className="col">
          <div className="d-flex x-gap-5 pb-10">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="icon-star text-yellow-1 text-10" />
            ))}
          </div>
          <div className="lh-17 fw-500">Буудал: {hotelInfo?.name || "Hotel name"}</div>
          <div className="text-14 lh-15 mt-5">Байршил: {hotelInfo?.location || "Location"}</div>
        </div>
      </div>

      <div className="border-top-light mt-30 mb-20" />

      <div className="row y-gap-20 justify-between">
        <div className="col-auto">
          <div className="text-15">Орох</div>
          <div className="fw-500">{checkIn || "-"}</div>
          <div className="text-15 text-light-1"> 15:00 цагаас</div>
        </div>
        <div className="col-auto md:d-none">
          <div className="h-full w-1 bg-border" />
        </div>
        <div className="col-auto text-right md:text-left">
          <div className="text-15">Гарах</div>
          <div className="fw-500">{checkOut || "-"}</div>
          <div className="text-15 text-light-1"> 11:00 цаг </div>
        </div>
      </div>

      <div className="border-top-light mt-30 mb-20" />
      <div>
        <div className="text-15">Нийт байрлах өдөр:</div>
        <div className="fw-500">{nights} шөнө</div>
        {/* <a href="#" className="text-15 text-blue-1 underline">Travelling on different dates?</a> */}
      </div>

      <div className="border-top-light mt-30 mb-20" />
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-auto">
          <div className="text-15">Таны сонгосон өрөө:</div>
          <div className="fw-500">{roomMeta.roomTypeName}, {roomMeta.roomCategoryName}</div>
          {/* <a href="#" className="text-15 text-blue-1 underline">Change your selection</a> */}
        </div>
        <div className="col-auto">
          <div className="text-15">{qty} өрөө</div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
