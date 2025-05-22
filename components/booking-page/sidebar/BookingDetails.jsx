'use client';

import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const BookingDetails = () => {
  const params = useSearchParams();
  const { hotelId, room_category, room_type } = useParams();

  const checkIn = params.get("check_in");
  const checkOut = params.get("check_out");
  const qty = params.get("qty") || 1;

  const [hotelInfo, setHotelInfo] = useState(null);
  const [roomMeta, setRoomMeta] = useState({ roomTypeName: "", roomCategoryName: "" });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (hotelId) {
          const res = await fetch(`https://dev.kacc.mn/api/property-details/?property=${hotelId}`);
          const data = await res.json();
          const matched = data.find((d) => d.property === Number(hotelId));
          if (!matched) return;

          const basicRes = await fetch(`https://dev.kacc.mn/api/property-basic-info/${matched.propertyBasicInfo}/`);
          const basic = await basicRes.json();
          const addressRes = await fetch(`https://dev.kacc.mn/api/confirm-address/${matched.confirmAddress}/`);
          const address = await addressRes.json();

          setHotelInfo({
            name: basic.property_name_en,
            image: matched.property_photos?.[0]?.image,
            location: `${address.province_city_name || ""}, ${address.soum_name || ""}`,
          });
        }

        const metaRes = await fetch("https://dev.kacc.mn/api/all-room-data/");
        const meta = await metaRes.json();

        const roomTypeName = meta.room_types.find(r => r.id === Number(room_type))?.name || room_type;
        const roomCategoryName = meta.room_rates.find(r => r.id === Number(room_category))?.name || room_category;

        setRoomMeta({ roomTypeName, roomCategoryName });
      } catch (err) {
        console.error("Failed to fetch booking details:", err);
      }
    };

    fetchDetails();
  }, [hotelId, room_category, room_type]);

  const nights = checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), "day") : 1;

  return (
    <div className="px-30 py-30 border-light rounded-4">
      <div className="text-20 fw-500 mb-30">Your booking details</div>

      <div className="row x-gap-15 y-gap-20">
        <div className="col-auto">
          {hotelInfo?.image ? (
            <Image
              width={140}
              height={140}
              src={`${hotelInfo.image}`}
              alt="Hotel"
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
          <div className="lh-17 fw-500">{hotelInfo?.name || "Hotel name"}</div>
          <div className="text-14 lh-15 mt-5">{hotelInfo?.location || "Location"}</div>
        </div>
      </div>

      <div className="border-top-light mt-30 mb-20" />

      <div className="row y-gap-20 justify-between">
        <div className="col-auto">
          <div className="text-15">Check-in</div>
          <div className="fw-500">{checkIn || "-"}</div>
          <div className="text-15 text-light-1">From 15:00</div>
        </div>
        <div className="col-auto md:d-none">
          <div className="h-full w-1 bg-border" />
        </div>
        <div className="col-auto text-right md:text-left">
          <div className="text-15">Check-out</div>
          <div className="fw-500">{checkOut || "-"}</div>
          <div className="text-15 text-light-1">Until 11:00</div>
        </div>
      </div>

      <div className="border-top-light mt-30 mb-20" />
      <div>
        <div className="text-15">Total length of stay:</div>
        <div className="fw-500">{nights} night(s)</div>
        <a href="#" className="text-15 text-blue-1 underline">Travelling on different dates?</a>
      </div>

      <div className="border-top-light mt-30 mb-20" />
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-auto">
          <div className="text-15">You selected:</div>
          <div className="fw-500">{roomMeta.roomTypeName}, {roomMeta.roomCategoryName}</div>
          <a href="#" className="text-15 text-blue-1 underline">Change your selection</a>
        </div>
        <div className="col-auto">
          <div className="text-15">{qty} room(s)</div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
