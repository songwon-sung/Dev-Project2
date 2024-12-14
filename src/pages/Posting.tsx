import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import downIcon from "../assets/down.svg";
import PostStatus from "../components/posting/PostStatus";
import { postingFn } from "../utils/postingFn";
import { useNavigate } from "react-router";

export default function Posting() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const imgRef = useRef<HTMLInputElement>(null);
  // 이미지
  const [img, setImg] = useState<string>("");
  // 제목
  const [title, setTitle] = useState("");
  // 설명
  const [desc, setDesc] = useState("");
  // 게시판
  const [channel, setChannel] = useState("게시판 선택");

  // api에 보낼 채널id
  const [channelId, setChannelId] = useState("");

  const [openChannel, setOpenChannel] = useState(false);

  // 이미지 미리보기
  const handleChange = () => {
    if (imgRef.current && imgRef.current.files) {
      console.log(imgRef.current.files);
      const image = imgRef.current.files[0];
      if (image.type.startsWith("image/")) {
        const imgUrl = URL.createObjectURL(image);
        setImg(imgUrl);
      } else {
        alert("이미지 선택하세요");
      }

      // 다중 이미지 (나중에 api업데이트 시 사용)
      // for (let i = 0; i < images.length; i++) {
      //   const imgUrl = URL.createObjectURL(images[i]);
      //   console.log(imgUrl);
      //   setImg((prev) => [...prev, imgUrl]);
      // }
    }
  };

  const channelClick = (channelName: string) => {
    setChannel(channelName);
  };

  const channels = [
    { id: "6757a3a7ce18fa02ded5c758", name: "오운완 인증", route: "/" },
    { id: "6758f6bf5f86e71ae5eb9b6c", name: "프로틴 추천", route: "/protein" },
    { id: "6758f7305f86e71ae5eb9b82", name: "루틴 공유", route: "/routine" },
    {
      id: "6758f75b5f86e71ae5eb9bae",
      name: "헬스장 리뷰",
      route: "/gymreview",
    },
  ];

  const channelBtnClick = () => {
    setOpenChannel((prev) => !prev);
  };

  // 글 등록 요청
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !imgRef.current ||
      !imgRef.current.files ||
      imgRef.current.files.length === 0
    ) {
      alert("이미지를 선택하세요.");
      return;
    }

    const formData = new FormData();

    formData.append("title", JSON.stringify({ HTitle: title, desc }));
    formData.append("image", imgRef.current.files[0]);
    formData.append("channelId", channelId);

    const route = channels.filter((ch) => channelId === ch.id);

    try {
      setIsLoading(true);
      const response = await postingFn(formData);
      console.log(response);
      alert("글 등록 성공!!");
      navigate(route[0].route);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-start items-start outline-none h-full bg-slate-100">
      <div className="m-auto pt-[20px] pb-[20px] h-[650px] bg-white flex flex-col items-center gap-5 rounded-[20px]">
        <h1 className="text-[#030712] font-bold text-[30px]">글쓰기</h1>
        {/* log */}

        <PostStatus img={img} title={title} desc={desc} channel={channel} />

        <form
          className="w-[1000px] h-[480px] flex items-center justify-center gap-10 bg-white"
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* 이미지 등록 */}
          <div className=" h-[390px] flex flex-col justify-center items-center gap-3">
            <div
              className={`w-[300px] h-full bg-[#F4F6F8] flex  gap-[10px] ${
                img.length > 0
                  ? "flex-wrap items-start justify-start"
                  : "items-center justify-center"
              }  rounded-[5px]`}
            >
              {img.length > 0 && (
                <img
                  src={img}
                  alt="이미지"
                  className="w-full h-full bg-white"
                />
              )}
              <p className="text-[#91989E] w-[80px] text-center">
                {img.length < 1 ? "이미지 등록 필수입니다" : ""}
              </p>
            </div>
            <div>
              <input
                type="file"
                id="uploadImg"
                className="hidden"
                ref={imgRef}
                accept="image/*"
                onChange={handleChange}
              />
              <label
                htmlFor="uploadImg"
                className="bg-[#B9B9B9] w-[180px] h-[40px] flex justify-center items-center cursor-pointer rounded-[5px] text-white"
              >
                이미지 파일 선택하기
              </label>
            </div>
          </div>

          {/* 게시글 정보 입력 폼 */}
          <div className="flex flex-col w-[500px] items-end gap-4">
            <div
              className="w-full h-[50px] relative bg-[#F4F6F8] flex justify-between items-center px-[15px] text-[18px] text-[#91989E] cursor-pointer"
              onClick={channelBtnClick}
            >
              {channel}
              <img
                src={downIcon}
                alt="down 아이콘"
                className="w-[20px] cursor-pointer"
              />
              <ul id="channel" className="absolute w-full left-0 top-[45px]">
                {channels.map((item) => {
                  return (
                    <li
                      key={item.id}
                      id={item.id}
                      className={twMerge(
                        `bg-white border w-full h-[45px] px-[10px] text-[18px] flex items-center justify-center hover:bg-[#E8F3FC] ${
                          openChannel ? "flex" : "hidden"
                        }`
                      )}
                      onClick={() => {
                        channelClick(item.name);
                        setChannelId(item.id);
                      }}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              className=" w-full h-[50px] bg-[#F4F6F8]  outline-none text-[18px] px-[15px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="desc"
              id="desc"
              placeholder="내용을 작성해주세요"
              className=" resize-none outline-none w-full h-[200px] bg-[#F4F6F8] py-[10px] px-[15px] text-[20px]"
              maxLength={1000}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <button
              className={`w-[80px] h-[40px] text-white rounded-[10px] ${
                !img.length ||
                channel === "게시판 선택" ||
                !title ||
                !desc ||
                isLoading
                  ? "cursor-default bg-[#4772b2a5]"
                  : "cursor-pointer bg-[#4772b2]"
              }`}
              disabled={
                !img.length ||
                channel === "게시판 선택" ||
                !title ||
                !desc ||
                isLoading
              }
            >
              {isLoading ? "로딩중" : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
