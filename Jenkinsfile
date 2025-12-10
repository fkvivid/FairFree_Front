pipeline {
    agent {
        docker {
            image 'node:24-alpine'
            // Option to reuse the workspace on the Jenkins agent
            reuseNode true 
        }
    }
    
    stages {
        
        stage('Install Dependencies') {
            steps {
                // Use 'npm ci' for clean and reliable installs in CI environments
                sh 'npm install'
            }
        }
        
        stage('Lint') {
            steps {
                // Execute the lint command as required
                sh 'npm run lint'
            }
        }
        
        stage('Build') {
            steps {
                // Execute the build command as required (Vite default is 'npm run build')
                sh 'npm run build'
                
                // Optional: Archive the build artifacts
                archiveArtifacts artifacts: 'dist/**'
            }
        }
        
        // Additional stages (e.g., Test, Deploy) can be added here
    }
}
