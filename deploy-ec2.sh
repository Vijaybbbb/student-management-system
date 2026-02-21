#!/bin/bash

# EC2 Deployment Script for Student Management System (Ubuntu)

echo "==================================="
echo "Installing Docker and Docker Compose"
echo "==================================="

# Update system
sudo apt update -y

# Install Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "==================================="
echo "Installing Git"
echo "==================================="

sudo apt install git -y

echo "==================================="
echo "Cloning Repository"
echo "==================================="

cd ~
git clone https://github.com/Vijaybbbb/student-management-system.git
cd student-management-system

echo "==================================="
echo "Setting up Environment Variables"
echo "==================================="

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://vijay:Test%40123@cluster0.cbqbvho.mongodb.net/?appName=Cluster0
JWT_SECRET=superman@123
EOF

echo "==================================="
echo "Building and Starting Application"
echo "==================================="

# Build and run with Docker Compose
sudo docker-compose up -d --build

echo "==================================="
echo "Deployment Complete!"
echo "Application running on port 5000"
echo "==================================="

# Check status
sudo docker-compose ps
