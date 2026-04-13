import { NextResponse } from "next/server";
import { generateSitemap } from "../../lib/sitemap";

export async function GET() {
  try {
    const sitemap = await generateSitemap();
    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Sitemap generation failed:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}