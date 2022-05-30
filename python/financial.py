import yfinance as yf

import pandas as pd

def sma(ticker, hist_of, range):
    df = yf.Ticker(ticker)
    df = df.history(hist_of)#1y
    df.drop(columns=['Dividends', 'Stock Splits'], inplace=True)
    range = int(range)
    # df["SMA"]=df.Close.rolling(range).mean()
    return df.rolling(range).mean().to_json()