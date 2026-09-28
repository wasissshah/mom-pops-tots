import DoodleSection from "@/components/ui/DoodleSection";

export default function SocialFeed() {
  return (
    <DoodleSection className="social-feed">
      <img className="doodle social-feed__doodle social-feed__doodle--moon" src="/assets/images/moon.svg" alt="" />
      <div className="container">
        <div className="social-feed__head">
          <div className="text-center text-lg-start">
            <span className="section-eyebrow d-block">Latest Posts</span>
            <h2 className="section-title">Follow Us on Social Media</h2>
          </div>

          <div className="d-flex gap-2">
            <a className="social-pebble social-pebble--pink" href="#" aria-label="Instagram"><img src="/assets/images/instagram.svg" alt="" width={20} height={20} /></a>
            <a className="social-pebble social-pebble--blue" href="#" aria-label="Facebook"><img src="/assets/images/facebook.svg" alt="" width={20} height={20} /></a>
            <a className="social-pebble social-pebble--green" href="#" aria-label="WhatsApp"><img src="/assets/images/whatsapp.svg" alt="" width={20} height={20} /></a>
          </div>
        </div>

        <div className="social-feed__embed">
          <iframe src="about:blank" title="Instagram feed placeholder" loading="lazy" />
        </div>
      </div>
    </DoodleSection>
  );
}
