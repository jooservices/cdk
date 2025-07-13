import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Lambda function resource
    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          return { statusCode: 200, body: 'Hello from Lambda!' };
        };
      `),
    });

    // VPC for the Python Lambda function
    const vpc = new ec2.Vpc(this, 'LambdaVpc', {
      maxAzs: 2, // Default is all AZs in region
    });

    // Python Lambda function in the VPC
    const pythonLambda = new lambda.Function(this, 'PythonLambda', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
import json
def handler(event, context):
    return { 'statusCode': 200, 'body': json.dumps('Hello from Python Lambda!') }
      `),
      vpc: vpc,
    });

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
