import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import Jupiter from "../assets/enlargedJupiter.png";
import Send from "../assets/send.svg";
import WhiteSend from "../assets/whiteSend.svg";
import Smile from "../assets/smile.svg";
import starConfetti from '../assets/Star confetti.svg';
import starConfetti2 from '../assets/Star confetti2.svg';
import Spline from "@splinetool/react-spline";
import PropTypes from "prop-types";
import { useJobContext } from "../Context/LaiylaJobPostContext";

const JupiterActivatedState = ({ onEnlargedJupiterClick }) => {
    const { jupiterStatus, setJupiterStatus, toggleJupiterStatus } = useJobContext();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const steps = [
  {
    title: "Dataset Creation:",
    description: "A synthetic dataset is generated using random numbers for features and random binary values for labels.",
  },
  {
    title: "Data Splitting:",
    description: "The dataset is split into training (80%) and testing (20%) subsets using train_test_split.",
  },
  {
    title: "Model Initialization:",
    description: "A LogisticRegression model is instantiated.",
  },
  {
    title: "Training:",
    description: "The model is trained on the training data using model.fit.",
  },
  {
    title: "Prediction:",
    description: "The trained model predicts the labels of the test set using model.predict.",
  },
  {
    title: "Evaluation:",
    description: "The accuracy_score function computes the accuracy of the predictions against the true labels in the test set.",
  },
];



  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    if(e.key === 'Enter'){

    if (userInput.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", text: userInput }]);
    setUserInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Here is the AI response to your message!" },
      ]);
    }, 1000);
    };
  };

  return (
    <div className="h-full mr-10 pl-10">
      <div className="text-white border border-black h-[80%] bg-black rounded-3xl p-[10px] relative">
        <div className="flex justify-end">
          <img src={starConfetti} alt="" className="w-[29px] h-[29px] mt-[6%] animate-blink" />
          <p className="mt-[8%] h-16 items-center flex px-[19px] mr-10 bg-white text-black outline-2 w-[225px] outline-dashed outline-[#FFDB5B] rounded-full rounded-tr-md relative">
            Hello, I am Jupiter, am here to help you. Ask away your doubts!!
          </p>
          <img src={starConfetti2} alt="" className="w-[29px] h-[29px] mt-[12%] -ml-8 animate-blink" />
          <div className="flex w-[120px] h-[120px] ">
                {jupiterStatus && (
            <Spline scene="https://prod.spline.design/9KpvIenVCsNv9ycN/scene.splinecode" />
          )}
            </div>
        </div>
        <div className="w-full h-[70%] overflow-y-auto px-4 py-2 space-y-[18px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.type === "ai" ? "justify-end flex" : "justify-start flex"
              }`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className={`px-4 py-2 ${
                  msg.type === "ai"
                    ? ""
                    : "border border-[#B65CFF] bg-transparent text-white rounded-full rounded-br-md"
                }`}
                style={{
                  display: "inline-block",
                  wordWrap: "break-word",
                }}
              >
                {msg.type === 'ai' ? 
                 <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
                 {steps.map((step, index) => (
                   <motion.div
                   key={index}
                   className="mb-6"
                   initial={{ opacity: 0 }}  // Initial state: invisible and slightly down
                   animate={{ opacity: 1 }}   // Final state: fully visible and in normal position
                   transition={{
                     duration: 1.5,                  // Duration for the animation
                     delay: index * 1.0              // Staggering the animation for each item
                   }}
                 >
                   <h2 className="text-xl font-semibold mb-2">
                     {index + 1}. {step.title}
                   </h2>
                   <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                     <motion.li
                       className="text-gray-300"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.6 }}
                     >
                       {step.description}
                     </motion.li>
                   </ul>
                 </motion.div>
                 ))}
               </div>
                : msg.text}

              </motion.div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="relative h-[10%]">
        <div className="h-full mt-10 flex items-center relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown = {handleSend}
            className="h-full w-full rounded-3xl outline-none pl-[45px] bg-[#3E3B41] text-white pr-[40px]"
            placeholder="Start Typing..."
          />
          <img
            src={Smile}
            alt="Smile Icon"
            className="absolute left-3 cursor-pointer"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          />
          <img
            src={userInput.trim() === "" ? Send : WhiteSend}
            alt="Send Icon"
            className="absolute right-3 cursor-pointer"
            onClick={handleSend}
          />
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-[calc(100%+10px)] left-0 w-full z-10">
            <Picker
              data={data}
              onEmojiSelect={(emoji) =>
                setUserInput((prev) => prev + emoji.native)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

JupiterActivatedState.propTypes = {
  onEnlargedJupiterClick: PropTypes.func.isRequired,
};

export default JupiterActivatedState;