import { useState } from "react";
import smallJupitericon from "../assets/smallJupiter.png";
import PropTypes from "prop-types";

const PracticeSimulationQuestion = ({ onSmallJupiterClick }) => {
    const [question, setQuestion] = useState("You are developing a supervised learning system to predict customer retention for a subscription-based service. The system uses a dataset with features such as monthly usage, payment history, and customer feedback scores. Implement a supervised learning model using logistic regression to predict whether a customer will renew their subscription (1) or not (0).\nWrite the code to:\n\n- Split the dataset into training and testing sets.\n- ⁠Train the logistic regression model.\n- ⁠Evaluate the model's accuracy on the testing set.")
    const [example, setExample] = useState("Input: MonthlyUsage = [0.3, 0.7, ...],\nPaymentHistory = [0.8, 0.4, ...], \nFeedbackScore = [0.6, 0.5, ...] \nOutput: Model accuracy: 0.85 (example output)");
    return (
        <div className="w-[95%] h-full flex flex-col bg-transparent pl-5 text-red-700">
            <div className="flex h-[54%] relative overflow-hidden">
                <div className="relative flex-grow">
                    <div className="p-8 pl-10 rounded-[30px] questionBox relative">
                        <div className="absolute inset-0 rounded-[30px] bg-black opacity-[50%] cutout-box"></div>
                        <div className="relative z-10 flex flex-col">
                            <div className="absolute -top-5 -right-5 flex items-end">
                                <img
                                    className="relative h-[60px] w-[60px] cursor-pointer"
                                    src={smallJupitericon}
                                    alt=""
                                    onClick={onSmallJupiterClick}
                                />
                            </div>
                            <div className="text-[24px] pb-4 font-bold text-white">
                                <h1>Question</h1>
                            </div>
                            <div className="pr-10 leading-[22px] text-justify text-white overflow-y-auto h-[30vh]">
                                {
                                    question.split('\n').map((line, index) => (
                                        <p className='text-xl' key={index}>{line}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-[40%] flex-col rounded-[30px] mt-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-0 rounded-[30px] bg-[#3E3B41] opacity-[40%]"></div>
                    <div className="relative z-10 flex flex-col pl-10 pr-10">
                        <div className="flex">
                            <h1 className="text-[24px] pt-[2rem] pb-[2rem] text-white">
                                Example:
                            </h1>
                        </div>
                        <div className="flex flex-col text-[16px] text-base leading-[22px] text-white">
                            {
                                example.split('\n').map((line, index) => (
                                    <p className='text-lg' key={index}>{line}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PracticeSimulationQuestion.propTypes = {
    onSmallJupiterClick: PropTypes.func.isRequired,
};

export default PracticeSimulationQuestion;