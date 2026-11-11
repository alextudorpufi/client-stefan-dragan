import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Ștefan Drăgan — acasă">
      <Image src="/sd-logo.svg" alt="" width={44} height={44} className="brand-mark" />
      <span>Ștefan Drăgan<span className="brand-caption">SPAȚIU PENTRU CONVERSAȚIE</span></span>
    </Link>
  );
}
