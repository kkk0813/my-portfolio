import { useState, useEffect } from "react";

const useSequentialTyper = (lines) => {
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [display, setDisplay] = useState("");

    useEffect(() => {
        if (!lines || lineIdx >= lines.length) return; // 1. Guard: stop if no lines or all lines finished

        const currentLine = lines[lineIdx];
        let timeout;

        // 3. Logic: Typing individual characters
        if (charIdx < currentLine.length) {
            timeout = setTimeout(() => {
                setDisplay(prev => prev + currentLine[charIdx]);
                setCharIdx(prev => prev + 1);
            }, 40); // 40ms per character
        } else if (lineIdx < lines.length - 1) { // Stop \n on the very last line
            timeout = setTimeout(() => {
                setDisplay(prev => prev + "\n");
                setLineIdx(prev => prev + 1);
                setCharIdx(0);
            }, 300);
        }

        return () => clearTimeout(timeout); // Cleanup: Essential to prevent memory leaks or "double-typing"
    }, [lineIdx, charIdx, lines]);

    return display;
};

const VisitorWidget = () => {
    const [data, setData] = useState(null);
    const [visitCount, setVisitCount] = useState(0); // 1. add visitCount state variable

    useEffect(() => {
        // --- Existing API / Session Cache Logic ---
        const cachedData = sessionStorage.getItem("visitor_geo");
        const hasCountedThisSession = sessionStorage.getItem("counted_this_session"); // check if counted this specific session

        // Load the current value from storage immediately
        const savedCount = localStorage.getItem("visit_count") || "0";
        let currentCount = parseInt(savedCount);

        if (!hasCountedThisSession) {
            currentCount += 1; // Increment by 1
            localStorage.setItem("visit_count", currentCount); // Save back to localStorage (automatically converted to string)
            sessionStorage.setItem("counted_this_session", "true"); // Set the "guard" so it doesn't run again on the second React mount
        }

        setVisitCount(currentCount); // Always update the reactive state (Instruction 4 & 5)

        if (cachedData) { // stay the same
            setData(JSON.parse(cachedData));
        } else {
            fetch("https://ipapi.co/json/")
                .then((res) => res.json())
                .then((result) => {
                    // 2. destructure only allowed fields
                    const { country_name, country_code, city } = result;
                    const clean = { country_name, country_code, city };
                    setData(clean);
                    sessionStorage.setItem("visitor_geo", JSON.stringify(clean));
                })
                .catch((err) => console.error("Geo fetch failed:", err));
        }
    }, []);

     // 4. Build Lines Array (Exercise 4C)
    const lines = data ? [
        "> VISITOR_LOG initializing...",
        "✓ connection established",
        `✓ origin: ${data.city} [${data.country_code}]`,
        `✓ session count: #${visitCount}`,
    ] : ["> VISITOR_LOG initializing..."];

    // 5. Call Hook
    const display = useSequentialTyper(lines);

    return (
        <pre style={{ fontFamily: "var(--mono)", color: "var(--green)", fontSize: ".8rem", lineHeight: 2 }}>
            {display}
        </pre>
    );
};

export default VisitorWidget;