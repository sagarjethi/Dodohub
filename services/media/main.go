package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

const (
	MaxUploadSize = 50 << 20 // 50 MB
	UploadDir     = "./uploads"
)

func main() {
	// Ensure upload directory exists
	if err := os.MkdirAll(UploadDir, 0755); err != nil {
		log.Fatal("Failed to create upload directory:", err)
	}

	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/upload", uploadHandler)

	log.Println("Media Service starting on :8082")
	if err := http.ListenAndServe(":8082", nil); err != nil {
		log.Fatal(err)
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Media Service is healthy")
}

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// 1. Limit upload size
	r.Body = http.MaxBytesReader(w, r.Body, MaxUploadSize)
	if err := r.ParseMultipartForm(MaxUploadSize); err != nil {
		http.Error(w, "File too big", http.StatusBadRequest)
		return
	}

	// 2. Retrieve the file
	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Invalid file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// 3. Validate file type (basic MIME check)
	buff := make([]byte, 512)
	if _, err := file.Read(buff); err != nil {
		http.Error(w, "Failed to read file", http.StatusInternalServerError)
		return
	}
	filetype := http.DetectContentType(buff)
	if filetype != "image/jpeg" && filetype != "image/png" && filetype != "video/mp4" {
		http.Error(w, "Invalid file type. Only JPEG, PNG, and MP4 allowed.", http.StatusBadRequest)
		return
	}

	// Reset file pointer after reading header
	if _, err := file.Seek(0, 0); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// 4. Save file (Simulating S3 upload by saving locally for MVP)
	filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(header.Filename))
	dstPath := filepath.Join(UploadDir, filename)

	dst, err := os.Create(dstPath)
	if err != nil {
		http.Error(w, "Failed to save file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Failed to write file", http.StatusInternalServerError)
		return
	}

	// 5. Respond with success
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"status": "success", "filename": "%s", "message": "File uploaded successfully"}`, filename)
	log.Printf("Uploaded file: %s", filename)
}
