pipeline {
    agent {
        docker {
            image 'node:24-alpine'    // Choose your preferred Node version
            args '-u root:root'       // Allows installing packages if needed
        }
    }

    triggers {
        cron('H/1 * * * *')           // Run every 1 minute
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "jenkins"]],      // <--- choose your branch here
                    userRemoteConfigs: [[url: 'https://github.com/fkvivid/FairFree_Front']]
                ])
            }
        }

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

