# filter_entity
## instllation
```
- pip3 install -U --user pip
- pip3 install rasa
- pip3 install rasa[spacy]
- python -m spacy download ja_core_news_lg
```

## learning
```
- rasa train nlu
```

## test
```
- rasa test -nlu --nlu data/nlu.yml --cross-validation
```

## deploy
We used ngrok as rasa tunnering tool.  In the future we introduce cloud management system into this architechture.
```
- rasa run --enable-api -m PATH/TO/MODEL --cors "*"
- ngrok http 5005
```