import FilterBox from "../../components/hotel-single/filter-box";

const SidebarRight = ({ hotel, setRooms }) => {
  return (
    <aside className="ml-50 lg:ml-0">
      <div className="px-30 py-30 border-light rounded-4 shadow-4">
        <div className="d-flex items-center justify-between">
          <div>
            <span className="text-20 fw-500">US${hotel?.price}</span>
            <span className="text-14 text-light-1 ml-5">nights</span>
          </div>
          <div className="d-flex items-center">
            <div className="text-14 text-right mr-10">
              <div className="lh-15 fw-500">Exceptional</div>
              <div className="lh-15 text-light-1">
                {hotel?.numberOfReviews} reviews
              </div>
            </div>
            <div className="size-40 flex-center bg-blue-1 rounded-4">
              <div className="text-14 fw-600 text-white">{hotel?.ratings}</div>
            </div>
          </div>
        </div>

        <div className="row y-gap-20 pt-30">
          {/* ✅ Pass setRooms down */}
          <FilterBox hotelId={hotel?.id} setRooms={setRooms} />
        </div>
      </div>
    </aside>
  );
};

export default SidebarRight;
