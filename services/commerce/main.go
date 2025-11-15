package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
)

// Cart represents a shopping cart
type Cart struct {
	ID        string     `json:"id"`
	UserID    string     `json:"user_id,omitempty"`
	SessionID string     `json:"session_id"`
	Items     []CartItem `json:"items"`
	Total     float64    `json:"total"`
	CreatedAt time.Time  `json:"created_at"`
}

// CartItem represents an item in the cart
type CartItem struct {
	AssetID     string  `json:"asset_id"`
	Title       string  `json:"title"`
	Price       float64 `json:"price"`
	LicenseType string  `json:"license_type"`
}

// Order represents a completed order
type Order struct {
	ID              string     `json:"id"`
	UserID          string     `json:"user_id"`
	Items           []CartItem `json:"items"`
	Total           float64    `json:"total"`
	Status          string     `json:"status"` // pending, paid, failed
	PaymentIntentID string     `json:"payment_intent_id,omitempty"`
	CreatedAt       time.Time  `json:"created_at"`
}

// In-memory storage (replace with Redis in production)
var carts = make(map[string]*Cart)
var orders = make(map[string]*Order)

func main() {
	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/cart", cartHandler)
	http.HandleFunc("/cart/add", addToCartHandler)
	http.HandleFunc("/cart/remove", removeFromCartHandler)
	http.HandleFunc("/checkout", checkoutHandler)
	http.HandleFunc("/orders/", orderHandler)

	log.Println("Commerce Service starting on :8085")
	if err := http.ListenAndServe(":8085", enableCORS(http.DefaultServeMux)); err != nil {
		log.Fatal(err)
	}
}

// CORS middleware
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "healthy", "service": "commerce"})
}

func cartHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	sessionID := r.URL.Query().Get("session_id")
	if sessionID == "" {
		http.Error(w, "session_id required", http.StatusBadRequest)
		return
	}

	cart, exists := carts[sessionID]
	if !exists {
		// Create new cart
		cart = &Cart{
			ID:        uuid.New().String(),
			SessionID: sessionID,
			Items:     []CartItem{},
			Total:     0,
			CreatedAt: time.Now(),
		}
		carts[sessionID] = cart
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cart)
}

func addToCartHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		SessionID   string  `json:"session_id"`
		AssetID     string  `json:"asset_id"`
		Title       string  `json:"title"`
		Price       float64 `json:"price"`
		LicenseType string  `json:"license_type"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	cart, exists := carts[req.SessionID]
	if !exists {
		cart = &Cart{
			ID:        uuid.New().String(),
			SessionID: req.SessionID,
			Items:     []CartItem{},
			Total:     0,
			CreatedAt: time.Now(),
		}
		carts[req.SessionID] = cart
	}

	// Add item
	item := CartItem{
		AssetID:     req.AssetID,
		Title:       req.Title,
		Price:       req.Price,
		LicenseType: req.LicenseType,
	}
	cart.Items = append(cart.Items, item)
	cart.Total += req.Price

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cart)
}

func removeFromCartHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		SessionID string `json:"session_id"`
		AssetID   string `json:"asset_id"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	cart, exists := carts[req.SessionID]
	if !exists {
		http.Error(w, "Cart not found", http.StatusNotFound)
		return
	}

	// Remove item
	for i, item := range cart.Items {
		if item.AssetID == req.AssetID {
			cart.Total -= item.Price
			cart.Items = append(cart.Items[:i], cart.Items[i+1:]...)
			break
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cart)
}

func checkoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		SessionID string `json:"session_id"`
		UserID    string `json:"user_id"`
		Email     string `json:"email"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	cart, exists := carts[req.SessionID]
	if !exists || len(cart.Items) == 0 {
		http.Error(w, "Cart is empty", http.StatusBadRequest)
		return
	}

	// Create order
	order := &Order{
		ID:        uuid.New().String(),
		UserID:    req.UserID,
		Items:     cart.Items,
		Total:     cart.Total,
		Status:    "pending",
		CreatedAt: time.Now(),
	}

	// Mock Stripe payment intent
	order.PaymentIntentID = fmt.Sprintf("pi_mock_%s", uuid.New().String()[:8])
	order.Status = "paid" // In production, this would be updated via webhook

	orders[order.ID] = order

	// Clear cart
	delete(carts, req.SessionID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"order_id":          order.ID,
		"payment_intent_id": order.PaymentIntentID,
		"status":            order.Status,
		"total":             order.Total,
	})
}

func orderHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	orderID := r.URL.Path[len("/orders/"):]
	order, exists := orders[orderID]
	if !exists {
		http.Error(w, "Order not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(order)
}
