"use client";


import { useTranslation } from '../../../contexts/TranslationContext';
import { useState } from 'react';

export default function FaqSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);
  // Build FAQ array from numbered keys
  const faqs = [];
  for (let i = 1; i <= 9; i++) {
    const item = t(`faq.q${i}`);
    if (item && item.q && item.a) faqs.push(item);
  }

  return (
    <section className="layout-pt-md layout-pb-md bg-white">
      <div className="container">
        <div className="row justify-center text-center mb-30">
          <div className="col-auto">
            <h2 className="sectionTitle__title mb-10">{t('faq.title')}</h2>
            <p className="sectionTitle__text">{t('faq.subtitle')}</p>
          </div>
        </div>
        <div className="accordion -simple row y-gap-20" id="Faq1">
          {faqs.map((faq, idx) => (
            <div className="col-12" key={idx}>
              <div className="accordion__item px-20 py-20 border-light rounded-4">
                <div
                  className="accordion__button d-flex items-center"
                  aria-expanded={open === idx}
                  onClick={() => setOpen(open === idx ? null : idx)}
                >
                  <div className="accordion__icon size-40 flex-center bg-white text-blue-1 rounded-full mr-20">
                    <i className="icon-plus" />
                    <i className="icon-minus" />
                  </div>
                  <div className="button text-dark-1 text-start">
                    {faq.q}
                  </div>
                </div>
                <div
                  className={`accordion-collapse collapse${open === idx ? " show" : ""}`}
                  id={`faq${idx}`}
                  data-bs-parent="#Faq1"
                >
                  <div className="pt-15 pl-60">
                    <p className="text-15">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
