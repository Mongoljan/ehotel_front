import AppButton from "./AppButton";
import ContactInfo from "./ContactInfo";
import Copyright from "./Copyright";
import FooterContent from "./FooterContent";

const index = () => {
  return (
    <footer className="footer -type-1" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container">
        <div className="pt-60 pb-60">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="footer-logo mb-30">
                <h2 className="text-white fw-bold text-24">MyRoom</h2>
              </div>
              <ContactInfo />
            </div>
            {/* End col */}

            <FooterContent />
            {/* End footer menu content */}

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="mb-30">
                <div className="d-flex x-gap-15 mb-20">
                  <a href="#" className="d-flex items-center justify-center size-40 rounded-8 bg-white">
                    <i className="icon-facebook text-16 text-dark-1" />
                  </a>
                  <a href="#" className="d-flex items-center justify-center size-40 rounded-8 bg-white">
                    <i className="icon-twitter text-16 text-dark-1" />
                  </a>
                  <a href="#" className="d-flex items-center justify-center size-40 rounded-8 bg-white">
                    <i className="icon-instagram text-16 text-dark-1" />
                  </a>
                  <a href="#" className="d-flex items-center justify-center size-40 rounded-8 bg-white">
                    <i className="icon-linkedin text-16 text-dark-1" />
                  </a>
                </div>
              </div>
              <AppButton />
            </div>
          </div>
        </div>
        {/* End footer top */}

        <div className="py-20 border-top-light">
          <Copyright />
        </div>
        {/* End footer-copyright */}
      </div>
      {/* End container */}
    </footer>
  );
};

export default index;
