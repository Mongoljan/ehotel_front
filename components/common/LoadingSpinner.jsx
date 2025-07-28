/**
 * Loading component with different variants for various use cases
 */

'use client';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary', 
  text = 'Loading...', 
  className = '',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    blue: 'text-blue-1',
    white: 'text-white'
  };

  const spinnerContent = (
    <div className={`d-flex flex-column align-items-center ${className}`}>
      <div 
        className={`spinner-border ${sizeClasses[size]} ${variantClasses[variant]}`} 
        role="status"
      >
        <span className="visually-hidden sr-only">{text}</span>
      </div>
      {text && (
        <div className={`mt-2 text-${variant === 'white' ? 'white' : 'muted'} text-sm`}>
          {text}
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75" style={{ zIndex: 9999 }}>
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// Skeleton loading component for better UX
export const SkeletonLoader = ({ width = '100%', height = '20px', className = '', rounded = false }) => (
  <div 
    className={`bg-light-2 ${rounded ? 'rounded-pill' : 'rounded'} ${className}`}
    style={{ 
      width, 
      height, 
      animation: 'pulse 1.5s ease-in-out infinite alternate' 
    }}
  />
);

// Hotel card skeleton
export const HotelCardSkeleton = () => (
  <div className="col-lg-4 col-sm-6">
    <div className="hotelsCard -type-1">
      <div className="hotelsCard__image">
        <SkeletonLoader height="200px" className="rounded-4" />
      </div>
      <div className="hotelsCard__content mt-10">
        <SkeletonLoader height="24px" width="80%" className="mb-2" />
        <SkeletonLoader height="16px" width="60%" className="mb-3" />
        <div className="d-flex items-center mb-2">
          <SkeletonLoader height="30px" width="30px" rounded className="me-2" />
          <SkeletonLoader height="16px" width="100px" />
        </div>
        <SkeletonLoader height="20px" width="120px" />
      </div>
    </div>
  </div>
);

// CSS for pulse animation (you can add this to your global styles)
const styles = `
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

export default LoadingSpinner;
