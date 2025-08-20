const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "ХОЛБОО БАРИХ",
      action: "tel:7755-2323",
      text: "7755-2323",
    },
    {
      id: 2,
      title: "",
      action: "mailto:info@cloudnine.mn",
      text: "info@cloudnine.mn",
    },
    {
      id: 3,
      title: "",
      action: "#",
      text: "Khan-Uul district, 15th Khoroo, Chingis Avenue street, 33/2-1508, Ulaanbaatar, Mongolia",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          {item.title && <div className={"text-14 mt-30 text-white"}>{item.title}</div>}
          <a href={item.action} className="text-14 fw-400 text-white mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
