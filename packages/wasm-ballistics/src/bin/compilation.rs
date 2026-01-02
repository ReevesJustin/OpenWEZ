//! a compilation agent that would need to interact with `cargo` and `wasm-pack` on the command line.
use std::process::{Command, Stdio};
use std::io::{BufRead, BufReader};

fn main() {
    println!("Rust WASM Compilation Agent");

    let wasm_pack_command = "wasm-pack build --target web";

    println!("Executing: {}", wasm_pack_command);

    let mut cmd = Command::new("wasm-pack")
        .args(&["build", "--target", "web"])
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("Failed to execute wasm-pack command");

    if let Some(stdout) = cmd.stdout.take() {
        let reader = BufReader::new(stdout);
        for line in reader.lines() {
            println!("[wasm-pack] {}", line.unwrap());
        }
    }

    if let Some(stderr) = cmd.stderr.take() {
        let reader = BufReader::new(stderr);
        for line in reader.lines() {
            eprintln!("[wasm-pack-error] {}", line.unwrap());
        }
    }

    let status = cmd.wait().expect("Failed to wait for wasm-pack command");

    if status.success() {
        println!("WASM compilation successful!");
    } else {
        eprintln!("WASM compilation failed!");
    }
}
