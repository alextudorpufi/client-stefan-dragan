import Image from "next/image";

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Ștefan Drăgan — acasă">
      <Image src="/sd-logo.svg" alt="" width={44} height={44} className="brand-mark" />
      <span>Ștefan Drăgan<span className="brand-caption">SPAȚIU PENTRU CONVERSAȚIE</span></span>
    </a>
  );
}
