import React, { useState, useEffect } from 'react';

const VIBES = [
    { mood: '😀', label: 'Happy' },
    { mood: '😎', label: 'Cool' },
    { mood: '😴', label: 'Sleepy' },
    { mood: '🤯', label: 'Mind Blown' },
    { mood: '😢', label: 'Sad' },
    { mood: '🔥', label: 'Energetic' },
];

const STORAGE_KEY = 'vibeCheckMood';

function getTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function App() {
    const [selectedVibe, setSelectedVibe] = useState(null);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.date === getTodayDate()) {
                    setSelectedVibe(parsed);
                } else {
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const handleSelect = (vibe) => {
        const data = {
            mood: vibe.mood,
            label: vibe.label,
            date: getTodayDate(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSelectedVibe(data);
    };

    const handleReset = () => {
        localStorage.removeItem(STORAGE_KEY);
        setSelectedVibe(null);
    };

    return (
        <div className="app-wrapper">
            {/* Ambient background blobs */}
            <div className="bg-blob blob-1" />
            <div className="bg-blob blob-2" />
            <div className="bg-blob blob-3" />

            <div className="app-container">
                <header className="app-header">
                    <h1 className="app-title">
                        <span className="title-emoji">✨</span> Vibe Check
                    </h1>
                    <p className="app-subtitle">How are you feeling today?</p>
                </header>

                <div className="card emoji-card">
                    <h2 className="card-title">Pick Your Vibe</h2>
                    <div className="emoji-grid">
                        {VIBES.map((vibe) => {
                            const isSelected =
                                selectedVibe && selectedVibe.mood === vibe.mood;
                            return (
                                <button
                                    key={vibe.label}
                                    className={`emoji-btn ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleSelect(vibe)}
                                    aria-label={`Select ${vibe.label}`}
                                >
                                    <span className="emoji-icon">{vibe.mood}</span>
                                    <span className="emoji-label">{vibe.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="card status-card">
                    {selectedVibe ? (
                        <div className="status-message selected-status">
                            <span className="status-emoji">{selectedVibe.mood}</span>
                            <div className="status-text">
                                <p className="status-primary">
                                    Your vibe today is{' '}
                                    <strong>
                                        {selectedVibe.mood} {selectedVibe.label}
                                    </strong>
                                </p>
                                <p className="status-secondary">
                                    Selected on: {selectedVibe.date}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="status-message empty-status">
                            <span className="status-emoji">🤔</span>
                            <p className="status-primary">
                                No vibe selected yet for today.
                            </p>
                        </div>
                    )}
                </div>

                {selectedVibe && (
                    <button className="reset-btn" onClick={handleReset}>
                        <span className="reset-icon">↺</span> Reset Vibe
                    </button>
                )}

                <footer className="app-footer">
                    <p>Made with 💜 &middot; Vibe Check App</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
