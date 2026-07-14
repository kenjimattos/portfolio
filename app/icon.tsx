import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(ellipse 80% 80% at 30% 20%, rgba(0, 73, 255, 0.35), transparent 65%), radial-gradient(ellipse 70% 70% at 80% 90%, rgba(120, 0, 255, 0.25), transparent 65%)",
          borderRadius: 96,
        }}
      >
        <span
          style={{
            fontSize: 240,
            fontWeight: 800,
            letterSpacing: "-0.08em",
            color: "#fffff9",
          }}
        >
          kn
        </span>
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: 9999,
            backgroundColor: "#0049FF",
            marginTop: 130,
            marginLeft: 8,
          }}
        />
      </div>
    ),
    size
  );
}
