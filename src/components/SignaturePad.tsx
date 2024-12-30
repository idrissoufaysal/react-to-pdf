import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Upload, RotateCcw } from 'lucide-react';

interface SignaturePadProps {
  onSave: (signature: string) => void;
}

export function SignaturePad({ onSave }: SignaturePadProps) {
  const signaturePad = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const clear = () => {
    signaturePad.current?.clear();
    setIsEmpty(true);
  };

  const save = () => {
    if (signaturePad.current && !isEmpty) {
      const signature = signaturePad.current.toDataURL();
      onSave(signature);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onSave(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Signature</h2>
      
      <div className="border rounded-lg p-4 mb-4">
        <SignatureCanvas
          ref={signaturePad}
          canvasProps={{
            className: 'signature-canvas w-full h-64 border rounded',
            width: 500,
            height: 200
          }}
          onBegin={() => setIsEmpty(false)}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={clear}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Effacer
        </button>
        
        <button
          onClick={save}
          disabled={isEmpty}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Sauvegarder
        </button>

        <label className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
          <Upload className="w-4 h-4 mr-2" />
          Importer une image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}