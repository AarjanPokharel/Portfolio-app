# The existing hosted zone for the domain
data "aws_route53_zone" "main" {
  name = var.domain
}

# Prove we own the domain, so SES can send as contact@<domain>
resource "aws_sesv2_email_identity" "domain" {
  email_identity = var.domain
}

# Easy DKIM always gives exactly 3 keys; publish each as a CNAME
resource "aws_route53_record" "ses_dkim" {
  count   = 3
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}._domainkey.${var.domain}"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_sesv2_email_identity.domain.dkim_signing_attributes[0].tokens[count.index]}.dkim.amazonses.com"]
}

# DMARC: tell mail providers our policy for unsigned mail (watch only, for now)
resource "aws_route53_record" "dmarc" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "_dmarc.${var.domain}"
  type    = "TXT"
  ttl     = 600
  records = ["v=DMARC1; p=none;"]
}

# Verify the inbox; SES emails it a confirmation link
resource "aws_sesv2_email_identity" "inbox" {
  email_identity = var.notify_email
}
