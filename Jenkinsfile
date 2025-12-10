pipeline {
    agent {
        docker {
            image 'fkvivid/my-jenkins-java-node:latest'
            label 'docker-node'
        }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
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
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**', followSymlinks: false
            }
        }
        
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}

