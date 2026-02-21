# EC2 Deployment Guide

## Prerequisites

1. **AWS EC2 Instance**
   - AMI: Ubuntu Server 22.04 LTS or 20.04 LTS
   - Instance Type: t2.micro (free tier) or higher
   - Security Group: Allow inbound traffic on port 5000

2. **Security Group Configuration**
   ```
   Type: Custom TCP
   Port: 5000
   Source: 0.0.0.0/0 (or your IP)
   
   Type: SSH
   Port: 22
   Source: Your IP
   ```

## Deployment Steps

### Option 1: Manual Deployment

1. **Connect to EC2**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

2. **Install Docker**
   ```bash
   sudo apt update -y
   sudo apt install docker.io -y
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -a -G docker ubuntu
   ```

3. **Install Docker Compose**
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

4. **Upload Project Files**
   ```bash
   # From your local machine
   scp -i your-key.pem -r "Student Management System" ubuntu@your-ec2-ip:~/
   ```

5. **Create .env file on EC2**
   ```bash
   cd "Student Management System"
   nano .env
   ```
   Add:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

6. **Build and Run**
   ```bash
   sudo docker-compose up -d --build
   ```

### Option 2: Using Deployment Script

1. **Upload files to EC2**
   ```bash
   scp -i your-key.pem -r "Student Management System" ubuntu@your-ec2-ip:~/
   ```

2. **SSH into EC2**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Run deployment script**
   ```bash
   cd "Student Management System"
   chmod +x deploy-ec2.sh
   ./deploy-ec2.sh
   ```

## Docker Commands

```bash
# View logs
sudo docker-compose logs -f

# Stop application
sudo docker-compose down

# Restart application
sudo docker-compose restart

# Rebuild and restart
sudo docker-compose up -d --build

# Check status
sudo docker-compose ps
```

## Access Application

```
http://your-ec2-public-ip:5000/api
```

## Test API

```bash
curl http://your-ec2-public-ip:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"strEmail":"admin@example.com","strPassword":"admin123"}'
```

## Troubleshooting

1. **Port not accessible**
   - Check EC2 Security Group allows port 5000
   - Check if Docker container is running: `docker ps`

2. **Container not starting**
   - Check logs: `docker-compose logs`
   - Verify .env file exists and has correct values

3. **MongoDB connection issues**
   - Verify MongoDB Atlas allows connections from EC2 IP
   - Check MONGO_URI is correct in .env

## Production Recommendations

1. **Use HTTPS**: Set up SSL/TLS with Let's Encrypt
2. **Use Nginx**: Reverse proxy for better security
3. **Environment Variables**: Use AWS Secrets Manager
4. **Monitoring**: Set up CloudWatch logs
5. **Auto-scaling**: Use ECS or EKS for production
