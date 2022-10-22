import json


class Exporter:

    def __init__(self):
        pass

    def save_tasks(self, tasks):
        tasks_json = json.dumps(tasks, indent=2)
        with open("taski.json", "w", encoding="utf-8") as file:
            file.write(tasks_json)
