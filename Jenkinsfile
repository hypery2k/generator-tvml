properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  disableConcurrentBuilds()
]

@Library('mare-build-library')
def nodeJS = new de.mare.ci.jenkins.NodeJS()

node {
  node('xcode') {

    def buildNumber = env.BUILD_NUMBER
    def workspace = env.WORKSPACE
    def buildUrl = env.BUILD_URL
    def branchName = env.BRANCH_NAME

    // PRINT ENVIRONMENT TO JOB
    echo "workspace directory is $workspace"
    echo "build URL is $buildUrl"
    echo "build Number is $buildNumber"
    echo "PATH is $env.PATH"

    try {

      stage('Checkout') {
        checkout scm
      }

      stage('Build') {
        sh "npm run clean"
        sh "npm install"
      }

      stage('Test') {
        sh "npm run test"
        //junit 'reports/TEST-*.xml'
      }

      stage('Integration-Test') {
        sh "npm run e2e"
        sh "npm run post-e2e"
      }

      stage('Publish NPM snapshot') {
        nodeJS.publishSnapshot('.', buildNumber, branchName)
      }

    } catch (e) {
      mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
      throw e
    }
  }

}
