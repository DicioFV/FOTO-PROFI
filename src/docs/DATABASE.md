# CINEVISION AI — DATABASE SCHEMA

## Tabelas Principais

### users
```sql
CREATE TABLE users (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  username      VARCHAR(100) UNIQUE,
  full_name     VARCHAR(255),
  avatar_url    TEXT,
  plan          VARCHAR(50) DEFAULT 'free',
  credits       INTEGER DEFAULT 5,
  total_credits_used INTEGER DEFAULT 0,
  role          VARCHAR(50) DEFAULT 'user',
  locale        VARCHAR(10) DEFAULT 'pt-BR',
  onboarded     BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### generations
```sql
CREATE TABLE generations (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  input_image_url TEXT NOT NULL,
  input_prompt    TEXT,
  style_id        VARCHAR(100),
  style_category  VARCHAR(100),
  ai_model        VARCHAR(100),
  parameters      JSONB DEFAULT '{}',
  final_prompt    TEXT,
  negative_prompt TEXT,
  output_image_url TEXT,
  output_images   TEXT[] DEFAULT '{}',
  resolution      VARCHAR(20) DEFAULT '1024x1024',
  format          VARCHAR(10) DEFAULT 'png',
  platform_target VARCHAR(50),
  status          VARCHAR(50) DEFAULT 'pending',
  processing_time INTEGER,
  credits_used    INTEGER DEFAULT 1,
  ai_provider     VARCHAR(50),
  ai_job_id       TEXT,
  quality_score   DECIMAL(3,2),
  is_public       BOOLEAN DEFAULT FALSE,
  likes_count     INTEGER DEFAULT 0,
  deleted_at      TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### styles
```sql
CREATE TABLE styles (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            VARCHAR(100) UNIQUE NOT NULL,
  name            VARCHAR(255) NOT NULL,
  description     TEXT,
  category        VARCHAR(100),
  subcategory     VARCHAR(100),
  base_prompt     TEXT NOT NULL,
  negative_prompt TEXT,
  preview_url     TEXT,
  thumbnail_url   TEXT,
  before_url      TEXT,
  after_url       TEXT,
  recommended_model VARCHAR(100),
  parameters      JSONB DEFAULT '{}',
  tags            TEXT[] DEFAULT '{}',
  min_plan        VARCHAR(50) DEFAULT 'free',
  credits_cost    INTEGER DEFAULT 1,
  uses_count      INTEGER DEFAULT 0,
  likes_count     INTEGER DEFAULT 0,
  is_featured     BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### plans
```sql
CREATE TABLE plans (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            VARCHAR(50) UNIQUE NOT NULL,
  name            VARCHAR(100) NOT NULL,
  description     TEXT,
  price_monthly   DECIMAL(10,2),
  price_yearly    DECIMAL(10,2),
  stripe_price_id_monthly TEXT,
  stripe_price_id_yearly  TEXT,
  credits_monthly INTEGER,
  max_resolution  VARCHAR(20),
  max_exports     INTEGER,
  features        JSONB DEFAULT '[]',
  is_active       BOOLEAN DEFAULT TRUE,
  is_popular      BOOLEAN DEFAULT FALSE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### subscriptions
```sql
CREATE TABLE subscriptions (
  id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id             UUID REFERENCES users(id),
  plan_id             UUID REFERENCES plans(id),
  stripe_subscription_id TEXT,
  stripe_customer_id  TEXT,
  status              VARCHAR(50),
  billing_cycle       VARCHAR(20),
  current_period_start TIMESTAMPTZ,
  current_period_end   TIMESTAMPTZ,
  cancel_at           TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

### credit_transactions
```sql
CREATE TABLE credit_transactions (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id       UUID REFERENCES users(id),
  amount        INTEGER NOT NULL,
  type          VARCHAR(50),
  description   TEXT,
  generation_id UUID REFERENCES generations(id),
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

## Índices

```sql
CREATE INDEX idx_generations_user_id ON generations(user_id);
CREATE INDEX idx_generations_status ON generations(status);
CREATE INDEX idx_generations_created ON generations(created_at DESC);
CREATE INDEX idx_generations_style ON generations(style_id);
CREATE INDEX idx_styles_category ON styles(category);
CREATE INDEX idx_styles_active ON styles(is_active, sort_order);
CREATE INDEX idx_credit_tx_user ON credit_transactions(user_id, created_at DESC);
```

## Row Level Security

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_data" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "generations_own_data" ON generations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "generations_public" ON generations
  FOR SELECT USING (is_public = TRUE);
```
