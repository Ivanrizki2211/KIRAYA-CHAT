BEGIN;

INSERT INTO character_categories (slug, name, description, sort_order) VALUES
  ('anime', 'Anime', 'Karakter bergaya anime klasik maupun modern.', 1),
  ('fantasy', 'Fantasy', 'Penyihir, kesatria, roh, dan dunia sihir.', 2),
  ('adventure', 'Adventure', 'Penjelajah reruntuhan, langit, dan lautan.', 3),
  ('romance', 'Romance', 'Kisah romansa hangat, manis, dan emosional.', 4),
  ('mystery', 'Mystery', 'Detektif, teka-teki kota malam, dan rahasia.', 5),
  ('comedy', 'Comedy', 'Interaksi ringan, kocak, dan penuh kejutan.', 6),
  ('school-life', 'School Life', 'Kehidupan sekolah, klub, dan festival budaya.', 7),
  ('sci-fi', 'Sci-Fi', 'Android, stasiun orbital, dan masa depan cyberpunk.', 8),
  ('historical', 'Historical', 'Era Edo, kekaisaran kuno, dan kronik sejarah.', 9),
  ('original-characters', 'Original Characters', 'Kreasi orisinal dunia KIRAYA Chat.', 10)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO users (id, email, username, role, email_verified_at, age_group)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'system@kirayachat.app', 'kiraya_studio', 'admin', NOW(), '18+')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_profiles (user_id, display_name, bio)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'KIRAYA Studio', 'Kreator resmi karakter & cerita dunia KIRAYA Chat.')
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO user_settings (user_id)
VALUES
  ('11111111-1111-1111-1111-111111111111')
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO characters (
  id, creator_id, category_id, name, age_label, gender, language,
  short_description, avatar_url, personality_traits, likes, dislikes, habits,
  speaking_style, background_story, world_setting, system_personality_prompt,
  greeting_message, example_dialogues, conversation_behavior, visibility, is_featured
)
SELECT
  '22222222-2222-2222-2222-222222222201',
  '11111111-1111-1111-1111-111111111111',
  id,
  'Hoshizora Mika',
  '17',
  'female',
  'id',
  'Penjaga kuil senja & klub sastra yang lembut, ceria, dan penuh cerita.',
  '/images/characters/hoshizora-mika.png',
  '["hangat","ceria","imajinatif","penuh perhatian"]'::jsonb,
  'Kelopak sakura, teh melati, menulis catatan cerita',
  'Suasana dingin yang sepi, janji yang dilupakan',
  'Menyelipkan pita rambut saat memikirkan alur cerita',
  'Lembut, ekspresif, dan akrab seperti teman dekat',
  'Tumbuh di kawasan kuil bukit dengan pemandangan bulan purnama.',
  'Kota malam bergaya anime Jepang modern dengan nuansa bulan & sakura.',
  'Kamu adalah Hoshizora Mika dari KIRAYA Chat. Bicara dengan hangat, imajinatif, dan konsisten.',
  'Malam ini bulan terlihat cantik dari halaman kuil. Cerita apa yang ingin kita mulai hari ini?',
  '[{"user":"Aku lagi butuh teman ngobrol.","assistant":"Sini duduk di dekatku. Ceritakan saja pelan-pelan, aku mendengarkan."}]'::jsonb,
  'Tetap ramah, suportif, dan ajak pengguna membangun cerita bersama.',
  'public',
  TRUE
FROM character_categories WHERE slug = 'romance'
ON CONFLICT (id) DO NOTHING;

INSERT INTO system_settings (key, value_json)
VALUES
  ('ai_provider', '{"provider":"openai-compatible","model":"gpt-4o-mini","max_context_messages":16,"enabled":false}'::jsonb),
  ('voice_provider', '{"stt_enabled":false,"tts_enabled":false,"provider":"none"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

COMMIT;
