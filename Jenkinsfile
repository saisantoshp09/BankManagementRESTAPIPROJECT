pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
        AWS_REGION = 'us-east-1'
        AWS_EB_APP = 'bank-management-app'
        AWS_EB_ENV = 'bank-management-env'
        APP_VERSION = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_MSG = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    env.GIT_AUTHOR = sh(script: 'git log -1 --pretty=%an', returnStdout: true).trim()
                }
                echo "Checked out commit: ${env.GIT_COMMIT}"
            }
        }
        
        stage('Build Backend') {
            steps {
                echo '=== Building Backend (Spring Boot) ==='
                sh '''
                    ./mvnw clean package -DskipTests
                '''
            }
        }
        
        stage('Test Backend') {
            steps {
                echo '=== Running Backend Tests ==='
                sh '''
                    ./mvnw test
                '''
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo '=== Building Frontend (React) ==='
                sh '''
                    cd frontend
                    npm ci
                    npm run build
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '=== Building Docker Multi-stage Image ==='
                sh '''
                    docker build -f Dockerfile.multistage \
                        -t ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/bank-management-app:${APP_VERSION} \
                        -t ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/bank-management-app:latest .
                '''
            }
        }
        
        stage('Push to Docker Hub') {
            when {
                branch 'main'
            }
            steps {
                echo '=== Pushing Docker Image to Hub ==='
                sh '''
                    echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                    docker push ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/bank-management-app:${APP_VERSION}
                    docker push ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/bank-management-app:latest
                    docker logout
                '''
            }
        }
        
        stage('Deploy to AWS') {
            when {
                branch 'main'
            }
            steps {
                echo '=== Deploying to AWS Elastic Beanstalk ==='
                withAWS(credentials: 'aws-credentials', region: "${AWS_REGION}") {
                    sh '''
                        # Create Dockerrun.aws.json for EB deployment
                        cat > Dockerrun.aws.json <<EOF
{
  "AWSEBDockerrunVersion": 2,
  "containerDefinitions": [
    {
      "name": "bank-management-app",
      "image": "${DOCKER_REGISTRY}/${DOCKER_USERNAME}/bank-management-app:${APP_VERSION}",
      "essential": true,
      "memory": 512,
      "portMappings": [
        {
          "hostPort": 80,
          "containerPort": 8080
        }
      ],
      "environment": [
        {
          "name": "SPRING_DATASOURCE_URL",
          "value": "jdbc:mysql://${RDS_ENDPOINT}:3306/bankdb"
        },
        {
          "name": "SPRING_DATASOURCE_USERNAME",
          "value": "${RDS_USERNAME}"
        },
        {
          "name": "SPRING_DATASOURCE_PASSWORD",
          "value": "${RDS_PASSWORD}"
        }
      ]
    }
  ]
}
EOF

                        # Deploy to Elastic Beanstalk
                        eb deploy ${AWS_EB_ENV} --verbose
                    '''
                }
            }
        }
        
        stage('Post-Deployment Test') {
            when {
                branch 'main'
            }
            steps {
                echo '=== Running Post-Deployment Health Check ==='
                sh '''
                    # Wait for deployment to complete
                    sleep 60
                    
                    # Health check
                    curl -f http://${AWS_EB_ENV}.elasticbeanstalk.com/api/accounts || exit 1
                '''
            }
        }
    }
    
    post {
        success {
            echo '========== BUILD SUCCESSFUL =========='
            script {
                sh '''
                    echo "Build completed successfully"
                    echo "Application deployed to: http://${AWS_EB_ENV}.elasticbeanstalk.com"
                '''
            }
        }
        failure {
            echo '========== BUILD FAILED =========='
            script {
                sh '''
                    echo "Build failed. Check logs above for details."
                '''
            }
        }
        always {
            cleanWs()
        }
    }
}
