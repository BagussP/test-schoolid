import Image from "next/image";
import Link from "next/link";

type DataMasterButton = {
    buttonName: string;
    slug: string;
    images: string;
}

export const Button: React.FC<DataMasterButton> = ({ buttonName, slug, images }) => {
  return (
    <Link
      href={`${slug}`}
      className="w-58 h-58 rounded-[20px] bg-white flex flex-col items-center justify-center gap-6"
    >
      <Image
        src={`/icons/button/${images}.png`}
        width={120}
        height={120}
        alt={buttonName}
        quality={100}
        unoptimized={true}
      />
      <p className="font-medium w-[184px] text-lg text-center">{buttonName}</p>
    </Link>
  );
};
