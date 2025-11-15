use std::{thread, time};

fn main() {
    println!("Media Processor Worker Started...");

    // Mock processing loop
    loop {
        println!("Checking for new media tasks...");
        // In a real app, this would poll Redis/Kafka
        thread::sleep(time::Duration::from_secs(5));
    }
}
