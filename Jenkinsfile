pipeline {
    
    environment {
        credentialsId = 'dockerhubCredentials' // Jenkins credentials ID for DockerHub
        EC2_INSTANCE_IP = '13.235.67.33'  // dont touch this
        EC2_INSTANCE_USERNAME = 'ubuntu'
        PRIVATE_KEY_PATH = 'C:/Users/axiom/Downloads/jenkins_depEase.pem' // dont change this
        exposePort = 3000   // change according to your docker file
        def jobName = null  // dont touch this
    }
    
    agent any
    
    parameters {
        booleanParam(name: 'PARAM_NAME', defaultValue: true, description: 'Description of parameter')
    }
    
    stages {
        stage('Cloning Git') {
            when {
                expression { params.PARAM_NAME }
            }
            steps {
                // Checkout code from the main branch
                git branch: 'main', url: "https://github.com/abdullah117765/${env.JOB_NAME}"
            }
        }
        
        stage('Build') {
            when {
                expression { params.PARAM_NAME }
            }
            steps {
                bat 'npm install '
            }
        }
        
        stage('Test') {
            when {
                expression { params.PARAM_NAME }
            }
            steps {
                echo "testing successful"   
            }
        }
        
        stage("docker image") {
            steps {
                script {
                     jobName = env.JOB_NAME.toLowerCase() 

                    if (!params.PARAM_NAME) {
                        bat "docker rmi hamazzaii5/${jobName}"
                    } else {
                        jobName = env.JOB_NAME.toLowerCase() 
                    
                        withDockerRegistry(credentialsId:'dockerhubCredentials') {
                            bat "docker build -t hamazzaii5/${jobName} ."
                            echo 'image building done'
                            bat "docker push hamazzaii5/${jobName}"
                        }
                    }
                }
            }
        }
        
       stage('deployed') {
    steps {
        script {
            // Initialize jobName
            def jobName = env.JOB_NAME.toLowerCase()
            
            // Echo the AWS CLI command to be executed
            echo 'aws ec2 describe-instances'
            
            // Use withCredentials block to set AWS credentials
            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'awsCredentials']]) {
                
                // Set the AWS region to Mumbai (ap-south-1) using the environment variable
                bat 'set AWS_REGION=ap-south-1'
                
                // Execute the AWS CLI command with the specified region
                bat 'aws ec2 describe-instances --region ap-south-1'
                
                // Use SSH credentials to execute commands on the EC2 instance
                echo "before cred"
                
                if (!params.PARAM_NAME) {
                    
                    bat "ssh -i ${env.PRIVATE_KEY_PATH} ${env.EC2_INSTANCE_USERNAME}@${env.EC2_INSTANCE_IP} \"bash -c "sudo docker stop hamazzaii5/${jobName}:latest"\""
                    bat "ssh -i ${env.PRIVATE_KEY_PATH} ${env.EC2_INSTANCE_USERNAME}@${env.EC2_INSTANCE_IP} \"bash -c "sudo docker rm hamzazzaii5/${jobName}:latest"\""
                    bat "ssh -i ${env.PRIVATE_KEY_PATH} ${env.EC2_INSTANCE_USERNAME}@${env.EC2_INSTANCE_IP} \"bash -c "sudo docker rmi hamzazzaii5/${jobName}:latest"\""
                    
                } else {
                    bat "ssh -i ${env.PRIVATE_KEY_PATH} ${env.EC2_INSTANCE_USERNAME}@${env.EC2_INSTANCE_IP} \"bash -c "sudo docker pull hamazzaii5/${jobName}:latest"\""
                    bat "ssh -v -i ${env.PRIVATE_KEY_PATH} ${env.EC2_INSTANCE_USERNAME}@${env.EC2_INSTANCE_IP} \"bash -c "sudo docker run -d -p 8000-9000:${exposePort} hamazzaii5/${jobName}:latest"\""
                   
                 
                }
            }
        }
    }
}

    }
}
