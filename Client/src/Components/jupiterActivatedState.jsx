import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import Jupiter from "../assets/enlargedJupiter.png";
import Send from "../assets/Send.svg";
import WhiteSend from "../assets/whiteSend.svg";
import Smile from "../assets/smile.svg";
import starConfetti from '../assets/Star confetti.svg';
import starConfetti2 from '../assets/Star confetti2.svg';
import PropTypes from "prop-types";


const JupiterActivatedState = ({ onEnlargedJupiterClick }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef(null);
    const inputRef = useRef(null);
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

    const handleSend = () => {
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

    const handleSendbyEnter = (e) => {

        if (e.key === 'Enter') {
            setShowEmojiPicker(false);
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

    const handleEmojiClick = (emojiData) => {
        const { emoji } = emojiData; // Get the selected emoji
        const input = inputRef.current;

        if (input) {
            const start = input.selectionStart;
            const end = input.selectionEnd;

            // Insert emoji at the cursor position
            const newValue =
                userInput.substring(0, start) + emoji + userInput.substring(end);
            setUserInput(newValue);

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
            setShowEmojiPicker(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="h-full mr-10 pl-10">
            <div className="text-white border border-black h-[80%] bg-black rounded-3xl p-[10px] relative">
                <div className="flex justify-end">
                    <img src={starConfetti} alt="" className="w-[29px] h-[29px] mt-[6%] animate-blink" />
                    <p className="mt-[8%] h-16 items-center flex px-[19px] mr-10 bg-white text-black outline-2 w-[225px] outline-dashed outline-[#FFDB5B] rounded-full rounded-tr-md relative">
                        Hello, I am Jupiter, am here to help you. Ask away your doubts!!
                    </p>
                    <img src={starConfetti2} alt="" className="w-[29px] h-[29px] mt-[12%] -ml-8 animate-blink" />
                    <img
                        src={Jupiter}
                        alt="Jupiter"
                        className="h-[120px] w-[120px] cursor-pointer"
                        onClick={onEnlargedJupiterClick}
                    />
                </div>
                <div className="w-full h-[70%] overflow-y-auto px-4 py-2 space-y-[18px]">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${msg.type === "ai" ? "justify-end flex" : "justify-start flex"
                                }`}
                        >

                            <motion.div
                                className={`${msg.type === "ai"
                                    ? "bg-[#FFDB5B] rounded-xl text-black"
                                    : "border border-[#B65CFF] bg-transparent text-white rounded-full rounded-br-md px-4 py-2 "
                                    }`}
                                style={{
                                    display: "inline-block",
                                    wordWrap: "break-word",
                                }}
                            >
                                {msg.type === 'ai' ? (
                                    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md">
                                        {steps.map((step, index) => (

                                            <motion.div
                                                initial={{ opacity: 0, y: 10, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                transition={{ duration: 0.8 }}
                                                key={index} className="mb-6">
                                                <h2 className="text-xl font-semibold mb-2">
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: index * 0.5 }} // Add delay for each step
                                                    >
                                                        {index + 1}. {step.title}
                                                    </motion.span>
                                                </h2>
                                                <ul style={{ listStyleType: 'disc' }} className="pl-8">
                                                    <motion.li
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: (index + 1) * 0.5 }} // Delay for description
                                                        className="text-gray-300 text-lg"
                                                    >
                                                        {step.description}
                                                    </motion.li>
                                                </ul>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    msg.text
                                )}
                            </motion.div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </div>

            <div className="relative h-[10%]">
                <div className="h-full mt-10 flex items-center relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleSendbyEnter}
                        className="h-[48px] px-[48px] relative flex items-center w-full rounded-[30px] bg-[#3e3b40] text-white backdrop-blur-[20px] shadow-[0.5px_-0.5px_1px_#BA5FFF]"
                        placeholder="Start Typing..."
                    />
                    <img
                        src={Smile}
                        alt="Smile Icon"
                        className="absolute left-5 cursor-pointer"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        ref={pickerRef}
                    />
                    <img
                        src={userInput.trim() === "" ? Send : WhiteSend}
                        alt="Send Icon"
                        className="absolute right-5 cursor-pointer"
                        onClick={handleSend}
                    />
                </div>
                {showEmojiPicker && (
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
                    </div>)}

            </div>
        </div>
    );
};

JupiterActivatedState.propTypes = {
    onEnlargedJupiterClick: PropTypes.func.isRequired,
};

export default JupiterActivatedState;