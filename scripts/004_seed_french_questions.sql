-- Seed A1-level French vocabulary questions
-- Categories: greetings, numbers, colors, family, food, animals, body_parts, clothing

-- GREETINGS
INSERT INTO public.questions (french_word, english_translation, options, correct_answer, category) VALUES
('Bonjour', 'Hello', ARRAY['Hello', 'Goodbye', 'Please', 'Thank you'], 'Hello', 'greetings'),
('Au revoir', 'Goodbye', ARRAY['Hello', 'Goodbye', 'Good night', 'Good morning'], 'Goodbye', 'greetings'),
('Merci', 'Thank you', ARRAY['Please', 'Thank you', 'Excuse me', 'Sorry'], 'Thank you', 'greetings'),
('S''il vous plaît', 'Please', ARRAY['Thank you', 'Please', 'Excuse me', 'Hello'], 'Please', 'greetings'),
('Excusez-moi', 'Excuse me', ARRAY['Sorry', 'Excuse me', 'Thank you', 'Please'], 'Excuse me', 'greetings'),
('Bonsoir', 'Good evening', ARRAY['Good morning', 'Good afternoon', 'Good evening', 'Good night'], 'Good evening', 'greetings'),
('Bonne nuit', 'Good night', ARRAY['Good evening', 'Good night', 'Good morning', 'Goodbye'], 'Good night', 'greetings'),
('Salut', 'Hi/Bye (informal)', ARRAY['Hi/Bye (informal)', 'Good morning', 'Thank you', 'Please'], 'Hi/Bye (informal)', 'greetings');

-- NUMBERS (1-10)
INSERT INTO public.questions (french_word, english_translation, options, correct_answer, category) VALUES
('Un', 'One', ARRAY['One', 'Two', 'Three', 'Four'], 'One', 'numbers'),
('Deux', 'Two', ARRAY['One', 'Two', 'Three', 'Four'], 'Two', 'numbers'),
('Trois', 'Three', ARRAY['Two', 'Three', 'Four', 'Five'], 'Three', 'numbers'),
('Quatre', 'Four', ARRAY['Three', 'Four', 'Five', 'Six'], 'Four', 'numbers'),
('Cinq', 'Five', ARRAY['Four', 'Five', 'Six', 'Seven'], 'Five', 'numbers'),
('Six', 'Six', ARRAY['Five', 'Six', 'Seven', 'Eight'], 'Six', 'numbers'),
('Sept', 'Seven', ARRAY['Six', 'Seven', 'Eight', 'Nine'], 'Seven', 'numbers'),
('Huit', 'Eight', ARRAY['Seven', 'Eight', 'Nine', 'Ten'], 'Eight', 'numbers'),
('Neuf', 'Nine', ARRAY['Eight', 'Nine', 'Ten', 'Eleven'], 'Nine', 'numbers'),
('Dix', 'Ten', ARRAY['Nine', 'Ten', 'Eleven', 'Twelve'], 'Ten', 'numbers');

-- COLORS
INSERT INTO public.questions (french_word, english_translation, options, correct_answer, category) VALUES
('Rouge', 'Red', ARRAY['Red', 'Blue', 'Green', 'Yellow'], 'Red', 'colors'),
('Bleu', 'Blue', ARRAY['Red', 'Blue', 'Green', 'Purple'], 'Blue', 'colors'),
('Vert', 'Green', ARRAY['Blue', 'Green', 'Yellow', 'Orange'], 'Green', 'colors'),
('Jaune', 'Yellow', ARRAY['Green', 'Yellow', 'Orange', 'Red'], 'Yellow', 'colors'),
('Noir', 'Black', ARRAY['White', 'Black', 'Gray', 'Brown'], 'Black', 'colors'),
('Blanc', 'White', ARRAY['Black', 'White', 'Gray', 'Silver'], 'White', 'colors'),
('Orange', 'Orange', ARRAY['Yellow', 'Orange', 'Red', 'Pink'], 'Orange', 'colors'),
('Rose', 'Pink', ARRAY['Red', 'Pink', 'Purple', 'Orange'], 'Pink', 'colors');

-- FAMILY
INSERT INTO public.questions (french_word, english_translation, options, correct_answer, category) VALUES
('Mère', 'Mother', ARRAY['Mother', 'Father', 'Sister', 'Brother'], 'Mother', 'family'),
('Père', 'Father', ARRAY['Mother', 'Father', 'Uncle', 'Grandfather'], 'Father', 'family'),
('Fils', 'Son', ARRAY['Daughter', 'Son', 'Brother', 'Sister'], 'Son', 'family'),
('Fille', 'Daughter', ARRAY['Son', 'Daughter', 'Sister', 'Mother'], 'Daughter', 'family'),
('Frère', 'Brother', ARRAY['Sister', 'Brother', 'Cousin', 'Uncle'], 'Brother', 'family'),
('Sœur', 'Sister', ARRAY['Brother', 'Sister', 'Cousin', 'Aunt'], 'Sister', 'family'),
('Grand-mère', 'Grandmother', ARRAY['Grandmother', 'Grandfather', 'Mother', 'Aunt'], 'Grandmother', 'family'),
('Grand-père', 'Grandfather', ARRAY['Grandmother', 'Grandfather', 'Father', 'Uncle'], 'Grandfather', 'family');

-- FOOD
INSERT INTO public.questions (french_word, english_translation, options, correct_answer, category) VALUES
('Pain', 'Bread', ARRAY['Bread', 'Water', 'Milk', 'Cheese'], 'Bread', 'food'),
('Eau', 'Water', ARRAY['Milk', 'Water', 'Juice', 'Coffee'], 'Water', 'food'),
('Lait', 'Milk', ARRAY['Water', 'Milk', 'Juice', 'Tea'], 'Milk', 'food'),
('Fromage', 'Cheese', ARRAY['Bread', 'Cheese', 'Butter', 'Meat'], 'Cheese', 'food'),
('Pomme', 'Apple', ARRAY['Orange', 'Apple', 'Banana', 'Grape'], 'Apple', 'food'),
('Café', 'Coffee', ARRAY['Tea', 'Coffee', 'Milk', 'Juice'], 'Coffee', 'food'),
('Thé', 'Tea', ARRAY['Coffee', 'Tea', 'Water', 'Milk'], 'Tea', 'food'),
('Chocolat', 'Chocolate', ARRAY['Candy', 'Chocolate', 'Cookie', 'Cake'], 'Chocolate', 'food');

-- ANIMALS
INSERT INTO public.questions (french_word, english_translation, options, correct_answer, category) VALUES
('Chat', 'Cat', ARRAY['Dog', 'Cat', 'Bird', 'Fish'], 'Cat', 'animals'),
('Chien', 'Dog', ARRAY['Cat', 'Dog', 'Horse', 'Cow'], 'Dog', 'animals'),
('Oiseau', 'Bird', ARRAY['Fish', 'Bird', 'Cat', 'Mouse'], 'Bird', 'animals'),
('Poisson', 'Fish', ARRAY['Bird', 'Fish', 'Frog', 'Snake'], 'Fish', 'animals'),
('Cheval', 'Horse', ARRAY['Cow', 'Horse', 'Pig', 'Sheep'], 'Horse', 'animals'),
('Vache', 'Cow', ARRAY['Horse', 'Cow', 'Pig', 'Goat'], 'Cow', 'animals'),
('Souris', 'Mouse', ARRAY['Rat', 'Mouse', 'Cat', 'Hamster'], 'Mouse', 'animals'),
('Lapin', 'Rabbit', ARRAY['Mouse', 'Rabbit', 'Hamster', 'Guinea pig'], 'Rabbit', 'animals');

-- BODY PARTS
INSERT INTO public.questions (french_word, english_translation, options, correct_answer, category) VALUES
('Tête', 'Head', ARRAY['Head', 'Hand', 'Foot', 'Arm'], 'Head', 'body_parts'),
('Main', 'Hand', ARRAY['Foot', 'Hand', 'Arm', 'Leg'], 'Hand', 'body_parts'),
('Pied', 'Foot', ARRAY['Hand', 'Foot', 'Leg', 'Arm'], 'Foot', 'body_parts'),
('Œil', 'Eye', ARRAY['Nose', 'Eye', 'Ear', 'Mouth'], 'Eye', 'body_parts'),
('Nez', 'Nose', ARRAY['Eye', 'Nose', 'Mouth', 'Ear'], 'Nose', 'body_parts'),
('Bouche', 'Mouth', ARRAY['Nose', 'Mouth', 'Eye', 'Ear'], 'Mouth', 'body_parts'),
('Oreille', 'Ear', ARRAY['Eye', 'Ear', 'Nose', 'Mouth'], 'Ear', 'body_parts'),
('Bras', 'Arm', ARRAY['Leg', 'Arm', 'Hand', 'Foot'], 'Arm', 'body_parts');

-- CLOTHING
INSERT INTO public.questions (french_word, english_translation, options, correct_answer, category) VALUES
('Chemise', 'Shirt', ARRAY['Pants', 'Shirt', 'Dress', 'Jacket'], 'Shirt', 'clothing'),
('Pantalon', 'Pants', ARRAY['Shirt', 'Pants', 'Skirt', 'Shorts'], 'Pants', 'clothing'),
('Robe', 'Dress', ARRAY['Skirt', 'Dress', 'Shirt', 'Blouse'], 'Dress', 'clothing'),
('Chaussures', 'Shoes', ARRAY['Socks', 'Shoes', 'Boots', 'Sandals'], 'Shoes', 'clothing'),
('Chapeau', 'Hat', ARRAY['Cap', 'Hat', 'Scarf', 'Gloves'], 'Hat', 'clothing'),
('Veste', 'Jacket', ARRAY['Coat', 'Jacket', 'Sweater', 'Shirt'], 'Jacket', 'clothing'),
('Jupe', 'Skirt', ARRAY['Dress', 'Skirt', 'Pants', 'Shorts'], 'Skirt', 'clothing'),
('Chaussettes', 'Socks', ARRAY['Shoes', 'Socks', 'Stockings', 'Boots'], 'Socks', 'clothing');
