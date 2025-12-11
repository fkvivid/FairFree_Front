pipeline {
    agent {
        docker {
            image 'node:24-alpine'
        }
    }
    stages {
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
                
                archiveArtifacts artifacts: 'dist/**'
            }
        }
    }
}
