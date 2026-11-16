# Zip the handler; source_code_hash makes Terraform redeploy only when the code changes
data "archive_file" "contact" {
  type        = "zip"
  source_file = "${path.module}/lambda/contact.py"
  output_path = "${path.module}/build/contact.zip"
}

# The identity the function runs as
resource "aws_iam_role" "contact" {
  name = "portfolio-contact-lambda"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

# Permission to write its own logs
resource "aws_iam_role_policy_attachment" "contact_logs" {
  role       = aws_iam_role.contact.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Send email only through our two identities, and only as contact@<domain>
resource "aws_iam_role_policy" "contact_send" {
  name = "send-as-contact-only"
  role = aws_iam_role.contact.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "ses:SendEmail"
      Resource  = [aws_sesv2_email_identity.domain.arn, aws_sesv2_email_identity.inbox.arn]
      Condition = { StringEquals = { "ses:FromAddress" = "contact@${var.domain}" } }
    }]
  })
}

# Keep logs 14 days instead of forever (forever slowly costs money)
resource "aws_cloudwatch_log_group" "contact" {
  name              = "/aws/lambda/portfolio-contact"
  retention_in_days = 14
}

resource "aws_lambda_function" "contact" {
  function_name    = "portfolio-contact"
  role             = aws_iam_role.contact.arn
  runtime          = "python3.13"
  handler          = "contact.handler"
  filename         = data.archive_file.contact.output_path
  source_code_hash = data.archive_file.contact.output_base64sha256
  timeout          = 10
  memory_size      = 128

  environment {
    variables = {
      FROM_ADDRESS = "contact@${var.domain}"
      TO_ADDRESS   = var.notify_email
    }
  }

  depends_on = [aws_cloudwatch_log_group.contact]
}

# A public HTTPS address; CORS lets only your site's pages call it from a browser
resource "aws_lambda_function_url" "contact" {
  function_name      = aws_lambda_function.contact.function_name
  authorization_type = "NONE"

  cors {
    allow_origins = ["https://${var.domain}", "https://www.${var.domain}", "http://localhost:8080"]
    allow_methods = ["POST"]
    allow_headers = ["content-type"]
    max_age       = 3600
  }
}

# The provider adds both public-URL permissions itself (InvokeFunctionUrl,
# and InvokeFunction limited to calls through the URL). Checked with get-policy.
