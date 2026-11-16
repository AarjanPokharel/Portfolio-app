output "contact_url" {
  description = "Paste into the frontend as NEXT_PUBLIC_CONTACT_URL"
  value       = aws_lambda_function_url.contact.function_url
}

output "site_bucket" {
  value = aws_s3_bucket.site.bucket
}

output "distribution_id" {
  description = "Used to tell CloudFront to drop old copies after a publish"
  value       = aws_cloudfront_distribution.site.id
}

