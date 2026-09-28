export default function LocationBlock() {
  return (
    <section className="event-detail__block">
      <div className="text-center"><h2 className="section-title section-title--center">Location</h2></div>
      <div className="event-detail__venue">
        <div>
          <h3>Muscat Central Library</h3>
          <p>10 Grand Army Plaza, Brooklyn, NY 11238</p>
        </div>
        <a className="btn btn-primary btn-primary--green" href="#">Open in Google Map</a>
      </div>
      <div className="event-detail__map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462561.6574537445!2d55.22748795!3d25.076022449999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1790568820965!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
