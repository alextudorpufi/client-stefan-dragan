import Image from "next/image";
import profilePicture from "@/public/terapeutProfilePic.jpeg";

export function ProfilePicture() {
  return (
    <div className="profile-picture">
      <Image
        src={profilePicture}
        alt="Portretul lui Ștefan Drăgan"
        fill
        sizes="(max-width: 700px) 80vw, (max-width: 1000px) 34vw, 380px"
        placeholder="blur"
        preload
        className="profile-image"
      />
    </div>
  );
}
