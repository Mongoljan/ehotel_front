"use client";

const AppButton = () => {
  const appContent = [
    {
      id: 1,
      icon: "icon-apple",
      link: "https://www.apple.com/app-store/",
      text: "Download on the",
      market: "App Store",
      colClass: "",
      bgImage: "/img/app-store.png"
    },
    {
      id: 2,
      icon: "icon-play-market",
      link: "https://play.google.com/store/apps/?hl=en&gl=US",
      text: "GET IT ON",
      market: "Google Play",
      colClass: "mt-15",
      bgImage: "/img/google-play.png"
    },
  ];

  return (
    <>
      {appContent.map((item) => (
        <div className={`${item.colClass}`} key={item.id}>
          <a href={item.link} className="d-block">
            <img 
              src={item.bgImage} 
              alt={item.market}
              className="w-140 h-auto"
              onError={(e) => {
                // Fallback to text version if image not found
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="d-flex items-center px-20 py-10 rounded-8 bg-dark-3" 
              style={{ display: 'none' }}
            >
              <i className={`${item.icon} text-24 text-white`} />
              <div className="ml-15">
                <div className="text-12 text-white">{item.text}</div>
                <div className="text-14 lh-1 fw-500 text-white">{item.market}</div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default AppButton;
