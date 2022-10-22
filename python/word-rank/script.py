# coding=utf-8

sentences = [
    'Taki mamy klimat',
    'Wszędzie dobrze ale w domu najlepiej',
    'Wyskoczył jak Filip z konopii',
    'Gdzie kucharek sześć tam nie ma co jeść',
    'Nie ma to jak w domu',
    'Konduktorze łaskawy zabierz nas do Warszawy',
    'Jeżeli nie zjesz obiadu to nie dostaniesz deseru',
    'Bez pracy nie ma kołaczy',
    'Kto sieje wiatr ten zbiera burzę',
    'Być szybkim jak wiatr',
    'Kopać pod kimś dołki',
    'Gdzie raki zimują',
    'Gdzie pieprz rośnie',
    'Swoją drogą to gdzie rośnie pieprz?',
    'Mam nadzieję, że poradzisz sobie z tym zadaniem bez problemu',
    'Nie powinno sprawić żadnego problemu, bo Google jest dozwolony',
]

words_rank = dict()

for sentence in sentences:
    for word in sentence.split():
        word_lower = word.lower()
        if word_lower in words_rank:
            words_rank[word_lower] += 1
        else:
            words_rank[word_lower] = 1

words_rank_items = sorted([(number, word) for word, number in words_rank.items()], reverse=True)

for i in range(3):
    print(f'{i + 1}. "{words_rank_items[i][1]}" - {words_rank_items[i][0]}')
