import { useState, useRef } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(
      (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    const filesWithId = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'pending', // pending, uploading, processing, complete, error
    }));
    setFiles((prev) => [...prev, ...filesWithId]);

    // Simulate upload
    filesWithId.forEach((fileObj) => simulateUpload(fileObj.id));
  };

  const simulateUpload = (id) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === id) {
            if (progress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, status: 'processing' };
            }
            return { ...f, progress };
          }
          return f;
        })
      );
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">
              Upload Content
            </h1>
            <p className="mt-2 text-slate-600">
              Add your photos and videos to the marketplace.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setFiles([])}
            disabled={files.length === 0}
          >
            Clear All
          </Button>
        </div>

        <Card className="p-8 mb-8">
          <div
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-primary-500 hover:bg-primary-50/30 transition-all cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,video/*"
            />
            <div className="mx-auto h-16 w-16 text-primary-200 bg-primary-50 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              Drag & drop files here
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              or click to browse from your computer
            </p>
            <p className="mt-4 text-xs text-slate-400">
              Supports JPG, PNG, MP4 (Max 50MB)
            </p>
          </div>
        </Card>

        {files.length > 0 && (
          <div className="space-y-4 animate-slide-up">
            <h3 className="font-medium text-slate-900">
              Upload Queue ({files.length})
            </h3>
            {files.map((fileObj) => (
              <Card key={fileObj.id} className="p-4 flex items-center gap-4">
                <div className="h-16 w-16 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden">
                  {fileObj.file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(fileObj.file)}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                      Video
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {fileObj.file.name}
                    </p>
                    <span className="text-xs text-slate-500 capitalize">
                      {fileObj.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${fileObj.progress}%` }}
                    ></div>
                  </div>
                </div>
                <Button variant="secondary" className="text-xs py-1 px-2 h-8">
                  Edit
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
