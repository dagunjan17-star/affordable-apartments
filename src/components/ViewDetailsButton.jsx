"use client";

import Link from "next/link";
import { useProperty } from "@/contextapi/propertycontext";

const renderedSlugs = new Set();

// yaha apni start date do
const START_DATE = "2026-05-21";

export default function ViewDetailsButton({
  href,
  slug,
}) {

  const { dailyLimit } = useProperty();

  // duplicate slug add na ho
  if (!renderedSlugs.has(slug)) {
    renderedSlugs.add(slug);
  }

  const buttonNumber =
    Array.from(renderedSlugs)
      .indexOf(slug) + 1;

  // days calculate
  const start =
    new Date(START_DATE);

  const today =
    new Date();

  const diffTime =
    today - start;

  const daysPassed =
    Math.floor(
      diffTime /
      (1000 * 60 * 60 * 24)
    );

  // day wise unlock
  const unlockedLimit =
    (daysPassed + 1) *
    dailyLimit;

  const isEnabled =
    buttonNumber <= unlockedLimit;

  return (
    <Link
      href={isEnabled ? href : "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex-1 border border-[#9E1C60]
                      text-[#9E1C60]
                      px-4 py-2.5
                      rounded-xl
                      hover:bg-[#9E1C60]
                      hover:text-white
                      transition text-sm font-medium text-center
        ${
          isEnabled
            ? ""
            : "cursor-not-allowed pointer-events-none"
        }
      `}
    >
      View Details
    </Link>
  );
}