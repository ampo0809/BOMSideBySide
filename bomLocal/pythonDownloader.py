import urllib.request

booksAndChapters = [
    { "bookName": "1 Nephi", "bookCode": "1-ne", "bookChapters": 22 },
    { "bookName": "2 Nephi", "bookCode": "2-ne", "bookChapters": 33 },
    { "bookName": "Jacob", "bookCode": "jacob", "bookChapters": 7 },
    { "bookName": "Enos", "bookCode": "enos", "bookChapters": 1 },
    { "bookName": "Jarom", "bookCode": "jarom", "bookChapters": 1 },
    { "bookName": "Omni", "bookCode": "omni", "bookChapters": 1 },
    { "bookName": "Words of Mormon", "bookCode": "w-of-m", "bookChapters": 1 },
    { "bookName": "Mosiah", "bookCode": "mosiah", "bookChapters": 29 },
    { "bookName": "Alma", "bookCode": "alma", "bookChapters": 63 },
    { "bookName": "Helaman", "bookCode": "hel", "bookChapters": 16 },
    { "bookName": "3 Nephi", "bookCode": "3-ne", "bookChapters": 30 },
    { "bookName": "4 Nephi", "bookCode": "4-ne", "bookChapters": 1 },
    { "bookName": "Mormon", "bookCode": "morm", "bookChapters": 9 },
    { "bookName": "Ether", "bookCode": "ether", "bookChapters": 15 },
    { "bookName": "Moroni", "bookCode": "moro", "bookChapters": 10 }]

lang = "rus"

for i in range(0, len(booksAndChapters)):

    bName = booksAndChapters[i]["bookCode"]
    bChap = booksAndChapters[i]["bookChapters"]

    for j in range(1, bChap +1):
        url = f"https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang={lang}&uri=/scriptures/bofm/{bName}/{j}"
        urllib.request.urlretrieve(url, f"{lang}/{bName}_{j}.json")
        print(url)
        