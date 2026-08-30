pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo '=== Checking out source code ==='
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                echo '=== Building Spring Boot Backend ==='

                bat '''
                    mvnw.cmd clean package -DskipTests
                '''
            }
        }

        stage('Test Backend') {
            steps {
                echo '=== Running Backend Tests ==='

                bat '''
                    mvnw.cmd test
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                echo '=== Building React Frontend ==='

                bat '''
                    cd frontend
                    npm ci
                    npm run build
                '''
            }
        }

        stage('CI Complete') {
            steps {
                echo '======================================'
                echo ' Jenkins CI BUILD SUCCESSFUL'
                echo ' Backend build completed'
                echo ' Backend tests completed'
                echo ' React build completed'
                echo '======================================'
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESSFUL'
        }

        failure {
            echo 'BUILD FAILED - Check console output'
        }
    }
}