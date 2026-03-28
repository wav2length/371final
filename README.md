# 371final

## About the Dataset
### Source
The file `Speed Dating Data.csv` can be downloaded from [this Kaggle page](https://www.kaggle.com/datasets/annavictoria/speed-dating-experiment?select=Speed+Dating+Data.csv). The model will load this csv from the path `./data/Speed Dating Data.csv`, so once you've downloaded it please create the data folder if it doesn't already exist and drop the dataset there.
### Relevant Features
Each row of the dataset contains an ID of a person (`iid`) and an ID of the person that they matched up with (`pid`). The `match` variable indicates whether these two people "matched" during the speed dating activity, i.e. `dec` and `dec_o` were both 1. Most of the organizational data can otherwise be ignored. The row contains the survey results of the original person as well as some information about their partner. We could likely get the results of both people in the same row, but this may result in duplicate data. Any other information about the thought process of cleaning the dataset will be explained in `model.ipynb`.