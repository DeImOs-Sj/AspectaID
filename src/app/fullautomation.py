import os
import subprocess
import requests
import json

def run_command(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        raise Exception(f"Command failed with error:\n{stderr.decode()}")
    return stdout.decode()

def setup_environment():
    commands = [
        "conda create -n training-node python==3.10 -y",
        "conda activate training-node",
        "pip install -r requirements.txt"
    ]
    for command in commands:
        run_command(command)
        print(f"Executed: {command}")

def get_task_data(task_id, api_key):
    url = f"https://fed-ledger-prod.flock.io/api/v1/tasks/{task_id}/data"
    headers = {
        'flock-api-key': api_key
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def save_training_data(data, file_path):
    with open(file_path, 'w') as f:
        for entry in data:
            f.write(json.dumps(entry) + "\n")

def train_model(hf_token, cuda_device):
    command = f"HF_TOKEN={hf_token} CUDA_VISIBLE_DEVICES={cuda_device} python demo.py"
    run_command(command)
    print("Training complete")

def merge_weights():
    run_command("python merge.py")
    print("Weights merged")

def upload_to_huggingface(hf_token, hf_username):
    command = f"hf_api.upload_folder(folder_path='path_to_your_model_folder', repo_id='{hf_username}/your_model_repo', use_auth_token='{hf_token}')"
    run_command(command)
    print("Model uploaded to HuggingFace")

def submit_task(task_id, api_key, hg_repo_id):
    url = "https://fed-ledger-prod.flock.io/api/v1/tasks/submit-result"
    headers = {
        'flock-api-key': api_key,
        'Content-Type': 'application/json'
    }
    data = {
        "task_id": task_id,
        "data": {
            "hg_repo_id": hg_repo_id,
            "base_model": "gemma"
        }
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    response.raise_for_status()
    print("Task submitted successfully")

def main():
    task_id = os.getenv('TASK_ID')
    flock_api_key = os.getenv('FLOCK_API_KEY')
    hf_token = os.getenv('HF_TOKEN')
    cuda_device = os.getenv('CUDA_VISIBLE_DEVICES', '0')
    hf_username = os.getenv('HF_USERNAME')

    if not all([task_id, flock_api_key, hf_token, hf_username]):
        raise ValueError("Missing environment variables")

    setup_environment()

    data = get_task_data(task_id, flock_api_key)
    save_training_data(data, 'demo_data.jsonl')

    train_model(hf_token, cuda_device)
    merge_weights()
    upload_to_huggingface(hf_token, hf_username)

    hg_repo_id = f"{hf_username}/your_model_repo"
    submit_task(task_id, flock_api_key, hg_repo_id)

if __name__ == "__main__":
    main()
