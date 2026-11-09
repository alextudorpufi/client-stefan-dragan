import type { StaticImageData } from "next/image";
import workshopCover from "@/public/workshop1_1.jpeg";
import workshopDiscussion from "@/public/workshop1_2.jpeg";
import workshopGroup from "@/public/workshop1_3.jpeg";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: StaticImageData;
  imageAlt: string;
  isDemo?: boolean;
  source?: { label: string; url: string };
  sections: { id: string; title?: string; paragraphs: string[] }[];
  tags?: { label: string; url: string }[];
  gallery?: { image: StaticImageData; alt: string }[];
};

// Add articles here. Set isDemo to false only after the final text is approved.
export const posts: BlogPost[] = [
  {
    slug: "un-spatiu-pentru-dialog",
    title: "Panciu: tinerii au ales dialogul",
    description: "Două zile la rând, tinerii din Panciu au vorbit deschis despre un subiect de care se vorbește de obicei în șoaptă: alcoolul, drogurile și alegerile pe care le facem atunci când grupul ne împinge într-o direcție greșită.",
    category: "Din activitate",
    image: workshopCover,
    imageAlt: "Ștefan Drăgan discutând cu participanții la un atelier, lângă un flipchart.",
    source: {
      label: "Povestea atelierului, pe pagina Voluntariat pentru Viață",
      url: "https://www.instagram.com/voluntariatpentruviata/p/DfU4MK4EWuF/",
    },
    sections: [
      {
        id: "povestea-atelierului",
        paragraphs: [
          "Pe 2 și 3 noiembrie, Asociația Voluntariat Pentru Viața Mărășești a adus la Panciu workshopul de prevenire a consumului de alcool și droguri din proiectul NEST (SMIS 337570), cofinanțat prin FSE+ și derulat în parteneriat cu AJOFM Vrancea.",
          "În sală nu au fost bănci și catedră, doar un cerc de scaune. Psihoterapeutul Drăgan Ștefan a vorbit cu tinerii, nu doar le-a vorbit lor. Au discutat despre presiunea grupului, despre momentele în care un „hai, doar o dată” poate schimba un drum și despre curajul de a spune „nu”.",
          "Mesajul care rămâne: dependența este o boală cronică, sprijinul face diferența, iar schimbarea începe cu o decizie.",
          "Mulțumim gazdelor de la Casa de Cultură din Panciu și Primăriei Panciu pentru sprijin. Mulțumim din suflet tinerilor din Panciu, care au fost receptivi și au intrat în dialog cu psihoterapeutul Drăgan Ștefan. Voi ați făcut din acest workshop o conversație adevărată.",
          "Prevenția nu înseamnă frică. Înseamnă informație, încredere și oameni alături de tine.",
        ],
      },
    ],
    tags: [
      { label: "#VoluntariatPentruViata", url: "https://www.instagram.com/explore/tags/voluntariatpentruviata/" },
      { label: "#ProiectulNEST", url: "https://www.instagram.com/explore/tags/proiectulnest/" },
      { label: "#Prevenție", url: "https://www.instagram.com/explore/tags/preven%C8%9Bie/" },
      { label: "#FărăAlcoolȘiDroguri", url: "https://www.instagram.com/explore/tags/f%C4%83r%C4%83alcool%C8%99idroguri/" },
      { label: "#tineri", url: "https://www.instagram.com/explore/tags/tineri/" },
    ],
    gallery: [
      { image: workshopDiscussion, alt: "Ștefan Drăgan discutând cu participanții, lângă flipchart, la atelierul din Panciu." },
      { image: workshopGroup, alt: "Participanți la un atelier de grup, așezați în jurul unui flipchart." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getReadingMinutes(post: BlogPost) {
  const words = [post.description, ...post.sections.flatMap((section) => [section.title, ...section.paragraphs])].join(" ").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
