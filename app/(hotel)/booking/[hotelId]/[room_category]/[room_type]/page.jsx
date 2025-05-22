import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const StepperBooking = dynamic(() => import('@/components/booking-page/stepper-booking'), {
  ssr: false,
});

export const dynamic = 'force-dynamic';

export default function BookingPage() {
  return (
    <>
      <div className="header-margin"></div>
      <Header11 />
      <section className="pt-40 layout-pb-md">
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <StepperBooking />
          </Suspense>
        </div>
      </section>
      <CallToActions />
      <DefaultFooter />
    </>
  );
}
