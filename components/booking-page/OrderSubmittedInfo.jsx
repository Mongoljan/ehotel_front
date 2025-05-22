// OrderSubmittedInfo.jsx
'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';

const OrderSubmittedInfo = ({
  result,
  formData,
  checkIn,
  checkOut,
  roomCount,
  totalNights,
  finalPrice,
  totalPrice,
  hotelName,
  roomTypeName,
  roomCategoryName,
}) => {
  const [newDates, setNewDates] = useState({
    check_in: checkIn,
    check_out: checkOut,
  });

  const handleInputChange = (field, value) => {
    setNewDates((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = async () => {
    try {
      const res = await fetch('https://dev.kacc.mn/api/bookings/changeDate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_code: result?.booking_code,
          pin_code: result?.pin_code,
          check_in: newDates.check_in,
          check_out: newDates.check_out,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Огноо амжилттай шинэчлэгдлээ.');
      } else {
        alert(`Алдаа: ${data.message || 'Шинэчлэхэд амжилтгүй боллоо'}`);
      }
    } catch (err) {
      console.error('Date change error:', err);
      alert('Огноо солих үед алдаа гарлаа.');
    }
  };

  const handleCancelBooking = async () => {
    try {
      const res = await fetch('https://dev.kacc.mn/api/bookings/cancel/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_code: result?.booking_code,
          pin_code: result?.pin_code,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Захиалга амжилттай цуцлагдлаа.');
      } else {
        alert(`Алдаа: ${data.message || 'Цуцлахад амжилтгүй боллоо'}`);
      }
    } catch (err) {
      console.error('Cancel error:', err);
      alert('Захиалга цуцлах үед алдаа гарлаа.');
    }
  };

  return (
    <div className="col-xl-8 col-lg-8">
      <div className="order-completed-wrapper">
        <div className="d-flex flex-column items-center mt-40">
          <div className="size-80 flex-center rounded-full bg-dark-3">
            <i className="icon-check text-30 text-white" />
          </div>
          <div className="text-30 lh-1 fw-600 mt-20">Захиалга амжилттай!</div>
          <div className="text-15 text-light-1 mt-10 d-flex align-items-center gap-2">
            <input
              type="date"
              value={newDates.check_in}
              onChange={(e) => handleInputChange('check_in', e.target.value)}
              className="form-control border-1 border-primary border form-control-sm w-auto"
            />
            —
            <input
              type="date"
              value={newDates.check_out}
              onChange={(e) => handleInputChange('check_out', e.target.value)}
              className="form-control border-1 border-primary border form-control-sm w-auto"
            />
            <button onClick={handleDateChange} className="btn btn-sm btn-outline-primary">
              Хадгалах
            </button>
          </div>
        </div>

        <div className="border-type-1 rounded-8 px-50 py-35 mt-40">
          <div className="row">
            <div className="col-md-4">
              <div className="text-15 lh-12">Зочид буудал</div>
              <div className="text-15 fw-500 text-blue-1 mt-10">{hotelName}</div>
            </div>
            <div className="col-md-4">
              <div className="text-15 lh-12">Өрөөний төрөл</div>
              <div className="text-15 fw-500 text-blue-1 mt-10">{roomTypeName}</div>
            </div>
            <div className="col-md-4">
              <div className="text-15 lh-12">Ангилал</div>
              <div className="text-15 fw-500 text-blue-1 mt-10">{roomCategoryName}</div>
            </div>
          </div>

          <div className="row pt-20">
            <div className="col-md-4">
              <div className="text-15 lh-12">Захиалгын код</div>
              <div className="text-15 fw-500 text-blue-1 mt-10">{result?.booking_code}</div>
            </div>
            <div className="col-md-4">
              <div className="text-15 lh-12">Нууц код</div>
              <div className="text-15 fw-500 text-blue-1 mt-10">{result?.pin_code}</div>
            </div>
            <div className="col-md-4">
              <div className="text-15 lh-12">Нийт үнэ</div>
              <div className="text-15 fw-500 text-blue-1 mt-10">
                {finalPrice && totalNights && roomCount
                  ? `${finalPrice.toLocaleString()}₮ × ${roomCount} × ${totalNights} = ${totalPrice.toLocaleString()}₮`
                  : 'Бодолт...'}
              </div>
            </div>
          </div>
        </div>

        <div className="border-light rounded-8 px-50 py-40 mt-40">
          <h4 className="text-20 fw-500 mb-30">Захиалагчийн мэдээлэл</h4>
          <div className="row">
            <div className="col-md-4">
              <div className="text-15 text-light-1">Нэр</div>
              <div className="fw-500">{formData?.customer_name}</div>
            </div>
            <div className="col-md-4">
              <div className="text-15 text-light-1">И-мэйл</div>
              <div className="fw-500">{formData?.customer_email}</div>
            </div>
            <div className="col-md-4">
              <div className="text-15 text-light-1">Утас</div>
              <div className="fw-500">{formData?.customer_phone}</div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-30">
          <button className="btn btn-outline-danger" onClick={handleCancelBooking}>
            Захиалга цуцлах
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSubmittedInfo;
