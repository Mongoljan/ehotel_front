import { useTranslation } from '../../../contexts/TranslationContext';

const Subscribe = () => {
  const { t } = useTranslation();
  
  return (
    <div className="single-field relative d-flex justify-end items-center pb-30">
      <input
        className="bg-white rounded-8"
        type="email"
        placeholder={t('footer.yourEmail')}
        required
      />
      <button
        type="submit"
        className="absolute px-20 h-full text-15 fw-500 underline text-dark-1"
      >
        {t('footer.subscribe')}
      </button>
    </div>
  );
};

export default Subscribe;
