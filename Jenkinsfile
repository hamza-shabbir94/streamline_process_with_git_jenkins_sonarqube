


pipeline {
    agent any
    

    environment {
        SONAR_CRED_ID = 'SONAR_TOKEN' 
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {
        stage('Build') {
            steps {
                // Your existing build steps
                sh 'npm install'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                // This fetches the secret from Jenkins and maps it to the SONAR_TOKEN variable
                withCredentials([string(credentialsId: "${env.SONAR_CRED_ID}", variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('MySonarQube') {
                    sh '''
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.token=${SONAR_TOKEN} \
                        -Dsonar.projectKey=hamza-shabbir94_streamline_process_with_git_jenkins_sonarqube \
                        -Dsonar.organization=hamza-shabbir94
                    '''
                }
            }
        }
        
//        stage('Code-Analysis') {
//            steps {
//                withSonarQubeEnv('SonarCloud') {
//                    sh '''$SCANNER_HOME/bin/sonar-scanner \
//  -Dsonar.organization=jenkins-project-123 \
//  -Dsonar.projectKey=jenkins-project-123_ci-jenkins \
//  -Dsonar.sources=. \
//  -Dsonar.host.url=https://sonarcloud.io '''
//                }
//            }
//        }
       
        
      
       stage('Docker Build And Push') {
            steps {
                script {
                    docker.withRegistry('', 'docker-cred') {
                        def buildNumber = env.BUILD_NUMBER ?: '1'
                        def image = docker.build("hamza94/crud-123:latest")
                        image.push()
                    }
                }
            }
        }
    
       
        stage('Deploy To EC2') {
            steps {
                script {
                        sh 'docker rm -f $(docker ps -q) || true'
                        sh 'docker run -d -p 3000:3000 hamza94/crud-123:latest'
                        
                    
                }
            }
        }
        
}
}
}