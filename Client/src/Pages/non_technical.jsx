import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Ring from "../assets/ring.png";
import EmojiPicker from "emoji-picker-react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

const NonTechnical = () => {

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef(null);
  const inputRef = useRef(null);

  // speech to text ------>

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
  
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue..');
        mic.start(); // Ensure mic continues if needed
      };
    } else {
      mic.stop();
      input.focus();
      mic.onend = () => {
        console.log('Stopped Mic on Click');
      };
    }
  
    mic.onstart = () => {
      console.log('Mic is on');
    };
  
    mic.onresult = (event) => {
      // Only process results if listening is still active
      if (!isListening) {
        return;
      }
  
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      console.log(transcript);
  
      // Update inputAnswer with the transcript
      const newValue =
        inputAnswer.substring(0, start) + transcript + inputAnswer.substring(end);
      setInputAnswer(newValue);
  
      // After updating the text, set the cursor position to the end of the inserted text
      const newCursorPosition = start + transcript.length;
      setTimeout(() => {
        input.setSelectionRange(newCursorPosition, newCursorPosition);
        input.focus();
      }, 0); // Ensure this runs after the state has updated
  
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  

  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [volume, setVolume] = useState(0);
  const isRecordingRef = useRef(false);
  const codeEditorRef = useRef("");
  const [videoToggleButton, setVideoToggleButton] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(
    `What are your thoughts on the branding of our skincare serums, showcased in the image with three glass bottles? How do you think we can enhance our brand's appeal and messaging to better connect with our target audience? Mention your answer precisely in 3 or more points.`
  );
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [inputAnswer, setInputAnswer] = useState(""); // Input field state
  const [questionCount, setQuestionCount] = useState(0);
  const [candidateName] = useState("Sanjay");
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [interviewData, setInterviewData] = useState([]);
  const timerRef = useRef(null);
  const [timer, setTimer] = useState(120); // Timer in seconds
  const videoRef = useRef(null);
  const scrollContainerRef = useRef(null);



  // Add selected emoji to the input field
  const handleEmojiClick = (emojiData) => {
    const { emoji } = emojiData; // Get the selected emoji
    const input = inputRef.current;

    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      // Insert emoji at the cursor position
      const newValue =
        inputAnswer.substring(0, start) + emoji + inputAnswer.substring(end);
      setInputAnswer(newValue);

      // Update cursor position after the emoji
      setTimeout(() => {
        input.setSelectionRange(start + emoji.length, start + emoji.length);
        input.focus();
      }, 0);
    }
  };


  // Close the emoji picker if clicking outside of it
  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setIsPickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleVideoSize = () => {
    setVideoToggleButton(!videoToggleButton);
    console.log(videoToggleButton);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          stopRecording();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    if (!isRecording && timer === 120) {
      startRecording();
    }

    return () => clearInterval(interval);
  }, [timer]);

  const startRecording = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunks.current = [];
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser);
        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const avgVolume =
            dataArray.reduce((a, b) => a + b) / dataArray.length;
          setVolume(avgVolume);
          if (isRecordingRef.current) requestAnimationFrame(updateVolume);
        };
        updateVolume();
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.onstop = async () => {
          new Blob(audioChunks.current, {
            type: "audio/wav",
          });
          audioContext.close();
          setVolume(0);
          isRecordingRef.current = false;
        };
        mediaRecorder.start();
        isRecordingRef.current = true;
        setIsRecording(true);
      })
      .catch((error) =>
        console.error("Error accessing the microphone:", error)
      );
  }, []);


  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTimer = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval);
          stopRecording();
          handleSubmitAnswer();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    if (!isRecording && timer === 120) {
      startRecording();
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [interviewData]);

  const handleGenerateNextQuestion = useCallback(
    async (transcript) => {
      if (questionCount >= 9) {
        setIsInterviewComplete(true);
        setCurrentQuestion("The interview is complete. Thank you!");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/generate_question", {
          topic: transcript,
          candidate_name: candidateName,
        });

        const nextQuestion = response.data.question;
        setInterviewData((prevData) => [
          ...prevData,
          { question: currentQuestion, answer: transcript },
        ]);
        setCurrentQuestion(nextQuestion);
        setCurrentAnswer("");
        setInputAnswer(""); // Clear input field
        setQuestionCount((prevCount) => prevCount + 1);
        setTimer(120); // Reset timer for the next question
      } catch (error) {
        console.error("Error fetching next question:", error);
      }
    },
    [questionCount, candidateName, currentQuestion]
  );

  const handleSubmitAnswer = () => {
    if (inputAnswer.trim() || currentAnswer.trim()) {
      const answer = inputAnswer || currentAnswer;
      setInterviewData((prevData) => [
        ...prevData,
        { question: currentQuestion, answer },
      ]);
      handleGenerateNextQuestion(answer);
    }
  };


  return (
    <div className="bg-black z-[-3]">
      {/* Background effect ellipse */}
      <div className="fixed left-[-12px] top-[330px] z-0 w-[543px] h-[543px] flex-shrink-0 rounded-full bg-[#85BEFF] blur-[100px]"></div>
      <div className="fixed right-[-65px] bottom-[330px] z-0 w-[587px] h-[587px] flex-shrink-0 rounded-full bg-[#7EFFEA] blur-[100px]"></div>

      <div className="flex flex-col min-h-screen bg-[rgba(0,0,0,0.07)] backdrop-blur-[2px] overflow-hidden">
        <div className="flex flex-1 bg-none ">

          {/* Left side code editor container */}
          <div className="w-[60%] ml-10 mr-5 my-8 rounded-3xl p-5 relative shadow-lg rounded-[30px] border border-black bg-[rgba(15,15,15,0.82)] backdrop-blur-[5px] shadow-[-0.5px_0.5px_0px_#85BEFF]">
            <span className="absolute top-[12px] right-[12px] text-[#FFF] border border-[#FFF] rounded-full py-2 px-5 text-[20px] font-medium">Timer: {formatTimer(timer)}</span>
            <div className={`absolute bottom-[-60px] left-0 rounded-3xl overflow-hidden shadow-lg ${videoToggleButton ? 'w-[180px] h-[227px]' : 'w-[91px] h-[114px]'}`}>
              <Webcam audio={false} className="w-full h-full object-cover" />
              {videoToggleButton && <p className="absolute z-10 text-white text-[14px] font-semibold top-[80%] left-2">Sanjay Prasath</p>}
              <button
                className="absolute -top-1 -right-1 bg-[#1E1E1E] rounded-full text-white w-[55px] h-[55px] cursor-pointer flex justify-center items-center"
                onClick={toggleVideoSize}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="19.7814"
                    cy="19.7814"
                    r="19.7814"
                    fill="#0072DC"
                  />
                  <path
                    d="M19.6771 21.0651C19.6771 21.1346 19.6504 21.1961 19.5969 21.2496L16.9334 23.9131L18.0886 25.0684C18.1903 25.17 18.2411 25.2903 18.2411 25.4294C18.2411 25.5685 18.1903 25.6888 18.0886 25.7904C17.987 25.892 17.8667 25.9429 17.7276 25.9429H14.1334C13.9944 25.9429 13.874 25.892 13.7724 25.7904C13.6708 25.6888 13.62 25.5685 13.62 25.4294V21.8352C13.62 21.6962 13.6708 21.5758 13.7724 21.4742C13.874 21.3726 13.9944 21.3218 14.1334 21.3218C14.2725 21.3218 14.3928 21.3726 14.4945 21.4742L15.6497 22.6295L18.3133 19.9659C18.3668 19.9125 18.4283 19.8857 18.4978 19.8857C18.5673 19.8857 18.6288 19.9125 18.6823 19.9659L19.5969 20.8805C19.6504 20.934 19.6771 20.9955 19.6771 21.0651ZM25.9429 14.1334V17.7276C25.9429 17.8667 25.892 17.987 25.7904 18.0886C25.6888 18.1903 25.5685 18.2411 25.4294 18.2411C25.2903 18.2411 25.17 18.1903 25.0684 18.0886L23.9131 16.9334L21.2496 19.5969C21.1961 19.6504 21.1346 19.6771 21.0651 19.6771C20.9955 19.6771 20.934 19.6504 20.8805 19.5969L19.9659 18.6823C19.9125 18.6288 19.8857 18.5673 19.8857 18.4978C19.8857 18.4283 19.9125 18.3668 19.9659 18.3133L22.6295 15.6497L21.4742 14.4945C21.3726 14.3928 21.3218 14.2725 21.3218 14.1334C21.3218 13.9944 21.3726 13.874 21.4742 13.7724C21.5758 13.6708 21.6962 13.62 21.8352 13.62H25.4294C25.5685 13.62 25.6888 13.6708 25.7904 13.7724C25.892 13.874 25.9429 13.9944 25.9429 14.1334Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="w-[40%] flex flex-col justify-between my-8 mr-10 space-y-5">
            <div className="h-[90%] px-8 pt-[96px] text-white overflow-auto rounded-[30px] bg-[rgba(62,59,65,0.50)] backdrop-blur-[20px] shadow-[1px_-1px_0px_#0DDDBB]">
              <h2 className="text-[24px] font-[600] pb-4">
                Question.
              </h2>
              <div className="flex flex-col justify-end items-end ">
                <p className="text-white text-[16px] py-[7px] text-[10px] leading-[24px]">
                  {currentQuestion}
                </p>
                <hr className="w-full bg-[#EBEBEB] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]" />

                {currentAnswer && <div
                  key={`current-question-${questionCount}`}
                  className="my-4 w-fit max-w-[80%] p-6 text-[16px] leading-[24px] rounded-[15px] bg-[#00AB8F] shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] flex justify-end"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentAnswer}

                </div>}
              </div>
            </div>


            {/* Input Field */}
            <div className="flex items-center w-full h-[10%]">

              <div className="relative flex items-center w-full rounded-[30px] bg-[#3e3b40] backdrop-blur-[20px] shadow-[0.5px_-0.5px_1px_#0DDDBB]" >
                {/* Emoji Picker Icon */}
                <button className="pl-6 pr-2 p-[24.5px] text-white bg-[#3e3b40] rounded-l-full" onClick={() => setIsPickerOpen(!isPickerOpen)}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.5 8C1.5 6.27609 2.18482 4.62279 3.40381 3.40381C4.62279 2.18482 6.27609 1.5 8 1.5C9.72391 1.5 11.3772 2.18482 12.5962 3.40381C13.8152 4.62279 14.5 6.27609 14.5 8C14.5 9.72391 13.8152 11.3772 12.5962 12.5962C11.3772 13.8152 9.72391 14.5 8 14.5C6.27609 14.5 4.62279 13.8152 3.40381 12.5962C2.18482 11.3772 1.5 9.72391 1.5 8ZM8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM5 8C5.26522 8 5.51957 7.89464 5.70711 7.70711C5.89464 7.51957 6 7.26522 6 7C6 6.73478 5.89464 6.48043 5.70711 6.29289C5.51957 6.10536 5.26522 6 5 6C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8ZM12 7C12 7.26522 11.8946 7.51957 11.7071 7.70711C11.5196 7.89464 11.2652 8 11 8C10.7348 8 10.4804 7.89464 10.2929 7.70711C10.1054 7.51957 10 7.26522 10 7C10 6.73478 10.1054 6.48043 10.2929 6.29289C10.4804 6.10536 10.7348 6 11 6C11.2652 6 11.5196 6.10536 11.7071 6.29289C11.8946 6.48043 12 6.73478 12 7ZM5.32 9.636C5.48134 9.52303 5.68064 9.47806 5.87486 9.51081C6.06908 9.54355 6.24262 9.65138 6.358 9.811L6.365 9.82C6.46785 9.93795 6.58549 10.0421 6.715 10.13C6.979 10.308 7.398 10.5 8 10.5C8.602 10.5 9.02 10.308 9.285 10.129C9.41451 10.0411 9.53215 9.93695 9.635 9.819L9.642 9.811C9.75737 9.64895 9.93239 9.53937 10.1285 9.50637C10.3247 9.47336 10.526 9.51963 10.688 9.635C10.85 9.75037 10.9596 9.92539 10.9926 10.1215C11.0256 10.3177 10.9794 10.519 10.864 10.681L10.25 10.25C10.864 10.68 10.864 10.681 10.863 10.681V10.682L10.862 10.684L10.86 10.687L10.855 10.694L10.841 10.713C10.7848 10.7883 10.7233 10.8594 10.657 10.926C10.4963 11.0924 10.3187 11.2415 10.127 11.371C9.49722 11.7894 8.75607 12.0086 8 12C7.054 12 6.348 11.692 5.874 11.37C5.62319 11.2003 5.39676 10.9971 5.201 10.766C5.1867 10.7486 5.1727 10.7309 5.159 10.713L5.145 10.693L5.14 10.687L5.138 10.684V10.682H5.137L5.75 10.25L5.136 10.68C5.02196 10.5172 4.97718 10.3159 5.01149 10.1201C5.04581 9.92439 5.1564 9.75027 5.319 9.636H5.32Z" fill="white" />
                  </svg>
                </button>
                {isPickerOpen && (
                  <div
                    ref={pickerRef}
                    style={{
                      position: "absolute",
                      bottom: "70px",
                      left: "10px",
                      zIndex: 10,
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      transform: "scale(0.8)", // Scale down to 80% of the original size
                      transformOrigin: "bottom left", // Adjust origin to ensure it scales from the corner
                    }}
                  >
                    <EmojiPicker onEmojiClick={handleEmojiClick} /> 
                  </div>
                )}
                {/* Voice Icon */}
                <button className="px-4 text-white hover:text-gray-400 bg-[#3e3b40] p-[24.5px] focus:outline-none" onClick={() => setIsListening(prevState => !prevState)}>

                  {isListening ? <svg xmlns="http://www.w3.org/2000/svg" className="mb-[-2px] mx-[-5px]" height="18" width="22" viewBox="0 0 640 512"><path fill="#ffffff" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 21.2-5.1 41.1-14.2 58.7L416 300.8 416 96c0-53-43-96-96-96s-96 43-96 96l0 54.3L38.8 5.1zM344 430.4c20.4-2.8 39.7-9.1 57.3-18.2l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128l0-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6l0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l72 0 72 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-48 0 0-33.6z"/></svg> : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                    <path d="M6.00001 10.6667C6.90933 10.6667 7.7814 10.3209 8.42438 9.70538C9.06736 9.08987 9.42858 8.25507 9.42858 7.38462V3.28205C9.42858 2.4116 9.06736 1.57679 8.42438 0.961291C7.7814 0.345787 6.90933 0 6.00001 0C5.0907 0 4.21863 0.345787 3.57565 0.961291C2.93266 1.57679 2.57144 2.4116 2.57144 3.28205V7.38462C2.57144 8.25507 2.93266 9.08987 3.57565 9.70538C4.21863 10.3209 5.0907 10.6667 6.00001 10.6667Z" fill="white" />
                    <path d="M12 7.44446C12 7.23819 11.9097 7.04035 11.7489 6.89449C11.5882 6.74863 11.3702 6.66669 11.1429 6.66669C10.9155 6.66669 10.6975 6.74863 10.5368 6.89449C10.376 7.04035 10.2857 7.23819 10.2857 7.44446C10.2857 8.47586 9.83419 9.46502 9.03046 10.1943C8.22673 10.9236 7.13664 11.3334 6 11.3334C4.86336 11.3334 3.77327 10.9236 2.96954 10.1943C2.16582 9.46502 1.71429 8.47586 1.71429 7.44446C1.71429 7.23819 1.62398 7.04035 1.46323 6.89449C1.30249 6.74863 1.08447 6.66669 0.857143 6.66669C0.629814 6.66669 0.411797 6.74863 0.251051 6.89449C0.090306 7.04035 0 7.23819 0 7.44446C0.00168952 8.75257 0.522349 10.0164 1.46673 11.0047C2.4111 11.9931 3.71606 12.6398 5.14286 12.8267V14.4445H3.33429C3.13196 14.4445 2.93793 14.5174 2.79486 14.6472C2.6518 14.777 2.57143 14.9531 2.57143 15.1367V15.3078C2.57143 15.4914 2.6518 15.6675 2.79486 15.7973C2.93793 15.9271 3.13196 16 3.33429 16H8.66571C8.86804 16 9.06207 15.9271 9.20514 15.7973C9.3482 15.6675 9.42857 15.4914 9.42857 15.3078V15.1367C9.42857 14.9531 9.3482 14.777 9.20514 14.6472C9.06207 14.5174 8.86804 14.4445 8.66571 14.4445H6.85714V12.8267C8.28394 12.6398 9.5889 11.9931 10.5333 11.0047C11.4777 10.0164 11.9983 8.75257 12 7.44446Z" fill="white" />
                  </svg>}
                </button>

                {/* Input Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="flex-grow p-[20px] px-4 bg-[#3e3b40] text-white placeholder-gray-400 outline-none text-[16px]"
                />

                {/* Submit Button */}
                <button
                  onClick={handleSubmitAnswer}
                  className="px-6 p-[24.5px] text-white bg-[#3e3b40] rounded-r-full"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_5_1218)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.59168 2.71245L2.38083 7.25004H7.25001C7.66422 7.25004 8.00001 7.58582 8.00001 8.00004C8.00001 8.41425 7.66422 8.75004 7.25001 8.75004H2.38083L1.59168 13.2876L13.9294 8.00004L1.59168 2.71245ZM0.988747 8.00004L0.0636748 2.68087C-0.0111098 2.25086 0.128032 1.81135 0.436661 1.50272C0.824446 1.11494 1.40926 1.00231 1.91333 1.21834L15.3157 6.9622C15.7308 7.14013 16 7.54835 16 8.00004C16 8.45172 15.7308 8.85995 15.3157 9.03788L1.91333 14.7817C1.40926 14.9978 0.824446 14.8851 0.436661 14.4974C0.128032 14.1887 -0.01111 13.7492 0.0636748 13.3192L0.988747 8.00004Z" fill="white" />
                    </g>

                    <defs>
                      <clipPath id="clip0_5_1218">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                </button>
              </div>
            </div>

          </div>

        </div>
        <div className="justify-end items-end flex py-[32px] pr-10 bg-none">
          {audioURL && (
            <audio controls>
              <source src={audioURL} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}
          <button className="border border-[#00AB8F] w-[132px] h-[44px] px-14 py-2 bg-[#00AB8F] text-white rounded-3xl font-medium text-[14px]">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonTechnical;