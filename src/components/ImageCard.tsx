import thumbnail from "../assets/images/feed_thumbnail.jpg";
import iikeIcon from "../assets/like_icon.svg";
import chatIcon from "../assets/chat_icon.svg";

const cardData = {
  title: "카드 제목 한줄 넘어가면 말줄임표 처리가 됩니다",
  like: 4,
  chat: 12,
};

export default function ImageCard() {
  return (
    <>
      {/* 썸네일 */}
      <div
        className="group relative w-[300px] h-[300px] bg-cover bg-center rounded-2xl shadow-lg"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        {/* Hover */}
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg">
          <h3 className="w-[80%] text-[20px] font-semibold truncate">
            {cardData.title}
          </h3>
          {/* 아이콘 */}
          <div className="absolute bottom-6 right-6 flex gap-[18px] text-xl font-normal ">
            <div className="flex gap-1">
              <img src={iikeIcon} alt="좋아요 아이콘" />
              <span>{cardData.like}</span>
            </div>
            <div className="flex gap-1">
              <img src={chatIcon} alt="채팅 아이콘" />
              <span>{cardData.chat}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
