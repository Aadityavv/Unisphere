// src/components/faculty/QRScannerComponent.tsx
import React, { useState } from 'react';
import { QrCode, Camera, X } from 'lucide-react';

interface QRScannerComponentProps {
  onScan: (payload: string) => void;
  isActive: boolean;
  onToggle: () => void;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({
                                                                 onScan,
                                                                 isActive,
                                                                 onToggle,
                                                               }) => {
  const [scannedCode, setScannedCode] = useState('');

  const handleManualInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (scannedCode.trim()) {
      onScan(scannedCode.trim());
      setScannedCode('');
    }
  };

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <QrCode className="w-5 h-5 mr-2" />
            QR Code Scanner
          </h3>
          <button
              onClick={onToggle}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
              }`}
          >
            {isActive ? (
                <>
                  <X className="w-4 h-4 mr-2 inline" />
                  Stop Scanner
                </>
            ) : (
                <>
                  <Camera className="w-4 h-4 mr-2 inline" />
                  Start Scanner
                </>
            )}
          </button>
        </div>

        {isActive ? (
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">QR Scanner Active</p>
                <p className="text-sm text-gray-500 mt-2">
                  Point camera at student QR code to mark attendance
                </p>
              </div>

              <div className="border-t pt-4">
                <form onSubmit={handleManualInput} className="flex space-x-2">
                  <input
                      type="text"
                      value={scannedCode}
                      onChange={(e) => setScannedCode(e.target.value)}
                      placeholder="Or enter student ID manually"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
        ) : (
            <div className="text-center py-8">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Click &quot;Start Scanner&quot; to begin marking attendance
              </p>
            </div>
        )}
      </div>
  );
};

export default QRScannerComponent;
