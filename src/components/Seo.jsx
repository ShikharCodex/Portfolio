import { useEffect } from "react";
import { profile } from "../data/portfolio";

export default function Seo({ title, description }) {
  useEffect(() => {
    const nextTitle = title ? `${title} - ${profile.brand}` : `${profile.brand} - ${profile.title}`;
    document.title = nextTitle;

    const setMeta = (selector, attribute, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attribute, value);
    };

    if (description) {
      setMeta("meta[name='description']", "content", description);
      setMeta("meta[property='og:description']", "content", description);
      setMeta("meta[name='twitter:description']", "content", description);
    }

    setMeta("meta[property='og:title']", "content", nextTitle);
    setMeta("meta[name='twitter:title']", "content", nextTitle);
  }, [title, description]);

  return null;
}
