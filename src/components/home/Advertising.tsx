import DoodleSection from "@/components/ui/DoodleSection";

type AdvertisingProps = {
  withDoodle?: boolean;
};

export default function Advertising({ withDoodle }: AdvertisingProps) {
  const content = (
    <div className="container">
      <a className="advertising__banner" href="#">
        <img className="advertising__logo" src="/assets/images/ad-logo.png" alt="Kids Vitae" />
        <span className="advertising__tag">Advertisement</span>
        <h2 className="advertising__title">Avail Summer Discounts</h2>
        <p className="advertising__text">20% Off on all items</p>
      </a>
    </div>
  );

  if (!withDoodle) {
    return <section className="advertising">{content}</section>;
  }

  return (
    <DoodleSection className="advertising">
      <img className="doodle advertising__doodle advertising__doodle--star" src="/assets/images/star.svg" alt="" />
      {content}
    </DoodleSection>
  );
}
