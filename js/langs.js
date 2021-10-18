const langsByISO = ['', 'afr', 'apw', 'aym', 'ind', 'msa', 'bam', 'tzo', 'bik', 'bis', 'cak', 'cat', 'ceb', 'ces', 'cha', 'nya', 'cym', 'dan', 'deu', 'nav', 'cuk', 'yor', 'est', 'efi', 'guz', 'eng', 'spa', 'eus', 'ton', 'fat', 'hif', 'chk', 'fon', 'fra', 'smo', 'tvl', 'grn', 'hil', 'hmo', 'hmn', 'hrv', 'haw', 'ibo', 'ilo', 'nbl', 'xho', 'zul', 'isl', 'ita', 'kos', 'mah', 'qvi', 'kam', 'kin', 'gil', 'swa', 'niu', 'hat', 'lav', 'lit', 'lin', 'yua', 'hun', 'pon', 'mlg', 'mlt', 'mam', 'rar', 'nld', 'cag', 'nor', 'pau', 'pam', 'pag', 'pap', 'pol', 'por', 'ept', 'kek', 'quh', 'quc', 'tah', 'ron', 'nso', 'tsn', 'sna', 'alb', 'sqi', 'slk', 'slv', 'sot', 'fin', 'swe', 'tgl', 'mri', 'yap', 'vie', 'tpi', 'lua', 'tur', 'twi', 'fij', 'war', 'quz', 'ell', 'bul', 'kaz', 'mkd', 'mon', 'rus', 'srp', 'ukr', 'kat', 'hyw', 'hye', 'urd', 'ara', 'pes', 'amh', 'nep', 'hin', 'ben', 'tam', 'tel', 'kan', 'sin', 'tha', 'lao', 'ksw', 'mya', 'khm', 'kor', 'zho', 'jpn', 'zhs', 'yue'];

const langsByName = ['', 'Afrikaans', 'Apache', 'Aymar', 'Bahasa', 'Bahasa', 'Bambara', "Bats'i", 'Bikol', 'Bislama', 'Cakchiquel', 'Català', 'Cebuano', 'Česky', 'Chamoru', 'Chichewa', 'Cymraeg', 'Dansk', 'Deutsch', 'Diné', 'Dulegaya', 'Èdè', 'Eesti', 'Efik', 'EkeGusii', 'English', 'Español', 'Euskera', 'Faka-tonga', 'Fante', 'Fiji', 'Fosun', 'Fɔngbè', 'Français', 'Gagana', 'gana', 'Guaraní', 'Hiligaynon', 'Hiri', 'Hmoob', 'Hrvatski', 'ʻŌlelo', 'Igbo', 'Ilokano', 'isiNdebele', 'isiXhosa', 'isiZulu', 'Íslenska', 'Italiano', 'Kahs', 'Kajin', 'Kichwa', 'Kikamba', 'Kinyarwanda', 'Kiribati', 'Kiswahili', 'ko', 'Kreyòl', 'Latviešu', 'Lietuvių', 'Lingála', 'maayaʼ', 'Magyar', 'Mahsen', 'Malagasy', 'Malti', 'Mam', 'Māori', 'Nederlands', 'Nivacle', 'Norsk', 'Palauan', 'Pampango', 'Pangasinan', 'Papiamento', 'Polski', 'Português', 'Português', "Q'eqchi'", 'Quechua-Bolivia', 'Quiché', 'Reo', 'Română', 'sePêdi', 'Setswana', 'Shona', 'Shqip', 'Shqip', 'Slovenčina', 'Slovenščina', 'South', 'Suomi', 'Svenska', 'Tagalog', 'Te', 'Thin', 'Tiếng', 'Tok', 'Tshiluba', 'Türkçe', 'Twi', 'Vosa', 'Waray', 'Yunkay', 'Ελληνικά', 'Български', 'Қазақ', 'Македонски', 'Монгол', 'Русский', 'Српски', 'Українська', 'ქართული', 'Արեւմտահայերէն', 'Հայերեն', 'اردو', 'العربية', 'فارسی', 'አማርኛ', 'नेपाली', 'हिन्दी,', 'বাংলা', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'සිංහල', 'ภาษาไทย', 'ພາສາລາວ', 'ကညီလံာ်ခီၣ်ထံ', 'ဗမာစာ', 'ភាសាខ្មែរ', '한국어', '中文', '日本語', '简体中文', '繁體中文'];

var books = {
    "1 Nephi": "1-ne",
    "2 Nephi": "2-ne",
    "Jacob": "jacob",
    "Enos": "enos",
    "Jarom": "jarom",
    "Omni": "omni",
    "Words of Mormon": "w-of-m",
    "Mosiah": "mosiah",
    "Alma": "alma",
    "Helaman": "hel",
    "3 Nephi": "3-ne",
    "4 Nephi": "4-ne",
    "Mormon": "morm",
    "Ether": "ether",
    "Moroni": "moro"
}

// Preferrably to export in a class
export { langsByISO, langsByName, books };