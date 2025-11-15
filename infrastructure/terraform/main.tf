terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    # Bucket and key to be configured via backend-config or CLI
    key = "mvp-project/terraform.tfstate"
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "./modules/vpc"
  # vars
}

module "eks" {
  source = "./modules/eks"
  # vars
}

module "rds" {
  source = "./modules/rds"
  # vars
}
