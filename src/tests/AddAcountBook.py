import time
import requests
import random

param = {
    "happen_time":"2022-03-21",
    "label":["测试"],
    "ledger":"3",
    "title":"测试",
    "account":"1",
    "amount":100,
    "category":"2"
    }

url = 'http://localhost:5000/accountbook'

headers = {
    "Content-Type": "application/json"
}

for i in range(31):
    time.sleep(0.5)
    param["happen_time"] = f'2022-03-{i}'
    param["amount"] = random.randint(-50, 50)

    res = requests.post(url=url, headers=headers, json=param)
    print(i, res.status_code)
