import React from 'react';
import AmazonLogo from '../../assets/LogoAma.svg';

const gradients = [
    'linear-gradient(319deg, #D388FF 5.96%, #4B94F6 95.49%)',
    'linear-gradient(90deg, #B054F6 0%, #FE52B0 100%)',
    'linear-gradient(90deg, #2890FA 0%, #6ED6F5 100%)',
    'linear-gradient(90deg, #FF0F7B 0%, #F89B29 100%)',
    'linear-gradient(94deg, #420167 -0.62%, #241C70 16.07%, #063678 29.18%, #2061F8 62.03%, #2D79F5 84.23%, #0FB3D4 100%)',
];

const jobCards = {
    'Senior UI/UX Designer': {
        postedDate: "19th Dec 2024",
        companyName: "Amazon",
        role: "Senior UI/UX Designer",
        detail: [
            "Full-time",
            'Remote',
            'Health benefits',
            '401k'
        ],
        skills: [
            'Figma',
            'Adobe XD',
            'Spline',
            'CSS',
            'JavaScript',
        ],
        currentStatus: {
            "Candidates Applied": 12,
            "Completed Interview": 26,
        }
    },
    'UI/UX Designer': {
        postedDate: "19th Dec 2024",
        companyName: "Amazon",
        role: "Senior UI/UX Designer",
        detail: [
            "Full-time",
            'Remote',
            'Health benefits',
            '401k'
        ],
        skills: [
            'Figma',
            'Adobe XD',
            'Spline',
            'CSS',
            'JavaScript',
        ],
        currentStatus: {
            "Candidates Applied": 12,
            "Completed Interview": 26,
        }
    },
    'UI Designer': {
        postedDate: "19th Dec 2024",
        companyName: "Amazon",
        role: "Senior UI/UX Designer",
        detail: [
            "Full-time",
            'Remote',
            'Health benefits',
            '401k'
        ],
        skills: [
            'Figma',
            'Adobe XD',
            'Spline',
            'CSS',
            'JavaScript',
        ],
        currentStatus: {
            "Candidates Applied": 12,
            "Completed Interview": 26,
        }
    },
    // You can add more job posts here
};

const Opportunities = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', boxSizing: 'border-box',gap: 24}}>
            {Object.keys(jobCards).map((jobKey, index) => {
                const job = jobCards[jobKey];
                const gradientIndex = index % 5;
                return (
                    <div key={jobKey}>
                        <div style={{ width: 525, height: 'auto', paddingTop: 12, paddingBottom: 28, paddingLeft: 12, paddingRight: 12, background: 'white', boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.25)', borderRadius: 32, border: '0.50px #D388FF solid', backdropFilter: 'blur(16px)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 16, display: 'inline-flex' }}>
                            <div style={{ alignSelf: 'stretch', height: 'auto', padding: 24, background: '#F5F5F5', boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.25) inset', borderRadius: 24, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex' }}>
                                <div style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                                    <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                                        <div style={{ width: 'auto', height: '100%', padding: 8, background: 'white', borderRadius: 24, backdropFilter: 'blur(16px)', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex', color: '#0072DC', fontSize: 12, fontWeight: '600', wordWrap: 'break-word' }}>
                                         {job.postedDate}
                                        </div>

                                        <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
                                            <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }}>
                                                <div style={{ padding: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex', textAlign: 'center', color: '#55557C', fontSize: 18, fontWeight: '600', height: 18, wordWrap: 'break-word' }}>
                                                    {job.companyName}
                                                </div>
                                                <div style={{ padding: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex', background: gradients[gradientIndex], WebkitBackgroundClip: 'text', textAlign: 'center', color: 'transparent', fontSize: 28, fontWeight: '700', wordWrap: 'break-word', lineHeight: 'auto' }}>
                                                        {job.role}
                                                </div>
                                            </div>

                                            <div style={{ width: '100%', height: '100%', boxShadow: '0px 0px 4px #C9FFFC', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                                                {job.detail.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            position: 'relative',
                                                            display: 'inline-flex',  // Allow container to adjust to content width
                                                            borderRadius: '8px',
                                                            background: gradients[gradientIndex],  // Gradient border
                                                            padding: '1.5px',  // Border thickness
                                                            boxSizing: 'border-box',
                                                        }}
                                                    >
                                                        {/* Inner content area with white background */}
                                                        <div
                                                            style={{
                                                                borderRadius: '6px',
                                                                backgroundColor: '#F5F5F5',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                padding: '4px',  // Adjust padding for content spacing
                                                            }}
                                                        >
                                                            {/* Gradient Text */}
                                                            <div
                                                                style={{
                                                                    background: gradients[gradientIndex],  // Gradient text
                                                                    WebkitBackgroundClip: 'text',
                                                                    color: 'transparent',
                                                                    fontSize: '11px',
                                                                    fontWeight: '700',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.48px',
                                                                    lineHeight: '1',
                                                                    textAlign: 'center',
                                                                    whiteSpace: 'nowrap',  // Prevent text from wrapping
                                                                }}
                                                            >
                                                                {item}
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <img src={AmazonLogo} alt="Company Logo" />
                                </div>

                                <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex' }}>
                                        {job.skills.map((item, index) => (
                                            <div key={index} style={{ padding: 8, background: 'white', borderRadius: 24, backdropFilter: 'blur(16px)', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex', color: '#1E1E1E', fontSize: 12, fontWeight: '600', wordWrap: 'break-word' }}>
                                                    {item}
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ alignSelf: 'stretch', paddingTop: 4, paddingBottom: 4, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex' }}>
                                        {Object.entries(job.currentStatus).map(([key, value], index) => (
                                            <div key={index} style={{ flex: '1 1 0', height: 36, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, background: 'rgba(255, 255, 255, 0.35)', boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.25)', borderRadius: 12, border: '1px #DCFFFF solid', justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
                                                <div style={{ color: '#55557C', fontSize: 14, fontWeight: '400', wordWrap: 'break-word' }}>
                                                    {key}
                                                </div>
                                                <div style={{ textAlign: 'right', color: '#55557C', fontSize: 20, fontWeight: '600', wordWrap: 'break-word' }}>
                                                    {value}
                                                </div>
                                            </div>  
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className='Ai' style={{padding: '0 16px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                                <div style={{ background: gradients[gradientIndex], WebkitBackgroundClip: 'text', color: 'transparent', fontSize: 20, fontWeight: '700', lineHeight: 'auto', wordWrap: 'break-word' }}>
                                    AI Interview In progress
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Opportunities;

