# DoDoHub - Environment Variables Setup Guide

## 📋 Quick Start

### 1. Copy Environment Files

```bash
# Root environment
cp .env.example .env

# Contributor Web
cp apps/contributor-web/.env.example apps/contributor-web/.env.local

# Buyer Web
cp apps/buyer-web/.env.example apps/buyer-web/.env.local

# Admin Console
cp apps/admin-console/.env.example apps/admin-console/.env.local
```

### 2. Required Variables (Minimum Setup)

For local development, you only need to set these:

```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/dodohub

# Redis
REDIS_URL=redis://localhost:6379

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_generated_secret_here
```

---

## 🔑 Environment Variables by Category

### Database (Required)

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/dodohub
REDIS_URL=redis://localhost:6379
```

**How to get**:
- Run `docker-compose up -d` to start PostgreSQL and Redis
- Default credentials are in `docker-compose.yml`

### Authentication (Required)

```bash
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
```

**How to generate**:
```bash
# Generate JWT secrets
openssl rand -base64 32
```

### AWS S3 (Optional - for production)

```bash
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
S3_BUCKET_NAME=dodohub-assets
```

**How to get**:
1. Create AWS account
2. Go to IAM → Users → Create User
3. Attach S3 policy
4. Generate access keys

### Stripe (Optional - for payments)

```bash
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

**How to get**:
1. Create account at https://stripe.com
2. Go to Developers → API Keys
3. Copy test keys

### OpenAI (Optional - for AI features)

```bash
OPENAI_API_KEY=sk-your_openai_api_key_here
```

**How to get**:
1. Create account at https://openai.com
2. Go to API Keys
3. Generate new key

---

## 🚀 Development Setup

### Minimal Setup (Local Development)

```bash
# .env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/dodohub
REDIS_URL=redis://localhost:6379
JWT_SECRET=$(openssl rand -base64 32)
```

### Full Setup (All Features)

1. **Copy all .env.example files**
2. **Fill in required variables**
3. **Optional: Add API keys for external services**

---

## 📝 Variable Descriptions

### Application Settings

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment (development/production) | Yes | development |
| `APP_NAME` | Application name | No | DoDoHub |
| `APP_URL` | Base URL | No | http://localhost:3000 |

### Database

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |

### Authentication

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret for signing JWTs | Yes |
| `JWT_EXPIRY` | Token expiration time | No |

### Services

| Variable | Description | Required |
|----------|-------------|----------|
| `GATEWAY_PORT` | API Gateway port | No |
| `AUTH_SERVICE_PORT` | Auth service port | No |
| `MEDIA_SERVICE_PORT` | Media service port | No |

---

## ⚠️ Security Best Practices

### DO NOT:
- ❌ Commit `.env` files to Git
- ❌ Share secrets in public repos
- ❌ Use default passwords in production
- ❌ Hardcode API keys in code

### DO:
- ✅ Use `.env.example` for templates
- ✅ Generate strong secrets
- ✅ Rotate keys regularly
- ✅ Use environment-specific configs

---

## 🔒 Production Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Generate new JWT secrets
- [ ] Use production database
- [ ] Enable HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Configure real payment keys
- [ ] Set up monitoring (Sentry)
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use secure cookies

---

## 🛠️ Troubleshooting

### Database Connection Failed

```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres
```

### Redis Connection Failed

```bash
# Check if Redis is running
docker-compose ps

# Restart Redis
docker-compose restart redis
```

### JWT Secret Not Set

```bash
# Generate new secret
openssl rand -base64 32

# Add to .env
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env
```

---

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Stripe API Docs](https://stripe.com/docs/api)
- [AWS S3 Guide](https://docs.aws.amazon.com/s3/)
- [OpenAI API Reference](https://platform.openai.com/docs)

---

## 🎯 Quick Commands

```bash
# Generate JWT secret
openssl rand -base64 32

# Generate encryption key (32 chars)
openssl rand -hex 16

# Start all services
docker-compose up -d

# Check environment variables
printenv | grep DATABASE

# Validate .env file
cat .env | grep -v '^#' | grep -v '^$'
```

---

**Need help?** Check the main README.md for setup instructions.
