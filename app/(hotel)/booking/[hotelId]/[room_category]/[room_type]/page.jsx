export const dynamic = 'force-dynamic'; // 🔥 CRITICAL: disables static generation

import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import StepperBooking from "@/components/booking-page/stepper-booking";

export const metadata = {
  title: "Hotel Booking Page || GoTrip - Travel & Tour React NextJS Template",
  description: "GoTrip - Travel & Tour React NextJS Template",
};

const BookingPage = () => {
  return (
    <>
      <div className="header-margin"></div>
      <Header11 />

      <section className="pt-40 layout-pb-md">
        <div className="container">
          <StepperBooking />
        </div>
      </section>

      <CallToActions />
      <DefaultFooter />
    </>
  );
};

export default BookingPage;
