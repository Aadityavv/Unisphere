import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2 } from 'lucide-react';

interface Props {
    eventId: number;          // whatever props you really pass in
    qrCodeData?: string;      // JSON-string or URL – optional
}

/**
 * Renders a QR code for the given event.
 * Falls back to `eventId` if explicit qrCodeData not provided.
 */
const QRDisplay: React.FC<Props> = ({ eventId, qrCodeData }) => {
    const value = qrCodeData ?? `event:${eventId}`;       // simple fallback

    /* ---- helpers for download / share buttons ---- */
    const handleDownload = () => {
        const svg = document.getElementById(`qr-${eventId}`) as SVGSVGElement | null;
        if (!svg) return;
        const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `event-${eventId}-qr.svg`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleShare = async () => {
        try {
            await navigator.share?.({
                url: window.location.href,
                title: 'My Event QR',
                text: 'Here is my digital pass.',
            });
        } catch (e) {
            console.error('Share cancelled or unsupported', e);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-xl shadow">
                {/* QRCodeSVG renders inline; give it a deterministic id */}
                <QRCodeSVG
                    id={`qr-${eventId}`}
                    value={value}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    includeMargin
                />
            </div>

            <div className="flex space-x-3">
                <button
                    onClick={handleDownload}
                    className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" /> Download
                </button>
                <button
                    onClick={handleShare}
                    className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    disabled={!navigator.share}
                >
                    <Share2 className="w-4 h-4 mr-2" /> Share
                </button>
            </div>
        </div>
    );
};

export default QRDisplay;
