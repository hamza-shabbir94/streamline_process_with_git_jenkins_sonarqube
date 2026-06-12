


pipeline {
    agent any
    

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        SONAR_TOKEN = credentials('sonar-token')
        SONAR_ORGANIZATION = 'jenkins-project-123'
        SONAR_PROJECT_KEY = 'jenkins-project-123_ci-jenkins'
    }

    stages {
        stages {
        stage('Build') {
            steps {
                // Your existing build steps
                sh 'npm install'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                // Use the name you defined in "Configure System"
                withSonarQubeEnv('MySonarQube') {
                    // Run the scan command
                    // Note: Use the project key and organization from your screenshot
                    sh 'sonar-scanner -Dsonar.projectKey=hamza-shabbir94_streamline_process_with_git_jenkins_sonarqube -Dsonar.organization=hamza-shabbir94'
                }
            }
        }
        
        stage('Code-Analysis') {
            steps {
                withSonarQubeEnv('SonarCloud') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner \
  -Dsonar.organization=jenkins-project-123 \
  -Dsonar.projectKey=jenkins-project-123_ci-jenkins \
  -Dsonar.sources=. \
  -Dsonar.host.url=https://sonarcloud.io '''
                }
            }
        }
       
        
      
       stage('Docker Build And Push') {
            steps {
                script {
                    docker.withRegistry('', 'docker-cred') {
                        def buildNumber = env.BUILD_NUMBER ?: '1'
                        def image = docker.build("pekker123/crud-123:latest")
                        image.push()
                    }
                }
            }
        }
    
       
        stage('Deploy To EC2') {
            steps {
                script {
                        sh 'docker rm -f $(docker ps -q) || true'
                        sh 'docker run -d -p 3000:3000 pekker123/crud-123:latest'
                        
                    
                }
            }
        }
        
}
}
