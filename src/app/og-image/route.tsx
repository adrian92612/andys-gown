/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FAFAFA",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://andys-gown.vercel.app/images/logoDark.webp"
          alt="Andy's Gown logo"
          width={1200}
          height={600}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
