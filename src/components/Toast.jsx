import { useEffect } from "react";

export default function Toast({ msg, onClose }) {
    useEffect(() => {
        const t = setTimeout(() => onClose?.(), 3500);
        return () => clearTimeout(t);
    }, [onClose]);
    if (!msg) return null;
    return (
        <div className="toast" role="status" aria-live="polite">
            {msg}
        </div>
    );
}
