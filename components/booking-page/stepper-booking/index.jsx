// StepperBooking.jsx
'use client';

import React, { useState, useEffect } from 'react';
import CustomerInfo from '../CustomerInfo';
import PaymentInfo from '../PaymentInfo';
import OrderSubmittedInfo from '../OrderSubmittedInfo';
import { useSearchParams, useParams } from 'next/navigation';
import dayjs from 'dayjs';

const StepperBooking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingResult, setBookingResult] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [hotelName, setHotelName] = useState('');
  const [roomTypeName, setRoomTypeName] = useState('');
  const [roomCategoryName, setRoomCategoryName] = useState('');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  });

  const params = useSearchParams();
  const query = useParams();

  const hotel_id = Number(query.hotelId);
  const room_category_id = Number(query.room_category);
  const room_type_id = Number(query.room_type);

  const check_in = params.get('check_in');
  const check_out = params.get('check_out');
  const room_count = Number(params.get('qty')) || 1;

  const totalNights = check_in && check_out ? dayjs(check_out).diff(dayjs(check_in), 'day') : 0;
  const totalPrice = finalPrice ? finalPrice * totalNights * room_count : null;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [roomMetaRes, hotelRes, priceRes] = await Promise.all([
          fetch('https://dev.kacc.mn/api/all-data/'),
          fetch(`https://dev.kacc.mn/api/property-basic-info/${hotel_id}/`),
          fetch(`https://dev.kacc.mn/api/room-prices/?hotel=${hotel_id}`),
        ]);

        if (!roomMetaRes.ok || !hotelRes.ok || !priceRes.ok) throw new Error('Fetch error');

        const [roomMeta, hotelData, roomPrices] = await Promise.all([
          roomMetaRes.json(),
          hotelRes.json(),
          priceRes.json(),
        ]);

        setHotelName(hotelData.property_name_mn || hotelData.property_name_en);

        const roomType = roomMeta.room_types.find((r) => r.id === room_type_id);
        const roomCategory = roomMeta.room_category.find((r) => r.id === room_category_id);

        setRoomTypeName(roomType?.name || '');
        setRoomCategoryName(roomCategory?.name || '');

        const matchedPrice = roomPrices.find(
          (p) => p.room_type === room_type_id && p.room_category === room_category_id
        );

        if (matchedPrice?.id) {
          const finalRes = await fetch(`https://dev.kacc.mn/api/final-price/${matchedPrice.id}/`);
          if (finalRes.ok) {
            const finalData = await finalRes.json();
            setFinalPrice(finalData.final_price || matchedPrice.base_price);
          } else {
            setFinalPrice(matchedPrice.base_price);
          }
        }
      } catch (error) {
        console.error('Data fetching error:', error);
      }
    };

    if (hotel_id && room_category_id && room_type_id) {
      fetchDetails();
    }
  }, [hotel_id, room_category_id, room_type_id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitBooking = async () => {
    const payload = {
      hotel_id,
      check_in,
      check_out,
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      customer_email: formData.customer_email,
      rooms: [
        {
          room_category_id,
          room_type_id,
          room_count,
        },
      ],
    };

    try {
      const res = await fetch('https://dev.kacc.mn/api/bookings/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Booking failed');
      const result = await res.json();
      setBookingResult(result);
      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      console.error('Booking error:', err);
      alert('Booking failed. Please check your input and try again.');
    }
  };

  const steps = [
    {
      title: 'Хувийн мэдээлэл',
      stepNo: '1',
      stepBar: <div className="col d-none d-sm-block"><div className="w-full h-1 bg-border"></div></div>,
      content: (
        <CustomerInfo
          onInputChange={handleInputChange}
          formData={formData}
          hotelId={hotel_id}
          roomCategoryId={room_category_id}
          roomTypeId={room_type_id}
          checkIn={check_in}
          checkOut={check_out}
          roomCount={room_count}
        />
      ),
    },
    {
      title: 'Төлбөрийн мэдээлэл',
      stepNo: '3',
      stepBar: <div className="col d-none d-sm-block"><div className="w-full h-1 bg-border"></div></div>,
      content: <PaymentInfo />,
    },
    {
      title: 'Сүүлийн шат',
      stepNo: '2',
      stepBar: '',
      content: (
        <OrderSubmittedInfo
          result={bookingResult}
          formData={formData}
          checkIn={check_in}
          checkOut={check_out}
          roomCount={room_count}
          totalNights={totalNights}
          finalPrice={finalPrice}
          totalPrice={totalPrice}
          hotelName={hotelName}
          roomTypeName={roomTypeName}
          roomCategoryName={roomCategoryName}
        />
      ),
    },
  ];

  const renderStep = () => {
    const { content } = steps[currentStep];
    return <>{content}</>;
  };

  const nextStep = () => {
    if (currentStep === 0) {
      const { customer_name, customer_email, customer_phone } = formData;
      if (!customer_name || !customer_email || !customer_phone) {
        alert('Please fill in all required fields (name, email, phone).');
        return;
      }
      submitBooking();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0 && currentStep < steps.length - 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="row x-gap-40 y-gap-30 items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="col-auto">
              <div
                className="d-flex items-center cursor-pointer transition"
                onClick={() => setCurrentStep(index)}
              >
                <div
                  className={
                    currentStep === index
                      ? 'active size-40 rounded-full flex-center bg-blue-1'
                      : 'size-40 rounded-full flex-center bg-blue-1-05 text-blue-1 fw-500'
                  }
                >
                  {currentStep === index ? (
                    <i className="icon-check text-16 text-white"></i>
                  ) : (
                    <span>{step.stepNo}</span>
                  )}
                </div>
                <div className="text-18 fw-500 ml-10"> {step.title}</div>
              </div>
            </div>
            {step.stepBar}
          </React.Fragment>
        ))}
      </div>

      <div className="row">{renderStep()}</div>

      <div className="row x-gap-20 y-gap-20 pt-20">
        <div className="col-auto">
          {currentStep < steps.length - 1 && (
            <button
              className="button h-60 px-24 -blue-1 bg-light-2"
              disabled={currentStep === 0}
              onClick={previousStep}
            >
              Previous
            </button>
          )}
        </div>
        <div className="col-auto">
          {currentStep < steps.length - 1 && (
            <button
              className="button h-60 px-24 -dark-1 bg-blue-1 text-white"
              disabled={
                (currentStep === 0 &&
                  (!formData.customer_name ||
                    !formData.customer_email ||
                    !formData.customer_phone))
              }
              onClick={nextStep}
            >
              Баталгаажуулах <div className="icon-arrow-top-right ml-15" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default StepperBooking;
