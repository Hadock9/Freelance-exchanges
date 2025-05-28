-- Таблиця для скілів
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Таблиця для звʼязку фрілансерів і скілів (many-to-many)
CREATE TABLE IF NOT EXISTS freelancer_skills (
  freelancer_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (freelancer_id, skill_id),
  FOREIGN KEY (freelancer_id) REFERENCES freelancers(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- Додаємо приклади скілів
INSERT IGNORE INTO skills (name) VALUES
('Figma'),
('Adobe XD'),
('Sketch'),
('Photoshop'),
('Illustrator'); 