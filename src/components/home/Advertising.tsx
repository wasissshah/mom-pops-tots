"use client";

import DoodleSection from "@/components/ui/DoodleSection";
import AdvertisingSkeleton from "@/components/skeletons/AdvertisingSkeleton";
import { getHomeAds, type HomeAd } from "@/api/home";
import { useApi } from "@/hooks/useApi";

type AdvertisingProps = {
  withDoodle?: boolean;
};

// shown only when the API request fails (the error is logged by useApi)
const staticAd: HomeAd = {
  id: 0,
  title: "Avail Summer Discounts",
  subtitle: "20% Off on all items",
  url: "#",
  order: 0,
  logo: "/assets/images/ad-logo.png",
  media: null,
};

const logoUrl = (logo: HomeAd["logo"]) => (typeof logo === "string" ? logo : (logo?.url ?? null));

export default function Advertising({ withDoodle }: AdvertisingProps) {
  const { data: ads, loading, error } = useApi(getHomeAds, "Advertising");

  // 1 ad -> one full-width banner, 2 ads -> two banners side by side
  const list = error ? [staticAd] : (ads ?? []);
  const two = list.length > 1;

  let content;
  if (loading) {
    content = <AdvertisingSkeleton />;
  } else if (list.length === 0) {
    return null; // API worked but there are no ads
  } else {
    content = (
      <div className="container">
        <div className="row g-4">
          {list.map((ad) => {
            const logo = logoUrl(ad.logo);
            const external = ad.url.startsWith("http");
            return (
              <div className={two ? "col-lg-6" : "col-12"} key={ad.id}>
                <a
                  className={`advertising__banner${two ? " advertising__banner--half" : ""}`}
                  href={ad.url}
                  style={ad.media?.url ? { backgroundImage: `url('${ad.media.url}')` } : undefined}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {logo && <img className="advertising__logo" src={logo} alt={ad.title} />}
                  <span className="advertising__tag">Advertisement</span>
                  <h2 className="advertising__title">{ad.title}</h2>
                  {ad.subtitle && <p className="advertising__text">{ad.subtitle}</p>}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

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
