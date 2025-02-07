CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE about ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for about"
  ON about
  FOR SELECT
  TO public
  USING (true);

-- Insert a default record
INSERT INTO about (content) VALUES (
'I’m Giulio Pinotti, a Creative Director and Designer with over 15 years of experience crafting impactful campaigns for major brands and agencies in São Paulo. From digital and social to traditional media, I’ve consistently worked to create advertising that not only drives results but also contributes to societal growth and community building.

I began my journey designing and coding websites, which instilled a strong foundation in both creativity and technical precision. Over time, I shifted my focus to art direction, developing ideas and leading projects that connect with people and deliver meaningful outcomes for clients. Today, as a Creative Director, I thrive in leading teams to create compelling campaigns and branded content that resonate deeply with audiences.

Career Highlights
	•	Spearheaded Amazon’s launch campaign in Brazil.
	•	Innovated QR Code TV merchandising for Americanas, driving +160% app downloads.
	•	Played a key role in winning L’Oréal’s digital account pitch.
	•	Led creative campaigns for Mastercard for over six years, earning recognition at Effie Awards and Midas Awards.
	•	Currently leading teams at Agência Crush to create standout campaigns for Mary Kay and more.

What I Do
Creative Direction, Advertising, Art Direction, Digital Design, Web Design, Corporate Identity, Branded Content, Creative Strategy, Brand Development, Production Direction, and Digital Media.

Brands I’ve Worked With
Mastercard, Amazon, Mary Kay, Prime Video, Mitsubishi Motors, Americanas.com, Pizza Hut, Deca, L’Oréal, Nesfit, FNAC, FoxSony Films, Itaipava, Avon, and more.

Awards
	•	Effie Awards Brasil: Gold & Bronze in Financial Services, Bronze in Olympics Specials.
	•	New York Festivals Midas Awards: Silver Midas.
	•	Effie Awards Latam: Shortlist.

Let’s create something exceptional together.'
);
