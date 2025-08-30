import authimage from "../assets/images/authimage.png";

interface AlbumCardProps {
  title?: string;
  imageUrl?: string;
}

const AlbumCard = ({ title, imageUrl }: AlbumCardProps) => {
  return (
    <div className="flex flex-col items-start cursor-pointer">
      <img
        src={imageUrl ?? authimage}
        alt="Album Art"
        className="w-40 h-40 object-cover rounded-lg mb-4"
      />
      <p className="text-lg font-semibold text-white mb-2">{title}</p>
    </div>
  );
};

export default AlbumCard;
