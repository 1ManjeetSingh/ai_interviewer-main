import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import image1 from "../assets/image1.png";
import image2 from "../assets/Aspireit.png";
import image3 from "../assets/Ellipse.png";
import image4 from "../assets/Type=Layila.svg";
import image5 from "../assets/Group.svg";
import Carousel from "../Components/carousel/Carousel";

const slidesData = [
  {
    title: "Unique Tailored Solutions",
    description: "Receive a custom set of questions tailored to your needs.",
    icon: (
      <img
        className="w-[220px] h-[200px]"
        src="https://s3-alpha-sig.figma.com/img/ecea/1173/4777aab880058fb4d2147c3b11940289?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QbGZixBK2vRFeSgx7RL7~wYQ0C2QYUTEIxTNFpxuhdQrS9t4-a0y3nmeIUifHGr64T8iKP09Tet~cPOFQmAc0rXMg~e5CgY-XlqovuD6fsQlRnXkznGOG0vIeR4XUSEb5GpVDozCznyIN4rvRJscovEwjmqyI0nZVebVEL9DfQaQXRG35B5VtQY-OYzeppO663ovSlVT0ar9xxjsomMvCIH5vj7OBqkgASuC8UzxJGh0ZyzJ5pYA~QRtHpBA8YNFOWiKR1S6no-8UPivfn4vvyGHLpnvdlNpHEG4uF3fd79Q-flxDoQgNx7yyRTT~u2WvAca3zIN2zWz9MlvC-y4Ag__"
        alt=""
      />
    ),
  },
  {
    title: "Multi-Select Options",
    description: "Conveniently choose multiple options from a list.",
    icon: (
      <img
        className="w-[220px] h-[200px]"
        src="https://s3-alpha-sig.figma.com/img/ecea/1173/4777aab880058fb4d2147c3b11940289?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QbGZixBK2vRFeSgx7RL7~wYQ0C2QYUTEIxTNFpxuhdQrS9t4-a0y3nmeIUifHGr64T8iKP09Tet~cPOFQmAc0rXMg~e5CgY-XlqovuD6fsQlRnXkznGOG0vIeR4XUSEb5GpVDozCznyIN4rvRJscovEwjmqyI0nZVebVEL9DfQaQXRG35B5VtQY-OYzeppO663ovSlVT0ar9xxjsomMvCIH5vj7OBqkgASuC8UzxJGh0ZyzJ5pYA~QRtHpBA8YNFOWiKR1S6no-8UPivfn4vvyGHLpnvdlNpHEG4uF3fd79Q-flxDoQgNx7yyRTT~u2WvAca3zIN2zWz9MlvC-y4Ag__"
        alt=""
      />
    ),
  },
  {
    title: "Seamless Integration",
    description: "Works with your existing systems without hassle.",
    icon: (
      <img
        className="w-[220px] h-[200px]"
        src="https://s3-alpha-sig.figma.com/img/ecea/1173/4777aab880058fb4d2147c3b11940289?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QbGZixBK2vRFeSgx7RL7~wYQ0C2QYUTEIxTNFpxuhdQrS9t4-a0y3nmeIUifHGr64T8iKP09Tet~cPOFQmAc0rXMg~e5CgY-XlqovuD6fsQlRnXkznGOG0vIeR4XUSEb5GpVDozCznyIN4rvRJscovEwjmqyI0nZVebVEL9DfQaQXRG35B5VtQY-OYzeppO663ovSlVT0ar9xxjsomMvCIH5vj7OBqkgASuC8UzxJGh0ZyzJ5pYA~QRtHpBA8YNFOWiKR1S6no-8UPivfn4vvyGHLpnvdlNpHEG4uF3fd79Q-flxDoQgNx7yyRTT~u2WvAca3zIN2zWz9MlvC-y4Ag__"
        alt=""
      />
    ),
  },
  {
    title: "Real-Time Analytics",
    description: "Get insights on your performance in real-time.",
    icon: (
      <img
        className="w-[220px] h-[200px]"
        src="https://s3-alpha-sig.figma.com/img/ecea/1173/4777aab880058fb4d2147c3b11940289?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QbGZixBK2vRFeSgx7RL7~wYQ0C2QYUTEIxTNFpxuhdQrS9t4-a0y3nmeIUifHGr64T8iKP09Tet~cPOFQmAc0rXMg~e5CgY-XlqovuD6fsQlRnXkznGOG0vIeR4XUSEb5GpVDozCznyIN4rvRJscovEwjmqyI0nZVebVEL9DfQaQXRG35B5VtQY-OYzeppO663ovSlVT0ar9xxjsomMvCIH5vj7OBqkgASuC8UzxJGh0ZyzJ5pYA~QRtHpBA8YNFOWiKR1S6no-8UPivfn4vvyGHLpnvdlNpHEG4uF3fd79Q-flxDoQgNx7yyRTT~u2WvAca3zIN2zWz9MlvC-y4Ag__"
        alt=""
      />
    ),
  },
  {
    title: "Customizable Themes",
    description: "Personalize the experience with custom themes.",
    icon: (
      <img
        className="w-[220px] h-[200px]"
        src="https://s3-alpha-sig.figma.com/img/ecea/1173/4777aab880058fb4d2147c3b11940289?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QbGZixBK2vRFeSgx7RL7~wYQ0C2QYUTEIxTNFpxuhdQrS9t4-a0y3nmeIUifHGr64T8iKP09Tet~cPOFQmAc0rXMg~e5CgY-XlqovuD6fsQlRnXkznGOG0vIeR4XUSEb5GpVDozCznyIN4rvRJscovEwjmqyI0nZVebVEL9DfQaQXRG35B5VtQY-OYzeppO663ovSlVT0ar9xxjsomMvCIH5vj7OBqkgASuC8UzxJGh0ZyzJ5pYA~QRtHpBA8YNFOWiKR1S6no-8UPivfn4vvyGHLpnvdlNpHEG4uF3fd79Q-flxDoQgNx7yyRTT~u2WvAca3zIN2zWz9MlvC-y4Ag__"
        alt=""
      />
    ),
  },
  {
    title: "24/7 Support",
    description: "Get assistance anytime, anywhere.",
    icon: (
      <img
        className="w-[220px] h-[200px]"
        src="https://s3-alpha-sig.figma.com/img/ecea/1173/4777aab880058fb4d2147c3b11940289?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QbGZixBK2vRFeSgx7RL7~wYQ0C2QYUTEIxTNFpxuhdQrS9t4-a0y3nmeIUifHGr64T8iKP09Tet~cPOFQmAc0rXMg~e5CgY-XlqovuD6fsQlRnXkznGOG0vIeR4XUSEb5GpVDozCznyIN4rvRJscovEwjmqyI0nZVebVEL9DfQaQXRG35B5VtQY-OYzeppO663ovSlVT0ar9xxjsomMvCIH5vj7OBqkgASuC8UzxJGh0ZyzJ5pYA~QRtHpBA8YNFOWiKR1S6no-8UPivfn4vvyGHLpnvdlNpHEG4uF3fd79Q-flxDoQgNx7yyRTT~u2WvAca3zIN2zWz9MlvC-y4Ag__"
        alt=""
      />
    ),
  },
];

const AfterSelectionUpdated = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isFocused1, setisFocused1] = useState(false);
  const [selected, setSelected] = useState("nonTechnical");
  const [secondTabSelected, setSecondTabSelected] = useState("airounds");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearch = (e) => {
    setSearchPhrase(e.target.value);
  };

  useEffect(() => {
    if (isFocused1 === false) {
      setSearchPhrase("");
    }
  }, [isFocused1]);

  // <------------ to restrict small size windows ------------>

  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  // Thresholds for height and width
  const thresholdHeight = 468; // Minimum height
  const thresholdWidth = 768; // Minimum width

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall =
        window.innerHeight < thresholdHeight ||
        window.innerWidth < thresholdWidth;
      setIsScreenTooSmall(isSmall);
    };

    // Initial check
    checkScreenSize();

    // Add resize event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <>
      {isScreenTooSmall ? (
        <div className="h-screen flex items-center justify-center bg-gray-200 text-center text-2xl font-bold text-red-500">
          <span className="block md:inline">
            Please open on a&nbsp;
            <span className="text-2xl text-[#000]">Larger Screen</span>
            &nbsp;or try in&nbsp;
            <span className="text-2xl text-[#000]">Landscape.</span>
          </span>
        </div>
      ) : (
        <div className="main-container min-h-[100vh] bg-[#F2F2F2]">
          <div className="NavBar w-full mx-[auto] h-[8vh] min-h-[42px] px-8 bg-white border border-[#D2D2D2] backdrop-blur-[220px] flex justify-between items-center hover:cursor-pointer">
            <div className="logo-container w-[130px] h-[5vh] min-h-[24px] relative  bg-[#FFF]">
              <div className="Rectangle7391 w-[9vw] h-[4.5vh] min-h-[24px] relative bg-[#0F0F36] rounded-[6px]" />
              <div className="logo w-[9vw] h-[4vh] min-h-[24px] absolute left-[0px] top-[1px] bg-none flex justify-center items-center gap-[0.3vw]">
                <img
                  className="Aspireit w-[1.5vw] bg-transparent shrink-0"
                  src={image1}
                />
                <img
                  className="Group1000007770 bg-transparent w-[5vw] h-[2vh] shrink-0"
                  src={image2}
                />
              </div>
            </div>
            <div className="SearchBarContainer w-full flex grow justify-center items-center gap-4 bg-none">
              <div className="InputContainer w-[55%] flex justify-start items-center gap-4 h-[5vh] min-h-[24px] pl-6 pr-6 bg-[#F2F2F2] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-[32px]">
                <div className="searchBar inline-flex items-center h-[5vh] w-full bg-[#F2F2F2]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                    fill="none"
                    className={`w-[3vh] h-[3vh] shrink-0 rounded-full mr-1 ${
                      isFocused1
                        ? "transform scale-110 transition-transform duration-300"
                        : ""
                    }`}
                  >
                    <path
                      d="M9.49996 2.75C8.16495 2.75 6.85991 3.14588 5.74989 3.88757C4.63986 4.62927 3.7747 5.68347 3.26381 6.91686C2.75292 8.15026 2.61925 9.50745 2.8797 10.8168C3.14015 12.1262 3.78302 13.3289 4.72702 14.2729C5.67102 15.2169 6.87375 15.8598 8.18311 16.1202C9.49248 16.3807 10.8497 16.247 12.0831 15.7361C13.3165 15.2252 14.3707 14.3601 15.1124 13.25C15.854 12.14 16.2499 10.835 16.2499 9.49996C16.2498 7.70979 15.5386 5.99298 14.2728 4.72714C13.0069 3.46131 11.2901 2.75011 9.49996 2.75Z"
                      stroke="#353535"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M14.666 14.668L18.3327 18.3346"
                      stroke="#353535"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    className="justify-start px-2 w-full max-w-[657px] text-[#353535] py-[0.5vh] text-[2vh] leading-[18px] border-0 bg-[#F2F2F2] focus:outline-none focus:text-[#353535]"
                    onClick={focusInput}
                    type="text"
                    name="searchBar"
                    value={isFocused1 ? searchPhrase : ""}
                    onChange={handleSearch}
                    onFocus={() => setisFocused1(true)}
                    onBlur={() => setisFocused1(false)}
                    placeholder="Search"
                    ref={inputRef}
                  />
                </div>
              </div>
            </div>

            <div className="Frame1000008205 flex justify-start items-center w-fit gap-[1vw] bg-none">
              <div className="Frame1000008204 px-[2vh] py-[2px] bg-[#F2F2F2] flex justify-start items-center shadow-[0px_0px_6px_rgba(0,_0,_0,_0.25)] rounded-[40px] backdrop-blur-[4px]">
                <div className="ButtonsNotification w-[5vh] min-w-[24px] h-[5vh] min-h-[24px] mr-[1.5vh] relative bg-[#F2F2F2]">
                  <div className="Ellipse w-[5vh] h-[5vh] min-w-[24px] min-h-[24px] absolute left-0 top-0 bg-white rounded-full" />
                  <div className="IconsBell w-[4vh] h-[4vh] min-w-[18px] min-h-[18px] absolute left-[1vh] top-[1vh] bg-none hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-[3vh] h-[3vh] min-w-[16px] min-h-[16px]"
                    >
                      <path
                        d="M21 6.50001C21 8.43001 19.43 10 17.5 10C15.57 10 14 8.43001 14 6.50001C14 4.57001 15.57 3.00001 17.5 3.00001C19.43 3.00001 21 4.57001 21 6.50001ZM19 11.79C18.5 11.92 18 12 17.5 12C16.0421 11.9974 14.6447 11.4171 13.6138 10.3862C12.583 9.3553 12.0026 7.95788 12 6.50001C12 5.03001 12.58 3.70001 13.5 2.71001C13.3185 2.48755 13.0897 2.30838 12.8302 2.18555C12.5707 2.06272 12.2871 1.99934 12 2.00001C10.9 2.00001 10 2.90001 10 4.00001V4.29001C7.03 5.17001 5 7.90001 5 11V17L3 19V20H21V19L19 17V11.79ZM12 23C13.11 23 14 22.11 14 21H10C10 21.5304 10.2107 22.0391 10.5858 22.4142C10.9609 22.7893 11.4696 23 12 23Z"
                        fill="#0072DC"
                      />
                    </svg>
                  </div>
                </div>
                <div className="Profile flex justify-end items-center bg-[#F2F2F2] hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300">
                  <img
                    className="AvatarPic w-[5vh] min-w-[24px] bg-none rounded-full"
                    src={image3}
                  />
                </div>
              </div>
              <div className="Ai w-[4.5vw] min-w-[42px] bg-none">
                <img
                  className="Layila h-[7.5vh] bg-none rounded-full hover:transform hover:scale-[1.08] hover:transition-transform hover:duration-300"
                  src={image4}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div
              className="LetsGetYouStarted text-center text-[40px] font-bold leading-[48px]
      text-[#D388FF] break-words mt-[4vh] mb-[2.5vh] text-transparent w-[95vw] md:w-[78vw] lg:w-[65vw]"
              style={{
                background:
                  "linear-gradient(325deg, #D388FF 21.06%, #4B94F6 83.52%)",
                backgroundClip: "text",
              }}
            >
              {`Let's get you started with scheduling your AI interview`}
            </div>

            <div className="YouHaveSelected1024CandidatesForInterview text-center">
              <span className=" text-[#161616] text-[24px] font-[400] leading-[3vh] break-words">
                You have selected
              </span>
              <span className="text-[#161616] text-[24px] font-[400]  leading-[3vh] break-words">
                &nbsp;
              </span>
              <span className="text-[#0072DC] text-[24px] font-[400] leading-[3vh] break-words">
                1024 candidates
              </span>
              &nbsp;
              <span className=" text-[#161616] text-[24px] font-[400] leading-[3vh] break-words">
                for interview.
              </span>
            </div>

            <div>
              <div className="toogleContainer w-fit flex bg-[#E2E2E2] rounded-full p-1 space-x-4 mt-[3vh]">
                {/* Non-Technical Button */}

                <button
                  className={`w-fit p-[1vh_24px] text-3xl flex items-center justify-center rounded-full font-regular transition duration-300 ease-in-out ${
                    selected === "nonTechnical"
                      ? "bg-para-text-gradient text-white focus:outline-none border-none"
                      : "bg-white text-gray-700 focus:outline-none border-none"
                  }`}
                  onClick={() => setSelected("nonTechnical")}
                >
                  {selected === "nonTechnical" ? (
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      width="26"
                      height="30"
                      viewBox="0 0 26 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0233 7.54762C13.2639 6.89742 14.1835 6.89742 14.4241 7.54762L16.4602 13.05C16.6871 13.6633 17.1706 14.1468 17.7839 14.3737L23.2863 16.4098C23.9365 16.6504 23.9365 17.57 23.2863 17.8106L17.7839 19.8467C17.1706 20.0736 16.6871 20.5571 16.4602 21.1704L14.4241 26.6727C14.1835 27.3229 13.2639 27.3229 13.0233 26.6727L10.9872 21.1704C10.7603 20.5571 10.2768 20.0736 9.66352 19.8467L4.16114 17.8106C3.51094 17.57 3.51095 16.6504 4.16115 16.4098L9.66352 14.3737C10.2768 14.1468 10.7603 13.6633 10.9872 13.05L13.0233 7.54762Z"
                        fill="white"
                      />
                      <path
                        d="M22.4776 19.15C22.5979 18.8249 23.0577 18.8249 23.178 19.15L23.5786 20.2325C23.6164 20.3347 23.697 20.4153 23.7992 20.4531L24.8817 20.8537C25.2068 20.974 25.2068 21.4338 24.8817 21.5541L23.7992 21.9546C23.697 21.9925 23.6164 22.073 23.5786 22.1752L23.178 23.2577C23.0577 23.5828 22.5979 23.5828 22.4776 23.2577L22.0771 22.1752C22.0392 22.073 21.9587 21.9925 21.8564 21.9546L20.774 21.5541C20.4489 21.4338 20.4489 20.974 20.774 20.8537L21.8564 20.4531C21.9587 20.4153 22.0392 20.3347 22.0771 20.2325L22.4776 19.15Z"
                        fill="white"
                      />
                      <path
                        d="M6.1654 2.22633C6.40599 1.57613 7.32563 1.57613 7.56622 2.22633L8.36089 4.3739C8.43654 4.57832 8.59771 4.7395 8.80213 4.81514L10.9497 5.60981C11.5999 5.85041 11.5999 6.77004 10.9497 7.01064L8.80213 7.80531C8.59771 7.88095 8.43654 8.04213 8.36089 8.24655L7.56622 10.3941C7.32563 11.0443 6.40599 11.0443 6.1654 10.3941L5.37072 8.24655C5.29508 8.04213 5.13391 7.88095 4.92949 7.80531L2.78192 7.01064C2.13172 6.77004 2.13172 5.85041 2.78192 5.60981L4.92949 4.81514C5.13391 4.7395 5.29508 4.57832 5.37072 4.3739L6.1654 2.22633Z"
                        fill="white"
                      />
                      <path
                        d="M19.8153 5.31396L20.5782 7.37565C20.6916 7.68228 20.9334 7.92404 21.24 8.0375L23.3017 8.80039L21.24 9.56328C20.9334 9.67674 20.6916 9.9185 20.5782 10.2251L19.8153 12.2868L19.0524 10.2251C18.9389 9.9185 18.6972 9.67674 18.3905 9.56328L16.3289 8.80039L18.3905 8.0375C18.6972 7.92404 18.9389 7.68228 19.0524 7.37564L19.8153 5.31396Z"
                        fill="white"
                      />
                      <path
                        d="M6.87154 21.5679C7.13433 21.3418 7.53653 21.5647 7.48418 21.9074L7.20733 23.7196C7.19087 23.8273 7.2223 23.9369 7.29337 24.0195L8.48888 25.4093C8.71494 25.6721 8.49207 26.0743 8.1494 26.022L6.33716 25.7451C6.22943 25.7287 6.11988 25.7601 6.03726 25.8312L4.64744 27.0267C4.38464 27.2527 3.98245 27.0299 4.0348 26.6872L4.31165 24.875C4.32811 24.7672 4.29668 24.6577 4.22561 24.575L3.03009 23.1852C2.80404 22.9224 3.02691 22.5202 3.36958 22.5726L5.18181 22.8494C5.28955 22.8659 5.3991 22.8345 5.48172 22.7634L6.87154 21.5679Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="27"
                      viewBox="0 0 23 27"
                      fill="none"
                    >
                      <path
                        d="M19.7981 17.4842C19.9592 17.0489 20.5749 17.0489 20.736 17.4842L20.9226 17.9886C20.9733 18.1255 21.0812 18.2334 21.2181 18.284L21.7225 18.4707C22.1578 18.6318 22.1578 19.2475 21.7225 19.4085L21.2181 19.5952C21.0812 19.6459 20.9733 19.7538 20.9226 19.8906L20.736 20.3951C20.5749 20.8304 19.9592 20.8304 19.7981 20.3951L19.6115 19.8906C19.5608 19.7538 19.4529 19.6459 19.3161 19.5952L18.8116 19.4085C18.3763 19.2475 18.3763 18.6318 18.8116 18.4707L19.3161 18.284C19.4529 18.2334 19.5608 18.1255 19.6115 17.9886L19.7981 17.4842Z"
                        fill="url(#paint0_linear_13_19)"
                      />
                      <path
                        d="M4.86041 2.18043C5.20448 1.36596 6.35869 1.36596 6.70276 2.18043L7.23437 3.43885C7.33569 3.67869 7.52656 3.86956 7.7664 3.97088L9.02481 4.50248C9.83929 4.84655 9.83929 6.00077 9.02481 6.34484L7.7664 6.87645C7.52656 6.97777 7.33569 7.16863 7.23437 7.40848L6.70276 8.66689C6.35869 9.48136 5.20448 9.48136 4.86041 8.66689L4.3288 7.40848C4.22748 7.16863 4.03661 6.97777 3.79677 6.87645L2.53836 6.34484C1.72389 6.00077 1.72389 4.84655 2.53836 4.50248L3.79677 3.97088C4.03661 3.86956 4.22748 3.67869 4.3288 3.43884L4.86041 2.18043Z"
                        fill="url(#paint1_linear_13_19)"
                      />
                      <path
                        d="M17.5335 4.51958L17.9093 5.53521C18.2131 6.35636 18.8606 7.0038 19.6817 7.30765L20.6974 7.68347L19.6817 8.05928C18.8606 8.36314 18.2131 9.01057 17.9093 9.83173L17.5335 10.8474L17.1576 9.83173C16.8538 9.01057 16.2064 8.36314 15.3852 8.05928L14.3696 7.68347L15.3852 7.30765C16.2064 7.0038 16.8538 6.35636 17.1576 5.53521L17.5335 4.51958Z"
                        fill="url(#paint2_linear_13_19)"
                      />
                      <path
                        d="M5.45679 19.5537C5.80867 19.2511 6.34721 19.5495 6.27712 20.0083L6.10283 21.1492C6.08079 21.2934 6.12287 21.4401 6.21804 21.5508L6.97067 22.4257C7.27335 22.7776 6.97493 23.3161 6.5161 23.246L5.37521 23.0718C5.23096 23.0497 5.08427 23.0918 4.97364 23.187L4.09869 23.9396C3.7468 24.2423 3.20826 23.9439 3.27836 23.485L3.45265 22.3441C3.47469 22.1999 3.43261 22.0532 3.33744 21.9426L2.58481 21.0676C2.28213 20.7157 2.58054 20.1772 3.03938 20.2473L4.18026 20.4216C4.32452 20.4436 4.4712 20.4015 4.58183 20.3064L5.45679 19.5537Z"
                        fill="url(#paint3_linear_13_19)"
                      />
                      <path
                        d="M11.5362 6.0961C11.6973 5.66079 12.313 5.66079 12.4741 6.09609L13.8555 9.82927C14.4632 11.4716 15.758 12.7664 17.4004 13.3742L21.1335 14.7556C21.5688 14.9166 21.5688 15.5323 21.1335 15.6934L17.4004 17.0748C15.758 17.6825 14.4632 18.9774 13.8555 20.6197L12.4741 24.3529C12.313 24.7882 11.6973 24.7882 11.5362 24.3529L10.1548 20.6197C9.54711 18.9774 8.25224 17.6825 6.60993 17.0748L2.87675 15.6934C2.44144 15.5323 2.44144 14.9166 2.87675 14.7556L6.60993 13.3742C8.25224 12.7664 9.54711 11.4716 10.1548 9.82927L11.5362 6.0961Z"
                        fill="url(#paint4_linear_13_19)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_13_19"
                          x1="18.8513"
                          y1="17.7518"
                          x2="22.9898"
                          y2="24.0685"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#D388FF" />
                          <stop offset="0.695" stopColor="#4B94F7" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_13_19"
                          x1="9.82792"
                          y1="10.8475"
                          x2="-3.24088"
                          y2="-3.92592"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.0189477" stopColor="#89B5FF" />
                          <stop offset="0.745" stopColor="#002886" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_13_19"
                          x1="19.8938"
                          y1="10.8474"
                          x2="12.2704"
                          y2="2.22955"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" />
                          <stop offset="0.315" stopColor="#FF8CB6" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_13_19"
                          x1="5.36766"
                          y1="26.0916"
                          x2="2.6004"
                          y2="13.6139"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FF5FD7" />
                          <stop offset="0.545" stopColor="#C86AFF" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_13_19"
                          x1="25.0462"
                          y1="32.551"
                          x2="2.51143"
                          y2="3.98021"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.340919" stopColor="#002DBF" />
                          <stop offset="0.479627" stopColor="#4396F7" />
                          <stop offset="0.634404" stopColor="#FF9BD2" />
                          <stop offset="0.815235" stopColor="#C9FFFC" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  AI Interview
                </button>

                {/* Technical Button */}
                <button
                  className={`w-fit p-[1vh_24px] text-3xl flex items-center justify-center font-regular rounded-full transition duration-300 ease-in-out ${
                    selected === "technical"
                      ? "bg-para-text-gradient text-white focus:outline-none border-none"
                      : "bg-white text-gray-700 focus:outline-none border-none"
                  }`}
                  onClick={() => setSelected("technical")}
                >
                  {selected === "technical" ? (
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      width="26"
                      height="30"
                      viewBox="0 0 26 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0233 7.54762C13.2639 6.89742 14.1835 6.89742 14.4241 7.54762L16.4602 13.05C16.6871 13.6633 17.1706 14.1468 17.7839 14.3737L23.2863 16.4098C23.9365 16.6504 23.9365 17.57 23.2863 17.8106L17.7839 19.8467C17.1706 20.0736 16.6871 20.5571 16.4602 21.1704L14.4241 26.6727C14.1835 27.3229 13.2639 27.3229 13.0233 26.6727L10.9872 21.1704C10.7603 20.5571 10.2768 20.0736 9.66352 19.8467L4.16114 17.8106C3.51094 17.57 3.51095 16.6504 4.16115 16.4098L9.66352 14.3737C10.2768 14.1468 10.7603 13.6633 10.9872 13.05L13.0233 7.54762Z"
                        fill="white"
                      />
                      <path
                        d="M22.4776 19.15C22.5979 18.8249 23.0577 18.8249 23.178 19.15L23.5786 20.2325C23.6164 20.3347 23.697 20.4153 23.7992 20.4531L24.8817 20.8537C25.2068 20.974 25.2068 21.4338 24.8817 21.5541L23.7992 21.9546C23.697 21.9925 23.6164 22.073 23.5786 22.1752L23.178 23.2577C23.0577 23.5828 22.5979 23.5828 22.4776 23.2577L22.0771 22.1752C22.0392 22.073 21.9587 21.9925 21.8564 21.9546L20.774 21.5541C20.4489 21.4338 20.4489 20.974 20.774 20.8537L21.8564 20.4531C21.9587 20.4153 22.0392 20.3347 22.0771 20.2325L22.4776 19.15Z"
                        fill="white"
                      />
                      <path
                        d="M6.1654 2.22633C6.40599 1.57613 7.32563 1.57613 7.56622 2.22633L8.36089 4.3739C8.43654 4.57832 8.59771 4.7395 8.80213 4.81514L10.9497 5.60981C11.5999 5.85041 11.5999 6.77004 10.9497 7.01064L8.80213 7.80531C8.59771 7.88095 8.43654 8.04213 8.36089 8.24655L7.56622 10.3941C7.32563 11.0443 6.40599 11.0443 6.1654 10.3941L5.37072 8.24655C5.29508 8.04213 5.13391 7.88095 4.92949 7.80531L2.78192 7.01064C2.13172 6.77004 2.13172 5.85041 2.78192 5.60981L4.92949 4.81514C5.13391 4.7395 5.29508 4.57832 5.37072 4.3739L6.1654 2.22633Z"
                        fill="white"
                      />
                      <path
                        d="M19.8153 5.31396L20.5782 7.37565C20.6916 7.68228 20.9334 7.92404 21.24 8.0375L23.3017 8.80039L21.24 9.56328C20.9334 9.67674 20.6916 9.9185 20.5782 10.2251L19.8153 12.2868L19.0524 10.2251C18.9389 9.9185 18.6972 9.67674 18.3905 9.56328L16.3289 8.80039L18.3905 8.0375C18.6972 7.92404 18.9389 7.68228 19.0524 7.37564L19.8153 5.31396Z"
                        fill="white"
                      />
                      <path
                        d="M6.87154 21.5679C7.13433 21.3418 7.53653 21.5647 7.48418 21.9074L7.20733 23.7196C7.19087 23.8273 7.2223 23.9369 7.29337 24.0195L8.48888 25.4093C8.71494 25.6721 8.49207 26.0743 8.1494 26.022L6.33716 25.7451C6.22943 25.7287 6.11988 25.7601 6.03726 25.8312L4.64744 27.0267C4.38464 27.2527 3.98245 27.0299 4.0348 26.6872L4.31165 24.875C4.32811 24.7672 4.29668 24.6577 4.22561 24.575L3.03009 23.1852C2.80404 22.9224 3.02691 22.5202 3.36958 22.5726L5.18181 22.8494C5.28955 22.8659 5.3991 22.8345 5.48172 22.7634L6.87154 21.5679Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="27"
                      viewBox="0 0 23 27"
                      fill="none"
                    >
                      <path
                        d="M19.7981 17.4842C19.9592 17.0489 20.5749 17.0489 20.736 17.4842L20.9226 17.9886C20.9733 18.1255 21.0812 18.2334 21.2181 18.284L21.7225 18.4707C22.1578 18.6318 22.1578 19.2475 21.7225 19.4085L21.2181 19.5952C21.0812 19.6459 20.9733 19.7538 20.9226 19.8906L20.736 20.3951C20.5749 20.8304 19.9592 20.8304 19.7981 20.3951L19.6115 19.8906C19.5608 19.7538 19.4529 19.6459 19.3161 19.5952L18.8116 19.4085C18.3763 19.2475 18.3763 18.6318 18.8116 18.4707L19.3161 18.284C19.4529 18.2334 19.5608 18.1255 19.6115 17.9886L19.7981 17.4842Z"
                        fill="url(#paint0_linear_13_19)"
                      />
                      <path
                        d="M4.86041 2.18043C5.20448 1.36596 6.35869 1.36596 6.70276 2.18043L7.23437 3.43885C7.33569 3.67869 7.52656 3.86956 7.7664 3.97088L9.02481 4.50248C9.83929 4.84655 9.83929 6.00077 9.02481 6.34484L7.7664 6.87645C7.52656 6.97777 7.33569 7.16863 7.23437 7.40848L6.70276 8.66689C6.35869 9.48136 5.20448 9.48136 4.86041 8.66689L4.3288 7.40848C4.22748 7.16863 4.03661 6.97777 3.79677 6.87645L2.53836 6.34484C1.72389 6.00077 1.72389 4.84655 2.53836 4.50248L3.79677 3.97088C4.03661 3.86956 4.22748 3.67869 4.3288 3.43884L4.86041 2.18043Z"
                        fill="url(#paint1_linear_13_19)"
                      />
                      <path
                        d="M17.5335 4.51958L17.9093 5.53521C18.2131 6.35636 18.8606 7.0038 19.6817 7.30765L20.6974 7.68347L19.6817 8.05928C18.8606 8.36314 18.2131 9.01057 17.9093 9.83173L17.5335 10.8474L17.1576 9.83173C16.8538 9.01057 16.2064 8.36314 15.3852 8.05928L14.3696 7.68347L15.3852 7.30765C16.2064 7.0038 16.8538 6.35636 17.1576 5.53521L17.5335 4.51958Z"
                        fill="url(#paint2_linear_13_19)"
                      />
                      <path
                        d="M5.45679 19.5537C5.80867 19.2511 6.34721 19.5495 6.27712 20.0083L6.10283 21.1492C6.08079 21.2934 6.12287 21.4401 6.21804 21.5508L6.97067 22.4257C7.27335 22.7776 6.97493 23.3161 6.5161 23.246L5.37521 23.0718C5.23096 23.0497 5.08427 23.0918 4.97364 23.187L4.09869 23.9396C3.7468 24.2423 3.20826 23.9439 3.27836 23.485L3.45265 22.3441C3.47469 22.1999 3.43261 22.0532 3.33744 21.9426L2.58481 21.0676C2.28213 20.7157 2.58054 20.1772 3.03938 20.2473L4.18026 20.4216C4.32452 20.4436 4.4712 20.4015 4.58183 20.3064L5.45679 19.5537Z"
                        fill="url(#paint3_linear_13_19)"
                      />
                      <path
                        d="M11.5362 6.0961C11.6973 5.66079 12.313 5.66079 12.4741 6.09609L13.8555 9.82927C14.4632 11.4716 15.758 12.7664 17.4004 13.3742L21.1335 14.7556C21.5688 14.9166 21.5688 15.5323 21.1335 15.6934L17.4004 17.0748C15.758 17.6825 14.4632 18.9774 13.8555 20.6197L12.4741 24.3529C12.313 24.7882 11.6973 24.7882 11.5362 24.3529L10.1548 20.6197C9.54711 18.9774 8.25224 17.6825 6.60993 17.0748L2.87675 15.6934C2.44144 15.5323 2.44144 14.9166 2.87675 14.7556L6.60993 13.3742C8.25224 12.7664 9.54711 11.4716 10.1548 9.82927L11.5362 6.0961Z"
                        fill="url(#paint4_linear_13_19)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_13_19"
                          x1="18.8513"
                          y1="17.7518"
                          x2="22.9898"
                          y2="24.0685"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#D388FF" />
                          <stop offset="0.695" stopColor="#4B94F7" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_13_19"
                          x1="9.82792"
                          y1="10.8475"
                          x2="-3.24088"
                          y2="-3.92592"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.0189477" stopColor="#89B5FF" />
                          <stop offset="0.745" stopColor="#002886" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_13_19"
                          x1="19.8938"
                          y1="10.8474"
                          x2="12.2704"
                          y2="2.22955"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" />
                          <stop offset="0.315" stopColor="#FF8CB6" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_13_19"
                          x1="5.36766"
                          y1="26.0916"
                          x2="2.6004"
                          y2="13.6139"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FF5FD7" />
                          <stop offset="0.545" stopColor="#C86AFF" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_13_19"
                          x1="25.0462"
                          y1="32.551"
                          x2="2.51143"
                          y2="3.98021"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.340919" stopColor="#002DBF" />
                          <stop offset="0.479627" stopColor="#4396F7" />
                          <stop offset="0.634404" stopColor="#FF9BD2" />
                          <stop offset="0.815235" stopColor="#C9FFFC" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  AI Interview + AI Technical Round
                </button>
              </div>
            </div>
            <div className="w-[75%] mt-8">
              <p className="text-[24px] text-transparent bg-clip-text bg-para-text-gradient font-semibold text-center">
                Let AI select the ideal skills for precise candidate evaluation
                - or manually choose to customize the process your way.
              </p>
            </div>
            <div>
              <div className="toogleContainer w-fit flex bg-[#E2E2E2] rounded-full p-1 space-x-4 mt-[3vh]">
                {/* Non-Technical Button */}

                <button
                  className={`w-fit p-[1vh_24px] text-3xl flex items-center justify-center rounded-full font-regular transition duration-300 ease-in-out ${
                    secondTabSelected === "airounds"
                      ? "bg-para-text-gradient text-white focus:outline-none border-none"
                      : "bg-white text-gray-700 focus:outline-none border-none"
                  }`}
                  onClick={() => setSecondTabSelected("airounds")}
                >
                  {secondTabSelected === "airounds" ? (
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      width="26"
                      height="30"
                      viewBox="0 0 26 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0233 7.54762C13.2639 6.89742 14.1835 6.89742 14.4241 7.54762L16.4602 13.05C16.6871 13.6633 17.1706 14.1468 17.7839 14.3737L23.2863 16.4098C23.9365 16.6504 23.9365 17.57 23.2863 17.8106L17.7839 19.8467C17.1706 20.0736 16.6871 20.5571 16.4602 21.1704L14.4241 26.6727C14.1835 27.3229 13.2639 27.3229 13.0233 26.6727L10.9872 21.1704C10.7603 20.5571 10.2768 20.0736 9.66352 19.8467L4.16114 17.8106C3.51094 17.57 3.51095 16.6504 4.16115 16.4098L9.66352 14.3737C10.2768 14.1468 10.7603 13.6633 10.9872 13.05L13.0233 7.54762Z"
                        fill="white"
                      />
                      <path
                        d="M22.4776 19.15C22.5979 18.8249 23.0577 18.8249 23.178 19.15L23.5786 20.2325C23.6164 20.3347 23.697 20.4153 23.7992 20.4531L24.8817 20.8537C25.2068 20.974 25.2068 21.4338 24.8817 21.5541L23.7992 21.9546C23.697 21.9925 23.6164 22.073 23.5786 22.1752L23.178 23.2577C23.0577 23.5828 22.5979 23.5828 22.4776 23.2577L22.0771 22.1752C22.0392 22.073 21.9587 21.9925 21.8564 21.9546L20.774 21.5541C20.4489 21.4338 20.4489 20.974 20.774 20.8537L21.8564 20.4531C21.9587 20.4153 22.0392 20.3347 22.0771 20.2325L22.4776 19.15Z"
                        fill="white"
                      />
                      <path
                        d="M6.1654 2.22633C6.40599 1.57613 7.32563 1.57613 7.56622 2.22633L8.36089 4.3739C8.43654 4.57832 8.59771 4.7395 8.80213 4.81514L10.9497 5.60981C11.5999 5.85041 11.5999 6.77004 10.9497 7.01064L8.80213 7.80531C8.59771 7.88095 8.43654 8.04213 8.36089 8.24655L7.56622 10.3941C7.32563 11.0443 6.40599 11.0443 6.1654 10.3941L5.37072 8.24655C5.29508 8.04213 5.13391 7.88095 4.92949 7.80531L2.78192 7.01064C2.13172 6.77004 2.13172 5.85041 2.78192 5.60981L4.92949 4.81514C5.13391 4.7395 5.29508 4.57832 5.37072 4.3739L6.1654 2.22633Z"
                        fill="white"
                      />
                      <path
                        d="M19.8153 5.31396L20.5782 7.37565C20.6916 7.68228 20.9334 7.92404 21.24 8.0375L23.3017 8.80039L21.24 9.56328C20.9334 9.67674 20.6916 9.9185 20.5782 10.2251L19.8153 12.2868L19.0524 10.2251C18.9389 9.9185 18.6972 9.67674 18.3905 9.56328L16.3289 8.80039L18.3905 8.0375C18.6972 7.92404 18.9389 7.68228 19.0524 7.37564L19.8153 5.31396Z"
                        fill="white"
                      />
                      <path
                        d="M6.87154 21.5679C7.13433 21.3418 7.53653 21.5647 7.48418 21.9074L7.20733 23.7196C7.19087 23.8273 7.2223 23.9369 7.29337 24.0195L8.48888 25.4093C8.71494 25.6721 8.49207 26.0743 8.1494 26.022L6.33716 25.7451C6.22943 25.7287 6.11988 25.7601 6.03726 25.8312L4.64744 27.0267C4.38464 27.2527 3.98245 27.0299 4.0348 26.6872L4.31165 24.875C4.32811 24.7672 4.29668 24.6577 4.22561 24.575L3.03009 23.1852C2.80404 22.9224 3.02691 22.5202 3.36958 22.5726L5.18181 22.8494C5.28955 22.8659 5.3991 22.8345 5.48172 22.7634L6.87154 21.5679Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="27"
                      viewBox="0 0 23 27"
                      fill="none"
                    >
                      <path
                        d="M19.7981 17.4842C19.9592 17.0489 20.5749 17.0489 20.736 17.4842L20.9226 17.9886C20.9733 18.1255 21.0812 18.2334 21.2181 18.284L21.7225 18.4707C22.1578 18.6318 22.1578 19.2475 21.7225 19.4085L21.2181 19.5952C21.0812 19.6459 20.9733 19.7538 20.9226 19.8906L20.736 20.3951C20.5749 20.8304 19.9592 20.8304 19.7981 20.3951L19.6115 19.8906C19.5608 19.7538 19.4529 19.6459 19.3161 19.5952L18.8116 19.4085C18.3763 19.2475 18.3763 18.6318 18.8116 18.4707L19.3161 18.284C19.4529 18.2334 19.5608 18.1255 19.6115 17.9886L19.7981 17.4842Z"
                        fill="url(#paint0_linear_13_19)"
                      />
                      <path
                        d="M4.86041 2.18043C5.20448 1.36596 6.35869 1.36596 6.70276 2.18043L7.23437 3.43885C7.33569 3.67869 7.52656 3.86956 7.7664 3.97088L9.02481 4.50248C9.83929 4.84655 9.83929 6.00077 9.02481 6.34484L7.7664 6.87645C7.52656 6.97777 7.33569 7.16863 7.23437 7.40848L6.70276 8.66689C6.35869 9.48136 5.20448 9.48136 4.86041 8.66689L4.3288 7.40848C4.22748 7.16863 4.03661 6.97777 3.79677 6.87645L2.53836 6.34484C1.72389 6.00077 1.72389 4.84655 2.53836 4.50248L3.79677 3.97088C4.03661 3.86956 4.22748 3.67869 4.3288 3.43884L4.86041 2.18043Z"
                        fill="url(#paint1_linear_13_19)"
                      />
                      <path
                        d="M17.5335 4.51958L17.9093 5.53521C18.2131 6.35636 18.8606 7.0038 19.6817 7.30765L20.6974 7.68347L19.6817 8.05928C18.8606 8.36314 18.2131 9.01057 17.9093 9.83173L17.5335 10.8474L17.1576 9.83173C16.8538 9.01057 16.2064 8.36314 15.3852 8.05928L14.3696 7.68347L15.3852 7.30765C16.2064 7.0038 16.8538 6.35636 17.1576 5.53521L17.5335 4.51958Z"
                        fill="url(#paint2_linear_13_19)"
                      />
                      <path
                        d="M5.45679 19.5537C5.80867 19.2511 6.34721 19.5495 6.27712 20.0083L6.10283 21.1492C6.08079 21.2934 6.12287 21.4401 6.21804 21.5508L6.97067 22.4257C7.27335 22.7776 6.97493 23.3161 6.5161 23.246L5.37521 23.0718C5.23096 23.0497 5.08427 23.0918 4.97364 23.187L4.09869 23.9396C3.7468 24.2423 3.20826 23.9439 3.27836 23.485L3.45265 22.3441C3.47469 22.1999 3.43261 22.0532 3.33744 21.9426L2.58481 21.0676C2.28213 20.7157 2.58054 20.1772 3.03938 20.2473L4.18026 20.4216C4.32452 20.4436 4.4712 20.4015 4.58183 20.3064L5.45679 19.5537Z"
                        fill="url(#paint3_linear_13_19)"
                      />
                      <path
                        d="M11.5362 6.0961C11.6973 5.66079 12.313 5.66079 12.4741 6.09609L13.8555 9.82927C14.4632 11.4716 15.758 12.7664 17.4004 13.3742L21.1335 14.7556C21.5688 14.9166 21.5688 15.5323 21.1335 15.6934L17.4004 17.0748C15.758 17.6825 14.4632 18.9774 13.8555 20.6197L12.4741 24.3529C12.313 24.7882 11.6973 24.7882 11.5362 24.3529L10.1548 20.6197C9.54711 18.9774 8.25224 17.6825 6.60993 17.0748L2.87675 15.6934C2.44144 15.5323 2.44144 14.9166 2.87675 14.7556L6.60993 13.3742C8.25224 12.7664 9.54711 11.4716 10.1548 9.82927L11.5362 6.0961Z"
                        fill="url(#paint4_linear_13_19)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_13_19"
                          x1="18.8513"
                          y1="17.7518"
                          x2="22.9898"
                          y2="24.0685"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#D388FF" />
                          <stop offset="0.695" stopColor="#4B94F7" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_13_19"
                          x1="9.82792"
                          y1="10.8475"
                          x2="-3.24088"
                          y2="-3.92592"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.0189477" stopColor="#89B5FF" />
                          <stop offset="0.745" stopColor="#002886" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_13_19"
                          x1="19.8938"
                          y1="10.8474"
                          x2="12.2704"
                          y2="2.22955"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" />
                          <stop offset="0.315" stopColor="#FF8CB6" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_13_19"
                          x1="5.36766"
                          y1="26.0916"
                          x2="2.6004"
                          y2="13.6139"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FF5FD7" />
                          <stop offset="0.545" stopColor="#C86AFF" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_13_19"
                          x1="25.0462"
                          y1="32.551"
                          x2="2.51143"
                          y2="3.98021"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.340919" stopColor="#002DBF" />
                          <stop offset="0.479627" stopColor="#4396F7" />
                          <stop offset="0.634404" stopColor="#FF9BD2" />
                          <stop offset="0.815235" stopColor="#C9FFFC" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  AI- Powered Rounds
                </button>

                {/* Technical Button */}
                <button
                  className={`w-fit p-[1vh_24px] text-3xl flex items-center justify-center font-regular rounded-full transition duration-300 ease-in-out ${
                    secondTabSelected === "manualrounds"
                      ? "bg-para-text-gradient text-white focus:outline-none border-none"
                      : "bg-white text-gray-700 focus:outline-none border-none"
                  }`}
                  onClick={() => setSecondTabSelected("manualrounds")}
                >
                  {secondTabSelected === "manualrounds" ? (
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      width="26"
                      height="30"
                      viewBox="0 0 26 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0233 7.54762C13.2639 6.89742 14.1835 6.89742 14.4241 7.54762L16.4602 13.05C16.6871 13.6633 17.1706 14.1468 17.7839 14.3737L23.2863 16.4098C23.9365 16.6504 23.9365 17.57 23.2863 17.8106L17.7839 19.8467C17.1706 20.0736 16.6871 20.5571 16.4602 21.1704L14.4241 26.6727C14.1835 27.3229 13.2639 27.3229 13.0233 26.6727L10.9872 21.1704C10.7603 20.5571 10.2768 20.0736 9.66352 19.8467L4.16114 17.8106C3.51094 17.57 3.51095 16.6504 4.16115 16.4098L9.66352 14.3737C10.2768 14.1468 10.7603 13.6633 10.9872 13.05L13.0233 7.54762Z"
                        fill="white"
                      />
                      <path
                        d="M22.4776 19.15C22.5979 18.8249 23.0577 18.8249 23.178 19.15L23.5786 20.2325C23.6164 20.3347 23.697 20.4153 23.7992 20.4531L24.8817 20.8537C25.2068 20.974 25.2068 21.4338 24.8817 21.5541L23.7992 21.9546C23.697 21.9925 23.6164 22.073 23.5786 22.1752L23.178 23.2577C23.0577 23.5828 22.5979 23.5828 22.4776 23.2577L22.0771 22.1752C22.0392 22.073 21.9587 21.9925 21.8564 21.9546L20.774 21.5541C20.4489 21.4338 20.4489 20.974 20.774 20.8537L21.8564 20.4531C21.9587 20.4153 22.0392 20.3347 22.0771 20.2325L22.4776 19.15Z"
                        fill="white"
                      />
                      <path
                        d="M6.1654 2.22633C6.40599 1.57613 7.32563 1.57613 7.56622 2.22633L8.36089 4.3739C8.43654 4.57832 8.59771 4.7395 8.80213 4.81514L10.9497 5.60981C11.5999 5.85041 11.5999 6.77004 10.9497 7.01064L8.80213 7.80531C8.59771 7.88095 8.43654 8.04213 8.36089 8.24655L7.56622 10.3941C7.32563 11.0443 6.40599 11.0443 6.1654 10.3941L5.37072 8.24655C5.29508 8.04213 5.13391 7.88095 4.92949 7.80531L2.78192 7.01064C2.13172 6.77004 2.13172 5.85041 2.78192 5.60981L4.92949 4.81514C5.13391 4.7395 5.29508 4.57832 5.37072 4.3739L6.1654 2.22633Z"
                        fill="white"
                      />
                      <path
                        d="M19.8153 5.31396L20.5782 7.37565C20.6916 7.68228 20.9334 7.92404 21.24 8.0375L23.3017 8.80039L21.24 9.56328C20.9334 9.67674 20.6916 9.9185 20.5782 10.2251L19.8153 12.2868L19.0524 10.2251C18.9389 9.9185 18.6972 9.67674 18.3905 9.56328L16.3289 8.80039L18.3905 8.0375C18.6972 7.92404 18.9389 7.68228 19.0524 7.37564L19.8153 5.31396Z"
                        fill="white"
                      />
                      <path
                        d="M6.87154 21.5679C7.13433 21.3418 7.53653 21.5647 7.48418 21.9074L7.20733 23.7196C7.19087 23.8273 7.2223 23.9369 7.29337 24.0195L8.48888 25.4093C8.71494 25.6721 8.49207 26.0743 8.1494 26.022L6.33716 25.7451C6.22943 25.7287 6.11988 25.7601 6.03726 25.8312L4.64744 27.0267C4.38464 27.2527 3.98245 27.0299 4.0348 26.6872L4.31165 24.875C4.32811 24.7672 4.29668 24.6577 4.22561 24.575L3.03009 23.1852C2.80404 22.9224 3.02691 22.5202 3.36958 22.5726L5.18181 22.8494C5.28955 22.8659 5.3991 22.8345 5.48172 22.7634L6.87154 21.5679Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="toogleIcon w-[20px] h-[22px] mr-2 bg-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="27"
                      viewBox="0 0 23 27"
                      fill="none"
                    >
                      <path
                        d="M19.7981 17.4842C19.9592 17.0489 20.5749 17.0489 20.736 17.4842L20.9226 17.9886C20.9733 18.1255 21.0812 18.2334 21.2181 18.284L21.7225 18.4707C22.1578 18.6318 22.1578 19.2475 21.7225 19.4085L21.2181 19.5952C21.0812 19.6459 20.9733 19.7538 20.9226 19.8906L20.736 20.3951C20.5749 20.8304 19.9592 20.8304 19.7981 20.3951L19.6115 19.8906C19.5608 19.7538 19.4529 19.6459 19.3161 19.5952L18.8116 19.4085C18.3763 19.2475 18.3763 18.6318 18.8116 18.4707L19.3161 18.284C19.4529 18.2334 19.5608 18.1255 19.6115 17.9886L19.7981 17.4842Z"
                        fill="url(#paint0_linear_13_19)"
                      />
                      <path
                        d="M4.86041 2.18043C5.20448 1.36596 6.35869 1.36596 6.70276 2.18043L7.23437 3.43885C7.33569 3.67869 7.52656 3.86956 7.7664 3.97088L9.02481 4.50248C9.83929 4.84655 9.83929 6.00077 9.02481 6.34484L7.7664 6.87645C7.52656 6.97777 7.33569 7.16863 7.23437 7.40848L6.70276 8.66689C6.35869 9.48136 5.20448 9.48136 4.86041 8.66689L4.3288 7.40848C4.22748 7.16863 4.03661 6.97777 3.79677 6.87645L2.53836 6.34484C1.72389 6.00077 1.72389 4.84655 2.53836 4.50248L3.79677 3.97088C4.03661 3.86956 4.22748 3.67869 4.3288 3.43884L4.86041 2.18043Z"
                        fill="url(#paint1_linear_13_19)"
                      />
                      <path
                        d="M17.5335 4.51958L17.9093 5.53521C18.2131 6.35636 18.8606 7.0038 19.6817 7.30765L20.6974 7.68347L19.6817 8.05928C18.8606 8.36314 18.2131 9.01057 17.9093 9.83173L17.5335 10.8474L17.1576 9.83173C16.8538 9.01057 16.2064 8.36314 15.3852 8.05928L14.3696 7.68347L15.3852 7.30765C16.2064 7.0038 16.8538 6.35636 17.1576 5.53521L17.5335 4.51958Z"
                        fill="url(#paint2_linear_13_19)"
                      />
                      <path
                        d="M5.45679 19.5537C5.80867 19.2511 6.34721 19.5495 6.27712 20.0083L6.10283 21.1492C6.08079 21.2934 6.12287 21.4401 6.21804 21.5508L6.97067 22.4257C7.27335 22.7776 6.97493 23.3161 6.5161 23.246L5.37521 23.0718C5.23096 23.0497 5.08427 23.0918 4.97364 23.187L4.09869 23.9396C3.7468 24.2423 3.20826 23.9439 3.27836 23.485L3.45265 22.3441C3.47469 22.1999 3.43261 22.0532 3.33744 21.9426L2.58481 21.0676C2.28213 20.7157 2.58054 20.1772 3.03938 20.2473L4.18026 20.4216C4.32452 20.4436 4.4712 20.4015 4.58183 20.3064L5.45679 19.5537Z"
                        fill="url(#paint3_linear_13_19)"
                      />
                      <path
                        d="M11.5362 6.0961C11.6973 5.66079 12.313 5.66079 12.4741 6.09609L13.8555 9.82927C14.4632 11.4716 15.758 12.7664 17.4004 13.3742L21.1335 14.7556C21.5688 14.9166 21.5688 15.5323 21.1335 15.6934L17.4004 17.0748C15.758 17.6825 14.4632 18.9774 13.8555 20.6197L12.4741 24.3529C12.313 24.7882 11.6973 24.7882 11.5362 24.3529L10.1548 20.6197C9.54711 18.9774 8.25224 17.6825 6.60993 17.0748L2.87675 15.6934C2.44144 15.5323 2.44144 14.9166 2.87675 14.7556L6.60993 13.3742C8.25224 12.7664 9.54711 11.4716 10.1548 9.82927L11.5362 6.0961Z"
                        fill="url(#paint4_linear_13_19)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_13_19"
                          x1="18.8513"
                          y1="17.7518"
                          x2="22.9898"
                          y2="24.0685"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#D388FF" />
                          <stop offset="0.695" stopColor="#4B94F7" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_13_19"
                          x1="9.82792"
                          y1="10.8475"
                          x2="-3.24088"
                          y2="-3.92592"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.0189477" stopColor="#89B5FF" />
                          <stop offset="0.745" stopColor="#002886" />
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_13_19"
                          x1="19.8938"
                          y1="10.8474"
                          x2="12.2704"
                          y2="2.22955"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" />
                          <stop offset="0.315" stopColor="#FF8CB6" />
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_13_19"
                          x1="5.36766"
                          y1="26.0916"
                          x2="2.6004"
                          y2="13.6139"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FF5FD7" />
                          <stop offset="0.545" stopColor="#C86AFF" />
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_13_19"
                          x1="25.0462"
                          y1="32.551"
                          x2="2.51143"
                          y2="3.98021"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0.340919" stopColor="#002DBF" />
                          <stop offset="0.479627" stopColor="#4396F7" />
                          <stop offset="0.634404" stopColor="#FF9BD2" />
                          <stop offset="0.815235" stopColor="#C9FFFC" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  Manual Rounds
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center relative overflow-hidden pt-[3vh]">
            <Carousel />
          </div>

          {/* ///////////Difficulty Card///////// */}

          <div className="flex w-full justify-end px-[4vw] pt-[3vh] pb-[10vh]">
            <div
              onClick={() => {
                if (secondTabSelected === "manualrounds") {
                  navigate("/ManualSkills");
                }
              }}
              className=" ButtonsCta h-[5vh] px-[20px] py-[24px] rounded-[30px] justify-center items-center gap-4 inline-flex hover:cursor-pointer bg-gradient-btn"
            >
              <div className="flex Text items-center text-center text-white text-2xl font-semibold gap-1">
                {secondTabSelected === "airounds" ? (
                  <>
                    <svg
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                      viewBox="0 0 19 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.39632 5.41047C9.57676 4.92282 10.2665 4.92282 10.4469 5.41047L11.974 9.53725C12.1442 9.9972 12.5068 10.3598 12.9668 10.53L17.0935 12.0571C17.5812 12.2375 17.5812 12.9273 17.0935 13.1077L12.9668 14.6347C12.5068 14.8049 12.1442 15.1676 11.974 15.6275L10.4469 19.7543C10.2665 20.242 9.57676 20.242 9.39632 19.7543L7.86927 15.6275C7.69907 15.1676 7.33643 14.8049 6.87649 14.6347L2.7497 13.1077C2.26205 12.9273 2.26205 12.2375 2.7497 12.0571L6.87649 10.53C7.33643 10.3598 7.69907 9.9972 7.86927 9.53725L9.39632 5.41047Z"
                        fill="white"
                      />
                      <path
                        d="M16.4871 14.1125C16.5773 13.8687 16.9222 13.8687 17.0124 14.1125L17.3128 14.9244C17.3412 15.001 17.4016 15.0615 17.4783 15.0898L18.2901 15.3903C18.534 15.4805 18.534 15.8253 18.2901 15.9156L17.4783 16.216C17.4016 16.2443 17.3412 16.3048 17.3128 16.3814L17.0124 17.1933C16.9222 17.4371 16.5773 17.4371 16.4871 17.1933L16.1867 16.3814C16.1583 16.3048 16.0979 16.2443 16.0212 16.216L15.2094 15.9156C14.9656 15.8253 14.9656 15.4805 15.2094 15.3902L16.0212 15.0898C16.0979 15.0615 16.1583 15.001 16.1867 14.9244L16.4871 14.1125Z"
                        fill="white"
                      />
                      <path
                        d="M4.25289 1.41963C4.43334 0.931975 5.12306 0.931977 5.30351 1.41963L5.89951 3.03031C5.95625 3.18362 6.07713 3.3045 6.23044 3.36123L7.84112 3.95724C8.32877 4.13768 8.32877 4.82741 7.84112 5.00786L6.23044 5.60386C6.07713 5.66059 5.95625 5.78147 5.89951 5.93479L5.30351 7.54547C5.12306 8.03312 4.43334 8.03312 4.25289 7.54547L3.65689 5.93479C3.60015 5.78147 3.47927 5.66059 3.32596 5.60386L1.71528 5.00786C1.22763 4.82741 1.22763 4.13768 1.71528 3.95724L3.32596 3.36123C3.47928 3.3045 3.60015 3.18362 3.65689 3.03031L4.25289 1.41963Z"
                        fill="white"
                      />
                      <path
                        d="M14.4904 3.73547L15.0625 5.28173C15.1476 5.51171 15.329 5.69303 15.5589 5.77812L17.1052 6.35029L15.5589 6.92246C15.329 7.00756 15.1476 7.18888 15.0625 7.41885L14.4904 8.96511L13.9182 7.41885C13.8331 7.18888 13.6518 7.00756 13.4218 6.92246L11.8755 6.35029L13.4218 5.77812C13.6518 5.69303 13.8331 5.51171 13.9182 5.28173L14.4904 3.73547Z"
                        fill="white"
                      />
                      <path
                        d="M4.78244 15.9258C4.97954 15.7563 5.28118 15.9234 5.24192 16.1804L5.03428 17.5396C5.02194 17.6204 5.04551 17.7025 5.09881 17.7645L5.99545 18.8069C6.16499 19.004 5.99784 19.3056 5.74084 19.2664L4.38166 19.0587C4.30086 19.0464 4.2187 19.0699 4.15673 19.1232L3.11436 20.0199C2.91727 20.1894 2.61562 20.0223 2.65488 19.7653L2.86252 18.4061C2.87487 18.3253 2.85129 18.2431 2.79799 18.1812L1.90136 17.1388C1.73182 16.9417 1.89897 16.6401 2.15597 16.6793L3.51515 16.887C3.59595 16.8993 3.67811 16.8757 3.74007 16.8224L4.78244 15.9258Z"
                        fill="white"
                      />
                    </svg>
                    Take AI interview
                  </>
                ) : (
                  <>Take Manual Interview</>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AfterSelectionUpdated;
