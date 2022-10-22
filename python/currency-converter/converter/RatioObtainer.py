from doctest import FAIL_FAST
import json, datetime, urllib.request, os.path


class RatioObtainer:
    base = None
    target = None

    def __init__(self, base, target):
        self.base = base
        self.target = target

    def was_ratio_saved_today(self):

        if not os.path.isfile("ratios.json"):
            return False

        with open("ratios.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        try:
            next(
                item for item in data
                if item['base_currency'] == self.base
                and item['target_currency'] == self.target
                and item['date_fetched'] == datetime.datetime.now().strftime('%Y-%m-%d')
            )
        except StopIteration:
            return False

        return True

    def fetch_ratio(self):

        with urllib.request.urlopen(f'https://api.exchangerate.host/latest?base={self.base}&symbols={self.target}') as response:
            response_text = response.read()

        ratio = json.loads(response_text)['rates'][self.target]
        
        self.save_ratio(ratio)

    def save_ratio(self, ratio):

        with open("ratios.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        try:
            key = next(
                key for key, item in enumerate(data)
                if item['base_currency'] == self.base
                and item['target_currency'] == self.target
            )
        
        except StopIteration:
            data.append({
                'base_currency': self.base,
                'target_currency': self.target,
                'date_fetched': datetime.datetime.now().strftime('%Y-%m-%d'),
                'ratio': ratio 
            })
            
        else:
            data[key]['date_fetched'] = datetime.datetime.now().strftime('%Y-%m-%d')
            data[key]['ratio'] = ratio
        
        finally:
            data_text = json.dumps(data, indent=2)
            with open("ratios.json", "w", encoding="utf-8") as file:
                file.write(data_text)

    def get_matched_ratio_value(self):

        with open("ratios.json", "r", encoding="utf-8") as file:
            data = json.load(file)

        return float(next(
            item for item in data
            if item['base_currency'] == self.base
            and item['target_currency'] == self.target
        )['ratio'])
