-- Adds update timestamps used by PATCH operations for classes and lessons.
ALTER TABLE classes ADD COLUMN updated_at TEXT;
ALTER TABLE lessons ADD COLUMN updated_at TEXT;
CREATE INDEX IF NOT EXISTS idx_classes_status ON classes(status);
CREATE INDEX IF NOT EXISTS idx_lessons_date ON lessons(lesson_date);
