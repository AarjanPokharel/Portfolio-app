variable "domain" {
  description = "The site's domain, already hosted in Route 53"
  default     = "workwithaarjan.dev"
}

variable "notify_email" {
  description = "Inbox that receives contact form messages (set in terraform.tfvars, never committed)"
  type        = string
}
