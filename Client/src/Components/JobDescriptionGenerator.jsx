import React, { useState } from 'react';
import axios from 'axios';

const JobDescriptionGenerator = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [position, setPosition] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await axios.post('http://127.0.0.1:5000/generate_job_description', {
                job_title: jobTitle,
                position: position
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false  // Ensure credentials are not included (if not needed)
            });

            const data = res.data;

            const response = {
                job_description: data.job_description || "",
                mainSkills: data.main_skills || [],
                subSkill: data.sub_skills || []
            };

            console.log("Structured Response:", response);
            setResult(response);

        } catch (error) {
            console.error('Error fetching job description:', error);

            if (error.response) {
                // Server responded with a status code other than 2xx
                alert(`Failed to generate job description: ${error.response.data.error || 'Unknown error'}`);
            } else if (error.request) {
                // Request made but no response received
                alert('No response from the server. Please check the connection.');
            } else {
                // Other errors
                alert('Request failed. Please try again.');
            }
        }

        setLoading(false);
    };


    return (
        <div className='w-full px-[6vw] py-4'>
            <h1>AI Job Description Generator</h1>

            <div style={styles.inputGroup}>
                <label>Job Title:</label>
                <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    style={styles.input}
                />
            </div>

            <div style={styles.inputGroup}>
                <label>Position Level:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Intern, Fresher, Senior"
                    style={styles.input}
                />
            </div>

            <button onClick={handleGenerate} disabled={loading} className='bg-blue-700 text-[#FFF] p-2 rounded-md'>
                {loading ? 'Generating...' : 'Generate Description'}
            </button>

            {result && (
                <div style={styles.result}>
                    <h2>Job Description:</h2>
                    <p>{result.job_description}</p>

                    <h3>Main Skills:</h3>
                    <ul>
                        {result.mainSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>

                    <h3>Subskills:</h3>
                    <ul>
                        {result.subSkill.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

// Inline CSS for styling
const styles = {
    container: {
        maxWidth: '700px',
        margin: 'auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    result: {
        marginTop: '30px',
    },
};

export default JobDescriptionGenerator;
