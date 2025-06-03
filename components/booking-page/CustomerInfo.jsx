import Link from "next/link";
import BookingDetails from "./sidebar/BookingDetails";

const CustomerInfo = ({ formData, onInputChange }) => {
  return (
    <>
      <div className="col-xl-7 col-lg-8 mt-30">
        {/* <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05">
          Sign in to book with your saved details or{" "}
          <Link href="/signup" className="text-blue-1 fw-500">
            register
          </Link>{" "}
          to manage your bookings on the go!
        </div> */}

        <h2 className="text-22 fw-500 mt-40 md:mt-24">Та хувийн мэдээллээ оруулна уу?</h2>

        <div className="row x-gap-20 y-gap-20 pt-20">
          <div className="col-12">
            <div className="form-input ">
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => onInputChange("customer_name", e.target.value)}
              />
              <label className="lh-1 text-16 text-light-1">Овог нэр</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-input ">
              <input
                type="email"
                required
                value={formData.customer_email}
                onChange={(e) => onInputChange("customer_email", e.target.value)}
              />
              <label className="lh-1 text-16 text-light-1">И-мэйл</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-input ">
              <input
                type="text"
                required
                value={formData.customer_phone}
                onChange={(e) => onInputChange("customer_phone", e.target.value)}
              />
              <label className="lh-1 text-16 text-light-1">Утасны дугаар</label>
            </div>
          </div>

          {/* <div className="col-12">
            <div className="row y-gap-20 items-center justify-between">
              <div className="col-auto">
                <div className="text-14 text-light-1">
                  By proceeding with this booking, I agree to GoTrip Terms of
                  Use and Privacy Policy.
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="col-xl-5 col-lg-4 mt-30">
        <div className="booking-sidebar">
          <BookingDetails />
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;