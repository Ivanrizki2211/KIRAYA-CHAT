BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
  email_verified_at TIMESTAMPTZ,
  google_id VARCHAR(255) UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  birth_date DATE,
  age_group VARCHAR(20) NOT NULL DEFAULT '18+' CHECK (age_group IN ('13-17', '18+')),
  last_active_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  display_name VARCHAR(100),
  avatar_url TEXT,
  banner_url TEXT,
  bio TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(16) NOT NULL DEFAULT 'id',
  theme VARCHAR(24) NOT NULL DEFAULT 'kiraya-dark',
  memory_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  voice_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  voice_speed NUMERIC(3,2) NOT NULL DEFAULT 1.00 CHECK (voice_speed BETWEEN 0.50 AND 2.00),
  voice_volume NUMERIC(3,2) NOT NULL DEFAULT 0.85 CHECK (voice_volume BETWEEN 0.00 AND 1.00),
  preferred_voice_id VARCHAR(100),
  ai_temperature NUMERIC(3,2) NOT NULL DEFAULT 0.80 CHECK (ai_temperature BETWEEN 0.00 AND 1.50),
  sensitive_filter_strict BOOLEAN NOT NULL DEFAULT TRUE,
  notify_updates BOOLEAN NOT NULL DEFAULT TRUE,
  notify_community BOOLEAN NOT NULL DEFAULT TRUE,
  notify_system BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE character_categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(80) NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id INT REFERENCES character_categories(id) ON DELETE SET NULL,
  name VARCHAR(120) NOT NULL,
  age_label VARCHAR(40),
  gender VARCHAR(30) NOT NULL DEFAULT 'unspecified',
  language VARCHAR(16) NOT NULL DEFAULT 'id',
  short_description VARCHAR(280) NOT NULL,
  avatar_url TEXT NOT NULL,
  cover_url TEXT,
  visual_reference TEXT,
  personality_traits JSONB NOT NULL DEFAULT '[]'::jsonb,
  likes TEXT NOT NULL DEFAULT '',
  dislikes TEXT NOT NULL DEFAULT '',
  habits TEXT NOT NULL DEFAULT '',
  speaking_style TEXT NOT NULL DEFAULT '',
  background_story TEXT NOT NULL DEFAULT '',
  character_history TEXT NOT NULL DEFAULT '',
  relationships TEXT NOT NULL DEFAULT '',
  world_setting TEXT NOT NULL DEFAULT '',
  system_personality_prompt TEXT NOT NULL,
  greeting_message TEXT NOT NULL,
  example_dialogues JSONB NOT NULL DEFAULT '[]'::jsonb,
  conversation_behavior TEXT NOT NULL DEFAULT '',
  visibility VARCHAR(20) NOT NULL DEFAULT 'public' CHECK (visibility IN ('private', 'unlisted', 'public')),
  is_mature BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  conversation_count BIGINT NOT NULL DEFAULT 0,
  favorite_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE character_tags (
  id BIGSERIAL PRIMARY KEY,
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  tag VARCHAR(40) NOT NULL,
  UNIQUE(character_id, tag)
);

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  title VARCHAR(160) NOT NULL,
  rolling_summary TEXT NOT NULL DEFAULT '',
  is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
  message_count INT NOT NULL DEFAULT 0,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  token_count INT NOT NULL DEFAULT 0,
  audio_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'completed' CHECK (status IN ('streaming', 'completed', 'error')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE character_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  memory_type VARCHAR(30) NOT NULL DEFAULT 'fact' CHECK (memory_type IN ('fact', 'relationship', 'story_progress', 'preference', 'summary')),
  content TEXT NOT NULL,
  importance SMALLINT NOT NULL DEFAULT 3 CHECK (importance BETWEEN 1 AND 5),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_favorites (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, character_id)
);

CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lead_character_id UUID REFERENCES characters(id) ON DELETE SET NULL,
  title VARCHAR(160) NOT NULL,
  synopsis TEXT NOT NULL,
  cover_url TEXT,
  category VARCHAR(50) NOT NULL DEFAULT 'Fantasy',
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  play_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE story_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  chapter_number INT NOT NULL,
  title VARCHAR(160) NOT NULL,
  narrative_scene TEXT NOT NULL,
  featured_character_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  ending_label VARCHAR(120),
  is_ending BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(story_id, chapter_number)
);

CREATE TABLE story_choices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES story_chapters(id) ON DELETE CASCADE,
  choice_text VARCHAR(240) NOT NULL,
  consequence_note TEXT NOT NULL DEFAULT '',
  next_chapter_id UUID REFERENCES story_chapters(id) ON DELETE SET NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE story_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  current_chapter_id UUID REFERENCES story_chapters(id) ON DELETE SET NULL,
  choices_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  ending_reached VARCHAR(120),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, story_id)
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(30) NOT NULL CHECK (category IN ('character_update', 'new_feature', 'community', 'account', 'system')),
  title VARCHAR(160) NOT NULL,
  body TEXT NOT NULL,
  action_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(30) NOT NULL CHECK (target_type IN ('character', 'story', 'message', 'user')),
  target_id UUID NOT NULL,
  reason VARCHAR(120) NOT NULL,
  details TEXT NOT NULL DEFAULT '',
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE blocked_users (
  blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (blocker_id, blocked_id),
  CHECK (blocker_id <> blocked_id)
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_code VARCHAR(40) NOT NULL DEFAULT 'free',
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired')),
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE usage_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  service_type VARCHAR(30) NOT NULL CHECK (service_type IN ('llm_chat', 'llm_assist', 'stt', 'tts', 'upload')),
  provider VARCHAR(60) NOT NULL,
  model_name VARCHAR(100),
  prompt_tokens INT NOT NULL DEFAULT 0,
  completion_tokens INT NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'error', 'rate_limited')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value_json JSONB NOT NULL,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_characters_category_vis ON characters(category_id, visibility, created_at DESC);
CREATE INDEX idx_characters_popularity ON characters(conversation_count DESC, favorite_count DESC);
CREATE INDEX idx_character_tags_tag ON character_tags(tag);
CREATE INDEX idx_conversations_user_last ON conversations(user_id, last_message_at DESC);
CREATE INDEX idx_messages_conv_created ON messages(conversation_id, created_at ASC);
CREATE INDEX idx_memories_user_char_active ON character_memories(user_id, character_id, is_active, importance DESC);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);
CREATE INDEX idx_reports_status_created ON reports(status, created_at DESC);
CREATE INDEX idx_usage_logs_created_service ON usage_logs(created_at DESC, service_type);

COMMIT;
