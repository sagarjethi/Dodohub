use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
    println!("Download Service Started on :8086");
    
    // Mock token validation
    let token = "mock_download_token_12345";
    if validate_token(token) {
        println!("Token valid. Streaming file...");
    } else {
        println!("Invalid or expired token");
    }
}

fn validate_token(token: &str) -> bool {
    // In production, this would:
    // 1. Decode JWT
    // 2. Verify signature
    // 3. Check expiry
    // 4. Validate order_id and asset_id
    
    // Mock validation
    token.starts_with("mock_download_token")
}

fn generate_signed_url(order_id: &str, asset_id: &str) -> String {
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    
    // Mock signed URL (in production, use HMAC-SHA256)
    format!(
        "https://cdn.example.com/download?token={}_{}_{}&expires={}",
        order_id, asset_id, now, now + 900 // 15 min expiry
    )
}
