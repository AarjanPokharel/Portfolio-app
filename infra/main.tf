terraform {
  required_version = ">= 1.10"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # use_lockfile stops two runs from changing it at the same time.
  backend "s3" {
    bucket       = "workwithaarjan-dev-tfstate"
    key          = "portfolio/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}

provider "aws" {
  region = "us-east-1"
}
