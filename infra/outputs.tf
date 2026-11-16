output "contact_url" {
  description = "Paste into the frontend as NEXT_PUBLIC_CONTACT_URL"
  value       = aws_lambda_function_url.contact.function_url
}
