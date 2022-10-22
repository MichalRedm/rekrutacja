from doctest import FAIL_FAST
import json, datetime, urllib.request, os.path

base = 'USD'
target = 'EUR'

with urllib.request.urlopen(f'https://api.exchangerate.host/latest?base={base}&symbols={target}') as response:
    response_text = response.read()

ratio = json.loads(response_text)['rates'][target]
print(ratio)

'''
url = 'https://api.exchangerate.host/latest'
response = urllib.request.get(url)
data = response.json()

print(data)
'''