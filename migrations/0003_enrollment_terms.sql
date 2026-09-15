-- Terms used by the enrollment/finance workflow.
-- Safe to run once after 0002_sessions.sql.
ALTER TABLE enrollments ADD COLUMN monthly_amount REAL;
ALTER TABLE enrollments ADD COLUMN total_course_amount REAL;
ALTER TABLE enrollments ADD COLUMN installment_count INTEGER;
ALTER TABLE enrollments ADD COLUMN discount_percent REAL;
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
