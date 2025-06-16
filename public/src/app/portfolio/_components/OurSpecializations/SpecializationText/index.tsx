import Link from "next/link";
import "./index.scss";
export default function SpecializationText() {
  return (
    <>
      <p className="text-content">
        Every sector comes with its distinct challenges. With this
        understanding, our technical team utilizes the latest innovations to
        craft specialized solutions, carefully adapted to suit the unique needs
        and demands of our clients.
      </p>
      <Link
        href={"/services"}
        style={{ textDecoration: "none" }}
        className="cta-btn"
      >
        Our Offerings
      </Link>
    </>
  );
}
