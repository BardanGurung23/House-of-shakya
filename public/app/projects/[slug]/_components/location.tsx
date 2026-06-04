export const Location = ({ link }: { link: string }) => {
  return (
    <div className="mt-5 h-72 overflow-hidden rounded-lg border border-navy/10 bg-cream">
      <iframe
        src={link}
        width="900"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
