"use client";

import { useState } from "react";
import Link from "next/link";
import { cities as staticCities, drawerNavLinks, mainNavLinks } from "@/data/navigation";
import { getCities } from "@/api/cities";
import { getLanguages } from "@/api/languages";
import { useApi } from "@/hooks/useApi";
import { setLang, useLang } from "@/lib/locale";
import DropdownSkeleton from "@/components/skeletons/DropdownSkeleton";

export default function SiteHeader() {
  const [city, setCity] = useState("Muscat");
  const { data: cityData, loading: citiesLoading } = useApi(getCities, "Cities", { localized: false });
  const { data: languageData, loading: languagesLoading } = useApi(getLanguages, "Languages", { localized: false });

  // API lists when loaded; on failure (error is logged by useApi) fall back to the static lists
  const cities = cityData?.length ? cityData.map((c) => c.name) : staticCities;
  const lang = useLang(); // global choice, shared by every page and API call (src/lib/locale.ts)
  const languages = languageData?.length ? languageData.map((l) => l.code) : ["en", "ar"];
  const currentLang = (lang ?? "en").toUpperCase();

  return (
    <>
      <header className="site-header">
        <div className="container">
          <div className="header-top">
            <div className="header-left">
              <button
                className="btn-blob"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mainMenu"
                aria-controls="mainMenu"
                aria-label="Open menu"
              >
                <img src="/assets/images/menu-icon.svg" alt="" width={36} height={36} />
              </button>
              <div className="header-city d-none d-md-block">
                <span className="field-label" id="cityLabel">Explore your city</span>
                <div className="dropdown select-brand">
                  <button
                    className="select-brand__btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-labelledby="cityLabel"
                  >
                    <span className="select-brand__label">{city}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-brand">
                    {citiesLoading ? <DropdownSkeleton rows={5} /> : cities.map((c) => (
                      <li key={c}>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCity(c);
                          }}
                        >
                          {c}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Link className="header-logo" href="/">
              <img src="/assets/images/logo.jpg" alt="Moms Pops Tots" />
            </Link>

            <div className="header-right">
              <div className="header-actions d-none d-md-flex gap-3">
                <div className="dropdown">
                  <button className="btn btn-brand-outline dropdown-toggle dropdown-toggle-brand" type="button" data-bs-toggle="dropdown" aria-expanded="false">Register</button>
                  <ul className="dropdown-menu dropdown-menu-brand">
                    <li><a className="dropdown-item" href="#">Register as Exhibitor</a></li>
                    <li><a className="dropdown-item dropdown-item-green" href="#">Register as User</a></li>
                  </ul>
                </div>
                <div className="dropdown">
                  <button className="btn btn-brand-outline dropdown-toggle dropdown-toggle-brand" type="button" data-bs-toggle="dropdown" aria-expanded="false">Login</button>
                  <ul className="dropdown-menu dropdown-menu-brand">
                    <li><a className="dropdown-item" href="#">Login as Exhibitor</a></li>
                    <li><a className="dropdown-item dropdown-item-green" href="#">Login as User</a></li>
                  </ul>
                </div>
              </div>

              <button className="icon-btn divider-start" type="button" aria-label="Search">
                <img src="/assets/images/search-icon.svg" alt="" width={22} height={22} />
              </button>
              <button className="icon-btn icon-btn--dot divider-start" type="button" aria-label="Notifications">
                <img src="/assets/images/bell-icon.svg" alt="" width={20} height={22} />
              </button>
              <button className="icon-btn divider-start d-none d-md-inline-flex" type="button" aria-label="Accessibility">
                <img src="/assets/images/cycle-icon.svg" alt="" width={19} height={22} />
              </button>
              <div className="dropdown divider-start d-none d-md-block">
                <button className="icon-btn dropdown-toggle dropdown-toggle-brand" type="button" data-bs-toggle="dropdown" aria-expanded="false">{currentLang}</button>
                  <ul className="dropdown-menu dropdown-menu-brand dropdown-menu-end">
                    {languagesLoading ? <DropdownSkeleton rows={3} /> : languages.map((l) => (
                      <li key={l}>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setLang(l);
                          }}
                        >
                          {l.toUpperCase()}
                        </a>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </div>
        </div>

        <nav className="header-bottom d-none d-md-block" aria-label="Main navigation">
          <div className="container">
            <ul className="nav justify-content-center">
              {mainNavLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                  <Link className="nav-link" href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <div className="offcanvas offcanvas-start drawer-menu" tabIndex={-1} id="mainMenu" aria-label="Site menu">
        <div className="offcanvas-header">
          <button className="btn-blob" type="button" data-bs-dismiss="offcanvas" aria-label="Close menu">
            <img src="/assets/images/close-icon.svg" alt="" width={36} height={36} />
          </button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column drawer-nav">
            {drawerNavLinks.map((link) => (
              <li className="nav-item" key={link.label}>
                <Link className="nav-link" href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <hr className="divider-gradient" />

          <ul className="nav flex-column drawer-nav">
            <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Register</a></li>
          </ul>

          <hr className="divider-gradient" />

          <div className="d-flex gap-3">
            <a className="social-pebble social-pebble--pink" href="#" aria-label="Instagram"><img src="/assets/images/social-instagram.svg" alt="" width={20} height={20} /></a>
            <a className="social-pebble social-pebble--blue" href="#" aria-label="Facebook"><img src="/assets/images/social-facebook.svg" alt="" width={20} height={20} /></a>
            <a className="social-pebble social-pebble--green" href="#" aria-label="Twitter"><img src="/assets/images/social-twitter.svg" alt="" width={20} height={20} /></a>
          </div>
        </div>
      </div>
    </>
  );
}
