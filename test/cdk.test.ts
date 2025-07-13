import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Cdk from '../lib/cdk-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-stack.ts
test('SQS Queue Created', () => {
//   const app = new cdk.App();
//     // WHEN
//   const stack = new Cdk.CdkStack(app, 'MyTestStack');
//     // THEN
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
});

// Test for Node.js Lambda function
// Checks if Lambda function with correct runtime exists

test('Node.js Lambda Function Created', () => {
  const app = new cdk.App();
  const stack = new Cdk.CdkStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs22.x',
  });
});

// Test for Python Lambda function in VPC

test('Python Lambda Function in VPC Created', () => {
  const app = new cdk.App();
  const stack = new Cdk.CdkStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'python3.12',
    VpcConfig: {},
  });
});
