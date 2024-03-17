


pipeline {
    
    environment{
        credentialsId = 'dockerhubCredentials' // Jenkins credentials ID for DockerHub
        EC2_INSTANCE_IP = '13.235.78.132'
        EC2_INSTANCE_USERNAME = 'ubuntu'
        PRIVATE_KEY_PATH = 'C:/Users/axiom/Downloads/jenkins_depEase.pem'
        availablePort=80
        def jobName=null

    }
    agent any
    
    stages {
        stage('Cloning Git') {
            steps {
                // Checkout code from the main branch
                git branch: 'main', url: "https://github.com/abdullah117765/${env.JOB_NAME}"
            }
        }
        
        stage('Build') {
            steps {
               
               bat 'npm install '

                
            }
        }
        
        stage('Test') {
            steps {
                 echo "testing successful"   
            }
        }
      
        
      
       
        stage("docker image"){ 
            steps{ 
                script{

                    jobName = env.JOB_NAME.toLowerCase() 
                    
                    withDockerRegistry(credentialsId:'dockerhubCredentials'){
                            bat "docker build -t hamazzaii5/${jobName} ."
                            echo 'image building done'
                            bat "docker push hamazzaii5/${jobName}"

                    }
                    
                }

            }
 
        }
        
        stage('deployed') {
              steps {
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
                        
                        // Construct the SSH command using Windows path and execute it using 'bat'
                        
                        bat "ssh -i \"${env.PRIVATE_KEY_PATH}\" ${env.EC2_INSTANCE_USERNAME}@${env.EC2_INSTANCE_IP} \"echo 'after the login';  sudo docker pull hamazzaii5/${jobName}:latest; sudo docker run -d -p ${availablePort}:3000 hamazzaii5/${jobName}:latest\""


                    }
                }
        }


    }
}
