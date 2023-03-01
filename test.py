data = {
    "a": [
        {"rule": ["A", "B"], "col": ["A", "B"]}, 
        {"rule": ["A", "B"], "col": ["A", "B"]}
    ],
    "b": [
        {"rule": ["A", "B"], "col": ["A", "B"]}, 
        {"rule": ["A", "B"], "col": ["A", "B"]}
    ]
}

for i in data["a"][0]["rule"]:
    print(i)