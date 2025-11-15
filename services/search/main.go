package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

// Asset represents a searchable asset
type Asset struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	Category    string   `json:"category"`
	Price       float64  `json:"price"`
}

// SearchRequest represents the search query
type SearchRequest struct {
	Query      string  `json:"query"`
	Filters    Filters `json:"filters,omitempty"`
	Page       int     `json:"page"`
	PageSize   int     `json:"page_size"`
	SearchType string  `json:"search_type"` // keyword, semantic, hybrid
}

// Filters for advanced search
type Filters struct {
	Category    string   `json:"category,omitempty"`
	MinPrice    float64  `json:"min_price,omitempty"`
	MaxPrice    float64  `json:"max_price,omitempty"`
	Tags        []string `json:"tags,omitempty"`
	Orientation string   `json:"orientation,omitempty"`
}

// SearchResponse represents search results
type SearchResponse struct {
	Results    []Asset `json:"results"`
	Total      int     `json:"total"`
	Page       int     `json:"page"`
	TotalPages int     `json:"total_pages"`
}

// Mock data for demonstration
var mockAssets = []Asset{
	{ID: "1", Title: "Sunset Beach", Description: "Beautiful sunset over the ocean", Tags: []string{"nature", "sunset", "beach"}, Category: "photos", Price: 29.99},
	{ID: "2", Title: "City Skyline", Description: "Modern city at night", Tags: []string{"city", "urban", "night"}, Category: "photos", Price: 39.99},
	{ID: "3", Title: "Mountain Landscape", Description: "Majestic mountain range", Tags: []string{"nature", "mountains", "landscape"}, Category: "photos", Price: 34.99},
}

func main() {
	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/search", searchHandler)

	log.Println("Search Service starting on :8084")
	if err := http.ListenAndServe(":8084", nil); err != nil {
		log.Fatal(err)
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "search"})
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SearchRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Default pagination
	if req.PageSize == 0 {
		req.PageSize = 20
	}
	if req.Page == 0 {
		req.Page = 1
	}

	// Mock search logic (keyword-based for now)
	results := performSearch(req)

	// Calculate pagination
	total := len(results)
	totalPages := (total + req.PageSize - 1) / req.PageSize
	start := (req.Page - 1) * req.PageSize
	end := start + req.PageSize
	if end > total {
		end = total
	}

	response := SearchResponse{
		Results:    results[start:end],
		Total:      total,
		Page:       req.Page,
		TotalPages: totalPages,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func performSearch(req SearchRequest) []Asset {
	// Mock search: filter by query in title/description/tags
	var results []Asset
	query := strings.ToLower(req.Query)

	for _, asset := range mockAssets {
		if matchesQuery(asset, query) && matchesFilters(asset, req.Filters) {
			results = append(results, asset)
		}
	}

	return results
}

func matchesQuery(asset Asset, query string) bool {
	if query == "" {
		return true
	}

	// Check title
	if strings.Contains(strings.ToLower(asset.Title), query) {
		return true
	}

	// Check description
	if strings.Contains(strings.ToLower(asset.Description), query) {
		return true
	}

	// Check tags
	for _, tag := range asset.Tags {
		if strings.Contains(strings.ToLower(tag), query) {
			return true
		}
	}

	return false
}

func matchesFilters(asset Asset, filters Filters) bool {
	if filters.Category != "" && asset.Category != filters.Category {
		return false
	}

	if filters.MinPrice > 0 && asset.Price < filters.MinPrice {
		return false
	}

	if filters.MaxPrice > 0 && asset.Price > filters.MaxPrice {
		return false
	}

	return true
}
