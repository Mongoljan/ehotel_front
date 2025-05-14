'use client';
import Image from "next/image";

const AvailableRooms = ({ rooms }) => {
  if (!rooms || rooms.length === 0) {
    return <div>No rooms available for this hotel.</div>;
  }

  return (
    <>
      {rooms.map((room, index) => (
        <div
          key={index}
          className="border-light rounded-4 px-30 py-30 sm:px-20 sm:py-20 mt-20"
        >
          <div className="row y-gap-20">
            <div className="col-12">
              <h3 className="text-18 fw-500 mb-10">
                {room.room_Description || `${room.room_type_name} | ${room.rate_name}`}
              </h3>

              <p className="text-14 text-muted">
                {room.number_of_rooms_to_sell} room(s) available • {room.room_size} m²
              </p>

              <div className="roomGrid mt-20">
                <div className="roomGrid__header">
                  <div>Room</div>
                  <div>Benefits</div>
                  <div>Price</div>
                  <div>Select</div>
                  <div />
                </div>

                <div className="roomGrid__grid">
                  {/* Image & Info */}
                  <div>
                    <div className="ratio ratio-1:1">
                      {room.images?.length > 0 ? (
                        <Image
                          src={`https://dev.kacc.mn${room.images[0].image}`}
                          alt={room.images[0].description || "Room image"}
                          width={180}
                          height={180}
                          className="rounded-4 object-cover"
                        />
                      ) : (
                        <div className="bg-light-2 w-[180px] h-[180px] flex items-center justify-center rounded-4 text-14 text-muted">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="y-gap-5 mt-20">
                      <div className="d-flex items-center">
                        <i className="icon-no-smoke text-20 mr-10" />
                        <div className="text-15">
                          {room.smoking_allowed ? "Smoking allowed" : "Non-smoking"}
                        </div>
                      </div>
                      <div className="d-flex items-center">
                        <i className="icon-bed text-20 mr-10" />
                        <div className="text-15">
                          Bed type ID: {room.bed_type}
                        </div>
                      </div>
                      <div className="d-flex items-center">
                        <i className="icon-expand text-20 mr-10" />
                        <div className="text-15">Size: {room.room_size} m²</div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <div className="text-15 fw-500 mb-10">Includes:</div>
                    <div className="y-gap-8">
                      <div className="d-flex items-center text-green-2">
                        <i className="icon-check text-12 mr-10" />
                        <div className="text-15">Free cancellation</div>
                      </div>
                      <div className="d-flex items-center text-green-2">
                        <i className="icon-check text-12 mr-10" />
                        <div className="text-15">Pay at the hotel</div>
                      </div>
                      {room.facility_names?.map((facility, i) => (
                        <div key={i} className="d-flex items-center text-green-2">
                          <i className="icon-check text-12 mr-10" />
                          <div className="text-15">{facility}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="text-18 fw-500">
                      {room.final_price ? (
                        <>
                          {room.base_price > room.final_price && (
                            <span className="text-14 text-muted line-through mr-10">
                            Төгрөг${room.base_price}
                            </span>
                          )}
                         {room.final_price}₮ 
                        </>
                      ) : (
                        "Price unavailable"
                      )}
                    </div>
                    <div className="text-14 lh-18 text-light-1 mt-5">
                      Includes taxes and charges
                    </div>
                  </div>

                  {/* Room selection */}
                  <div>
                    <select className="form-select dropdown__button d-flex items-center rounded-4 border-light px-15 h-50 text-14">
                      {Array.from({ length: room.number_of_rooms_to_sell }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} room{(i + 1) > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Reserve */}
                  <div>
                    <a
                      href="#"
                      className="button h-50 px-24 -dark-1 bg-blue-1 text-white"
                    >
                      Reserve <div className="icon-arrow-top-right ml-15" />
                    </a>
                    <div className="text-14 text-light-1 mt-10">
                      Immediate confirmation • No booking fees
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AvailableRooms;
