import { useTranslation } from '../../contexts/TranslationContext';
import Link from 'next/link';

const TopBreadCrumb = ({ carName, location, categoryName = "Cars" }) => {
  const { t } = useTranslation();

  return (
    <section className="py-10 d-flex items-center bg-light-2">
      <div className="container">
        <div className="row y-gap-10 items-center justify-between">
          <div className="col-auto">
            <div className="row x-gap-10 y-gap-5 items-center text-14 text-light-1">
              <div className="col-auto">
                <Link href="/" className="text-light-1 hover:text-blue-1">
                  {t('breadcrumb.home') || 'Home'}
                </Link>
              </div>
              {/* End .col-auto */}
              <div className="col-auto">&gt;</div>
              {/* End .col-auto */}
              <div className="col-auto">
                <Link href="/car-list-v1" className="text-light-1 hover:text-blue-1">
                  {location ? `${location} ${categoryName}` : categoryName}
                </Link>
              </div>
              {/* End .col-auto */}
              <div className="col-auto">&gt;</div>
              {/* End .col-auto */}
              <div className="col-auto">
                <div className="text-dark-1">
                  {carName || 'Car Details'}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
          {/* End .col-auto */}

          <div className="col-auto">
            <Link href="/car-list-v1" className="text-14 text-blue-1 underline">
              {`All ${categoryName}${location ? ` in ${location}` : ''}`}
            </Link>
          </div>
          {/* End col-auto */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
};

export default TopBreadCrumb;
